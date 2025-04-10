/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox"; // Adjust path as needed
import { Button } from "./ui/button";
import Image from "next/image";

const DonateForm = ({ selectedAmount }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<"PayPal">("PayPal");

  // Schema for Personal Details
  const formSchema = z.object({
    title: z.enum(["Mr", "Ms", "Mrs", "Dr", "Other"]),
    firstName: z.string().min(2, "First name is required").trim(),
    lastName: z.string().min(2, "Last name is required").trim(),
    email: z.string().email("Invalid email address").trim(),
    phoneNumber: z.string().min(10, "Phone number is too short").trim(),
    receiveNewsletter: z.boolean(),
    agreeToTerms: z
      .boolean()
      .refine((val) => val, "You must agree to terms and conditions"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "Mr",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      receiveNewsletter: false,
      agreeToTerms: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: `${values.firstName} ${values.lastName} - Donation`,
                },
                unit_amount: selectedAmount * 100,
              },
              quantity: 1,
            },
          ],
        }),
      });

      const { id, approvalUrl } = await response.json();

      // Save donation details to your database
      await axios.post("/api/donate", {
        ...values,
        amount: selectedAmount,
        paymentMethod,
        paypalOrderId: id
      });

      // Redirect to PayPal for payment
      window.location.href = approvalUrl;
      
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className="bg-primary p-8 flex flex-col gap-4 text-white overflow-y-auto">
        <p className="font-bold">Please Fill your personal details</p>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Personal details fields */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-1/4">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="border p-2 rounded bg-white text-black w-full"
                  >
                    <option value="Mr">Mr</option>
                    <option value="Ms">Ms</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Dr">Dr</option>
                    <option value="Other">Other</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-black bg-white"
                    placeholder="Enter your first name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-black bg-white"
                    placeholder="Enter your last name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-black bg-white"
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    className="text-black bg-white"
                    type="tel"
                    placeholder="Enter your phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="receiveNewsletter"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="text-black"
                  />
                </FormControl>
                <FormLabel>Receive newsletter</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="text-black"
                  />
                </FormControl>
                <FormLabel>Agree to terms and conditions</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

        <div className="flex items-center justify-center py-2">
       <Image src="/images/paypallogo.jpeg" alt="PayPal" className="h-12 w-32" />
       </div>


          <Button
            type="submit"
            disabled={loading}
            className="bg-accent hover:bg-accent/90 text-black px-4 py-2 rounded w-full"
          >
            {loading ? "Processing..." : "Donate via PayPal"}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default DonateForm;