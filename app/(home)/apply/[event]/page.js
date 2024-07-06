"use client";

import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../../../lib/firebaseConfig";
import { doc, setDoc, collection } from "firebase/firestore";

export default function ApplyPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [projectLink, setProjectLink] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [validationError, setValidationError] = useState("");
  const [event, setEventInfo] = useState(null);

  useEffect(() => {
    const storedEvent = sessionStorage.getItem("currentEvent");
    if (storedEvent) {
      setEventInfo(JSON.parse(storedEvent));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = sessionStorage.getItem("userEmail");
    if (!projectLink || !resumeLink) {
      setValidationError("Both project link and resume link are required.");
      return;
    } else {
      setValidationError("");
    }

    try {
      const userInfoRef = doc(db, "User Information", userEmail);
      const submissionsRef = collection(userInfoRef, "Submissions");
      await setDoc(doc(submissionsRef, event["Event ID"]), {
        eventName: event["Event Name"],
        projectLink: projectLink,
        resumeLink: resumeLink,
      });
      router.push("/home");
      alert("Submission successful!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Submission failed.");
    }
  };

  if (!event) {
    return <div></div>;
  }

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
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col bg-white rounded-lg p-5">
          <div className="flex flex-row justify-between ">
            <div className="flex flex-col">
              <div className="font-poppins lg:text-3xl text-xl font-semibold text-logo-purple">
                {event["Event Name"]}
              </div>
              <div className="font-poppins mt-2 lg:flex lg:text-xs hidden text-gray-500">
                Deadline: {event["Deadline"]}
              </div>
            </div>
          </div>
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
            Task
          </div>
          <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
            {event["Long Description"]}
          </div>
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
            Prize Pool
          </div>
          <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
            {event["Prize List"] &&
              event["Prize List"].map((prize, index) => (
                <div key={index}>{prize}</div>
              ))}
          </div>
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
            Difficulty
          </div>
          <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
            This project will take around {event["Time Needed"]} to complete.
          </div>
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
            Skill Requirements
          </div>
          <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
            This challenge will require you to utilize the following skills to
            the best of your ablity: {event["Required Skills"]}.
          </div>
          <div className="font-poppins sm:text-lg font-semibold text-sm text-logo-purple block mt-4 mb-2">
            Upload Project Submission
          </div>
          <p className="font-poppins mt-1 sm:text-sm text-xs text-gray-500 dark:text-gray-300">
            Please attach your GitHub link (public repo) or Google Drive link
            (allow access to anyone).
          </p>
          <input
            className="flex font-poppins max-w-96 text-sm text-gray-900 border border-gray-300 rounded-md cursor-text bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-logo-purple/90"
            type="text"
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
          />
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple block mb-2">
            Upload Resume
          </div>
          <p className="font-poppins mt-1 sm:text-sm text-xs text-gray-500 dark:text-gray-300">
            Please attach your Google Drive link (allow access to anyone).
          </p>
          <input
            className="flex font-poppins max-w-96 text-sm text-gray-900 border border-gray-300 rounded-md cursor-text bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-logo-purple/90"
            type="text"
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
          />
          {validationError && (
            <p className="font-poppins text-red-700 font-medium text-sm mt-4">
              {validationError}
            </p>
          )}
          <div>
            <button
              type="submit"
              className="rounded-lg bg-logo-purple/85 text-white font-poppins w-32 h-10 font-medium mt-6 mb-5"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      {error && (
        <p className="font-poppins text-red-700 font-medium text-sm mt-4">
          {error}
        </p>
      )}
    </div>
  );
}
