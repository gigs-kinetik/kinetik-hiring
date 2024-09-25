"use client";

import Link from "next/link";
import { useEvents } from "../../../lib/eventsContext";
import { useState, useEffect } from "react";
import { db } from "../../../lib/firebaseConfig";
import { getDocs, collection, doc, query } from "firebase/firestore";

export default function HomePage() {
  const events = useEvents();
  const [submissionIds, setSubmissionIds] = useState([]);
  const [userType, setUserType] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = sessionStorage.getItem("userEmail");

  useEffect(() => {
    const type = sessionStorage.getItem("userType");
    setUserType(type);
  }, []);

  useEffect(() => {
    if (userType === "Developer") {
      fetchSubmissionIds().then((ids) => {
        setSubmissionIds(ids);
        setLoading(false);
      });
    } else if (userType === "Company") {
      fetchChallenges().then(() => setLoading(false));
    }
  }, [userType]);

  useEffect(() => {
    sessionStorage.setItem("submissionIds", JSON.stringify(submissionIds));
  }, [submissionIds]);

  const fetchSubmissionIds = async () => {
    if (!userEmail) return [];
    const submissionsRef = collection(
      db,
      "User Information",
      userEmail,
      "Submissions"
    );
    const q = query(submissionsRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.id);
  };

  const fetchChallenges = async () => {
    if (!userEmail) return [];
    const userDocRef = doc(db, "User Information", userEmail);
    const challengesRef = collection(userDocRef, "Challenges");
    const challengeSnapshot = await getDocs(challengesRef);
    if (!challengeSnapshot.empty) {
      const fetchedChallenges = challengeSnapshot.docs.map((doc) => doc.data());
      setChallenges(fetchedChallenges);
    }
  };

  const handleApplyClick = (event) => {
    sessionStorage.setItem("currentEvent", JSON.stringify(event));
  };

  const isApplied = (eventId) => {
    return submissionIds.includes(eventId);
  };

  if (userType === "Developer" && !loading) {
    return (
      <div className="flex flex-row max-w-full max-h-full">
        <div className="flex flex-col m-4 mb-10 pl-6 pr-6 lg:w-[75%]">
          <div className="flex w-6/12 max-w-6/12">
            <p className="font-poppins mt-1 text-dark-gray font-normal text-md sm:text-lg">
              Challenges for you
            </p>
          </div>
          <div className="w-full mt-4 space-y-4">
            {events.map((event) => (
              <div
                key={event["Event Name"]}
                className="bg-white h-fit rounded-lg p-5"
              >
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <div className="lg:flex flex-row hidden space-x-2 mb-2">
                        {event["Prize List"] &&
                          event["Prize List"]
                            .slice(0, 3)
                            .map((prize, index) => (
                              <div
                                key={index}
                                className="rounded-full bg-logo-purple/65 pl-2 pr-2 font-poppins text-sm font-medium text-white"
                              >
                                {prize}
                              </div>
                            ))}
                      </div>
                      <div className="font-poppins text-xs md:text-sm text-gray-500">
                        {event["Company"]}
                      </div>
                      <div className="font-poppins lg:text-xl sm:text-lg text-md font-semibold text-logo-purple">
                        {event["Event Name"]}
                      </div>
                    </div>
                    <Link
                      href={`/apply/${encodeURIComponent(event["Event Name"])}`}
                      className="w-fit h-fit rounded-lg"
                    >
                      <button
                        className={`rounded-lg font-poppins w-16 md:w-32 h-10 md:text-lg text-xs font-medium text-white ${
                          isApplied(event["Event ID"])
                            ? "bg-green-600/90 cursor-not-allowed"
                            : "bg-logo-purple/85 hover:bg-logo-purple"
                        }`}
                        onClick={() =>
                          !isApplied(event["Event ID"]) &&
                          handleApplyClick(event)
                        }
                        disabled={isApplied(event["Event ID"])}
                      >
                        {isApplied(event["Event ID"]) ? "Applied" : "Apply"}
                      </button>
                    </Link>
                  </div>
                  <div className="font-poppins sm:text-sm text-xs mt-4 mb-4 text-logo-purple">
                    {event["Short Description"] || "No description available"}
                  </div>
                  <div className="lg:flex hidden flex-row justify-between">
                    <div className="font-poppins text-sm text-gray-500">
                      Submit by {event["Deadline"]}
                    </div>
                    <div className="font-poppins text-sm pr-2 text-gray-500">
                      {event["Required Skills"]}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:flex hidden flex-col m-4 pr-6 mb-6 lg:w-[25%] h-full">
          <p className="font-poppins mt-1 text-gray-600 font-normal text-lg">
            Filters
          </p>
          <div className="mt-4 rounded-lg bg-white h-full">
            <div className="ml-4 mt-6 font-poppins font-semibold">
              Challenge Difficulty
            </div>
            <div className="ml-8 mt-2 font-poppins">
              <input
                id="easy-checkbox"
                type="checkbox"
                className="size-4 text-logo-purple/85 rounded focus:ring-logo-purple/85"
              />
              <label
                htmlFor="easy-checkbox"
                className="ms-2 lg:text-sm text-xs text-gray-900"
              >
                Easy (1-2 star)
              </label>
            </div>
            <div className="ml-8 mt-2 font-poppins">
              <input
                id="medium-checkbox"
                type="checkbox"
                className="size-4 text-logo-purple/85 rounded focus:ring-logo-purple/85"
              />
              <label
                htmlFor="medium-checkbox"
                className="ms-2 lg:text-sm text-xs text-gray-900"
              >
                Medium (3 star)
              </label>
            </div>
            <div className="ml-8 mt-2 font-poppins">
              <input
                id="hard-checkbox"
                type="checkbox"
                className="size-4 text-logo-purple/85 rounded focus:ring-logo-purple/85"
              />
              <label
                htmlFor="hard-checkbox"
                className="ms-2 lg:text-sm text-xs text-gray-900"
              >
                Hard (4-5 star)
              </label>
            </div>
            <div className="ml-4 mt-6 font-poppins font-semibold">
              Skill Requirement
            </div>
            <div className="ml-8 mt-2 font-poppins">
              <input
                id="less-than-2-checkbox"
                type="checkbox"
                className="size-4 text-logo-purple/85 rounded focus:ring-logo-purple/85"
              />
              <label
                htmlFor="less-than-2-checkbox"
                className="ms-2 lg:text-sm text-xs text-gray-900"
              >
                &lt; 2 skills
              </label>
            </div>
            <div className="ml-8 mt-2 font-poppins">
              <input
                id="between-2-and-4-checkbox"
                type="checkbox"
                className="size-4 text-logo-purple/85 rounded focus:ring-logo-purple/85"
              />
              <label
                htmlFor="between-2-and-4-checkbox"
                className="ms-2 lg:text-sm text-xs text-gray-900"
              >
                2 to 4 skills
              </label>
            </div>
            <div className="ml-8 mt-2 font-poppins">
              <input
                id="more-than-4-checkbox"
                type="checkbox"
                className="size-4 text-logo-purple/85 rounded focus:ring-logo-purple/85"
              />
              <label
                htmlFor="more-than-4-checkbox"
                className="ms-2 lg:text-sm text-xs text-gray-900"
              >
                &gt; 4 skills
              </label>
            </div>
            <div className="flex w-full justify-end mb-4">
              <button className="rounded-lg bg-logo-purple/85 text-white font-poppins w-24 h-10 font-medium text-sm ml-4 mr-8 mt-8">
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (userType === "Company" && !loading) {
    if (!challenges.empty) {
      return (
        <div className="flex flex-row max-w-full max-h-full">
          <div className="flex flex-col m-4 mb-10 pl-6 pr-6 w-full">
            <div className="flex justify-between w-full">
              <p className="font-poppins text-dark-gray font-normal text-md sm:text-lg">
                Your Dashboard
              </p>
              <button className="rounded-lg bg-green-600 text-white font-poppins pt-2 pb-2 pl-4 pr-4 font-medium text-sm">
                Create New Challenge
              </button>
            </div>
            <div className="w-full mt-4 space-y-4">
              {challenges.map((event) => (
                <div
                  key={event["Event Name"]}
                  className="bg-white h-fit rounded-lg p-5"
                >
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col">
                        <div className="lg:flex flex-row hidden space-x-2 mb-2">
                          {event["Prize List"] &&
                            event["Prize List"]
                              .slice(0, 3)
                              .map((prize, index) => (
                                <div
                                  key={index}
                                  className="rounded-full bg-logo-purple/65 pl-2 pr-2 font-poppins text-sm font-medium text-white"
                                >
                                  {prize}
                                </div>
                              ))}
                        </div>
                        <div className="font-poppins text-xs md:text-sm text-gray-500">
                          {event["Company"]}
                        </div>
                        <div className="font-poppins lg:text-xl sm:text-lg text-md font-semibold text-logo-purple">
                          {event["Event Name"]}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link href="" className="w-fit h-fit rounded-lg">
                          <button className="rounded-lg font-poppins w-16 md:w-32 h-10 md:text-lg text-xs font-medium bg-logo-purple/85 hover:bg-logo-purple text-white">
                            Pay
                          </button>
                        </Link>
                        <Link href="" className="w-fit h-fit rounded-lg">
                          <button className="rounded-lg font-poppins w-16 md:w-32 h-10 md:text-lg text-xs font-medium bg-logo-purple/85 hover:bg-logo-purple text-white">
                            View
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="font-poppins sm:text-sm text-xs mt-4 mb-4 text-logo-purple">
                      {event["Short Description"] || "No description available"}
                    </div>
                    <div className="lg:flex hidden flex-row justify-between">
                      <div className="font-poppins text-sm text-gray-500">
                        Submit by {event["Deadline"]}
                      </div>
                      <div className="font-poppins text-sm pr-2 text-gray-500">
                        {event["Required Skills"]}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  return <div></div>;
}
