import Lottie from "lottie-react";
import emailLottie from "../../../assets/Lottify/Email.json";
import emailjs from "@emailjs/browser"; // ✅ Correct Import
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";

const Contact = () => {
  const form = useRef();

  useEffect(() => {
    document.title = "Food Link | Contact";
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_poi9mb2",
        "template_5qjyxhg",
        form.current,
        "HOOv23gvgWuoj_vpZ"
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          toast.success("Your message has been sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error("Error sending email:", error.text);
          toast.error("Failed to send the message. Please try again.");
        }
      );
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <DynamicTitle title="Contact" />
          <p className="text-lg ">Feel free to reach out to me anytime.</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <Lottie animationData={emailLottie} className="w-1/2 mx-auto" />
          </div>
          <div className="w-full md:w-1/2 backdrop-blur-lg ">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="border text-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 ">
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent "
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 ">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent "
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 ">
                  Message
                </label>
                <textarea
                  name="message"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 bg-transparent "
                  placeholder="Write your message"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full border hover:bg-white/20 hover:shadow-lg hover:shadow-cyan-600  py-2 px-4 rounded-md transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
