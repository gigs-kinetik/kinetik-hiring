"use client";

import Link from "next/link";
import {
  ArrowDownCircleIcon,
  NewspaperIcon,
  CreditCardIcon,
  UserGroupIcon,
  CommandLineIcon,
  DocumentChartBarIcon,
  SparklesIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const animateText = () => {
      const elements = document.querySelectorAll(".animated-text");
      elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
        el.classList.add("fade-slide-in");
      });
    };
    animateText();

    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleScrollDown = () => {
    if (window.scrollY == 0) {
      const viewportHeight = window.innerHeight;
      window.scrollBy({ top: viewportHeight, behavior: "smooth" });
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="relative h-screen bg-gradient-to-tl from-logo-purple/95 via-mid-purple/40 via-65% to-transparent">
        <div className="absolute inset-0 bg-noise"></div>
        <div className="relative z-10 flex flex-row justify-between p-5 ml-20 mr-20 mt-5">
          <div className="text-4xl font-extrabold text-logo-purple">
            <img className="w-36" src="/name.png" alt="Company Logo" />
          </div>
          <div
            className={`flex flex-row space-x-10 md:text-lg text-sm font-semibold text-off-white ${
              showButton ? "fade-in" : "opacity-0"
            }`}
          >
            <div className="mt-2">
              <Link href="/home" className="group transition-all duration-1000">
                Log In
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 rounded-xl bg-off-white"></span>
              </Link>
            </div>
            <div className="mt-2">
              <Link href="/home" className="group transition-all duration-1000">
                Sign Up
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 rounded-xl bg-off-white"></span>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center text-center space-y-5">
            <div className="md:text-7xl text-5xl font-bold text-logo-purple">
              <div className="animated-text opacity-0">Redefining What</div>
              <div className="flex flex-row">
                <div className="animated-text opacity-0 ml-4">It Means To</div>
                <div className="animated-text ml-4 opacity-0 text-off-white/80">
                  Gig
                </div>
                <div className="animated-text opacity-0">.</div>
              </div>
            </div>
            <div className="flex space-x-2 md:text-2xl text-lg font-semibold text-logo-purple/70">
              <div className="animated-text opacity-0">
                The Premier Platform for Tech Gigs.
              </div>
            </div>
          </div>
          <div className={`mt-28 mb-8 ${showButton ? "fade-in" : "opacity-0"}`}>
            <button className="animate-bounce" onClick={handleScrollDown}>
              <ArrowDownCircleIcon className="h-14 w-14 fill-logo-purple/80" />
            </button>
          </div>
        </div>
      </div>
      <div className="font-poppins text-logo-purple flex flex-col">
        <div className="bg-off-white w-full h-full">
          <div className="p-5 ml-20 mr-20 mt-16 mb-20 h-fit flex flex-col items-start">
            <div className="font-semibold text-3xl">Students</div>
            <div className="h-1.5 w-12 rounded-xl bg-logo-purple mb-6"></div>
            <div className="font-normal text-lg md:text-2xl mb-10 text-gray-900">
              Finding internships is hard. Take part in our Gigs and we will
              help you.
            </div>
            <div className="font-normal text-lg md:text-2xl mb-20 text-gray-900">
              Complete our Gigs to:
            </div>
            <div className="w-full flex flex-row space-x-10 text-sm md:text-lg font-medium justify-around">
              <div className="flex flex-col w-80 items-center">
                <NewspaperIcon className="fill-logo-purple/85 size-14 md:size-28 mb-4" />
                Learn Advanced Skills, Grow Your Resume, and Strengthen Your
                Tech Stack for Future Jobs.
              </div>
              <div className="flex flex-col w-80 items-center">
                <CreditCardIcon className="fill-logo-purple/85 size-14 md:size-28 mb-4" />
                Compete for Reputed Internships, Lucrative Cash Prizes,
                Exclusive Credits, and Other Rewards.
              </div>
              <div className="flex flex-col w-80 items-center">
                <UserGroupIcon className="fill-logo-purple/85 size-14 md:size-28 mb-4 text-justify" />
                Earn Prestigious Badges, Enhance Your Professional Portfolio,
                and Post on LinkedIn.
              </div>
            </div>
          </div>
        </div>
        <div className="font-poppins bg-gradient-to-br from-logo-purple/95 via-mid-purple/40 via-75% to-transparent h-full">
          <div className="p-5 ml-20 mr-20 mt-16 mb-16 h-fit flex flex-col items-end">
            <div className="font-semibold text-3xl text-off-white">
              Organizations
            </div>
            <div className="h-1.5 w-12 rounded-xl bg-off-white mb-6"></div>
            <div className="font-normal text-lg md:text-2xl mb-24 text-off-white">
              Hiring is tedious. We will bring the Top Talent to you.
            </div>
            <div className="w-full flex flex-row space-x-10 text-sm md:text-lg font-medium justify-around mb-10 text-white">
              <div className="flex flex-col w-80 items-center">
                <CommandLineIcon className="fill-white size-14 md:size-28 mb-4" />
                Host Company-Based Coding Challenges and Attract Qualified
                Applicants.
              </div>
              <div className="flex flex-col w-80 items-center">
                <DocumentChartBarIcon className="fill-white size-14 md:size-28 mb-4" />
                Receive Comprehensive Reports on Challenge Metrics, Including
                User Performance and Strength.
              </div>
              <div className="flex h-fit flex-col w-80 items-center">
                <SparklesIcon className="fill-white size-14 md:size-28 mb-4 text-justify" />
                Leverage our AI-Powered Grading System to Automatically Assess
                Coding Submissions and Resumes.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row text-sm pl-10 pr-10 pt-5 pb-5 font-poppins text-off-white bg-logo-purple/85 h-20 justify-between">
        <div className="flex self-center">
          Please contact for any inquiries.
        </div>
        <div className="flex text-center self-center">
          @2024 Kinetik. All Rights Reserved.
        </div>
        <div className="flex flex-col text-right self-end">
          <div>pran.singaraju@gmail.com</div>
          <div>agnithegreat@gmail.com</div>
        </div>
      </div>
    </div>
  );
}
