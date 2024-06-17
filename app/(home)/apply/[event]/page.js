"use client";

import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ApplyPage() {
  const path = usePathname();
  const eventName = decodeURI(path.split("/").pop());
  const [descriptions, setDescriptions] = useState(null);
  const [error, setError] = useState(null);
  const [projectLink, setProjectLink] = useState("");
  const [resumeLink, setResumeLink] = useState("");

  const fetchDescriptionDocument = async (eventName) => {
    try {
      const response = await fetch(
        `/api/getDescriptionDocs?collectionID=${encodeURIComponent(eventName)}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setDescriptions(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (eventName) {
      fetchDescriptionDocument(eventName);
    }
  }, [eventName]);

  return (
    <div className="flex flex-col ml-10 mr-10 mb-10 mt-4">
      <div className="flex flex-row mb-4 place align-middle">
        <Link href="/home">
          <ArrowUturnLeftIcon className="flex-shrink-0 size-7 mt-1 fill-gray-600" />
        </Link>
        <p className="font-poppins mt-1 ml-4 text-gray-600 font-normal text-lg">
          Challenge Submission
        </p>
      </div>
      <form onClick={null}>
        <div className="flex flex-col bg-white rounded-lg p-5">
          <div className="flex flex-row justify-between ">
            <div className="flex flex-col">
              <div className="font-poppins lg:text-3xl text-xl font-semibold text-logo-purple">
                {eventName}
              </div>
              <div className="font-poppins mt-2 lg:flex lg:text-xs hidden text-gray-500">
                {descriptions?.time}
              </div>
            </div>
          </div>
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
            Task
          </div>
          <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
            {descriptions?.task}
          </div>
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
            Prize Pool
          </div>
          <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
            {descriptions?.prizes}
          </div>
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
            Difficulty
          </div>
          <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
            {descriptions?.difficulty}
          </div>
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
            Skill Requirements
          </div>
          <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
            {descriptions?.skill}
          </div>
          <div className="font-poppins sm:text-lg font-semibold text-sm text-logo-purple block mt-4 mb-2 dark:text-white">
            Upload Project Submission
          </div>
          <input
            className="flex font-poppins max-w-96 text-sm text-gray-900 border border-gray-300 rounded-md cursor-text bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-logo-purple/90"
            type="text"
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
          />
          <p class="font-poppins mt-1 text-sm text-gray-500 dark:text-gray-300 mb-4">
            Please attach your GitHub or Google Drive link.
          </p>
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple block mb-2 dark:text-white">
            Upload Resume
          </div>
          <input
            className="flex font-poppins max-w-96 text-sm text-gray-900 border border-gray-300 rounded-md cursor-text bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-logo-purple/90"
            type="text"
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
          />
          <p class="font-poppins mt-1 text-sm text-gray-500 dark:text-gray-300">
            Please attach your Google Drive link.
          </p>
          <div>
            <button className="rounded-lg bg-logo-purple/85 text-white font-poppins w-32 h-10 font-medium mt-10 mb-5">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
