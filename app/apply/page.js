import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { addToEventDB, getSetupDocumentValues } from "../../../../backend/firebaseDB/firebase";

export default function ApplyPage() {
  const [projectLink, setProjectLink] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [setupValues, setSetupValues] = useState({
    difficulty: '',
    prizePool: '',
    skill: '',
    task: '',
    time: ''
  });
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    const storedEventName = localStorage.getItem('selectedEvent');
    if (storedEventName) {
      setEventName(storedEventName);
      fetchSetupValues(storedEventName);
    }
  }, []);

  const fetchSetupValues = async (eventName) => {
    const values = await getSetupDocumentValues(eventName);
    setSetupValues(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addToEventDB(eventName, projectLink, resumeLink);
      alert("Submission successful!");
    } catch (error) {
      console.error("Error submitting data: ", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col ml-10 mr-10 mb-10 mt-4">
      <div className="flex flex-row mb-4">
        <Link href="/">
          <ArrowUturnLeftIcon className="flex-shrink-0 size-8 mt-1 mr-3" />
        </Link>
        <p className="font-poppins mt-1 ml-4 text-gray-600 font-normal text-lg">
          Challenge Submission
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col bg-white rounded-lg p-5">
        <div className="flex flex-row justify-between ">
          <div className="flex flex-col">
            <div className="font-poppins lg:text-3xl text-xl font-semibold text-logo-purple">
              {eventName}
            </div>
            <div className="font-poppins mt-2 lg:flex lg:text-xs hidden text-gray-500">
              {setupValues.time}
            </div>
          </div>
          <button className="rounded-lg bg-mid-purple text-white font-poppins w-32 h-10 font-medium">
            Apply
          </button>
        </div>
        <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
          Task
        </div>
        <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
          {setupValues.task}
        </div>
        <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
          Prize Pool 
        </div>
        <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
          {setupValues.prizePool}
        </div>
        <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
          Difficulty
        </div>
        <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
          {setupValues.difficulty}
        </div>
        <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
          Skill Requirements
        </div>
        <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
          {setupValues.skill}
        </div>
<<<<<<< Updated upstream:gig-project/app/apply/page.js
      </div>
=======
        <div className="font-poppins sm:text-lg font-semibold text-sm text-logo-purple block mt-4 mb-2 dark:text-white">
          Upload Project Submission
        </div>
        <input
          className="flex font-poppins max-w-96 text-sm text-gray-900 border border-gray-300 rounded-md cursor-text bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-logo-purple/90"
          type="text"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
        />
        <p className="font-poppins mt-1 text-sm text-gray-500 dark:text-gray-300 mb-4">
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
        <p className="font-poppins mt-1 text-sm text-gray-500 dark:text-gray-300">
          Please attach your Google Drive link.
        </p>
        <div>
          <button
            type="submit"
            className="rounded-lg bg-logo-purple/85 text-white font-poppins w-32 h-10 font-medium mt-10 mb-5"
          >
            Submit
          </button>
        </div>
      </form>
>>>>>>> Stashed changes:gig-project/app/(home)/apply/page.js
    </div>
  );
} 