"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { loadStripe } from "@stripe/stripe-js";
import { BasicEvent, BasicSubmission, Company, CompanyInstance, get, UserInstance } from "../../../util/server";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState<BasicSubmission[]>([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [challenges, setChallenges] = useState<BasicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [deadline, setDeadline] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [eventName, setEventName] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [cashAmount, setCashAmount] = useState<number>(NaN);
  const [prizes, setPrizes] = useState<number[]>([]);
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [user, setUser] = useState<UserInstance | CompanyInstance | null>(null);
  const [events, setEvents] = useState<BasicEvent[]>([])
  const stripePromise = loadStripe(
    "pk_live_51Psqxk2NzaRLv3FPnIDdQY520MHxYTkNRqNwhxZcNAMa9s3TDassr9bjbGDdUE9pWyvh9LF8SqdLP8xJK7w9VFW5003VQjKFRc"
  );

  useEffect(() => {
    const fetchData = async () => {
      setUser(await get());
      const company = user instanceof CompanyInstance;
      if (!user)
        return;

      if (company) {
        setChallenges(await user.getEvents());
        setEvents(await user.getEvents());
      } else {
        setFilteredEvents(await user.queryEvents({
          // insert query
        }));
        setSubmissions((await user.getSubmissions()) ?? []);
        setEvents(await user.getSubmissionEvents());
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleApplyClick = useCallback((eventId: number) => {
    router.push(`/apply/${eventId}`)
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(cashAmount)) {
      alert("Please enter a valid cash amount number.");
      return;
    }
    setIsSubmitting(true);
    const [hours, minutes] = deadlineTime.split(":");
    const combinedDateTime = new Date(deadline);
    combinedDateTime.setHours(parseFloat(hours), parseFloat(minutes), 0, 0);
    const pstDateTime = new Date(
      combinedDateTime.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      })
    );
    if (prizes.length == 0) {
      prizes.push(cashAmount);
    } else {
      prizes.unshift(cashAmount);
    }
    const skills = requiredSkills.map((skill) => skill.trim());
    if (user instanceof CompanyInstance) {
      user.addEvent({
        event_name: eventName,
        short_description: shortDescription,
        long_description: longDescription,
        prize_list: prizes,
        required_skills: skills,
        prize: cashAmount,
        end_time: pstDateTime,
        payment_status: 0,
      });
      setChallenges(await user.getEvents());
    }
    setDeadline("");
    setDeadlineTime("");
    setEventName("");
    setLongDescription("");
    setShortDescription("");
    setCashAmount(NaN);
    setPrizes([]);
    setRequiredSkills([]);
    setIsModalOpen(false);
    setIsSubmitting(false);
  };

  const handleDelete = async (eventId: number) => {
    if (!(user instanceof CompanyInstance))
      return;

    setIsDeleting(true);
    await user.deleteEvent(eventId)
    setChallenges(await user.getEvents());
    setIsDeleting(false);
  };

  const isApplied = useCallback((eventId: number) => {
    return submissions.filter(sub => sub.event_id === eventId).length > 0;
  }, [submissions])

  const handlePay = async (eventId: number, prizeAmount: number, percentage: number) => {
    // if (percentage == 10) {
    //   const userDocRef = doc(db, "Events", eventId);
    //   await updateDoc(userDocRef, {
    //     InitPaid: "Pending",
    //   });
    // } else if (percentage == 90) {
    //   const userDocRef = doc(db, "Events", eventId);
    //   await updateDoc(userDocRef, {
    //     FinalPaid: "Pending",
    //   });
    // }
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
    } finally {
      if (!(user instanceof CompanyInstance))
        return;
      if (percentage === 10)
        await user.updateEvent({
          event_id: eventId,
          payment_status: 1,
        })
      else if (percentage === 90)
        await user.updateEvent({
          event_id: eventId,
          payment_status: 2,
        })
    }
  };

  if (!user)
    return null;

  if ((user instanceof UserInstance) && !loading) {
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
              if (filteredEvents.includes(event.event_id)) {
                if (
                  event.payment_status > 0 &&
                  event.end_time
                ) {
                  const eventDate = new Date(event.end_time.getMilliseconds());
                  if (eventDate > new Date()) {
                    return (
                      <div
                        key={event.event_name}
                        className="bg-white h-fit rounded-lg p-5"
                      >
                        <div className="flex flex-col">
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-col">
                              <div className="lg:flex flex-row hidden space-x-2 mb-2">
                                {event.prize_list
                                  .slice(0, 3)
                                  .map((prize, index) => (
                                    <div
                                      key={index}
                                      className="rounded-full bg-logo-purple/65 pl-2 pr-2 font-poppins text-sm font-medium text-white"
                                    >
                                      ${prize} Cash Prize
                                    </div>
                                  ))}
                              </div>
                              <div className="font-poppins text-xs md:text-sm text-gray-500">
                                {event["Company"]}
                              </div>
                              <div className="font-poppins lg:text-xl sm:text-lg text-md font-semibold text-logo-purple">
                                {event.event_name}
                              </div>
                            </div>
                            <Link
                              href={`/apply/${encodeURIComponent(
                                event.event_id
                              )}`}
                              className="w-fit h-fit rounded-lg"
                            >
                              <button
                                className={`rounded-lg font-poppins w-16 md:w-32 h-10 md:text-lg text-xs font-medium text-white ${
                                  isApplied(event.event_id)
                                    ? "bg-green-600/90 cursor-not-allowed"
                                    : "bg-logo-purple/85 hover:bg-logo-purple"
                                }`}
                                onClick={() =>
                                  !isApplied(event.event_id) &&
                                  handleApplyClick(event.event_id)
                                }
                                disabled={isApplied(event.event_id)}
                              >
                                {isApplied(event.event_id)
                                  ? "Applied"
                                  : "Apply"}
                              </button>
                            </Link>
                          </div>
                          <div className="font-poppins sm:text-sm text-xs mt-4 mb-4 text-logo-purple">
                            {event.short_description ||
                              "No description available"}
                          </div>
                          <div className="lg:flex hidden flex-row justify-between">
                            <div className="font-poppins text-sm text-gray-500">
                              Submit by{" "}
                              {event.end_time &&
                                new Date(event.end_time.getMilliseconds()).toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  timeZone: "America/Los_Angeles",
                                  timeZoneName: "short",
                                })}{" "}
                              on{" "}
                              {event.end_time &&
                                new Date(event.end_time.getMilliseconds()).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                            </div>
                            <div className="font-poppins text-sm pr-2 text-gray-500">
                              {event.required_skills.join(", ")}
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

  if ((user instanceof CompanyInstance) && !loading) {
    if (challenges.length > 0) {
      return (
        <div className="flex flex-row max-w-full max-h-full">
          {isDeleting && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-white text-lg">Deleting...</div>
            </div>
          )}
          <div className="flex flex-col m-4 mb-10 pl-6 pr-6 w-full">
            <div className="flex justify-between w-full">
              <div className="flex justify-between w-full items-center">
                <div className="flex items-center space-x-2">
                  <p className="font-poppins text-dark-gray mt-2 font-normal text-md sm:text-lg">
                    Your Dashboard
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
                <button
                  className="rounded-full bg-logo-purple/85 text-white font-poppins font-medium text-xl h-7 w-7 lg:h-10 lg:w-10 mr-0.5 flex items-center justify-center"
                  onClick={() => setIsModalOpen(true)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="w-full mt-4 space-y-4">
              {challenges.map((event) => (
                <div
                  key={event.event_name}
                  className="bg-white h-fit rounded-lg p-5"
                >
                  <div className="flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 font-poppins">
                      <div className="flex flex-col w-full sm:w-auto">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {event.prize_list
                            .slice(0, 3)
                            .map((prize, index) => (
                              <div
                                key={index}
                                className="rounded-full bg-logo-purple/65 px-2 py-1 font-poppins text-xs font-medium text-white"
                              >
                                ${prize} Cash Prize
                              </div>
                            ))}
                        </div>
                        <div className="font-poppins text-xs text-gray-500">
                          {event["Company"]}
                        </div>
                        <div className="font-poppins text-lg font-semibold text-logo-purple">
                          {event.event_name}
                        </div>
                      </div>
                      <div className="hidden sm:flex flex-wrap gap-2 w-full sm:w-auto">
                        <button
                          className={`rounded-lg font-poppins px-3 py-2 text-sm font-medium text-white flex-grow sm:flex-grow-0 ${
                            event.payment_status > 0
                              ? "bg-green-600/90 cursor-not-allowed"
                              : event.payment_status < 0
                              ? "bg-orange-500/90"
                              : "bg-logo-purple/85 hover:bg-logo-purple"
                          }`}
                          onClick={() => {
                            if (event.payment_status === 0) {
                              handlePay(
                                event.event_id,
                                event["Prize Amount"],
                                10
                              );
                            }
                          }}
                          disabled={
                            event.payment_status > 0
                          }
                        >
                          {event.payment_status % 2 === 0
                            ? "Approved"
                            : event.payment_status !== 0
                            ? "Pending"
                            : "Pay"}
                        </button>
                        <button
                          className={`rounded-lg font-poppins px-3 py-2 text-sm font-medium text-white flex-grow sm:flex-grow-0 ${
                            event.payment_status === 4
                              ? "bg-green-600/90 cursor-not-allowed"
                              : event.payment_status === 3
                              ? "bg-orange-500/90 hover:bg-orange-600"
                              : event.payment_status !== 1 && event.report_url
                              ? "bg-logo-purple/85 hover:bg-logo-purple"
                              : "cursor-not-allowed opacity-50 bg-gray-400"
                          }`}
                          onClick={() => {
                            if (
                              event.payment_status < 3 && event.payment_status % 2 === 0 && event.report_url
                            ) {
                              handlePay(
                                event.event_id,
                                event["Prize Amount"],
                                90
                              );
                            }
                          }}
                          disabled={
                            event.payment_status === 4 ||
                            !event.report_url
                          }
                        >
                          {event.payment_status === 4
                            ? "Completed"
                            : event.payment_status === 3
                            ? "Pending"
                            : "Disburse"}
                        </button>
                        <a
                          href={event.report_url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            if (!event.report_url) {
                              e.preventDefault();
                              alert(
                                "Report is not available yet. Please check 24 hours after the completion of the event."
                              );
                            }
                          }}
                          className={`rounded-lg font-poppins px-3 py-2 text-sm font-medium text-white flex items-center justify-center flex-grow sm:flex-grow-0 ${
                            event.report_url
                              ? "bg-logo-purple/85 hover:bg-logo-purple"
                              : "cursor-not-allowed opacity-50 bg-gray-400"
                          }`}
                        >
                          See Report
                        </a>
                        <button
                          onClick={() => handleDelete(event.event_id)}
                          className="rounded-lg p-2 transition-colors duration-300"
                        >
                          <TrashIcon className="w-5 h-5 text-gray-500 hover:text-red-500" />
                        </button>
                      </div>
                    </div>
                    <div className="font-poppins text-sm mt-2 mb-4 text-logo-purple">
                      {event["Short Description"] || "No description available"}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-gray-500">
                      <div className="mb-2 sm:mb-0 font-poppins">
                        Deadline set for{" "}
                        {event.end_time &&
                          event.end_time
                            .toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              timeZone: "America/Los_Angeles",
                              timeZoneName: "short",
                            })}{" "}
                        on{" "}
                        {event.end_time &&
                          event.end_time
                            .toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                      </div>
                      <div className="font-poppins">
                        {event["Required Skills"]?.join(", ")}
                      </div>
                    </div>
                    <div className="flex sm:hidden flex-wrap gap-2 w-full mt-4">
                      <button
                        className={`rounded-lg font-poppins px-3 py-2 text-sm font-medium text-white flex-grow ${
                          event.payment_status === 2
                            ? "bg-green-600/90 cursor-not-allowed"
                            : event.payment_status === 1
                            ? "bg-orange-500/90"
                            : "bg-logo-purple/85 hover:bg-logo-purple"
                        }`}
                        onClick={() => {
                          if (
                            event.payment_status <= 1
                          ) {
                            handlePay(
                              event.event_id,
                              event["Prize Amount"],
                              10
                            );
                          }
                        }}
                        disabled={
                          event.payment_status === 2
                        }
                      >
                        {event.payment_status === 2
                          ? "Approved"
                          : event.payment_status === 1
                          ? "Pending"
                          : "Pay"}
                      </button>
                      <button
                        className={`rounded-lg font-poppins px-3 py-2 text-sm font-medium text-white flex-grow ${
                          event.payment_status === 4
                            ? "bg-green-600/90 cursor-not-allowed"
                            : event.payment_status === 3
                            ? "bg-orange-500/90 hover:bg-orange-600"
                            : (event.payment_status % 2 === 0 && event.payment_status < 3) && event.report_url
                            ? "bg-logo-purple/85 hover:bg-logo-purple"
                            : "cursor-not-allowed opacity-50 bg-gray-400"
                        }`}
                        onClick={() => {
                          if (
                            (event.payment_status % 2 === 0 && event.payment_status < 3) && event.report_url
                          ) {
                            handlePay(
                              event.event_id,
                              event["Prize Amount"],
                              90
                            );
                          }
                        }}
                        disabled={
                          event.payment_status === 4 || !event.report_url
                        }
                      >
                        {event.payment_status === 4
                          ? "Completed"
                          : event.payment_status === 3
                          ? "Pending"
                          : "Disburse"}
                      </button>
                      <a
                        href={event.report_url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (!event.report_url) {
                            e.preventDefault();
                            alert(
                              "Report is not available yet. Please check 24 hours after the completion of the event."
                            );
                          }
                        }}
                        className={`rounded-lg font-poppins px-3 py-2 text-sm font-medium text-white flex items-center justify-center flex-grow ${
                          event.report_url
                            ? "bg-logo-purple/85 hover:bg-logo-purple"
                            : "cursor-not-allowed opacity-50 bg-gray-400"
                        }`}
                      >
                        See Report
                      </a>
                      <button
                        onClick={() => handleDelete(event.event_id)}
                        className="rounded-lg p-2 transition-colors duration-300 flex-grow"
                      >
                        <TrashIcon className="w-5 h-5 text-gray-500 hover:text-red-500 mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
                        onChange={(e) => setCashAmount(parseFloat(e.target.value))}
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
                        onChange={(e) => setRequiredSkills(e.target.value.split(';'))}
                        className="block w-full mt-1 border-gray-300 rounded-md text-sm sm:text-base p-2"
                        required
                      />
                    </label>
                    <label className="block mb-2">
                      Other Prizes/Incentives (semicolon-separated){" "}
                      <input
                        type="text"
                        value={prizes.map(prize => `$${prize} Case Prize`)}
                        onChange={(e) => setPrizes(e.target.value.split(';').map(s => parseFloat(s.substring(1))))}
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