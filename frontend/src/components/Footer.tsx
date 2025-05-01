import { useState, useRef } from "react";
import InfoModal from "./InfoModal"; // Ensure the path is correct
import { motion } from "framer-motion"; // Import motion for animations
import Contact from "./Contact";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

// Import PrivacyPolicy and TermsOfService
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

const Footer = () => {
  const { t } = useTranslation(); // Initialize i18n for translation functionality
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [modalContent, setModalContent] = useState<string>(""); // Track which content to show

  const ref = useRef<HTMLDivElement | null>(null); // Ref for motion.div

  // Variants for motion animations
  const variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Function to open the modal and set the content based on the link clicked
  const openModal = (content: string) => {
    setModalContent(content); // Set the content to display in the modal
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="bg-blue-900 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          Sheresher
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <p
            className="cursor-pointer"
            onClick={() => openModal("privacyPolicy")}
          >
            {t("privacyPolicy")}
          </p>
          <p
            className="cursor-pointer"
            onClick={() => openModal("termsOfService")}
          >
            {t("termsOfService")}
          </p>
          <p className="cursor-pointer" onClick={() => openModal("helpcenter")}>
            {t("helpCenter")}
          </p>
          <p className="cursor-pointer" onClick={() => openModal("contactus")}>
            {t("contactUs")}
          </p>
        </span>
      </div>

      {/* InfoModal component that is shown when a link is clicked */}
      <InfoModal isOpen={isModalOpen} onClose={closeModal}>
        {/* Render the appropriate content based on the link clicked */}
        {modalContent === "privacyPolicy" && <PrivacyPolicy />}
        {modalContent === "termsOfService" && <TermsOfService />}
        {modalContent === "helpcenter" && <Contact />}
        {modalContent === "contactus" && (
          <motion.div
            ref={ref}
            className="contact flex items-center gap-12 mx-auto max-w-screen-xl"
            variants={variants}
            initial="initial"
            whileInView="animate"
          >
            <motion.div
              className="textContainer flex-1 flex flex-col gap-10"
              variants={variants}
            >
              <motion.h1
                variants={variants}
                className="text-5xl font-extrabold text-gray-900 tracking-tight md:text-4xl"
              >
                {t("contactUs")}
              </motion.h1>
              <motion.p
                variants={variants}
                className="text-lg font-light text-gray-900 max-w-md"
              >
                {t(
                  "We are here to assist you! If you have any questions, concerns, or feedback, feel free to reach out to us through email, phone, or by visiting us at our office. Our team will respond as soon as possible. We look forward to hearing from you!"
                )}
              </motion.p>
              <motion.div
                className="contactItem flex flex-col gap-2"
                variants={variants}
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {t("email")}
                </h2>
                <p className="text-base font-light text-gray-900">
                  muduzafeuu25@gmail.com
                </p>
              </motion.div>

              <motion.div
                className="contactItem flex flex-col gap-2"
                variants={variants}
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {t("address")}
                </h2>
                <p className="text-base font-light text-gray-900">
                  123 Travel Street, Addis Ababa, Ethiopia
                </p>
              </motion.div>

              <motion.div
                className="contactItem flex flex-col gap-2"
                variants={variants}
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {t("phone")}
                </h2>
                <p className="text-base font-light text-gray-900">
                  +25912345678
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </InfoModal>
    </div>
  );
};

export default Footer;
