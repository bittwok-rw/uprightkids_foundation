// import NextAuth from "next-auth";
import type { IUser } from "./index";

declare module "next-auth" {
  interface User extends IUser {
    id: string;
    email: string;
    name: string;
    role: string;
  }

  interface Session {
    user: User;
    expires: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {
    id: string;
    email: string;
    name: string;
    role: string;
  }
}
