/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Textarea } from "./ui/textarea";

const VolunteerForm = () => {
  const [step, setStep] = useState<number>(1); // Track the current step
  const [loading, setLoading] = useState<boolean>(false);

  // Schema for Step 1 (Personal Details)
  const formSchema = z.object({
    firstName: z.string().min(2, "First name is required").trim(),
    lastName: z.string().min(2, "Last name is required").trim(),
    email: z.string().email("Invalid email address").trim(),
    phoneNumber: z.string().min(10, "Phone number is too short").trim(),
    message: z.string().optional(),
  });

  // Combine both schemas for final submission

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await axios.post(`/api/volunteer`, values);
      toast.success("Form submitted successfully!");
      form.reset();
    } catch (error) {
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 flex flex-col gap-4 text-black overflow-y-auto">
      <h2 className="font-bold">Join as a volunteer</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <>
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                      rows={4}
                        className="text-black bg-white"
                        placeholder="Enter your Message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-accent text-black px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Send Message"}
              </button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default VolunteerForm;
