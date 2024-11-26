"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

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
    { x: "0%", y: "10vh", scrollSpeed: -0.3, size: "500px" },
    { x: "75%", y: "30vh", scrollSpeed: -0.3, size: "500px" },
    { x: "-25%", y: "80vh", scrollSpeed: -0.3, size: "500px" },
    { x: "-5%", y: "180vh", scrollSpeed: -0.3, size: "500px" },
    { x: "85%", y: "90vh", scrollSpeed: -0.3, size: "450px" },
    { x: "40%", y: "150vh", scrollSpeed: -0.3, size: "400px" },
    { x: "10%", y: "240vh", scrollSpeed: -0.3, size: "350px" },
    { x: "65%", y: "250vh", scrollSpeed: -0.3, size: "550px" },
    { x: "-15%", y: "300vh", scrollSpeed: -0.3, size: "320px" },
    { x: "55%", y: "350vh", scrollSpeed: -0.3, size: "470px" },
    { x: "30%", y: "400vh", scrollSpeed: -0.3, size: "380px" },
    { x: "5%", y: "450vh", scrollSpeed: -0.3, size: "270px" },
    { x: "70%", y: "500vh", scrollSpeed: -0.3, size: "420px" },
    { x: "50%", y: "220vh", scrollSpeed: -0.3, size: "340px" },
    { x: "90%", y: "280vh", scrollSpeed: -0.3, size: "310px" },
    { x: "15%", y: "330vh", scrollSpeed: -0.3, size: "400px" },
    { x: "80%", y: "410vh", scrollSpeed: -0.3, size: "440px" },
    { x: "35%", y: "470vh", scrollSpeed: -0.3, size: "200px" },
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

export default function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative font-poppins h-full flex flex-col px-6 lg:px-20">
      <PurpleCirclesBackground />

      {/* Navbar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center px-6 lg:px-20 pb-4 pt-6 backdrop-blur-md bg-off-white/30 fixed top-0 left-0 w-full z-50 shadow-md"
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
                    className="h-12 md:h-16 object-contain"
                    variants={fadeInUpVariants}
                    whileHover={{ scale: 1.1 }}
                  />
                )
              )}
            </motion.div>
          </motion.div>

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
            Operate more efficiently, and focus on your business operations
          </motion.div>

          <motion.div
            className="flex flex-col items-center space-y-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerChildrenVariants}
          >
            {/* Stats Section */}
            <motion.div
              className="flex flex-col items-center space-y-8"
              variants={fadeInUpVariants}
            >
              <div className="flex justify-center space-x-16">
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
                    <div className="text-md md:text-lg text-logo-purple/70">
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
            Forget the hassle of technical development, leave it to us
          </motion.div>

          {/* Cards Container */}
          <div className="flex justify-center items-center gap-x-10 w-full max-w-5xl mx-auto px-4">
            {/* Card 1 */}
            <div className="hover:shadow-5xl hover:rounded-xl hover:scale-105 transition-all duration-300 w-1/2">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="bg-white/10 h-96 rounded-xl shadow-3xl transition-all duration-300 ease-in-out transform flex flex-col relative w-2xl"
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
            <div className="hover:shadow-5xl hover:rounded-xl hover:scale-105 transition-all duration-300 w-1/2">
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
                    src=""
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

        {/* Main Intro */}
        <div className="mt-52 w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-logo-purple text-3xl mb-10 font-semibold text-left"
          >
            How Kinetik Works
          </motion.div>

          {/* Cards Container */}
          <div className="flex justify-center items-center gap-x-10 w-full max-w-5xl mx-auto px-4">
            {/* Card 1 */}
            <div className="hover:shadow-5xl hover:rounded-xl hover:scale-105 transition-all duration-300 w-1/2">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="bg-white/10 h-96 rounded-xl shadow-3xl transition-all duration-300 ease-in-out transform flex flex-col relative w-2xl"
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
            <div className="hover:shadow-5xl hover:rounded-xl hover:scale-105 transition-all duration-300 w-1/2">
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
                    src=""
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
      </motion.div>

      {/* Footer */}
      <motion.div
        className="grid grid-cols-3 text-xs sm:text-sm px-5 py-5 text-logo-purple h-24 mt-20 border-t-2 border-logo-purple/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-start justify-center">
          <div className="pb-1">@2024 Kinetik Tech, LLC.</div>
          <div>All Rights Reserved.</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="pb-2">Follow us at</div>
          <motion.div className="flex" whileHover={{ scale: 1.1 }}>
            <a
              href="https://www.instagram.com/kinetikgigs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="size-4 sm:size-6 text-logo-purple mx-2" />
            </a>
          </motion.div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div className="pb-1">Contact us at</div>
          <div>info@kinetikgigs.com</div>
        </div>
      </motion.div>
    </div>
  );
}
