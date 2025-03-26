import { z } from "zod";

export const phoneNumberSchema = z
  .string()
  .regex(/^(078|072|073|079)\d{7}$/, "Invalid phone number");
export const emailSchema = z
  .string()
  .email({ message: "Invalid email address." })
  .min(2, { message: "Email must be at least 2 characters." });

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .max(100, { message: "Password must not exceed 100 characters." })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter.",
  })
  .regex(/\d/, { message: "Password must contain at least one number." })
  .regex(/[@$!%*?&#]/, {
    message: "Password must contain at least one special character (@$!%*?&#).",
  });
