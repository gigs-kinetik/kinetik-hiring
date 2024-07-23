"use client";

import Link from "next/link";
import { StarIcon } from "@heroicons/react/16/solid";
import { useEvents } from "../../../lib/eventsContext";
import { useState, useEffect } from "react";
import { db } from "../../../lib/firebaseConfig";
import { getDocs, collection, query } from "firebase/firestore";

export default function HomePage() {
  const events = useEvents();
  const [submissionIds, setSubmissionIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetchSubmissionIds().then((ids) => {
      setSubmissionIds(ids);
      setIsLoading(false);
    });

    const filteredEventsFromStorage = JSON.parse(
      sessionStorage.getItem("filteredEvents") || "[]"
    );
    setFilteredEvents(filteredEventsFromStorage);
  }, []);

  const fetchSubmissionIds = async () => {
    const userEmail = sessionStorage.getItem("userEmail");
    const submissionsRef = collection(
      db,
      "User Information",
      userEmail,
      "Submissions"
    );
    const q = query(submissionsRef);
    const querySnapshot = await getDocs(q);
    const ids = querySnapshot.docs.map((doc) => doc.id);
    return ids;
  };

  const timeToStars = (timeStr) => {
    const timeParts = timeStr.split(" ");
    let minutes = 0;
    for (let i = 0; i < timeParts.length; i += 2) {
      const value = parseInt(timeParts[i]);
      const unit = timeParts[i + 1];
      if (unit.startsWith("mins")) {
        minutes += value;
      } else if (unit.startsWith("hours")) {
        minutes += value * 60;
      }
    }
    if (minutes <= 120) {
      return 1;
    } else if (minutes <= 240) {
      return 2;
    } else if (minutes <= 360) {
      return 3;
    } else if (minutes <= 480) {
      return 4;
    } else {
      return 5;
    }
  };

  const generateStars = (starCount) => {
    const totalStars = 5;
    const filledStars = Math.min(Math.max(starCount, 0), totalStars);
    const emptyStars = totalStars - filledStars;

    return (
      <div className="flex flex-row">
        {[...Array(filledStars)].map((_, index) => (
          <StarIcon key={index} className="size-5 fill-logo-purple/85" />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <StarIcon key={index} className="size-5 fill-gray-400" />
        ))}
      </div>
    );
  };

  const handleApplyClick = async (event) => {
    sessionStorage.setItem("currentEvent", JSON.stringify(event));
  };

  const isApplied = (eventId) => {
    return submissionIds.includes(eventId);
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="flex flex-row max-w-full max-h-full">
      <div className="flex flex-col m-4 mb-10 pl-6 pr-6 lg:w-[75%]">
        <div className="flex w-6/12 max-w-6/12">
          <p className="font-poppins mt-1 text-dark-gray font-normal text-lg">
            Challenges for you
          </p>
        </div>
        <div className="w-full mt-4 space-y-4">
          {events.map((event) => {
            if (filteredEvents.includes(event["Event ID"])) {
              return (
                <div
                  key={event["Event Name"]}
                  className="bg-white h-fit rounded-lg p-5"
                >
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col">
                        <div className="lg:flex flex-row hidden space-x-2 mb-2">
                          {event["Prize List"] &&
                          event["Prize List"].length > 0 ? (
                            <div className="rounded-full bg-logo-purple/65 pl-2 pr-2 font-poppins text-sm font-medium text-white">
                              {event["Prize List"][0]}
                            </div>
                          ) : (
                            <div></div>
                          )}
                          {event["Prize List"] &&
                          event["Prize List"].length > 1 ? (
                            <div className="rounded-full bg-logo-purple/65 pl-2 pr-2 font-poppins text-sm font-medium text-white">
                              {event["Prize List"][1]}
                            </div>
                          ) : (
                            <div></div>
                          )}
                          {event["Prize List"] &&
                          event["Prize List"].length > 2 ? (
                            <div className="rounded-full bg-logo-purple/65 pl-2 pr-2 font-poppins text-sm font-medium text-white">
                              {event["Prize List"][2]}
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <div className="font-poppins lg:text-xl text-lg font-semibold text-logo-purple">
                          {event["Event Name"]}
                        </div>
                        <div className="font-poppins lg:flex lg:text-xs hidden text-gray-500">
                          Deadline: {event["Deadline"]}
                        </div>
                      </div>
                      <Link
                        href={`/apply/${encodeURIComponent(
                          event["Event Name"]
                        )}`}
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
                      <div className="flex flex-row mt-1 items-center">
                        {generateStars(timeToStars(event["Time Needed"]))}
                        <div className="font-poppins text-xs pr-2 text-gray-500">
                          &nbsp; Difficulty&nbsp; / ~ {event["Time Needed"]} of
                          work
                        </div>
                      </div>
                      <div className="font-poppins text-sm pr-2 text-gray-500">
                        {event["Required Skills"]}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
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
              id="default-checkbox"
              type="checkbox"
              className="size-4 accent-logo-purple/85"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 lg:text-sm text-xs text-gray-900 dark:text-gray-300"
            >
              Easy (1-2 star)
            </label>
          </div>
          <div className="ml-8 mt-2 font-poppins">
            <input
              id="default-checkbox"
              type="checkbox"
              className="size-4 accent-logo-purple/85"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 lg:text-sm text-xs text-gray-900 dark:text-gray-300"
            >
              Medium (3 star)
            </label>
          </div>
          <div className="ml-8 mt-2 font-poppins">
            <input
              id="default-checkbox"
              type="checkbox"
              className="size-4 accent-logo-purple/85"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 lg:text-sm text-xs text-gray-900 dark:text-gray-300"
            >
              Hard (4-5 star)
            </label>
          </div>
          <div className="ml-4 mt-6 font-poppins font-semibold">
            Skill Requirement
          </div>
          <div className="ml-8 mt-2 font-poppins">
            <input
              id="default-checkbox"
              type="checkbox"
              className="size-4 accent-logo-purple/85"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 lg:text-sm text-xs text-gray-900 dark:text-gray-300"
            >
              &lt; 2 skills
            </label>
          </div>
          <div className="ml-8 mt-2 font-poppins">
            <input
              id="default-checkbox"
              type="checkbox"
              className="size-4 accent-logo-purple/85"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 lg:text-sm text-xs text-gray-900 dark:text-gray-300"
            >
              2 to 4 skills
            </label>
          </div>
          <div className="ml-8 mt-2 font-poppins">
            <input
              id="default-checkbox"
              type="checkbox"
              className="size-4 accent-logo-purple/85"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 lg:text-sm text-xs text-gray-900 dark:text-gray-300"
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
