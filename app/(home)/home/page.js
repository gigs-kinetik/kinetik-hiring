"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEvents } from "../../../lib/eventsContext";
import { useState, useEffect } from "react";
import { db } from "../../../lib/firebaseConfig";
import { TrashIcon } from "@heroicons/react/24/solid";
import { loadStripe } from "@stripe/stripe-js";
import {
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  doc,
  query,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { ProjectsList } from "../../../components/project/project-list";

export default function HomePage() {
  const router = useRouter();
  const events = useEvents();
  const [submissionIds, setSubmissionIds] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [userType, setUserType] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deadline, setDeadline] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [eventName, setEventName] = useState("");
  const [companyName, setCompanyName] = useState([]);
  const [longDescription, setLongDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [prizeList, setPrizeList] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userEmail = sessionStorage.getItem("userEmail");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const stripePromise = loadStripe(
    "pk_live_51Psqxk2NzaRLv3FPnIDdQY520MHxYTkNRqNwhxZcNAMa9s3TDassr9bjbGDdUE9pWyvh9LF8SqdLP8xJK7w9VFW5003VQjKFRc"
  );

  useEffect(() => {
    const type = sessionStorage.getItem("userType");
    setUserType(type);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userType === "Company") {
        const updatedChallenges = await fetchChallenges();
        console.log(updatedChallenges);
        setChallenges(updatedChallenges);
        setLoading(false);
      } else if (userType === "Developer") {
        const filteredEventsFromStorage = JSON.parse(
          sessionStorage.getItem("filteredEvents") || "[]"
        );
        setFilteredEvents(filteredEventsFromStorage);
        const ids = await fetchSubmissionIds();
        setSubmissionIds(ids);
        setLoading(false);
      }
    };
    fetchData();
  }, [userType]);

  useEffect(() => {
    sessionStorage.setItem("submissionIds", JSON.stringify(submissionIds));
  }, [submissionIds]);

  const fetchSubmissionIds = async () => {
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
    const userDocRef = doc(db, "User Information", userEmail);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data();
    setCompanyName(userData["Company Name"]);
    const eventIds = userData["Events"];
    if (!eventIds || eventIds.length === 0) {
      return [];
    }
    const fetchedChallenges = [];
    for (let eventId of eventIds) {
      const eventDocRef = doc(db, "Events", eventId);
      const eventDocSnap = await getDoc(eventDocRef);
      fetchedChallenges.push(eventDocSnap.data());
    }
    return fetchedChallenges;
  };

  const handleApplyClick = (event) => {
    sessionStorage.setItem("currentEvent", JSON.stringify(event));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(cashAmount)) {
      alert("Please enter a valid cash amount number.");
      return;
    }
    setIsSubmitting(true);
    const [hours, minutes] = deadlineTime.split(":");
    const combinedDateTime = new Date(deadline);
    combinedDateTime.setHours(hours, minutes, 0, 0);
    const pstDateTime = new Date(
      combinedDateTime.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      })
    );
    const prizes = prizeList.split(";").map((prize) => prize.trim());
    if (prizes == "") {
      prizes[0] = "$" + cashAmount + " Cash Prize";
    } else {
      prizes.unshift("$" + cashAmount + " Cash Prize");
    }
    const skills = requiredSkills.split(";").map((skill) => skill.trim());
    const userDocRef = doc(db, "User Information", userEmail);
    const userDocSnap = await getDoc(userDocRef);
    const numEvents = userDocSnap.data()["Num Events"] + 1;
    await updateDoc(userDocRef, {
      "Num Events": numEvents,
    });
    const eventId = `${userEmail}${numEvents}`;
    const eventsCollectionRef = collection(db, "Events");
    const newEventDocRef = doc(eventsCollectionRef, eventId);
    await setDoc(newEventDocRef, {
      Paid: 1,
      "Event ID": eventId,
      Company: companyName,
      Contact: userEmail,
      Deadline: pstDateTime,
      "Event Name": eventName,
      "Long Description": longDescription,
      "Short Description": shortDescription,
      "Prize List": prizes,
      "Required Skills": skills,
      "Prize Amount": cashAmount,
      "Report URL": "",
    });
    await updateDoc(userDocRef, {
      Events: arrayUnion(eventId),
    });
    setDeadline("");
    setDeadlineTime("");
    setEventName("");
    setLongDescription("");
    setShortDescription("");
    setCashAmount("");
    setPrizeList("");
    setRequiredSkills("");
    setIsModalOpen(false);
    const updatedChallenges = await fetchChallenges();
    setChallenges(updatedChallenges);
    setIsSubmitting(false);
  };

  const handleDelete = async (eventId) => {
    setIsDeleting(true);
    const userEmail = sessionStorage.getItem("userEmail");
    const eventDocRefInUserInfo = doc(
      db,
      "User Information",
      userEmail,
      "Events",
      eventId
    );
    await deleteDoc(eventDocRefInUserInfo);
    const eventDocRefInEventsCollection = doc(db, "Events", eventId);
    await deleteDoc(eventDocRefInEventsCollection);
    const userDocRef = doc(db, "User Information", userEmail);
    await updateDoc(userDocRef, {
      Events: arrayRemove(eventId),
    });
    const updatedChallenges = await fetchChallenges();
    setChallenges(updatedChallenges);
    setIsDeleting(false);
  };

  const isApplied = (eventId) => {
    return submissionIds.includes(eventId);
  };

  const handlePay = async (eventId, prizeAmount, percentage) => {
    if (percentage == 10) {
      const userDocRef = doc(db, "Events", eventId);
      await updateDoc(userDocRef, {
        Paid: 1,
      });
    } else if (percentage == 90) {
      const userDocRef = doc(db, "Events", eventId);
      await updateDoc(userDocRef, {
        Paid: 2,
      });
    }
    try {
      const stripe = await stripePromise;
      const response = await fetch("/home/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId, prizeAmount, percentage }),
      });
      const data = await response.json();
      if (response.ok) {
        await stripe.redirectToCheckout({
          sessionId: data.id,
        });
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
    }
  };

  if (userType === "Developer" && !loading) {
    return (
      <div className="flex flex-row max-w-full max-h-full">
        <div className="flex flex-col m-4 mb-10 pl-6 pr-6 w-full">
          <div className="flex w-6/12 max-w-6/12">
            <p className="font-poppins mt-2 text-dark-gray font-normal text-md sm:text-lg">
              Challenges for you
            </p>
          </div>
          <div className="w-full mt-4 space-y-4">
            {events.map((event) => {
              console.log(filteredEvents, event);
              if (filteredEvents.includes(event["Event ID"])) {
                if (
                  event["Paid"] >= 2 &&
                  event["Deadline"] &&
                  event["Deadline"]["_seconds"]
                ) {
                  const eventDate = new Date(
                    event["Deadline"]["_seconds"] * 1000
                  );
                  if (eventDate > new Date()) {
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
                                {isApplied(event["Event ID"])
                                  ? "Applied"
                                  : "Apply"}
                              </button>
                            </Link>
                          </div>
                          <div className="font-poppins sm:text-sm text-xs mt-4 mb-4 text-logo-purple">
                            {event["Short Description"] ||
                              "No description available"}
                          </div>
                          <div className="lg:flex hidden flex-row justify-between">
                            <div className="font-poppins text-sm text-gray-500">
                              Submit by{" "}
                              {event["Deadline"] &&
                                new Date(
                                  event["Deadline"]["_seconds"] * 1000
                                ).toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  timeZone: "America/Los_Angeles",
                                  timeZoneName: "short",
                                })}{" "}
                              on{" "}
                              {event["Deadline"] &&
                                new Date(
                                  event["Deadline"]["_seconds"] * 1000
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                            </div>
                            <div className="font-poppins text-sm pr-2 text-gray-500">
                              {event["Required Skills"]?.join(", ")}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                }
              }
              return null;
            })}
          </div>
        </div>
      </div>
    );
  }

  if (userType === "Company" && !loading) {
    if (!challenges.empty) {
      return (
        <div className="flex flex-row max-w-full max-h-full font-poppins">
          {isDeleting && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-white text-lg">Deleting...</div>
            </div>
          )}
          <div className="flex flex-col m-20 mb-10 pl-6 pr-6 w-full">
            <div className="flex justify-between w-full">
              <div className="flex justify-between w-full items-center mb-8">
                <div className="flex items-center space-x-2">
                  <p className="font-poppins text-dark-gray mt-2 font-normal text-md sm:text-lg">
                    My Events
                  </p>
                  <a
                    href="https://firebasestorage.googleapis.com/v0/b/gigapp-8cc4b.appspot.com/o/Kinetik%20x%20Sponsors.pdf?alt=media&token=2f8e537c-2dfe-484e-8e23-b89e156b4f54"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="rounded-full border border-logo-purple text-logo-purple font-poppins font-medium text-sm h-5 w-5 flex items-center justify-center mt-1.5">
                      i
                    </button>
                  </a>
                </div>
                <Button
                  className="bg-logo-purple/85 text-white font-poppins font-medium text-md mr-0.5 flex items-center justify-center"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Event
                </Button>
              </div>
            </div>
            <div
              className={`overflow-auto relative group scrollbar-transparent max-h-[calc(100vh-18rem)]`}
            >
              <ProjectsList
                projects={challenges}
                handlePay={handlePay}
                handleDelete={handleDelete}
              />
            </div>
          </div>
          {isModalOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              onClick={() => setIsModalOpen(false)}
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-lg max-h-[75vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="font-poppins text-xl font-semibold text-logo-purple mb-4 text-center">
                  Add New Event
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="font-poppins text-sm mt-4 text-gray-600 space-y-4">
                    <label className="block mb-2">
                      Event Name <span className="text-red-500">*</span>
                      <input
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md text-sm sm:text-base p-2"
                        required
                      />
                    </label>
                    <label className="block mb-2">
                      Deadline Date <span className="text-red-500">*</span>
                      <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md text-sm sm:text-base p-2"
                        required
                      />
                    </label>
                    <label className="block mb-2">
                      Deadline Time (PST){" "}
                      <span className="text-red-500">*</span>
                      <input
                        type="time"
                        value={deadlineTime}
                        onChange={(e) => setDeadlineTime(e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md text-sm sm:text-base p-2"
                        required
                      />
                    </label>
                    <label className="block mb-2">
                      Short Description <span className="text-red-500">*</span>
                      <textarea
                        value={shortDescription}
                        placeholder="Enter a quick synopsis of what you need."
                        onChange={(e) => setShortDescription(e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md text-sm sm:text-base p-2"
                        required
                      />
                    </label>
                    <label className="block mb-2">
                      Long Description <span className="text-red-500">*</span>
                      <textarea
                        value={longDescription}
                        placeholder="Enter the complete requirements for your project."
                        onChange={(e) => setLongDescription(e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md text-sm sm:text-base p-2"
                        required
                      />
                    </label>
                    <label className="block mb-2">
                      Total Cash Amount (in USD){" "}
                      <span className="text-red-500">*</span>
                      <input
                        value={cashAmount}
                        placeholder="Enter just the number with no commas (ex: 5000)."
                        onChange={(e) => setCashAmount(e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md text-sm sm:text-base p-2"
                        required
                      />
                    </label>
                    <label className="block mb-4">
                      Required Skills (semicolon-separated){" "}
                      <span className="text-red-500">*</span>
                      <input
                        type="text"
                        value={requiredSkills}
                        onChange={(e) => setRequiredSkills(e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md text-sm sm:text-base p-2"
                        required
                      />
                    </label>
                    <label className="block mb-2">
                      Other Prizes/Incentives (semicolon-separated){" "}
                      <input
                        type="text"
                        value={prizeList}
                        onChange={(e) => setPrizeList(e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md text-sm sm:text-base p-2"
                      />
                    </label>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="rounded-lg bg-logo-purple/85 text-white font-poppins w-32 h-10 font-medium mt-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  return <div></div>;
}

