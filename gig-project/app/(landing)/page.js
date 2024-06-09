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
    const animateTopText = () => {
      const elements = document.querySelectorAll(".top-animated-text");
      elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
        el.classList.add("fade-slide-in");
      });
    };
    animateTopText();

    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll(".animated-text");
          elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.2}s`;
            el.classList.add("fade-slide-in");
          });
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleScroll, {
      threshold: 0.1,
    });

    const sections = document.querySelectorAll(".section");

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleScrollDown = () => {
    if (window.scrollY === 0) {
      const viewportHeight = window.innerHeight;
      window.scrollBy({ top: viewportHeight, behavior: "smooth" });
    }
  };

  return (
    <div className="font-poppins h-full flex flex-col">
      <div className="relative h-screen bg-gradient-to-tl from-logo-purple/95 via-mid-purple/40 via-65% to-transparent">
        <div className="relative z-10 flex justify-between p-5 mx-20 mt-5">
          <div className="text-4xl font-extrabold text-logo-purple">
            <img className="w-36" src="/name.png" alt="Company Logo" />
          </div>
          <div
            className={`flex space-x-10 md:text-lg text-sm font-semibold text-off-white ${
              showButton ? "fade-in" : "opacity-0"
            }`}
          >
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
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center text-center space-y-5">
            <div className="md:text-7xl text-5xl font-bold text-logo-purple">
              <div className="top-animated-text opacity-0">Redefining What</div>
              <div className="flex flex-row">
                <div className="top-animated-text opacity-0 ml-4">
                  It Means To
                </div>
                <div className="top-animated-text ml-4 opacity-0 text-off-white/80">
                  Gig
                </div>
                <div className="top-animated-text opacity-0">.</div>
              </div>
            </div>
            <div className="flex space-x-2 md:text-2xl text-lg font-semibold text-logo-purple/70">
              <div className="top-animated-text opacity-0">
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
      <div
        id="students-section"
        className="section text-logo-purple flex flex-col"
      >
        <div className="bg-off-white w-full h-full">
          <div className="p-5 mx-20 mt-24 mb-52 h-fit flex flex-col items-start">
            <div className="font-semibold text-3xl animated-text opacity-0">
              Students
            </div>
            <div className="h-1.5 w-12 rounded-xl bg-logo-purple mb-6 animated-text opacity-0"></div>
            <div className="font-normal text-lg md:text-2xl mb-28 text-gray-900 animated-text opacity-0">
              Finding internships is hard. Take part in our Gigs and we will
              help you.
            </div>
            <div className="w-full flex space-x-10 text-sm md:text-lg font-medium justify-around">
              <div className="flex flex-col w-80 items-center animated-text opacity-0">
                <NewspaperIcon className="fill-logo-purple/85 size-14 md:size-28 mb-6" />
                Learn Advanced Skills, Grow Your Resume, and Strengthen Your
                Tech Stack for Future Jobs.
              </div>
              <div className="flex flex-col w-80 items-center animated-text opacity-0">
                <CreditCardIcon className="fill-logo-purple/85 size-14 md:size-28 mb-6" />
                Compete for Reputed Internships, Lucrative Cash Prizes,
                Exclusive Credits, and Other Rewards.
              </div>
              <div className="flex flex-col w-80 items-center animated-text opacity-0">
                <UserGroupIcon className="fill-logo-purple/85 size-14 md:size-28 mb-6 text-justify" />
                Earn Prestigious Badges, Enhance Your Professional Portfolio,
                and Post on LinkedIn.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="organizations-section"
        className="section bg-gradient-to-br from-logo-purple/95 via-mid-purple/40 via-75% to-transparent h-full"
      >
        <div className="p-5 mx-20 mt-24 mb-40 h-fit flex flex-col items-end">
          <div className="font-semibold text-3xl text-off-white animated-text opacity-0">
            Organizations
          </div>
          <div className="h-1.5 w-12 rounded-xl bg-off-white mb-6 animated-text opacity-0"></div>
          <div className="font-normal text-lg md:text-2xl mb-32 text-off-white animated-text opacity-0">
            Hiring is tedious. We will bring the Top Talent to you.
          </div>
          <div className="w-full flex space-x-10 text-sm md:text-lg font-medium justify-around mb-10 text-white">
            <div className="flex flex-col w-80 items-center animated-text opacity-0">
              <CommandLineIcon className="fill-white size-14 md:size-28 mb-6" />
              Host Company-Relevant Coding Challenges and Attract Qualified
              Applicants.
            </div>
            <div className="flex flex-col w-80 items-center animated-text opacity-0">
              <DocumentChartBarIcon className="fill-white size-14 md:size-28 mb-6" />
              Receive Comprehensive Reports on Challenge Metrics, Including User
              Performance and Strength.
            </div>
            <div className="flex h-fit flex-col w-80 items-center animated-text opacity-0">
              <SparklesIcon className="fill-white size-14 md:size-28 mb-6 text-justify" />
              Leverage our AI-Powered Grading Algorithm to Automatically Assess
              Coding Submissions and Resumes.
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row text-sm px-10 py-5 text-off-white bg-logo-purple/85 h-20 justify-between">
        <div className="self-center">Please contact for any inquiries.</div>
        <div className="text-center self-center">
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
