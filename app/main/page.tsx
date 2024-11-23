"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaInstagram, FaQuoteLeft } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import { BsPersonWorkspace } from "react-icons/bs";

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
    { x: "20%", y: "40%", scrollSpeed: 0.1 },
    { x: "80%", y: "70%", scrollSpeed: 0.1 },
    { x: "50%", y: "100%", scrollSpeed: 0.1 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
      {circlePositions.map((pos, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            left: pos.x,
            top: `calc(${pos.y} + ${scrollY * pos.scrollSpeed}px)`,
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(73, 36, 125, 0.4) 10%, rgba(255, 255, 255, 0) 70%)",
            transform: "translate(-50%, -50%)",
            willChange: "transform, top",
          }}
        />
      ))}
    </div>
  );
};

export default function LandingPage() {
  return (
    <div className="font-poppins h-full flex flex-col px-6 lg:px-20">
      {/* Background */}
      <PurpleCirclesBackground />

      {/* Navbar */}
      <div className="flex justify-between items-center px-6 lg:px-20 pb-4 pt-6 backdrop-blur-md fixed top-0 left-0 w-full z-50 shadow-md">
        {/* Logo Section */}
        <div className="text-logo-purple flex-shrink-0">
          <img
            className="w-28 md:w-32 lg:w-36"
            src="/name.png"
            alt="Company Logo"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 md:space-x-10 font-semibold text-logo-purple text-sm md:text-base">
          <Link
            href="/login"
            className="group relative transition-all duration-500"
          >
            Log In
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-1 rounded-xl bg-logo-purple absolute left-0 bottom-0"></span>
          </Link>
          <Link
            href="/signup"
            className="group relative transition-all duration-500"
          >
            Sign Up
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-1 rounded-xl bg-logo-purple absolute left-0 bottom-0"></span>
          </Link>
        </div>
      </div>

      {/* Landing Content */}
      <div className="flex flex-col pt-10 h-full">
        <div className="flex flex-col items-center justify-start pt-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="md:text-6xl text-3xl font-bold text-logo-purple">
              <button className="px-3 py-1 mt-10 mb-10 text-logo-purple text-sm font-medium rounded-xl border-black border-2 bg-gray-950/10 hover:bg-gray-950/30 hover:scale-105 transition-all duration-300">
                Schedule a Call!
              </button>
              <div className="flex flex-row">
                <div className="md:text-6xl text-3xl font-semibold text-logo-purple pt-10">
                  <span>Automate Your Complete</span>
                  <br />
                  <span className="text-purple-900">Gig Workflow.</span>
                </div>
              </div>
            </div>
            <div className="flex md:text-xl text-md font-normal text-logo-purple/70">
              Kinetik manages the end-to-end tech gig process.
            </div>
          </div>
          <div className="flex flex-col items-center mt-20 space-y-20">
            {/* Stats Section */}
            <div className="flex flex-col items-center space-y-8">
              <div className="flex justify-center space-x-16">
                {/* Stat 1 */}
                <div className="flex flex-col items-center text-logo-purple">
                  <div className="text-2xl md:text-3xl font-semibold">10x</div>
                  <div className="text-sm md:text-md text-logo-purple/70">
                    Faster Development
                  </div>
                </div>
                {/* Stat 2 */}
                <div className="flex flex-col items-center text-logo-purple">
                  <div className="text-2xl md:text-3xl font-semibold">100%</div>
                  <div className="text-sm md:text-md text-logo-purple/70">
                    Satisfaction Guarantee
                  </div>
                </div>
                {/* Stat 3 */}
                <div className="flex flex-col items-center text-logo-purple">
                  <div className="text-2xl md:text-3xl font-semibold">500+</div>
                  <div className="text-sm md:text-md text-logo-purple/70">
                    Hours Saved
                  </div>
                </div>
              </div>
            </div>

            {/* Trusted By Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="md:text-lg text-md font-medium text-logo-purple">
                Trusted By
              </div>
              <div className="flex space-x-8">
                {/* Replace with actual logo images */}
                <img
                  src="/met-logo.png"
                  alt="Company Logo 1"
                  className="h-12 md:h-16 object-contain"
                />
                <img
                  src="/hp-logo.png"
                  alt="Company Logo 2"
                  className="h-12 md:h-16 object-contain"
                />
                <img
                  src="/nasa-logo.png"
                  alt="Company Logo 3"
                  className="h-12 md:h-16 object-contain"
                />
                <img
                  src="/un-logo.png"
                  alt="Company Logo 4"
                  className="h-12 md:h-16 object-contain"
                />
                <img
                  src="/empowermx-logo.png"
                  alt="Company Logo 5"
                  className="h-12 md:h-16 object-contain"
                />
              </div>
            </div>

            {/* Created By Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="md:text-lg text-md font-medium text-logo-purple">
                Created by Engineers From
              </div>
              <div className="flex space-x-8">
                {/* Replace with actual logo images */}
                <img
                  src="/met-logo.png"
                  alt="Company Logo 1"
                  className="h-12 md:h-16 object-contain"
                />
                <img
                  src="/hp-logo.png"
                  alt="Company Logo 2"
                  className="h-12 md:h-16 object-contain"
                />
                <img
                  src="/nasa-logo.png"
                  alt="Company Logo 3"
                  className="h-12 md:h-16 object-contain"
                />
                <img
                  src="/un-logo.png"
                  alt="Company Logo 4"
                  className="h-12 md:h-16 object-contain"
                />
                <img
                  src="/empowermx-logo.png"
                  alt="Company Logo 5"
                  className="h-12 md:h-16 object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="flex flex-col w-full pb-20 pt-14 px-8">
          <div className="flex text-logo-purple font-medium sm:text-3xl text-2xl justify-center mb-2">
            Kinetik's Guarantee.
          </div>
          <div className="flex text-gray-500 font-normal sm:text-lg text-md text-center justify-center mb-8 mx-8">
            Quality, high-value, affordable MVPs for your engineering, business,
            and design ideas.
          </div>
          <div className="flex justify-center">
            <div className="h-1 w-6 md:w-9 rounded-xl bg-logo-purple mb-14"></div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center space-y-6 lg:space-y-0 lg:space-x-10 px-4 w-full max-w-6xl mx-auto">
            <div className="flex flex-col bg-white p-6 md:p-8 text-logo-purple rounded-xl shadow-md flex-1">
              <div className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8 text-center">
                Efficient execution
              </div>
              <div className="flex justify-center mb-6 sm:mb-8 items-baseline">
                <span className="font-normal text-3xl sm:text-4xl md:text-5xl">
                  {"< "} 4
                </span>
                <span className="text-sm md:text-md ml-2">days</span>
              </div>
              <div className="font-normal text-sm sm:text-md text-gray-400 text-center">
                We will bring you multiple iterations in less than 4 days.
              </div>
            </div>
            <div className="flex flex-col bg-white p-6 md:p-8 text-logo-purple rounded-xl shadow-md flex-1">
              <div className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8 text-center">
                Quality development
              </div>
              <div className="flex justify-center mb-6 sm:mb-8 items-baseline">
                <span className="font-normal text-3xl sm:text-4xl md:text-5xl">
                  100%
                </span>
                <span className="text-sm md:text-md ml-2">satisfaction</span>
              </div>
              <div className="font-normal text-sm sm:text-md text-gray-400 text-center">
                We have the highest standards. We prioritize our client's
                happiness. Dont like the submissions. No need to pay!
              </div>
            </div>
            <div className="flex flex-col bg-white p-6 md:p-8 text-logo-purple rounded-xl shadow-md flex-1">
              <div className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8 text-center">
                Best-in-class
              </div>
              <div className="flex justify-center mb-6 sm:mb-8 items-baseline">
                <span className="font-normal text-3xl sm:text-4xl md:text-5xl">
                  1000+
                </span>
                <span className="text-sm md:text-md ml-2">developers</span>
              </div>
              <div className="font-normal text-sm sm:text-md text-gray-400 text-center">
                We have the most skilled developers from Ivy League + T20
                universities in our network.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full pb-16 pt-14">
          <div className="flex text-logo-purple font-medium sm:text-3xl text-2xl justify-center mb-2">
            Just 4 Steps.
          </div>
          <div className="flex text-gray-500 font-normal sm:text-lg text-md justify-center mb-2 text-center">
            Minimal to no work from your side.
          </div>
          <div className="flex justify-center">
            <div className="h-1 w-6 md:w-9 rounded-xl bg-logo-purple mt-6 mb-20"></div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center w-full space-y-16 lg:space-y-0 lg:space-x-8 px-4">
            <div className="relative flex flex-col justify-between w-full max-w-xs bg-off-white rounded-xl shadow-md p-4 sm:p-6 min-h-64 sm:min-h-72">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-8 sm:h-8 bg-logo-purple/90 text-white rounded-full flex items-center justify-center text-sm sm:text-base">
                1
              </div>
              <div className="flex-grow flex flex-col items-center justify-center">
                <div className="text-xl sm:text-2xl font-medium text-logo-purple text-center">
                  List Your Needs
                </div>
                <div className="text-sm sm:text-md mt-3 sm:mt-4 text-gray-500 text-center px-2 sm:px-4">
                  Specify what technologies you want and what kind of product
                  you are looking to build.
                </div>
                <div className="mt-6 sm:mt-8">
                  <FaListCheck className="fill-logo-purple/85 text-4xl sm:text-6xl" />
                </div>
              </div>
            </div>
            <div className="relative flex flex-col justify-between w-full max-w-xs bg-off-white rounded-xl shadow-md p-4 sm:p-6 min-h-64 sm:min-h-72">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-8 sm:h-8 bg-logo-purple/90 text-white rounded-full flex items-center justify-center text-sm sm:text-base">
                2
              </div>
              <div className="flex-grow flex flex-col items-center justify-center">
                <div className="text-xl sm:text-2xl font-medium text-logo-purple text-center">
                  Select Your Incentives
                </div>
                <div className="text-sm sm:text-md mt-3 sm:mt-4 text-gray-500 text-center px-2 sm:px-4">
                  Specify how much money you want to allocate to complete the
                  gig.
                </div>
                <div className="mt-6 sm:mt-8">
                  <FaMoneyCheckDollar className="fill-logo-purple/85 text-4xl sm:text-6xl" />
                </div>
              </div>
            </div>
            <div className="relative flex flex-col justify-between w-full max-w-xs bg-off-white rounded-xl shadow-md p-4 sm:p-6 min-h-64 sm:min-h-72">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-8 sm:h-8 bg-logo-purple/90 text-white rounded-full flex items-center justify-center text-sm sm:text-base">
                3
              </div>
              <div className="flex-grow flex flex-col items-center justify-center">
                <div className="text-xl sm:text-2xl font-medium text-logo-purple text-center">
                  Host Your Challenge
                </div>
                <div className="text-sm sm:text-md mt-3 sm:mt-4 text-gray-500 text-center px-2 sm:px-4">
                  That's it! Now, just wait for our comprehensive report on the
                  submissions!
                </div>
                <div className="mt-6 sm:mt-8">
                  <BiSolidReport className="fill-logo-purple/85 text-4xl sm:text-6xl" />
                </div>
              </div>
            </div>
            <div className="relative flex flex-col justify-between w-full max-w-xs bg-off-white rounded-xl shadow-md p-4 sm:p-6 min-h-64 sm:min-h-72">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-8 sm:h-8 bg-logo-purple/90 text-white rounded-full flex items-center justify-center text-sm sm:text-base">
                4
              </div>
              <div className="flex-grow flex flex-col items-center justify-center">
                <div className="text-xl sm:text-2xl font-medium text-logo-purple text-center">
                  Choose your MVP
                </div>
                <div className="text-sm sm:text-md mt-3 sm:mt-4 text-gray-500 text-center px-2 sm:px-4">
                  Of all submissions select the best one for your needs. Proceed
                  with the developers by offering a gig.
                </div>
                <div className="mt-6 sm:mt-8">
                  <BsPersonWorkspace className="fill-logo-purple/85 text-4xl sm:text-6xl" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center w-full mt-20 pl-4 pr-4">
            <div className="flex text-logo-purple bg-logo-purple/60 rounded-2xl p-1 max-w-4xl">
              <img className="rounded-xl" src="/altora-challenge.png" />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full pb-16 pt-14">
          <div className="flex text-logo-purple font-medium sm:text-3xl text-2xl justify-center mb-2">
            Vast Product Scope.
          </div>
          <div className="flex text-gray-500 font-normal sm:text-lg text-md justify-center mb-2 text-center">
            Everything. Here are some examples of what we have worked with.
          </div>
          <div className="flex justify-center">
            <div className="h-1 w-6 md:w-9 rounded-xl bg-logo-purple mt-6 mb-20"></div>
          </div>
          <div className="flex flex-col xl:flex-row justify-center items-center space-y-16 xl:space-y-0 xl:space-x-16 px-4">
            <div className="flex flex-col items-center">
              <div className="text-center font-normal text-logo-purple mb-3 text-lg">
                Technical Projects
              </div>
              <div className="flex flex-col w-full max-w-xs p-6 rounded-xl bg-white h-auto shadow-md">
                <div className="flex justify-center mb-5">
                  <img className="w-20" src="/aws-logo.webp" />
                </div>
                <div className="flex justify-around">
                  <img className="w-14" src="/react-logo.png" />
                  <img className="w-14" src="/gpt-logo.png" />
                </div>
              </div>
              <div className="text-center font-light text-logo-purple mt-3 w-60 text-base">
                Mobile Apps, Web Apps, AI Agents, LLM Dev
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-center font-normal text-logo-purple mb-3 text-lg">
                Business Projects
              </div>
              <div className="flex flex-col w-full max-w-xs p-6 rounded-xl bg-white h-auto shadow-md">
                <div className="flex justify-around mb-5">
                  <img className="w-16" src="/excel-logo.png" />
                  <img className="w-16" src="/powerbi-logo.png" />
                </div>
                <div className="flex justify-center">
                  <img className="w-20" src="/powerpoint-logo.png" />
                </div>
              </div>
              <div className="text-center font-light text-logo-purple mt-3 w-60 text-base">
                Strategy Decks, Business Plans, Case Studies
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-center font-normal text-logo-purple mb-3 text-lg">
                Design Projects
              </div>
              <div className="flex flex-col w-full max-w-xs p-6 rounded-xl bg-white h-auto shadow-md">
                <div className="flex justify-center mb-5">
                  <img className="w-20" src="/figma-logo.webp" />
                </div>
                <div className="flex justify-around">
                  <img className="w-14" src="/canva-logo.png" />
                  <img className="w-14" src="/photoshop-logo.png" />
                </div>
              </div>
              <div className="text-center font-light text-logo-purple mt-3 w-60 text-base">
                Creative Designs, Logos, CX, Social Media Marketing
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full pb-16 pt-14 bg-white">
          <div className="flex text-logo-purple font-medium sm:text-3xl text-2xl justify-center mb-2">
            Unique Advantages.
          </div>
          <div className="flex text-gray-500 font-normal sm:text-lg text-md justify-center mb-2 text-center">
            Maximize your outcomes with Kinetik’s novel outlook.
          </div>
          <div className="flex justify-center">
            <div className="h-1 w-6 md:w-9 rounded-xl bg-logo-purple mt-6 mb-16"></div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center space-y-16 lg:space-y-0 lg:space-x-8 p-4 lg:p-8 text-black">
            <div className="flex flex-col justify-between p-6 w-full max-w-xs bg-off-white rounded-xl h-auto shadow-md">
              <div className="text-2xl font-medium mb-2 text-center">
                Multiple Quality MVPs
              </div>
              <div className="text-center text-gray-700">
                Get a variety of innovative solutions from top talent. Evaluate
                multiple high-quality submissions to find the perfect fit for
                your needs.
              </div>
            </div>
            <div className="flex flex-col justify-between p-6 w-full max-w-xs bg-off-white rounded-xl h-auto shadow-md">
              <div className="text-2xl font-medium mb-2 text-center">
                Hire Through Contests
              </div>
              <div className="text-center text-gray-700">
                Meritocracy at its finest. Identify and hire the best developers
                by assessing their real-world solutions and performance in
                challenges.
              </div>
            </div>
            <div className="flex flex-col justify-between p-6 w-full max-w-xs bg-off-white rounded-xl h-auto shadow-md">
              <div className="text-2xl font-medium mb-2 text-center">
                Variable Pricing
              </div>
              <div className="text-center text-gray-700">
                Customize your prize pool based on the complexity and importance
                of your challenge. Flexibility that aligns with your budget and
                goals.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full pb-16 pt-14">
          <div className="flex text-logo-purple font-medium sm:text-3xl text-2xl justify-center mb-2">
            Impactful Track Record.
          </div>
          <div className="flex text-gray-500 font-normal sm:text-lg text-md justify-center mb-2 text-center">
            See what others have to say about us.
          </div>
          <div className="flex justify-center">
            <div className="h-1 w-6 md:w-9 rounded-xl bg-logo-purple mt-6 mb-20"></div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center space-y-16 lg:space-y-0 lg:space-x-8 p-4 lg:p-8">
            <div className="flex flex-col justify-between p-6 lg:p-8 w-full max-w-lg lg:max-w-[36rem] bg-white rounded-xl shadow-md h-auto">
              <div className="flex items-center mb-4">
                <FaQuoteLeft className="text-logo-purple/30 text-4xl" />
              </div>
              <div className="text-center text-gray-700 italic">
                Kinetik helped us go from idea to MVP within days. Loved the
                experience and highly recommend Kinetik for anyone trying to
                build or hire quickly.
              </div>
              <div className="text-center mt-4">
                <div className="font-semibold text-logo-purple">
                  Benny Johnson
                </div>
                <div className="text-sm text-gray-500">
                  Sonicbids & Advance Music Tech
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between p-6 lg:p-8 w-full max-w-lg lg:max-w-[36rem] bg-white rounded-xl shadow-md h-auto">
              <div className="flex items-center mb-4">
                <FaQuoteLeft className="text-logo-purple/30 text-4xl" />
              </div>
              <div className="text-center text-gray-700 italic">
                Kinetik has been a game-changer for us. Fast, high-quality work
                just the way we wanted. We've seen great success since using
                this platform.
              </div>
              <div className="text-center mt-4">
                <div className="font-semibold text-logo-purple">Anonymous</div>
                <div className="text-sm text-gray-500">ChatSMB</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-3 text-xs sm:text-sm px-5 py-5 text-off-white bg-logo-purple/85 h-24">
        <div className="flex flex-col items-start justify-center">
          <div className="pb-1">@2024 Kinetik Tech, LLC.</div>
          <div>All Rights Reserved.</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="pb-2">Follow us at</div>
          <div className="flex">
            <a
              href="https://www.instagram.com/kinetikgigs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="size-4 sm:size-6 text-off-white mx-2 hover:text-gray-300" />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div className="pb-1">Contact us at</div>
          <div>info@kinetikgigs.com</div>
        </div>
      </div>
    </div>
  );
}
