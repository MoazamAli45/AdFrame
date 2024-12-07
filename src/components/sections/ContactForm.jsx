"use client";
import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

//   CONSTANTS
const EMAILJS_SERVICEID = "service_rboyvin";
const EMAILJS_TEMPLATEID = "template_5k31x7j";
const EMAILJS_PUBLICKEY = "ZnSWMoxvcPsTZQ6bu";

const ContactForm = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(EMAILJS_SERVICEID, EMAILJS_TEMPLATEID, formRef.current, {
        publicKey: EMAILJS_PUBLICKEY,
      })
      .then(
        () => {
          console.log("Successfully Sent!");
          toast.success("Message sent successfully", {
            duration: 2000,
          });
          formRef.current.reset();
          setLoading(false);
        },
        (error) => {
          console.error("FAILED...", error);
          toast.error("Failed to send message", {
            duration: 2000,
          });
          setLoading(false);
        }
      );
  };
  return (
    <form onSubmit={submitHandler} className="space-y-8 " ref={formRef}>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Your email
        </label>
        <Input
          type="email"
          id="email"
          name="user_email"
          placeholder="Email Address"
          required
        />
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Subject
        </label>
        <Input
          type="text"
          id="subject"
          name="user_subject"
          placeholder="Let us know how we can help you"
          required
        />
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Your message
        </label>
        <Textarea
          id="message"
          rows="6"
          name="user_message"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Leave a comment..."
          required
        ></Textarea>
      </div>
      <div className="w-full flex ">
        <Button type="submit">
          {loading ? "Sending ..." : "Send message"}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
