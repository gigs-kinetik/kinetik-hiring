"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagram, FaQuoteLeft } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { RotatingShadow } from "../../components/RotatingShadow";

const PurpleCirclesBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const circlePositions = [
    { x: "0%", y: "10vh", scrollSpeed: -0.05, size: "600px" },
    { x: "40%", y: "40vh", scrollSpeed: -0.05, size: "700px" },
    { x: "85%", y: "30vh", scrollSpeed: -0.05, size: "600px" },
    { x: "-25%", y: "80vh", scrollSpeed: -0.05, size: "500px" },
    { x: "-5%", y: "180vh", scrollSpeed: -0.05, size: "500px" },
    { x: "5%", y: "110vh", scrollSpeed: -0.05, size: "450px" },
    { x: "80%", y: "130vh", scrollSpeed: -0.05, size: "650px" },
    // { x: "10%", y: "240vh", scrollSpeed: -0.05, size: "450px" },
    // { x: "-15%", y: "300vh", scrollSpeed: -0.05, size: "420px" },
    { x: "50%", y: "220vh", scrollSpeed: -0.05, size: "440px" },
    { x: "90%", y: "280vh", scrollSpeed: -0.05, size: "410px" },
    { x: "-5%", y: "280vh", scrollSpeed: -0.05, size: "780px" },
    // { x: "70%", y: "370vh", scrollSpeed: -0.05, size: "420px" },
    { x: "-20%", y: "400vh", scrollSpeed: -0.05, size: "500px" },
    { x: "45%", y: "430vh", scrollSpeed: -0.05, size: "450px" },
    // { x: "80%", y: "470vh", scrollSpeed: -0.05, size: "500px" },
    { x: "-10%", y: "520vh", scrollSpeed: -0.05, size: "460px" },
    // { x: "60%", y: "540vh", scrollSpeed: -0.05, size: "420px" },
    { x: "20%", y: "580vh", scrollSpeed: -0.05, size: "600px" },
    // { x: "90%", y: "600vh", scrollSpeed: -0.05, size: "500px" },
    // { x: "-25%", y: "650vh", scrollSpeed: -0.05, size: "420px" },
    { x: "10%", y: "680vh", scrollSpeed: -0.05, size: "460px" },
    { x: "60%", y: "730vh", scrollSpeed: -0.05, size: "450px" },
    { x: "50%", y: "810vh", scrollSpeed: -0.05, size: "480px" },
    { x: "5%", y: "780vh", scrollSpeed: -0.05, size: "540px" },
    // { x: "-15%", y: "860vh", scrollSpeed: -0.05, size: "600px" },
    // { x: "70%", y: "880vh", scrollSpeed: -0.05, size: "500px" },
    // { x: "-5%", y: "900vh", scrollSpeed: -0.05, size: "500px" },
    // { x: "90%", y: "940vh", scrollSpeed: -0.05, size: "420px" },
    // { x: "10%", y: "980vh", scrollSpeed: -0.05, size: "470px" },
    // { x: "70%", y: "1000vh", scrollSpeed: -0.05, size: "570px" },
    // { x: "30%", y: "1020vh", scrollSpeed: -0.05, size: "420px" },
    // { x: "50%", y: "1060vh", scrollSpeed: -0.05, size: "470px" },
    // { x: "10%", y: "1100vh", scrollSpeed: -0.05, size: "570px" },
  ];

  return (
    <div className="absolute w-full min-h-screen inset-0 overflow-hidden pointer-events-none z-[-1]">
      {circlePositions.map((pos, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: index * 0.2 }}
          className="absolute blur-lg"
          style={{
            left: pos.x,
            top: `calc(${pos.y} - ${scrollY * Math.abs(pos.scrollSpeed)}px)`,
            width: pos.size,
            height: pos.size,
            background: `radial-gradient(
              circle,
              rgba(73, 36, 125, ${index === 2 ? 0.5 : 0.4}) 10%,
              rgba(73, 36, 125, 0.1) 45%,
              rgba(255, 255, 255, 0) 70%
            )`,
            transform: "translate(-50%, -50%)",
            willChange: "transform, top",
            overflow: "hidden",
          }}
        />
      ))}
      <div
        className="absolute bottom-0 left-0 w-full h-64 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
        }}
      />
    </div>
  );
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerChildrenVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const timelineData = [
  {
    title: "Optimized Hiring",
    description:
      "Spend less time hiring and crowdsource your efforts to get matched with top talent.",
    image: "/hiring.png",
    bulletPoints: [
      "Host a company and project-relevant challenge on our platform",
      "Crowdsource multiple high-quality MVP iterations",
      "Employ Kinetik AI to evaluate your submissions",
    ],
  },
  {
    title: "Streamlined Onboarding",
    description:
      "Effortlessly onboard your developers with tailored workflows and integrations.",
    image: "/onboarding.png",
    bulletPoints: [
      "Ensure your developers are comfortable building the project",
      "Utilize Kinetik AI to guide developers through the dev process",
      "Manage your developers in an easy and accessible way",
    ],
  },
  {
    title: "Legal Compliance",
    description:
      "Safeguard your work with automated compliance and regulations.",
    image: "/legal.png",
    bulletPoints: [
      "Automate legal documents and contracts via Kinetik",
      "Ensure developers are compliant with your policies",
      "Let Kinetik handle your gig-related paperwork",
    ],
  },
  {
    title: "Automated Payments",
    description:
      "Securely streamline your payments and let us handle the scheduled distribution.",
    image: "/payments.png",
    bulletPoints: [
      "Schedule auto-payments to developers through Kinetik",
      "Use Kinetik AI to determine the most optimal payment strategy",
      "Work via an escrow so your money is properly delivered",
    ],
  },
  {
    title: "Personalized Management",
    description:
      "Employ an AI-powered product manager to provide insights to yours ideas and code.",
    image: "/pm.png",
    bulletPoints: [
      "Produce insights and understand your code with Kinetik AI",
      "Automate the PM process from checkpoints to deployments",
      "Minimize the project input and maximize the project output",
    ],
  },
  {
    title: "Quality Assurance",
    description:
      "Enhance quality assurance and ensure your product meets the highest standards.",
    image: "/testing.png",
    bulletPoints: [
      "Deploy Kinetik AI to provide real-time testing on your code",
      "Revise your code and ask developers to revisit certain features",
      "Deploy a market-ready, scalable product in little to no time",
    ],
  },
];

const ModalForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userType, setUserType] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
      document.body.classList.add("overflow-hidden");
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  const handleCheckboxChange = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form behavior
    console.log("User Type:", userType); // Log or use user type
    console.log("Selected Interests:", selectedInterests); // Log or use selected interests
    closeModal(); // Close the modal after form submission
  };

  return (
    isModalOpen && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        {/* Modal Content */}
        <div className="bg-white rounded-md shadow-3xl p-6 sm:p-10 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-logo-purple">
              Welcome to Kinetik!
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Help us tailor your experience by answering a few quick questions.
          </p>
          <form onSubmit={handleFormSubmit}>
            {/* Multiple Choice */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Are you a...
              </label>
              <div className="flex items-center space-x-4 mb-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="userType"
                    value="company"
                    checked={userType === "company"}
                    onChange={(e) => setUserType(e.target.value)}
                    className="mr-2 focus:ring-logo-purple text-logo-purple"
                  />
                  Company
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="userType"
                    value="developer"
                    checked={userType === "developer"}
                    onChange={(e) => setUserType(e.target.value)}
                    className="mr-2 focus:ring-logo-purple text-logo-purple"
                  />
                  Developer
                </label>
              </div>
            </div>

            {/* Checkbox List */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                What are you interested in? (Select all that apply)
              </label>
              <div className="flex flex-col space-y-2">
                {[
                  { label: "Crowdsourced Hiring", value: 0 },
                  { label: "Streamlined Onboarding", value: 1 },
                  { label: "Legal Compliance", value: 2 },
                  { label: "Automated Payments", value: 3 },
                  { label: "Personalized Management", value: 4 },
                  { label: "Quality Assurance", value: 5 },
                ].map((item, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      value={item.value}
                      checked={selectedInterests.includes(item.value)}
                      onChange={() => handleCheckboxChange(item.value)}
                      className="mr-2 text-logo-purple focus:ring-logo-purple"
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-logo-purple text-white py-2 px-4 rounded-lg hover:bg-logo-purple/90 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [lineHeight, setLineHeight] = useState(0);

  const calculateLineFill = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const timelineHeight = document.getElementById("timeline").offsetHeight;
    const offsetTop = document.getElementById("timeline").offsetTop;

    const progress = Math.max(
      0,
      Math.min(
        1,
        (scrollTop + windowHeight - offsetTop) / (timelineHeight + windowHeight)
      )
    );

    setLineHeight(progress * 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", calculateLineFill);
    return () => window.removeEventListener("scroll", calculateLineFill);
  }, []);

  return (
    <div className="relative font-poppins h-full flex flex-col px-6 lg:px-20">
      <PurpleCirclesBackground />
      <ModalForm />

      {/* Navbar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center px-6 lg:px-20 pb-4 pt-6 backdrop-blur-md bg-off-white/30 fixed top-0 left-0 w-full z-40 shadow-md"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-logo-purple flex-shrink-0"
        >
          <img
            className="w-28 md:w-32 lg:w-36"
            src="/name.png"
            alt="Company Logo"
          />
        </motion.div>

        <motion.div
          variants={staggerChildrenVariants}
          initial="hidden"
          animate="visible"
          className="flex space-x-6 md:space-x-10 font-semibold text-logo-purple text-sm md:text-base"
        >
          {["Log In", "Sign Up"].map((text, index) => (
            <motion.div key={text} variants={fadeInUpVariants}>
              <Link
                href={text === "Log In" ? "/login" : "/signup"}
                className="group relative transition-all duration-500"
              >
                {text}
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-1 rounded-xl bg-logo-purple absolute left-0 bottom-0"></span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Landing Content */}
      <motion.div
        className="flex flex-col pt-2 h-full z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="flex flex-col items-center justify-start pt-6">
          <motion.div
            className="flex flex-col items-center text-center space-y-6"
            variants={staggerChildrenVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeInUpVariants}
              className="md:text-6xl text-3xl font-bold text-logo-purple"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="px-3 py-1 mt-28 text-logo-purple text-xs font-medium rounded-full border-black border-2 bg-gray-950/5 text-center max-w-40 mx-auto"
              >
                Supercharged with AI
              </motion.div>
              <motion.div variants={fadeInUpVariants} className="flex flex-row">
                <div className="md:text-6xl text-3xl font-semibold text-logo-purple pt-8">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    Automate Your Complete
                  </motion.span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="text-purple-900"
                  >
                    Gig Workflow.
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              variants={fadeInUpVariants}
              className="flex md:text-xl text-md font-normal text-logo-purple/70"
            >
              Kinetik manages the end-to-end technical gig process.
            </motion.div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex justify-center space-x-6 mt-24"
            variants={staggerChildrenVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                text: "Chat With Us",
                href: "https://calendly.com/kinetikgigs/chat-with-kinetik",
                className:
                  "px-4 py-2 text-white font-medium rounded-md bg-purple-900 hover:scale-105 transition-transform",
              },
              {
                text: "Join the Waitlist",
                href: "https://forms.gle/CpDq4VtVB4CyV2BL8",
                className:
                  "px-4 py-2 text-logo-purple font-medium border-2 border-logo-purple rounded-md hover:scale-105 transition-transform",
              },
            ].map((button, index) => (
              <motion.a
                key={button.text}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                className={button.className}
                variants={fadeInUpVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {button.text}
              </motion.a>
            ))}
          </motion.div>

          {/* Backed By Section */}
          <motion.div
            className="flex flex-col items-center space-y-2 mt-28"
            variants={fadeInUpVariants}
          >
            <motion.div
              className="md:text-lg text-md font-medium text-logo-purple"
              variants={fadeInUpVariants}
            >
              Backed By
            </motion.div>
            <motion.div
              className="flex space-x-8"
              variants={staggerChildrenVariants}
            >
              {["met-logo.png", "aieb-logo.png", "msft-logo.png"].map(
                (logo, index) => (
                  <motion.img
                    key={logo}
                    src={`/${logo}`}
                    alt={`Company Logo ${index + 1}`}
                    className="h-10 sm:h-12 md:h-16 object-contain"
                    variants={fadeInUpVariants}
                    whileHover={{ scale: 1.1 }}
                  />
                )
              )}
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-logo-purple text-3xl mt-52 font-semibold text-center"
          >
            Ship At Lightning Speeds
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-logo-purple/80 mb-10 text-xl font-light text-center"
          >
            Operate more efficiently, and focus on your business operations.
          </motion.div>

          <motion.div
            className="flex flex-col items-center space-y-10 sm:space-y-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerChildrenVariants}
          >
            <motion.div
              className="flex flex-col items-center space-y-8"
              variants={fadeInUpVariants}
            >
              <div className="flex flex-wrap justify-center gap-8 sm:space-x-16">
                {[
                  { value: "500+", label: "Hours of Tech Dev Saved" },
                  { value: "50x", label: "Faster Development" },
                  { value: "100%", label: "Satisfaction Guarantee" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center text-logo-purple"
                    variants={fadeInUpVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl md:text-4xl font-semibold">
                      {stat.value}
                    </div>
                    <div className="text-md md:text-lg text-logo-purple/70 text-center">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Main Intro */}
        <div className="mt-52 w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-logo-purple text-3xl font-semibold text-center"
          >
            Optimize Your Technical Dev
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-logo-purple/80 mb-10 text-xl font-light text-center"
          >
            Forget the hassle of technical development, leave it to us.
          </motion.div>

          {/* Cards Container */}
          <div className="flex flex-wrap justify-center items-center gap-8 w-full max-w-5xl mx-auto px-4">
            {/* Card 1 */}
            <div className="hover:shadow-5xl hover:rounded-xl hover:scale-105 transition-all duration-300 w-full sm:w-[48%]">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="bg-white/10 h-96 rounded-xl shadow-3xl transition-all duration-300 ease-in-out transform flex flex-col relative"
              >
                {/* Step Badge */}
                <div className="absolute top-3 left-3 bg-logo-purple text-white text-sm font-semibold py-1 px-3 rounded-full shadow">
                  Step 1
                </div>

                {/* Image Section */}
                <div className="flex items-center justify-center bg-white/20 rounded-t-xl h-2/3 overflow-hidden">
                  <img
                    src="/crowdsource.png"
                    alt="Kinetik's AI Challenge"
                    className="object-cover h-full"
                  />
                </div>

                {/* Text Section */}
                <div className="p-6 bg-white/20 rounded-b-xl flex-grow">
                  <div className="text-logo-purple text-xl font-semibold mb-2">
                    Crowdsourced Hiring
                  </div>
                  <p className="text-logo-purple/80 text-sm">
                    Collect numerous MVP iterations and find top talent by
                    hosting company-related challenges on our platform.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Card 2 */}
            <div className="hover:shadow-5xl hover:rounded-xl hover:scale-105 transition-all duration-300 w-full sm:w-[48%]">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="bg-white/10 h-96 rounded-xl shadow-3xl transition-all duration-300 ease-in-out transform flex flex-col relative"
              >
                {/* Step Badge */}
                <div className="absolute top-3 left-3 bg-logo-purple text-white text-sm font-semibold py-1 px-3 rounded-full shadow">
                  Step 2
                </div>

                {/* Image Section */}
                <div className="flex items-center justify-center bg-white/20 rounded-t-xl h-2/3 overflow-hidden">
                  <img
                    src="/process.png"
                    alt="Kinetik's AI Challenge"
                    className="object-cover h-full"
                  />
                </div>

                {/* Text Section */}
                <div className="p-6 bg-white/20 rounded-b-xl flex-grow">
                  <div className="text-logo-purple text-xl font-semibold mb-2">
                    Gig Development
                  </div>
                  <p className="text-logo-purple/80 text-sm">
                    Employ our suite of AI-powered tools to manage your gig and
                    see your product come to fruition.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mt-52 w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-logo-purple text-3xl md:text-4xl font-semibold text-left"
          >
            How Kinetik Works
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-logo-purple/80 text-lg md:text-xl font-light text-left"
          >
            Go from idea to product in no time.
          </motion.div>

          <div
            id="timeline"
            className="relative w-full min-h-screen pt-10 text-white"
          >
            {/* Timeline Line */}
            <div className="absolute transform -translate-x-1/2 h-full w-1 bg-purple-900/20">
              <motion.div
                style={{ height: `${lineHeight}%` }}
                className="absolute left-0 top-0 w-full bg-purple-900"
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Timeline Items */}
            <div className="flex flex-col ml-5 md:ml-10">
              {timelineData.map((item, index) => {
                const [ref, inView] = useInView({
                  triggerOnce: true,
                  threshold: 0.3,
                });

                return (
                  <motion.div
                    key={index}
                    ref={ref}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.2 }}
                    className="relative flex flex-col md:flex-row mt-8"
                  >
                    {/* Content Card */}
                    <motion.div
                      className="relative rounded-xl shadow-xl pr-6 md:pr-10 pt-4 md:pt-6 w-full md:w-2/3"
                      initial={{ opacity: 0, x: -50 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-logo-purple">
                        {item.title}
                      </h3>
                      <p className="text-logo-purple/80 text-base md:text-xl font-light mb-4">
                        {item.description}
                      </p>

                      {/* Bullet Points */}
                      <ul className="list-disc pl-6 md:pl-10 pb-10 text-logo-purple/80 font-light text-sm md:text-xl">
                        {item.bulletPoints.map((point, bulletIndex) => (
                          <li key={bulletIndex}>{point}</li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Image */}
                    <RotatingShadow
                      shadowBlur={40}
                      shadowColor={"rgb(86, 65, 135)"}
                      shadowSpread={0}
                      radius={10}
                      borderRadius={10}
                    >
                      <div className="relative h-48 md:h-96 rounded-lg overflow-hidden shadow-lg group hover:scale-105">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </RotatingShadow>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-52 w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-logo-purple text-3xl font-semibold text-center"
          >
            Why We Are The Best
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-logo-purple/80 mb-10 text-xl font-light text-center"
          >
            See what our customers have to say.
          </motion.div>
          <div className="flex flex-col lg:flex-row justify-center items-center space-y-16 lg:space-y-0 lg:space-x-8 p-4 lg:p-8">
            {/* Card 1 */}
            <div className="hover:scale-105">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative flex flex-col justify-between shadow-3xl p-6 lg:p-8 w-full max-w-[28rem] lg:max-w-[40rem] bg-white/10 rounded-xl h-auto"
              >
                {/* Quote Icon */}
                <div className="flex items-center mb-4">
                  <FaQuoteLeft className="text-logo-purple/30 text-xl" />
                </div>
                {/* Quote Content */}
                <div className="text-center text-gray-700 text-sm">
                  As a solo founder with limited time, I needed my MVP done over
                  a single weekend. Kinetik helped me write a project scope and
                  connected me with high-quality talent to execute and manage it
                  efficiently!
                </div>
                {/* Author Info */}
                <div className="text-center mt-4">
                  <div className="font-semibold text-logo-purple">
                    Albert Zheng
                  </div>
                  <div className="text-sm text-gray-500">Founder, CEO</div>
                </div>
                {/* Company Logo */}
                <div className="flex justify-center mt-8">
                  <img
                    src="/skywaze-logo.png"
                    alt="Company Logo"
                    className="h-12 w-auto"
                  />
                </div>
              </motion.div>
            </div>

            {/* Card 2 */}
            <div className="hover:scale-105">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative flex flex-col justify-between shadow-3xl p-6 lg:p-8 w-full max-w-[28rem] lg:max-w-[40rem] bg-white/10 rounded-xl h-auto"
              >
                {/* Quote Icon */}
                <div className="flex items-center mb-4">
                  <FaQuoteLeft className="text-logo-purple/30 text-xl" />
                </div>
                {/* Quote Content */}
                <div className="text-center text-gray-700 text-sm">
                  Kinetik's facilitation of communication was excellent. They
                  really served as a strong intermediary. Loved the experience
                  and highly recommend Kinetik for anyone trying to hire and
                  build quickly.
                </div>
                {/* Author Info */}
                <div className="text-center mt-4">
                  <div className="font-semibold text-logo-purple">
                    Benny Johnson
                  </div>
                  <div className="text-sm text-gray-500">CTO</div>
                </div>
                {/* Company Logo */}
                <div className="flex justify-center mt-8">
                  <img
                    src="/sonicbids-logo.png"
                    alt="Company Logo"
                    className="h-12 w-auto"
                  />
                </div>
              </motion.div>
            </div>

            {/* Card 3 */}
            <div className="hover:scale-105">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative flex flex-col justify-between shadow-3xl p-6 lg:p-8 w-full max-w-[28rem] lg:max-w-[40rem] bg-white/10 rounded-xl h-auto"
              >
                {/* Quote Icon */}
                <div className="flex items-center mb-4">
                  <FaQuoteLeft className="text-logo-purple/30 text-xl" />
                </div>
                {/* Quote Content */}
                <div className="text-center text-gray-700 text-sm">
                  Kinetik has been a game-changer for us. Fast, high-quality
                  work just the way we wanted. We've seen great success since
                  using this platform. I strongly endorse Kinetik for anyone
                  aiming to launch an MVP.
                </div>
                {/* Author Info */}
                <div className="text-center mt-4">
                  <div className="font-semibold text-logo-purple">
                    Anonymous
                  </div>
                  <div className="text-sm text-gray-500">Tech Lead</div>
                </div>
                {/* Company Logo */}
                <div className="flex justify-center mt-8">
                  <img
                    src="/chatsmb-logo.png"
                    alt="Company Logo"
                    className="h-12 w-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-52 w-full">
          <div className="w-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-logo-purple text-xl font-semibold text-center"
            >
              FAQs
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-logo-purple text-3xl font-semibold text-center"
            >
              Frequently Asked Questions
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-logo-purple/80 mb-10 text-xl font-light text-center"
            >
              Have some questions? Here are some common ones.
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-3xl mx-auto space-y-1"
            >
              {[
                {
                  question: "Who is this service designed for?",
                  answer:
                    "AD AD Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat ex ut nulla dictum malesuada. Phasellus non molestie dolor. Phasellus porttitor urna a eros porta, vitae efficitur nisl tincidunt.",
                },
                {
                  question: "Why use Kinetik when I can do it myself?",
                  answer:
                    "AD AD Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat ex ut nulla dictum malesuada. Phasellus non molestie dolor. Phasellus porttitor urna a eros porta, vitae efficitur nisl tincidunt.",
                },
                {
                  question: "We already have PMs, why should I use this?",
                  answer:
                    "AD AD Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat ex ut nulla dictum malesuada. Phasellus non molestie dolor. Phasellus porttitor urna a eros porta, vitae efficitur nisl tincidunt.",
                },
                {
                  question: "Why should I stay subscribed?",
                  answer:
                    "AD AD Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat ex ut nulla dictum malesuada. Phasellus non molestie dolor. Phasellus porttitor urna a eros porta, vitae efficitur nisl tincidunt.",
                },
                {
                  question: "Is my data safe?",
                  answer:
                    "AD AD Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat ex ut nulla dictum malesuada. Phasellus non molestie dolor. Phasellus porttitor urna a eros porta, vitae efficitur nisl tincidunt.",
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="border border-gray-300 rounded-lg overflow-hidden"
                >
                  <summary className="shadow-4xl cursor-pointer bg-white/50 px-4 py-3 text-black font-semibold hover:bg-white transition-colors">
                    {faq.question}
                  </summary>
                  <div className="px-4 py-3 text-gray-500 bg-white/70 border-t-2">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm px-5 py-5 text-logo-purple h-auto sm:h-24 mt-20 border-t-2 border-logo-purple/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Section */}
        <div className="flex flex-col items-center sm:items-start justify-center text-center sm:text-left">
          <div className="pb-1">@2024 Kinetik Tech, LLC.</div>
          <div>All Rights Reserved.</div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="pb-2">Follow us at</div>
          <motion.div className="flex" whileHover={{ scale: 1.1 }}>
            <a
              href="https://www.instagram.com/kinetikgigs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6 text-logo-purple mx-2" />
            </a>
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center sm:items-end justify-center text-center sm:text-right">
          <div className="pb-1">Contact us at</div>
          <div>info@kinetikgigs.com</div>
        </div>
      </motion.div>
    </div>
  );
}
