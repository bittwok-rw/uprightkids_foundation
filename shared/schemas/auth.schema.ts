import { z } from "zod";
import { emailSchema, passwordSchema } from "./common";

export const LoginSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export const changePasswordSchema = z
	.object({
		newPassword: passwordSchema,
		confirmPassword: passwordSchema,
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Confirmation password must match the new password",
		path: ["confirmPassword"],
	});

export type ChangePasswordSchemaFields = keyof z.infer<
	typeof changePasswordSchema
>;

export const ForgotPasswordSchema = z.object({
	email: emailSchema,
});
export const ResetPasswordSchema = z
	.object({
		newPassword: passwordSchema,
		confirmPassword: passwordSchema,
	})
	.superRefine((data, ctx) => {
		if (data.newPassword !== data.confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Passwords don't match",
				path: ["confirmPassword"],
			});
		}
	});
