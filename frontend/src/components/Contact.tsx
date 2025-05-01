import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useState, useRef, FormEvent } from "react";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook

// Motion variants for animation
const variants = {
  initial: {
    y: 500,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.3,
    },
  },
};

const Contact: React.FC = () => {
  const { t } = useTranslation(); // Initialize i18n for translation functionality
  const formRef = useRef<HTMLFormElement | null>(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Send email using emailjs
  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    // Show loading state during email sending
    setSuccess(false);
    setError(false);

    emailjs
      .sendForm(
        "service_u661rul", // Correct service ID
        "template_fj2ykpb", // Correct template ID
        formRef.current,
        "DbOmQqZyWbEQq-FkC" // Correct public key
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setSuccess(true);
          setError(false);
          formRef.current?.reset(); // Reset form fields after successful submission
        },
        (error) => {
          console.error("Error sending email:", error);
          setSuccess(false);
          setError(true);
        }
      );
  };

  return (
    <motion.div
      className="formContainer flex-1 relative max-w-2xl w-full px-6 py-8 overflow-auto bg-gray-900 rounded-lg shadow-lg"
      variants={variants}
    >
      <motion.form
        onSubmit={sendEmail}
        ref={formRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="flex flex-col gap-8 bg-gray-800 p-10 rounded-lg shadow-md w-full max-w-xl"
      >
        {/* Heading */}
        <h2 className="text-2xl font-bold text-white text-center">
          {t("Help Center")}
        </h2>

        {/* Name Input */}
        <input
          type="text"
          required
          placeholder={t("Enter Your Name")}
          name="name"
          className="p-4 bg-transparent border border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email Input */}
        <input
          type="email"
          required
          placeholder={t("Enter your Email")}
          name="email"
          className="p-4 bg-transparent border border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Message Textarea */}
        <motion.textarea
          rows={6}
          placeholder={t("How can we help you? Type your message here.")}
          className="p-4 bg-transparent border border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="message"
        />

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="py-4 px-12 bg-blue-600 text-white font-semibold rounded-md transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          variants={variants}
        >
          {t("Submit")}
        </motion.button>

        {/* Success and Error Messages */}
        {error && (
          <div className="text-red-500 mt-4 text-sm text-center">
            {t("There was an error sending your message. Please try again.")}
          </div>
        )}
        {success && (
          <div className="text-green-500 mt-4 text-sm text-center">
            {t(
              "Your message has been sent successfully! We will get back to you soon."
            )}
          </div>
        )}
      </motion.form>
    </motion.div>
  );
};

export default Contact;
