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
      <header className="bg-gradient-to-tl from-logo-purple/95 via-mid-purple/40 via-65% to-transparent">
        <nav className="flex justify-between p-5 mx-8 mt-5">
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
              className="font-normal bg-logo-purple/55 text-off-white px-6 py-2 rounded-2xl hover:bg-logo-purple/90 transition duration-300 h-fit"
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
                className="group transition-all duration-1000 sm:mt-0"
              >
                Sign Up
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 rounded-xl bg-off-white"></span>
              </Link>
            </div>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-start pt-24">
          <div className="text-center space-y-6">
            <h1 className="md:text-6xl text-3xl font-bold text-logo-purple">
              <span className="text-off-white/90">Visualize </span>
              <span>your ideas at scale</span>
            </h1>
            <p className="md:text-2xl text-md font-semibold text-logo-purple/70">
              Design, Build, and Test at Lightning Speeds.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center mt-28 mb-20">
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
          <small className="text-off-white mt-4">
            *if you are a company, please sign up for updates
          </small>
        </div>
      </header>
      <section className="bg-off-white w-full pb-20 pt-14 px-8">
        <h2 className="text-logo-purple font-medium sm:text-3xl text-2xl text-center mb-2">
          Why Kinetik?
        </h2>
        <p className="text-gray-500 font-normal sm:text-lg text-md text-center mb-8 mx-8">
          Move fast and agile with quality. Operationalize your MVPs in little
          to no time.
        </p>
        <div className="flex justify-center">
          <div className="h-1 w-6 md:w-9 rounded-xl bg-logo-purple mb-14"></div>
        </div>
        <div className="flex flex-col xl:flex-row justify-center space-y-10 xl:space-y-0 xl:space-x-10 px-4">
          {[
            {
              title: "Efficient execution",
              text: "We will get you multiple iterations in less than 4 days.",
              value: "< 4",
              unit: "days",
            },
            {
              title: "Quality development",
              text: "We have the highest standards: our job is not done until you like it.",
              value: "100%",
              unit: "satisfaction",
            },
            {
              title: "Best-in-class",
              text: "We have the most skilled developers in our global network.",
              value: "1000+",
              unit: "developers",
            },
          ].map(({ title, text, value, unit }) => (
            <div
              key={title}
              className="flex flex-col bg-white p-8 text-logo-purple rounded-xl shadow-md flex-1"
            >
              <div className="sm:text-xl text-md font-semibold mb-8 text-center">
                {title}
              </div>
              <div className="flex justify-center mb-8 items-baseline">
                <span className="font-normal sm:text-5xl text-2xl">
                  {value}
                </span>
                <span className="text-md ml-2">{unit}</span>
              </div>
              <div className="font-normal sm:text-md text-sm text-gray-400 text-center">
                {text}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white w-full pb-10 pt-14">
        <h2 className="text-logo-purple font-medium text-2xl sm:text-3xl text-center mb-2">
          How does Kinetik work?
        </h2>
        <p className="text-gray-500 font-normal text-md sm:text-lg text-center mb-2">
          It is very simple.
        </p>
        <div className="flex justify-center">
          <div className="h-1 w-6 md:w-9 rounded-xl bg-logo-purple mt-6 mb-6"></div>
        </div>
        {[
          {
            title: "Specify Requirements",
            description:
              "Decide what technologies you are looking to use and what kind of product you are looking to build.",
            categories: [
              {
                title: "Technical Projects",
                items: ["/aws-logo.webp", "/react-logo.png", "/gpt-logo.png"],
                text: "Mobile Apps, Web Apps, AI Agents, LLM Dev",
              },
              {
                title: "Business Projects",
                items: [
                  "/excel-logo.png",
                  "/powerbi-logo.png",
                  "/powerpoint-logo.png",
                ],
                text: "Strategy Decks, Business Plans, Case Studies",
              },
              {
                title: "Design Projects",
                items: [
                  "/figma-logo.webp",
                  "/canva-logo.png",
                  "/photoshop-logo.png",
                ],
                text: "Creative Designs, Logos, CX, Social Media Marketing",
              },
            ],
          },
          {
            title: "Provide Incentives",
            description:
              "Offer prizes for the developers: you choose how you want to allocate them.",
            categories: [
              {
                title: "Cash Prizes",
                icon: (
                  <CurrencyDollarIcon className="fill-logo-purple/95 size-20" />
                ),
                text: "Monetary rewards for best MVPs.",
              },
              {
                title: "Internships",
                icon: <BriefcaseIcon className="fill-logo-purple/95 size-20" />,
                text: "Internships, gigs, or job offers for top developers.",
              },
              {
                title: "Equity",
                icon: <NewspaperIcon className="fill-logo-purple/95 size-20" />,
                text: "Buy-off MVP or sign stake for stunning mockups.",
              },
              {
                title: "Company Perks",
                icon: (
                  <CursorArrowRaysIcon className="fill-logo-purple/95 size-20" />
                ),
                text: "Credits, swag, or other exclusive company benefits.",
              },
            ],
          },
        ].map(({ title, description, categories }, index) => (
          <div
            key={title}
            className={`flex flex-col xl:flex-row mt-14 mx-14 pb-14 text-off-white border-b-2 ${
              index > 0 && "mt-14"
            }`}
          >
            <div className="flex flex-col justify-center w-full xl:w-96 mb-4 xl:mb-0 xl:pr-8">
              <div className="flex text-logo-purple font-medium text-center text-xl sm:text-2xl justify-center">
                {title}
              </div>
              <div className="flex text-gray-500 text-center text-sm sm:text-md mt-4 justify-center px-4">
                {description}
              </div>
            </div>
            <div className="flex flex-row flex-wrap justify-around w-full">
              {categories.map(({ title, items, icon, text }) => (
                <div
                  key={title}
                  className="flex flex-col items-center m-4 justify-center"
                >
                  <div className="text-center font-medium text-logo-purple mb-2 text-base sm:text-lg">
                    {title}
                  </div>
                  <div className="flex p-5 rounded-xl justify-center items-center">
                    {items ? (
                      <div className="flex flex-col w-52 p-5 rounded-xl bg-off-white h-44">
                        <div className="flex justify-center mb-4">
                          <img className="w-16" src={items[0]} />
                        </div>
                        <div className="flex justify-around">
                          <img className="w-12" src={items[1]} />
                          <img className="w-12" src={items[2]} />
                        </div>
                      </div>
                    ) : (
                      icon
                    )}
                  </div>
                  <div className="text-center font-light text-logo-purple mt-2 w-52 text-xs sm:text-sm">
                    {text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-col xl:flex-row mt-14 mx-14 pb-14 text-off-white border-b-2">
          <div className="flex flex-col justify-center w-full xl:w-96 mb-4 xl:mb-0 xl:pr-8">
            <div className="flex text-logo-purple font-medium text-center text-xl sm:text-2xl justify-center">
              Host a Challenge
            </div>
            <div className="flex text-gray-500 text-center text-sm sm:text-md mt-4 justify-center px-4">
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
            <div className="text-logo-purple font-medium text-center text-xl sm:text-2xl">
              Finally, wait for Kinetik's comprehensive report on the
              submissions!
            </div>
            <div className="text-gray-500 text-center text-sm sm:text-md mt-4 px-4">
              You will receive all the submissions as well as Kinetik's
              assessment of the work.
            </div>
          </div>
        </div>
      </section>
      <footer className="flex flex-row text-xs sm:text-sm px-10 py-5 text-off-white bg-logo-purple/85 h-20 justify-center sm:justify-between">
        <div className="md:flex hidden self-center">
          Please contact for any inquiries.
        </div>
        <div className="sm:flex hidden text-center self-center">
          @2024 Kinetik. All Rights Reserved.
        </div>
        <div className="flex flex-col text-right self-center">
          <div>info@kinetikgigs.com</div>
        </div>
      </footer>
    </div>
  );
}
