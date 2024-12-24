import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { DtoUserLogin, IUser } from "../types/User";
import User from "../models/userModel";
import sendVerificationEmail, {
  generateVerificationCode,
} from "../utils/mailer";
import {saveNewUser, readUserByName} from "../services/user"
type MyObjectType = {
  [key: string]: any; // או להגדיר תכונות ספציפיות
};
const verificationCodes: MyObjectType = {};
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password, email, role }: IUser = req.body;
  if (!username || !password || !email) {
    res
      .status(400)
      .send({ message: "username or password or Email is mising" });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  // if user exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  try {
    const user = new User({ username, password: hashedPassword, email, role });
    await user.save();
    res.json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).send({ message: "Failed to send email" });
  }
};
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password }: IUser = req.body;

  if (!username || !password) {
    throw new Error("username or password is missing");
  }
  const user = await readUserByName(username);
  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const code = generateVerificationCode();
    verificationCodes[user.email] = code; // שמירת הקוד (במציאות תשתמשו במסד נתונים)

    await sendVerificationEmail(user.email, code);
    res.status(200).send({ message: "Verification email sent", user });
};

export const verifyLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, code } = req.body;

  if (code === verificationCodes[email]) {
    delete verificationCodes[email]; // הסרת הקוד לאחר שימוש
    const token = jwt.sign({ email }, process.env.SECRET_KEY as string, {
      expiresIn: "1h",
    });
    res.status(200).send({ message: "Email verified successfully", token });
    return;
  }
  res.status(400).send({ message: "Invalid verification code" });
};
