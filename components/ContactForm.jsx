"use client";
import { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import addMessage from "@/app/actions/addMessage";
import SubmitMessageBtn from "./SubmitMessageBtn";
const ContactForm = ({ job }) => {
  const { data: session } = useSession();
  const [state, formAction] = useActionState(addMessage, {});

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    if (state?.success) toast.success("Message sent successfully");
  }, [state.error, state.success]);

  if (state.submitted) {
    return <p className="text-green-500 mb-4">Your message has been sent</p>;
  }

  return (
    session && (
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Contact About This Job
        </h3>
        <form className="flex flex-col gap-4" action={formAction}>
          <input type="hidden" id="job" name="job" defaultValue={job._id} />
          <input
            type="hidden"
            id="recipient"
            name="recipient"
            defaultValue={job.author}
          />
          <input
            type="text"
            name="name"
            //   value={formData.name}
            //   onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <input
            type="email"
            name="email"
            //   value={formData.email}
            //   onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <textarea
            type="text"
            name="body"
            //   value={formData.message}
            //   onChange={handleChange}
            placeholder="Your Message"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            rows={4}
            required
          ></textarea>
          <SubmitMessageBtn />
        </form>
      </div>
    )
  );
};

export default ContactForm;
