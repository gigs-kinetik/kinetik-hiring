"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCardIcon,
  UserGroupIcon,
  CommandLineIcon,
  DocumentChartBarIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  BriefcaseIcon,
  NewspaperIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/16/solid";
import { db } from "../../lib/firebaseConfig";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { Button } from "@headlessui/react";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email) {
      try {
        const docRef = doc(db, "Company Information", "Interested Customers");
        await updateDoc(docRef, {
          emails: arrayUnion(email),
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
          <div className="flex space-x-10 text-off-white sm:text-lg text-sm">
            <Link
              href="https://calendly.com/kinetikgigs/chat-with-kinetik"
              className="font-normal bg-logo-purple/70 text-off-white px-6 py-2 rounded-2xl hover:bg-logo-purple/90 transition duration-300 h-fit"
            >
              Book a Demo
            </Link>
            <div className="flex flex-col sm:flex-row sm:space-x-10 font-semibold sm:items-center items-end">
              <Link
                href="/login"
                className="group transition-all duration-1000 sm:mt-0"
              >
                Log In
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 rounded-xl bg-off-white"></span>
              </Link>
              <Link
                href="/signup"
                className="group transition-all duration-1000 mt-2 sm:mt-0"
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
        <div className="flex flex-row justify-center mt-28 mb-20">
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
        </div>
        <div className="flex flex-col bg-off-white w-full pb-20 pt-14 px-8">
          <div className="flex text-logo-purple font-medium sm:text-3xl text-2xl justify-center mb-2">
            Why Kinetik?
          </div>
          <div className="flex text-gray-500 font-normal sm:text-lg text-md text-center justify-center mb-14 mx-8">
            Move fast and agile with quality. Operationalize your MVPs in little
            to no time.
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
                Cash Prizes
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
                Internships
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

      <div className="section text-logo-purple flex flex-col">
        <div className="bg-off-white w-full h-full">
          <div className="p-5 mx-20 mt-24 mb-40 h-fit flex flex-col items-end">
            <div className="flex w-full sm:flex-row flex-col space-y-10 sm:space-x-10 sm:space-y-0 text-sm md:text-lg font-medium justify-around md:mb-10 md:text-left text-center place-items-center">
              <div className="flex flex-col w-80 items-center">
                <CommandLineIcon className="fill-logo-purple/85 size-14 md:size-28 mb-6" />
                Host Company-Relevant Coding Challenges and Get Multiple
                High-Quality MVP Submissions.
              </div>
              <div className="flex flex-col w-80 items-center">
                <DocumentChartBarIcon className="fill-logo-purple/85 size-14 md:size-28 mb-6" />
                Receive Comprehensive Reports on Challenge Submissions, Tailored
                to What You Need.
              </div>
              <div className="flex flex-col w-80 items-center">
                <SparklesIcon className="fill-logo-purple/85 size-14 md:size-28 mb-6" />
                Iterate on Ideas, Quickly Build MVPs, Hire Talent, and Promote
                Yourself.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section bg-gradient-to-br from-logo-purple/95 via-mid-purple/40 via-75% to-transparent h-full">
        <div className="p-5 mx-20 mt-24 mb-40 h-fit flex flex-col items-start">
          <div className="font-semibold text-2xl text-off-white md:text-3xl">
            Developers
          </div>
          <div className="h-1.5 w-9 md:w-12 rounded-xl bg-off-white mb-6"></div>
          <div className="font-normal text-md md:text-2xl mb-20 sm:mb-28 text-off-white">
            Level up your skills while winning prizes. Find internships. Build
            your resume.
          </div>
          <div className="flex w-full sm:flex-row flex-col space-y-10 sm:space-x-10 sm:space-y-0 text-sm md:text-lg font-medium justify-around md:mb-10 md:text-left text-center place-items-center">
            <div className="flex flex-col w-80 items-center text-white">
              <NewspaperIcon className="fill-white size-14 md:size-28 mb-6" />
              Learn Advanced Skills, Grow Your Resume, and Strengthen Your Tech
              Stack for Future Jobs.
            </div>
            <div className="flex flex-col w-80 items-center text-off-white">
              <CreditCardIcon className="fill-white size-14 md:size-28 mb-6" />
              Compete for Reputed Internships, Lucrative Cash Prizes, Exclusive
              Credits, and Other Rewards.
            </div>
            <div className="flex flex-col w-80 items-center text-off-white">
              <UserGroupIcon className="fill-white size-14 md:size-28 mb-6" />
              Earn Prestigious Badges, Enhance Your Professional Portfolio, and
              Post on LinkedIn.
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row text-xs sm:text-sm px-10 py-5 text-off-white bg-logo-purple/85 h-20 justify-center sm:justify-between">
        <div className="md:flex hidden self-center">
          Please contact for any inquiries.
        </div>
        <div className="sm:flex hidden text-center self-center">
          @2024 Kinetik. All Rights Reserved.
        </div>
        <div className="flex flex-col text-right self-center">
          <div>info@kinetikgigs.com</div>
        </div>
      </div>
    </div>
  );
}
