import { z } from "zod";
import { emailSchema, phoneNumberSchema } from "./common";

// Create Customer Schema (required fields)
export const CustomerSchema = z.object({
	name: z.string().min(1, { message: "Name  is required" }),
	otherName: z.string().min(1, { message: "OtherName  is required" }),
	email: emailSchema,
	phoneNumber: phoneNumberSchema,
	address: z.object({
		street: z.string().min(1, { message: "Street  is required" }),
		town: z.string().min(1, { message: "Town  is required" }),
	}),
	paymentTerms: z.object({
		onOrder: z.coerce
			.number({ message: "onOrder must be a number" })
			.positive({ message: "onOrder must be positive" })
			.min(0)
			.max(100),
		production: z.coerce
			.number({ message: "production must be a number" })
			.positive({ message: "production must be positive" })
			.min(0)
			.max(100),
		beforeDelivery: z.coerce
			.number({ message: "beforeDelivery must be a number" })
			.positive({ message: "beforeDelivery must be positive" })
			.min(0)
			.max(100),
		afterDelivery: z.coerce
			.number({ message: "afterDelivery must be a number" })
			.positive({ message: "afterDelivery must be positive" })
			.min(0)
			.max(100),
		onRequest: z.coerce
			.number({ message: "onRequest must be a number" })
			.positive({ message: "onRequest must be positive" })
			.min(0)
			.max(100),
		discount: z.coerce
			.number({ message: "discount must be a number" })
			.positive({ message: "discount must be positive" })
			.min(0)
			.max(100),
	}),
});

export type CustomerSchema = z.infer<typeof CustomerSchema>;

export type TCustomer = z.infer<typeof CustomerSchema>;

export interface ICustomerUpdate {
	id: string;
	data: TCustomer;
}
