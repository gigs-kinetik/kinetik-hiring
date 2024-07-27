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
import { FaInstagram, FaDiscord } from "react-icons/fa";

export default function LandingPage() {
  const [email, setEmail] = useState("");

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
        await updateDoc(docRef, {
          emails: arrayUnion({
            email: email,
            timestamp: currDate + ", " + currTime,
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
      <div className="bg-gradient-to-tl from-logo-purple/95 via-mid-purple/40 via-65% to-transparent">
        <div className="flex justify-between p-5 mx-8 mt-5">
          <div className="text-logo-purple flex-shrink-0">
            <img
              className="w-full max-w-24 sm:max-w-28 md:max-w-32 lg:max-w-36 h-auto"
              src="/name.png"
              alt="Company Logo"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-off-white sm:text-lg text-sm">
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
        <div className="flex flex-col items-center justify-start pt-24">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="md:text-6xl text-3xl font-bold text-logo-purple">
              <div className="flex flex-row">
                <div className="md:text-6xl text-3xl font-bold text-logo-purple">
                  <span className="text-off-white/90">Visualize </span>
                  <span>your ideas at scale</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 md:text-2xl text-md font-semibold text-logo-purple/70">
              <div>Design, Build, and Test at Lightning Speeds.</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center mt-24 mb-20 space-y-8 md:space-y-0 md:space-x-12">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-md font-medium text-logo-purple mb-2">
              Developers
            </div>
            <a
              href="https://discord.gg/h6FtYkfB"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-logo-purple/60 text-off-white px-4 py-2 sm:px-6 sm:py-4 rounded-2xl hover:bg-logo-purple/90 transition duration-300"
            >
              <FaDiscord className="text-white mr-2 text-xl sm:text-2xl" />
              <span className="text-sm sm:text-base">Join the Community</span>
            </a>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <div className="text-md font-medium text-logo-purple mb-2">
              Companies
            </div>
            <form
              className="flex items-center bg-off-white rounded-2xl px-2 py-1.5 md:w-full max-w-lg justify-between space-x-4 md:text-lg text-xs md:mt-0"
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
                className="bg-logo-purple/70 text-off-white px-6 py-2 rounded-xl hover:bg-logo-purple/90 transition duration-300"
              >
                Interested
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col bg-off-white w-full pb-20 pt-14 px-8">
          <div className="flex text-logo-purple font-medium sm:text-3xl text-2xl justify-center mb-2">
            Why Kinetik?
          </div>
          <div className="flex text-gray-500 font-normal sm:text-lg text-md text-center justify-center mb-8 mx-8">
            Move fast and agile with quality. Operationalize your MVPs in little
            to no time.
          </div>
          <div className="flex justify-center">
            <div className="h-1 w-6 md:w-9 rounded-xl bg-logo-purple mb-14"></div>
          </div>
          <div className="flex flex-col xl:flex-row justify-center space-y-10 xl:space-y-0 xl:space-x-10 px-4">
            <div className="flex flex-col bg-white p-8 text-logo-purple rounded-xl shadow-md flex-1">
              <div className="sm:text-xl text-md flex font-semibold mb-8 justify-center">
                Efficient execution
              </div>
              <div className="flex justify-center mb-8 items-baseline">
                <span className="font-normal sm:text-5xl text-2xl">
                  {"< "} 4
                </span>
                <span className="text-md ml-2">days</span>
              </div>
              <div className="flex font-normal sm:text-md text-sm text-gray-400 justify-center text-center w-full">
                We will get you multiple iterations in less than 4 days.
              </div>
            </div>
            <div className="flex flex-col bg-white p-8 text-logo-purple rounded-xl shadow-md flex-1">
              <div className="sm:text-xl text-md flex font-semibold mb-8 justify-center">
                Quality development
              </div>
              <div className="flex justify-center mb-8 items-baseline">
                <span className="font-normal sm:text-5xl text-2xl">100%</span>
                <span className="text-md ml-2">satisfaction</span>
              </div>
              <div className="flex font-normal sm:text-md text-sm text-gray-400 justify-center text-center w-full">
                We have the highest standards: our job is not done until you
                like it.
              </div>
            </div>
            <div className="flex flex-col bg-white p-8 text-logo-purple rounded-xl shadow-md flex-1">
              <div className="sm:text-xl text-md flex font-semibold mb-8 justify-center">
                Best-in-class
              </div>
              <div className="flex justify-center mb-8 items-baseline">
                <span className="font-normal sm:text-5xl text-2xl">1000+</span>
                <span className="text-md ml-2">developers</span>
              </div>
              <div className="flex font-normal sm:text-md text-sm text-gray-400 justify-center text-center">
                We have the most skilled developers in our global network.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full pb-20 pt-14 bg-white">
        <div className="flex text-logo-purple font-medium sm:text-3xl text-2xl justify-center mb-2">
          How does Kinetik work?
        </div>
        <div className="flex text-gray-500 font-normal sm:text-lg text-md justify-center mb-2 text-center">
          It is very simple.
        </div>
        <div className="flex justify-center">
          <div className="h-1 w-6 md:w-9 rounded-xl bg-logo-purple mt-6 mb-6"></div>
        </div>
        <div className="flex flex-col xl:flex-row mt-14 mx-14 pb-14 text-off-white border-b-2">
          <div className="flex flex-col justify-center w-full xl:w-96 mb-4 xl:mb-0 xl:pr-8">
            <div className="flex text-2xl font-medium text-logo-purple justify-center text-center">
              Specify Requirements
            </div>
            <div className="flex text-md mt-4 text-gray-500 text-center justify-center px-4">
              Decide what technologies you are looking to use and what kind of
              product you are looking to build.
            </div>
          </div>
          <div className="flex flex-row flex-wrap justify-around w-full">
            <div className="flex flex-col items-center m-4">
              <div className="text-center font-medium text-logo-purple mb-2">
                Technical Projects
              </div>
              <div className="flex flex-col w-52 p-5 rounded-xl bg-off-white h-44">
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
              <div className="flex flex-col w-52 p-5 rounded-xl bg-off-white h-44">
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
              <div className="flex flex-col w-52 p-5 rounded-xl bg-off-white h-44">
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
              Provide Incentives
            </div>
            <div className="flex text-md mt-4 text-gray-500 text-center justify-center px-4">
              Offer prizes for the developers: you choose how you want to
              allocate them.
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
                Monetary rewards for best MVPs.
              </div>
            </div>
            <div className="flex flex-col items-center m-4 justify-center">
              <div className="text-center font-medium text-logo-purple mb-2">
                Hire
              </div>
              <div className="flex w-52 p-5 justify-center">
                <BriefcaseIcon className="fill-logo-purple/95 size-20" />
              </div>
              <div className="text-center font-light text-logo-purple mt-2 w-52 text-sm">
                Internships, gigs, or job offers for top developers.
              </div>
            </div>
            <div className="flex flex-col items-center m-4 justify-center">
              <div className="text-center font-medium text-logo-purple mb-2">
                Equity
              </div>
              <div className="flex w-52 p-5 justify-center">
                <NewspaperIcon className="fill-logo-purple/95 size-20" />
              </div>
              <div className="text-center font-light text-logo-purple mt-2 w-52 text-sm">
                Buy-off MVP or sign stake for stunning mockups.
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
                Credits, swag, or other exclusive company benefits.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row mt-14 mx-14 pb-14 text-off-white border-b-2">
          <div className="flex flex-col justify-center w-full xl:w-96 mb-4 xl:mb-0 xl:pr-8">
            <div className="flex text-2xl font-medium text-logo-purple justify-center">
              Host a Challenge
            </div>
            <div className="flex text-md mt-4 text-gray-500 justify-center">
              That's it!
            </div>
          </div>
          <div className="flex flex-row justify-center w-full">
            <div className="flex text-logo-purple bg-logo-purple/60 rounded-2xl p-1 max-w-4xl">
              <img className="rounded-xl" src="/altora-challenge.png" />
            </div>
          </div>
        </div>
        <div className="flex flex-row ml-10 mr-10 mt-10 text-off-white justify-center">
          <div className="flex flex-col p-10">
            <div className="flex text-2xl font-medium text-logo-purple text-center justify-center">
              Finally, wait for Kinetik's comprehensive report on the
              submissions!
            </div>
            <div className="flex text-md mt-4 text-gray-500 text-center justify-center px-4">
              You will receive all the submissions as well as Kinetik's
              assessment of the work.
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 text-xs sm:text-sm px-5 py-5 text-off-white bg-logo-purple/85 h-24">
        <div className="flex flex-col items-start justify-center">
          <div className="pb-1">@2024 Kinetik.</div>
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
            <a
              href="https://discord.gg/h6FtYkfB"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord className="size-4 sm:size-6 text-off-white mx-2 hover:text-gray-300" />
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
