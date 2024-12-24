import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  role: "user" | "admin";
}

export interface DtoUserLogin {
  username: string;
  password: string;
}

export interface DtoUserRegister {
  username: string;
  password: string;
}
