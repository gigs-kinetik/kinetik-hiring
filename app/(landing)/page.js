"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CurrencyDollarIcon,
  BriefcaseIcon,
  NewspaperIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/16/solid";
import { db } from "../../lib/firebaseConfig";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { FaInstagram, FaQuoteLeft } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import { BsPersonWorkspace } from "react-icons/bs";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isDevelopers, setIsDevelopers] = useState(false);

  const handleToggle = () => {
    setIsDevelopers((prevState) => !prevState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email) {
      try {
        const docRef = doc(db, "Company Information", "Interested Customers");
        const options = { timeZone: "America/Chicago", timeZoneName: "short" };
        const currDate = new Date()
          .toLocaleDateString("en-US", options)
          .split(", ")[0];
        const currTime = new Date().toLocaleTimeString("en-US", options);
        var userNote = "Company";
        if (isDevelopers) {
          userNote = "Developer";
        }
        await updateDoc(docRef, {
          Emails: arrayUnion({
            Email: email,
            Timestamp: currDate + ", " + currTime,
            Type: userNote,
          }),
        });
        setEmail("");
        alert("Email has been added to the waitlist.");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  return (
    <div className="font-poppins h-full flex flex-col">
      {isDevelopers ? (
        <div className="font-poppins h-full flex flex-col">
          <div className="bg-gradient-to-br from-black via-logo-purple/95 to-mid-purple/50 via-25%">
            <div className="flex justify-between p-5 mx-8 mt-5">
              <div className="text-logo-purple flex-shrink-0">
                <img
                  className="w-full max-w-24 sm:max-w-28 md:max-w-32 lg:max-w-36 h-auto"
                  src="/name-white.png"
                  alt="Company Logo"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-off-white sm:text-lg text-sm">
                <div className="flex flex-row space-x-4 sm:space-x-10 font-semibold sm:order-2 sm:ml-10">
                  <Link
                    href="/login"
                    className="group transition-all duration-1000"
                  >
                    Log In
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 rounded-xl bg-off-white"></span>
                  </Link>
                  <Link
                    href="/signup"
                    className="group transition-all duration-1000"
                  >
                    Sign Up
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 rounded-xl bg-off-white"></span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start pt-20">
              <div className="flex items-center space-x-2 pb-20">
                <span className="text-sm font-semibold text-off-white">
                  Companies
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isDevelopers}
                    onChange={handleToggle}
                  />
                  <div
                    className={`w-[3.25rem] h-7 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-off-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:bg-logo-purple ${
                      isDevelopers ? "bg-off-white" : "bg-logo-purple"
                    }`}
                  ></div>
                </label>
                <span className="text-sm font-semibold text-off-white">
                  Developers
                </span>
              </div>
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="md:text-6xl text-3xl font-bold text-logo-purple">
                  <div className="flex flex-row">
                    <div className="md:text-6xl text-3xl font-bold text-off-white">
                      <span>Complete Gigs and Win Prizes.</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 md:text-2xl text-md font-semibold text-off-white/70">
                  <div>Build for Top Companies to Win Cash and Gigs.</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-24 mb-44">
              <form
                className="flex items-center bg-off-white rounded-3xl px-2 py-1.5 md:w-full max-w-lg justify-between space-x-4 md:text-lg text-xs"
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  placeholder="Your personal email"
                  className="flex-grow border-none bg-transparent focus:ring-0 md:text-lg text-xs"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-logo-purple/70 text-off-white px-6 py-2 rounded-2xl hover:bg-logo-purple/90 transition duration-300"
                >
                  Interested
                </button>
              </form>
              <small className="text-off-white mt-4">
                *join our developer newsletter
              </small>
            </div>
          </div>
          <div className="flex flex-col w-full pb-16 pt-14 bg-off-white">
            <div className="flex text-logo-purple font-medium sm:text-3xl text-2xl justify-center mb-2">
              Simple Process.
            </div>
            <div className="flex text-gray-500 font-normal sm:text-lg text-md justify-center mb-2 text-center">
              It's very easy.
            </div>
            <div className="flex justify-center">
              <div className="h-1 w-6 md:w-9 rounded-xl bg-logo-purple mt-6 mb-6"></div>
            </div>
            <div className="flex flex-col xl:flex-row mt-14 mx-14 pb-14 text-off-white border-b-2">
              <div className="flex flex-col justify-center w-full xl:w-96 mb-4 xl:mb-0 xl:pr-8">
                <div className="flex text-2xl font-medium text-logo-purple justify-center text-center">
                  Choose Your Projects. Spend 4 days. Build.
                </div>
                <div className="flex text-md mt-4 text-gray-500 text-center justify-center px-4">
                  Select the technologies you want to work with and the type of
                  product you want to build.
                </div>
              </div>
              <div className="flex flex-row flex-wrap justify-around w-full">
                <div className="flex flex-col items-center m-4">
                  <div className="text-center font-medium text-logo-purple mb-2">
                    Technical Projects
                  </div>
                  <div className="flex flex-col w-52 p-5 rounded-xl bg-white h-44">
                    <div className="flex justify-center mb-4">
                      <img className="w-16" src="/aws-logo.webp" />
                    </div>
                    <div className="flex justify-around">
                      <img className="w-12" src="/react-logo.png" />
                      <img className="w-12" src="/gpt-logo.png" />
                    </div>
                  </div>
                  <div className="text-center font-light text-logo-purple mt-2 w-52 text-sm">
                    Mobile Apps, Web Apps, AI Agents, LLM Dev
                  </div>
                </div>
                <div className="flex flex-col items-center m-4">
                  <div className="text-center font-medium text-logo-purple mb-2">
                    Business Projects
                  </div>
                  <div className="flex flex-col w-52 p-5 rounded-xl bg-white h-44">
                    <div className="flex justify-around mb-4">
                      <img className="w-14" src="/excel-logo.png" />
                      <img className="w-14" src="/powerbi-logo.png" />
                    </div>
                    <div className="flex justify-center">
                      <img className="w-16" src="/powerpoint-logo.png" />
                    </div>
                  </div>
                  <div className="text-center font-light text-logo-purple mt-2 w-52 text-sm">
                    Strategy Decks, Business Plans, Case Studies
                  </div>
                </div>
                <div className="flex flex-col items-center m-4">
                  <div className="text-center font-medium text-logo-purple mb-2">
                    Design Projects
                  </div>
                  <div className="flex flex-col w-52 p-5 rounded-xl bg-white h-44">
                    <div className="flex justify-center mb-4">
                      <img className="w-16" src="/figma-logo.webp" />
                    </div>
                    <div className="flex justify-around">
                      <img className="w-12" src="/canva-logo.png" />
                      <img className="w-12" src="/photoshop-logo.png" />
                    </div>
                  </div>
                  <div className="text-center font-light text-logo-purple mt-2 w-52 text-sm">
                    Creative Designs, Logos, CX, Social Media Marketing
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col xl:flex-row mt-14 mx-14 pb-14 text-off-white border-b-2">
              <div className="flex flex-col justify-center w-full xl:w-96 mb-4 xl:mb-0 xl:pr-8">
                <div className="flex text-2xl font-medium text-logo-purple justify-center">
                  Join a Challenge
                </div>
                <div className="flex text-md mt-4 text-gray-500 justify-center">
                  And start building!
                </div>
              </div>
              <div className="flex flex-row justify-center w-full">
                <div className="flex text-logo-purple bg-logo-purple/60 rounded-2xl p-1 max-w-4xl">
                  <img className="rounded-xl" src="/altora-challenge.png" />
                </div>
              </div>
            </div>
            <div className="flex flex-col xl:flex-row mt-14 mx-14 pb-14 text-off-white">
              <div className="flex flex-col justify-center w-full xl:w-96 mb-4 xl:mb-0 xl:pr-8">
                <div className="flex text-2xl font-medium text-logo-purple justify-center">
                  Earn Rewards
                </div>
                <div className="flex text-md mt-4 text-gray-500 text-center justify-center px-4">
                  Win prizes by completing projects!
                </div>
              </div>
              <div className="flex flex-row flex-wrap justify-around w-full">
                <div className="flex flex-col items-center m-4 justify-center">
                  <div className="text-center font-medium text-logo-purple mb-2">
                    Cash
                  </div>
                  <div className="flex w-52 p-5 justify-center">
                    <CurrencyDollarIcon className="fill-logo-purple/95 size-20" />
                  </div>
                  <div className="text-center font-light text-logo-purple mt-2 w-52 text-sm">
                    Monetary rewards for quality submissions.
                  </div>
                </div>
                <div className="flex flex-col items-center m-4 justify-center">
                  <div className="text-center font-medium text-logo-purple mb-2">
                    Gigs & Jobs
                  </div>
                  <div className="flex w-52 p-5 justify-center">
                    <BriefcaseIcon className="fill-logo-purple/95 size-20" />
                  </div>
                  <div className="text-center font-light text-logo-purple mt-2 w-52 text-sm">
                    Land internships, gigs, or job offers for top performance.
                  </div>
                </div>
                <div className="flex flex-col items-center m-4 justify-center">
                  <div className="text-center font-medium text-logo-purple mb-2">
                    Company Perks
                  </div>
                  <div className="flex w-52 p-5 justify-center">
                    <CursorArrowRaysIcon className="fill-logo-purple/95 size-20" />
                  </div>
                  <div className="text-center font-light text-logo-purple mt-2 w-52 text-sm">
                    Access exclusive company perks, swag, and more.
                  </div>
                </div>
                <div className="flex flex-col items-center m-4 justify-center">
                  <div className="text-center font-medium text-logo-purple mb-2">
                    Experience
                  </div>
                  <div className="flex w-52 p-5 justify-center">
                    <NewspaperIcon className="fill-logo-purple/95 size-20" />
                  </div>
                  <div className="text-center font-light text-logo-purple mt-2 w-52 text-sm">
                    Get externship certification for a qualifying submission.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full pb-16 pt-14 bg-white">
            <div className="flex text-logo-purple font-medium sm:text-3xl text-2xl justify-center mb-2">
              Trusted Track Record.
            </div>
            <div className="flex text-gray-500 font-normal sm:text-lg text-md justify-center mb-2 text-center">
              See what others have to say about us.
            </div>
            <div className="flex justify-center">
              <div className="h-1 w-6 md:w-9 rounded-xl bg-logo-purple mt-6 mb-20"></div>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center space-y-16 lg:space-y-0 lg:space-x-8 p-4 lg:p-8">
              <div className="flex flex-col justify-between p-6 lg:p-8 w-full max-w-lg lg:max-w-[36rem] bg-off-white rounded-xl shadow-md h-auto">
                <div className="flex items-center mb-4">
                  <FaQuoteLeft className="text-logo-purple/30 text-4xl" />
                </div>
                <div className="text-center text-gray-700 italic">
                  Working with Kinetik was a great experience! They were helpful
                  and responsive, making the process much easier and enjoyable
                  than I expected. I highly recommend them to anyone looking to
                  develop quality work.
                </div>
                <div className="text-center mt-4">
                  <div className="font-semibold text-logo-purple">Eda Eren</div>
                </div>
              </div>
              <div className="flex flex-col justify-between p-6 lg:p-8 w-full max-w-lg lg:max-w-[36rem] bg-off-white rounded-xl shadow-md h-auto">
                <div className="flex items-center mb-4">
                  <FaQuoteLeft className="text-logo-purple/30 text-4xl" />
                </div>
                <div className="text-center text-gray-700 italic">
                  The overall experience was great, and the whole process was
                  smooth. I had a great time during the competition and was able
                  to contribute to a company mission while learning some new
                  skills.
                </div>
                <div className="text-center mt-4">
                  <div className="font-semibold text-logo-purple">
                    James Avila
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="font-poppins h-full flex flex-col">
          <div className="bg-gradient-to-tl from-logo-purple/95 via-mid-purple/50 via-45% to-transparent">
            <div className="flex justify-between p-5 mx-8 mt-5">
              <div className="text-logo-purple flex-shrink-0">
                <img
                  className="w-full max-w-24 sm:max-w-28 md:max-w-32 lg:max-w-36 h-auto"
                  src="/name.png"
                  alt="Company Logo"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-logo-purple sm:text-lg text-sm">
                <Link
                  href="https://calendly.com/kinetikgigs/chat-with-kinetik"
                  className="font-normal bg-logo-purple/70 text-off-white px-6 py-2 rounded-2xl hover:bg-logo-purple/90 transition duration-300 h-fit sm:order-1"
                >
                  Book a Demo
                </Link>
                <div className="flex flex-row space-x-4 sm:space-x-10 font-semibold sm:order-2 sm:ml-10">
                  <Link
                    href="/login"
                    className="group transition-all duration-1000"
                  >
                    Log In
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 rounded-xl bg-logo-purple"></span>
                  </Link>
                  <Link
                    href="/signup"
                    className="group transition-all duration-1000"
                  >
                    Sign Up
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 rounded-xl bg-logo-purple"></span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start pt-20">
              <div className="flex items-center space-x-2 pb-20">
                <span className="text-sm font-semibold text-logo-purple/90">
                  Companies
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDevelopers}
                    onChange={handleToggle}
                    className="sr-only peer"
                  />
                  <div className="relative w-[3.25rem] h-7 bg-logo-purple rounded-full transition-colors ease-in-out duration-200 peer-checked:bg-off-white before:content-[''] before:absolute before:top-0.5 before:start-[2px] before:bg-off-white before:rounded-full before:size-6 before:transition-all before:duration-200 before:ease-in-out peer-checked:before:translate-x-full peer-checked:before:bg-logo-purple"></div>
                </label>
                <span className="text-sm font-semibold text-logo-purple/90">
                  Developers
                </span>
              </div>
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="md:text-6xl text-3xl font-bold text-logo-purple">
                  <div className="flex flex-row">
                    <div className="md:text-6xl text-3xl font-bold text-logo-purple">
                      <span>Visualize your ideas at scale.</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 md:text-2xl text-md font-semibold text-logo-purple/70">
                  <div>Design, Build, and Hire at Lightning Speeds.</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-24 mb-44">
              <form
                className="flex items-center bg-off-white rounded-3xl px-2 py-1.5 md:w-full max-w-lg justify-between space-x-4 md:text-lg text-xs"
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  placeholder="Your work email"
                  className="flex-grow border-none bg-transparent focus:ring-0 md:text-lg text-xs"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-logo-purple/70 text-off-white px-6 py-2 rounded-2xl hover:bg-logo-purple/90 transition duration-300"
                >
                  Interested
                </button>
              </form>
              <small className="text-logo-purple mt-4">
                *join our product waitlist
              </small>
            </div>
          </div>
          <div className="flex flex-col bg-off-white w-full pb-20 pt-14 px-8">
            <div className="flex text-logo-purple font-medium sm:text-3xl text-2xl justify-center mb-2">
              Kinetik's Guarantee.
            </div>
            <div className="flex text-gray-500 font-normal sm:text-lg text-md text-center justify-center mb-8 mx-8">
              Quality, high-value, affordable MVPs for your engineering,
              business, and design ideas.
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
          <div className="flex flex-col w-full pb-16 pt-14 bg-white">
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
                    That's it! Now, just wait for our comprehensive report on
                    the submissions!
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
                    Of all submissions select the best one for your needs.
                    Proceed with the developers by offering a gig.
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
                  Get a variety of innovative solutions from top talent.
                  Evaluate multiple high-quality submissions to find the perfect
                  fit for your needs.
                </div>
              </div>
              <div className="flex flex-col justify-between p-6 w-full max-w-xs bg-off-white rounded-xl h-auto shadow-md">
                <div className="text-2xl font-medium mb-2 text-center">
                  Hire Through Contests
                </div>
                <div className="text-center text-gray-700">
                  Meritocracy at its finest. Identify and hire the best
                  developers by assessing their real-world solutions and
                  performance in challenges.
                </div>
              </div>
              <div className="flex flex-col justify-between p-6 w-full max-w-xs bg-off-white rounded-xl h-auto shadow-md">
                <div className="text-2xl font-medium mb-2 text-center">
                  Variable Pricing
                </div>
                <div className="text-center text-gray-700">
                  Customize your prize pool based on the complexity and
                  importance of your challenge. Flexibility that aligns with
                  your budget and goals.
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
                  Kinetik has been a game-changer for us. Fast, high-quality
                  work just the way we wanted. We've seen great success since
                  using this platform.
                </div>
                <div className="text-center mt-4">
                  <div className="font-semibold text-logo-purple">
                    Anonymous
                  </div>
                  <div className="text-sm text-gray-500">ChatSMB</div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col w-full pb-16 pt-14 bg-white">
            <div className="flex text-logo-purple font-medium sm:text-3xl text-2xl justify-center mb-2">
              Affordable Pricing.
            </div>
            <div className="flex text-gray-500 font-normal sm:text-lg text-md justify-center mb-2 text-center">
              Get access to all reporting and Kinetik features.
            </div>
            <div className="flex justify-center">
              <div className="h-1 w-6 md:w-9 rounded-xl bg-logo-purple mt-6 mb-20"></div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 p-4 lg:p-8 text-off-white">
              <div className="flex flex-col items-center p-6 w-full max-w-xs bg-logo-purple/85 rounded-xl shadow-md">
                <div className="text-3xl font-bold mb-2">Basic</div>
                <div className="text-4xl font-bold mb-2">FREE</div>
                <div className="text-sm text-logo-purple/5 mb-6"></div>
                <ul className="space-y-3 mb-6 text-sm text-left w-full">
                  <li>- Host One Challenge per month</li>
                  <li>- No Reporting on Submissions</li>
                  <li>- 100% Upfront on Challenge Fee</li>
                </ul>
                <Link href="/signup">
                  <button className="w-full p-2 bg-white text-logo-purple font-semibold rounded-lg">
                    Get Started
                  </button>
                </Link>
              </div>
              <div className="flex flex-col items-center p-6 w-full max-w-xs bg-logo-purple text-white rounded-xl shadow-lg transform scale-110">
                <div className="text-3xl font-bold mb-2">Unlimited</div>
                <div className="text-4xl font-bold mb-2">
                  $29.99 <span className="text-xl">/ month</span>
                </div>
                <div className="text-sm text-gray-400 mb-4">Billed Yearly</div>
                <ul className="space-y-3 mb-6 text-sm text-left w-full">
                  <li>- Host Unlimited Challenges</li>
                  <li>- Access Our Best Developer Pool</li>
                  <li>- Get Reporting on Submissions</li>
                  <li>- 90% refund satisfaction guarantee</li>
                </ul>
                <Link href="/signup">
                  <button className="w-full p-2 bg-white text-logo-purple font-semibold rounded-lg">
                    Get Started
                  </button>
                </Link>
              </div>
              <div className="flex flex-col items-center p-6 w-full max-w-xs bg-logo-purple/85 rounded-xl shadow-md">
                <div className="text-3xl font-bold mb-2">Premium</div>
                <div className="text-4xl font-bold mb-2">
                  $19.99 <span className="text-xl">/ month</span>
                </div>
                <div className="text-sm text-gray-400 mb-4">Billed Yearly</div>
                <ul className="space-y-3 mb-6 text-sm text-left w-full">
                  <li>- Host Three Challenges per month</li>
                  <li>- No Reporting on Submissions</li>
                  <li>- 90% refund satisfaction guarantee</li>
                </ul>
                <Link href="/signup">
                  <button className="w-full p-2 bg-white text-logo-purple font-semibold rounded-lg">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      )}
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
