"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  NewspaperIcon,
  CreditCardIcon,
  UserGroupIcon,
  CommandLineIcon,
  DocumentChartBarIcon,
  SparklesIcon,
} from "@heroicons/react/16/solid";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email) {
      window.location.href =
        "https://calendly.com/kinetikgigs/chat-with-kinetik";
    }
  };

  return (
    <div className="font-poppins h-full flex flex-col">
      <div className="relative h-screen bg-gradient-to-tl from-logo-purple/95 via-mid-purple/40 via-65% to-transparent">
        <div className="relative z-10 flex justify-between p-5 mx-8 mt-5">
          <div className="text-logo-purple flex-shrink-0">
            <img
              className="w-full max-w-24 sm:max-w-28 md:max-w-32 lg:max-w-36 h-auto"
              src="/name.png"
              alt="Company Logo"
            />
          </div>
          <div className="flex space-x-10 sm:text-lg text-sm font-semibold text-off-white">
            <div className="mt-2">
              <Link
                href="/login"
                className="group transition-all duration-1000"
              >
                Log In
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 rounded-xl bg-off-white"></span>
              </Link>
            </div>
            <div className="mt-2">
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
          <div className="flex flex-col items-center text-center space-y-8">
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
        <div className="flex flex-row justify-center mt-28">
          <form
            className="flex items-center bg-off-white rounded-full px-4 py-2 w-full max-w-lg justify-between space-x-4"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Your work email"
              className="flex-grow border-none bg-transparent focus:ring-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-logo-purple/70 text-off-white px-6 py-2 rounded-full hover:bg-logo-purple/90 transition duration-300"
            >
              Book a Demo
            </button>
          </form>
        </div>
      </div>
      <div className="section text-logo-purple flex flex-col">
        <div className="bg-off-white w-full h-full">
          <div className="p-5 mx-20 mt-24 mb-40 h-fit flex flex-col items-end">
            <div className="font-normal text-md lg:text-left text-right md:text-2xl mb-20 sm:mb-28 text-gray-900">
              Move fast and agile with quality. Operationalize your MVPs in
              little to no time.
            </div>
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
