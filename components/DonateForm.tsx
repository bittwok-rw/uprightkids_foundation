import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";  // Adjust path as needed


const DonateForm = ({ selectedAmount }: any) => {
  const [step, setStep] = useState<number>(1); // 1: Personal, 2: Review, 3: Payment
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<"Card" | "PayPal" | "G Pay">("Card");

  // Schema for Step 1 (Personal Details)
  const formSchemaStep1 = z.object({
    title: z.enum(["Mr", "Ms", "Mrs", "Dr", "Other"]),
    firstName: z.string().min(2, "First name is required").trim(),
    lastName: z.string().min(2, "Last name is required").trim(),
    email: z.string().email("Invalid email address").trim(),
    phoneNumber: z.string().min(10, "Phone number is too short").trim(),
    receiveNewsletter: z.boolean(),
    agreeToTerms: z.boolean().refine((val) => val, "You must agree to terms and conditions"),
  });

  // Schema for Step 3 (Payment Details)
  const formSchema = z.object({
    // Personal details schema (Step 1)
    title: z.enum(["Mr", "Ms", "Mrs", "Dr", "Other"]),
    firstName: z.string().min(2, "First name is required").trim(),
    lastName: z.string().min(2, "Last name is required").trim(),
    email: z.string().email("Invalid email address").trim(),
    phoneNumber: z.string().min(10, "Phone number is too short").trim(),
    receiveNewsletter: z.boolean(),
    agreeToTerms: z.boolean().refine((val) => val, "You must agree to terms and conditions"),

    // Payment details schema (Step 3)
    cardNumber: z.string().min(16, "Card number must be 16 digits").max(16).optional(),
    cardName: z.string().min(2, "Cardholder name is required").optional(),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry date").optional(),
    securityCode: z.string().min(3, "Security code must be 3-4 digits").max(4).optional(),
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
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      securityCode: "",
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      await axios.post('/api/donate', {
        ...values,
        amount: selectedAmount,
        paymentMethod,
      });
      toast.success("Donation submitted successfully!");
      form.reset();
    } catch (error) {
      toast.error("Failed to submit donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };





  return (
    <div className="bg-primary p-8 flex flex-col gap-4 text-white overflow-y-auto">
      {step === 1 && (
        <>
          <p className="font-bold">Please Fill your personal details</p>
          <Form {...form}>
            <form className="space-y-6">
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
              {/* Other personal fields (firstName, lastName, email, phoneNumber) */}
              {/* ... */}

              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-accent text-black border border-white px-4 py-2 rounded"
              >
                Next
              </button>
            </form>
          </Form>
        </>
      )}

      {step === 2 && (
        <>
          <p className="font-bold">Your Personal Info</p>
          <div className="bg-gray-200 text-black p-4 rounded max-h-40 overflow-y-auto mb-4">
            {/* Display personal info */}
            <p><strong>Title:</strong> {form.watch("title")}</p>
            <p><strong>First Name:</strong> {form.watch("firstName")}</p>
            <p><strong>Last Name:</strong> {form.watch("lastName")}</p>
            <p><strong>Email:</strong> {form.watch("email")}</p>
            <p><strong>Phone Number:</strong> {form.watch("phoneNumber")}</p>
          </div>
          <p className="font-bold">Selected Donation Amount: ${selectedAmount}</p>

          <button
            type="button"
            onClick={() => setStep(3)}
            className="bg-accent text-black px-4 py-2 rounded"
          >
            Donate NOW
          </button>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="bg-gray-400 text-white px-4 py-2 rounded mt-2"
          >
            Back
          </button>
        </>
      )}

      {step === 3 && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold">Donate By *</h3>
              <div className="flex gap-4">
              <div className="flex space-x-4">
        <div
          onClick={() => setPaymentMethod("PayPal")}
          className={`flex-1 flex items-center justify-center py-3 rounded-lg shadow-md cursor-pointer ${
            paymentMethod === "PayPal" 
              ? "bg-blue-600 text-white" 
              : "bg-white text-gray-700 border border-gray-300"
          }`}
        >
          <img 
            src="/images/image.png" 
            alt="PayPal" 
            className="mr-2 w-8 h-8"
          />
          PayPal
        </div>
        <div
          onClick={() => setPaymentMethod("Card")}
          className={`flex-1 flex items-center justify-center py-3 rounded-lg shadow-md cursor-pointer ${
            paymentMethod === "Card" 
              ? "bg-blue-600 text-white" 
              : "bg-white text-gray-700 border border-gray-300"
          }`}
        >
          <img 
            src="/images/download.png" 
            alt="Card" 
            className="mr-2 w-8 h-8"
          />
          Card
        </div>
      </div>
      </div>
      </div>


            {paymentMethod === "Card" && (
              <>
                <h3 className="font-bold">Donation Details</h3>
                <p className="text-sm">*Fill the required fields</p>

                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number *</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black bg-white"
                          placeholder="Enter Card Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cardholder's Name *</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black bg-white"
                          placeholder="Enter your Full Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date *</FormLabel>
                        <FormControl>
                          <Input
                            className="text-black bg-white"
                            placeholder="MM / YY"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="securityCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Security Code *</FormLabel>
                        <FormControl>
                          <Input
                            className="text-black bg-white"
                            placeholder="CVV"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Back
              </button>

              <button
                type="submit"
                className="bg-accent text-black px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit Your Donation"}
              </button>
            </div>

            <div
          onClick={() => setPaymentMethod("G Pay")}
          className={`flex-1 flex items-center justify-center py-3 rounded-lg shadow-md cursor-pointer ${
            paymentMethod === "G Pay" 
              ? "bg-blue-600 text-white" 
              : "bg-white text-gray-700 border border-gray-300"
          }`}
        >
      <img 
        src="/images/icons8-google-48.png" 
        alt="Google Pay" 
        className="w-6 h-6"
      />
      <span>G Pay</span>
    </div>

          </form>
        </Form>
      )}
    </div>
    
  );
};

export default DonateForm;
