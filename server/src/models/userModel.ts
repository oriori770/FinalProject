import { IUser, DtoUserLogin } from "User";
import mongoose, { Schema, Document } from "mongoose";

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "username is required"],
    min: [5, "to shotrt"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    min: [4, "password to short"],
  },
  email: {
    type: String,
  },
  role: {
    type: String,
    enam: ["user", "admin"],
    default: "user",
  },
});

UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });

export default mongoose.model<IUser>("User", UserSchema);
