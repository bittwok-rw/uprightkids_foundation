import { ArrowRight, CircleX } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
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
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Modal from "react-modal";
import FAQSection from "@/components/FAQSection";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import VolunteerForm from "@/components/VolunteerForm";

const customStyles = {
  overlay: {
    zIndex: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "#000",
    maxWidth: "80vw",
    maxHeight: "80vh",
    width: "100%",
    height: "auto",
    zIndex: 9999,
    padding: 0,
    overflow: "hidden",
  },
};

type MediaItem = {
  image: string[];
  title: string;
  date?: string;
  slug: string;
};

const formSchema = z.object({
  names: z.string().min(5).trim(),
  email: z.string().email().min(5).trim(),
  company: z.string().optional(),
  message: z.string().min(5).trim(),
});

const Contact = () => {
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenPayment, setIsOpenPayment] = useState(false);
  const [modalIsOpenDonate, setIsOpenDonate] = useState(false);
  const [mediaData, setMediaData] = useState<MediaItem[]>([]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const closeModalDonate = () => setIsOpenDonate(false);
  const openModalPayment = () => setIsOpenPayment(true);
  const closeModalPayment = () => setIsOpenPayment(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      names: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    axios
      .get("/api/media")
      .then((response) => {
        setMediaData(response.data as MediaItem[]);
      })
      .catch((error) => {
        console.error("Error fetching media:", error);
      });
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await axios.post(`/api/interest`, {
        ...values,
      });
      toast.success("Form data submitted successfully!");
      form.reset();
      openModal();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
        toast.error(error.response.data);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const displayedMedia = showAll ? mediaData : mediaData.slice(0, 4);

  return (
    <div>
      <div className="w-full flex min-h-[60vh] py-8 justify-start bg-[#E5EBF8] overflow-hidden items-center">
        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 w-[80%] gap-16 place-content-center">
            <div className="font-bold rounded justify-between items-center capitalize text-primary text-lg">
              <div className="flex items-start py-4">
                <div className="w-[72px] md:mr-2 my-4 border-t-2 border-primary"></div>
                <div>
                  <h3 className="text-primary text-[20px] font-semibold">CONTACT US</h3>
                  <div className="my-4 flex flex-col gap-8">
                    <h2 className="text-5xl leading-[3.5rem]">GET IN TOUCH WITH UPRIGHT KIDS FOUNDATION</h2>
                    <p className="text-black">
                      We'd love to hear from you! Whether you're interested in learning more about our programs, partnering with us, or exploring ways to support our mission. Please reach out to us with any questions via the following means:
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-black p-4 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <p className="font-bold text-2xl">Contact</p>
                <Link href={"mailto:info@uprightkidsfoundation.org"}>info@uprightkidsfoundation.org</Link>
                <Link href={"tel:+243991170888"}>+243 991170888</Link>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-bold text-2xl">Head Office</p>
                <Link href={""}>204, Avenue Emery Patrice Lumumba, Bukavu, DRC</Link>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-bold text-2xl">Branch Office</p>
                <Link href={""}>Belgium, Dagwandstraat 9</Link>
                <div className="flex gap-4 items-center">
                  <Link href={"https://www.facebook.com/profile.php?id=100064576157507"}>
                    <FaFacebook size={30} />
                  </Link>
                  <Link href={"https://www.instagram.com/upright_kids_foundation/"}>
                    <FaInstagram size={30} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-primary w-[90%] grid md:grid-cols-2 gap-8">
          <div className="p-8 md:w-3/4 flex flex-col gap-8">
            <h2 className="text-white">How can we help?</h2>
            <p className="text-white/90">Reach out to us via the following means:</p>
            <div className="flex flex-col gap-4">
              <div onClick={openModal} className="bg-[#0E2D58] cursor-pointer hover:scale-110 p-4 gap-4 flex justify-center">
                <p className="text-white font-bold">Frequently Asked Questions</p>
                <ArrowRight />
              </div>
              <div className="bg-[#0E2D58] cursor-pointer hover:scale-110 p-4 gap-4 flex justify-center">
                <p className="text-white font-bold">Message us on Instagram</p>
                <ArrowRight />
              </div>
              <div onClick={() => { window.location.href = `/donation#donate`; }} className="bg-[#0E2D58] cursor-pointer hover:scale-110 p-4 gap-4 flex justify-center">
                <p className="text-white font-bold">Donate Today</p>
                <ArrowRight />
              </div>
              <div onClick={openModalPayment} className="bg-[#0E2D58] cursor-pointer hover:scale-110 p-4 gap-4 flex justify-center">
                <p className="text-white font-bold">Become Volunteer / Advocate</p>
                <ArrowRight />
              </div>
            </div>
          </div>
          <div className="p-6 bg-[#0E2D58]">
            <h2 className="text-white">Contact Us</h2>
            <Form {...form}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="names"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name <span className="text-accent">*</span></FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="John Doe" className="p-4 rounded-md bg-white text-black placeholder:text-black/80 border border-secondary/20" {...field} />
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
                      <FormLabel>Email <span className="text-accent">*</span></FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="someone@example.com" className="p-4 rounded-md bg-white text-black placeholder:text-black/80 border border-secondary/20" {...field} />
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
                      <FormLabel className="w-full">Messages <span className="text-accent">*</span></FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your Message" {...field} rows={5} className="p-4 rounded-md bg-white text-black placeholder:text-black/80 border border-secondary/20" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center xl:col-span-3">
                  <Button onClick={form.handleSubmit(onSubmit)} disabled={loading} className="mr-2 bg-accent text-black">
                    {loading ? "Submitting..." : "Send your inquiry"} <ArrowRight size={20} />
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center py-16">
        <div className="flex flex-col gap-8 w-[90%] items-center">
          <h2 className="text-2xl font-bold">Latest Stories</h2>
          <div className="grid md:grid-cols-4 gap-12 w-full">
            {displayedMedia.map((item, index) => (
              <div key={index} className="w-full bg-[#E5EBF8] text-black flex flex-col pb-4 gap-4">
                <div className="w-full relative h-[30vh]">
                  <Image src={item.image[0]} alt={item.title} className="w-full h-full object-cover rounded-md" fill style={{ objectFit: "cover" }} />
                  <div className="bg-accent absolute top-0 left-0 z-10 px-2 py-1 text-black font-bold">{item.date || "No Date"}</div>
                </div>
                <p className="px-2 text-lg font-semibold">{item.title}</p>
                <Button onClick={() => { window.location.href = `/media/${item.slug}`; }} className="mx-4 bg-white hover:scale-105 text-black text-sm" variant={"outline"}>
                  Read More
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={() => setShowAll(!showAll)}>{showAll ? "Show Less" : "Read All Stories"}</Button>
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Modal" bodyOpenClassName="modal-open" style={customStyles}>
        <>
          <FAQSection />
          <button onClick={closeModal} className="absolute top-2 right-2 text-white p-2 rounded-full bg-transparent hover:bg-gray-600 transition duration-200">
            <CircleX />
          </button>
        </>
      </Modal>

      <Modal isOpen={modalIsOpenDonate} onRequestClose={closeModalDonate} contentLabel="Modal" bodyOpenClassName="modal-open" style={customStyles}>
        <>
          <FAQSection />
          <button onClick={closeModalDonate} className="absolute top-2 right-2 text-white p-2 rounded-full bg-transparent hover:bg-gray-600 transition duration-200">
            <CircleX />
          </button>
        </>
      </Modal>

      <Modal isOpen={modalIsOpenPayment} onRequestClose={closeModalPayment} contentLabel="Modal" bodyOpenClassName="modal-open" style={customStyles}>
        <>
          <VolunteerForm />
          <button onClick={closeModalPayment} className="absolute top-2 right-2 text-primary p-2 rounded-full bg-transparent hover:bg-gray-600 transition duration-200">
            <CircleX />
          </button>
        </>
      </Modal>
    </div>
  );
};

export default Contact;