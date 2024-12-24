export interface IUser {
  username: string;
  password: string;
}

export interface DtoUserLogin {
  username: string;
  password: string;
}

export interface DtoUserRegister {
  username: string;
  password: string;
  email: string;
  role: "user" | "admin";
}
