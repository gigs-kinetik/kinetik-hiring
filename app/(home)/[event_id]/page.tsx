"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CompanyInstance } from "../../../util/wrapper/instance";
import { Company } from "../../../util/wrapper/static";
import React from "react";
import { BasicSubmission } from "../../../util/wrapper/basicTypes";

const SubmissionsPage = ({ params }) => {
  const router = useRouter();
  const { event_id } = params;
  const EventId = parseInt(event_id, 10);

  const [submissions, setSubmissions] = useState<BasicSubmission[]>([]);
  const [company, setCompany] = useState(null);
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const deadlineDate = new Date();
  const now = new Date();

  function toDatetime(datetime: any) {
    const date = new Date(datetime);

    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    return formattedDate + " at " + formattedTime;
  }
  // const timeDifference = deadlineDate - now;
  // const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  useEffect(() => {
    async function initializeCompany() {
      try {
        const loginResult = await Company.get();

        if (loginResult) {
          setCompany(loginResult);
          const events = await loginResult.getEvents();
          if (events) {
            const selected_event = events.filter(
              (event) => event.event_id === EventId
            );
            if (selected_event) {
              setEvent(selected_event[0]);
              const submissions = await loginResult.getSubmissions(EventId);
              console.log(submissions);
              if (submissions) {
                setSubmissions(submissions);
                setIsLoading(false);
              }
            }
          }
          setIsLoading(false);
        }
        setIsLoading(false);
      } catch (e) {
        console.log("error");
        setError(e);
        setIsLoading(false);
      }
    }

    initializeCompany();
  }, []);

  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin" />
    </div>
  ) : (
    <div className="min-h-screen font-poppins">
      <div className="max-w-[1200px] mx-auto px-6 bg-white rounded-2xl mt-10 mb-10 h-screen">
        <div className="py-8">
          <div className="flex justify-between items-start mb-6">
            <div className="max-w-[600px]">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-semibold text-gray-900 tracking-wide">
                  {event.event_name.toUpperCase()}
                </h1>
                <span
                  className={`px-3 py-1 text-sm font-semibold  rounded-full whitespace-nowrap`}
                >
                  {/* {timeDifference > 0 ? `${daysLeft} day${daysLeft !== 1 ? 's': ''} left!`: `Passed deadline!`} */}
                </span>
              </div>

              <div className="mt-5 font-normal text-[16px] text-gray-500">
                hosted by {company.name}
              </div>

              <div className="mt-4">
                Participate till{" "}
                <span className="text-black font-semibold border rounded-md bg-gray-200 px-2 py-1">
                  {toDatetime(event.end_time)}
                </span>
              </div>

              <div className="mt-5 text-gray-700 max-w-full break-words">
                {event.short_description}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex flex-col justify-center h-full text-center border-none rounded-lg bg-gray-200 px-8 py-4">
                <h1 className="font-semibold text-3xl">{event.prize} USD</h1>
                <p className="mt-3">Prize Pool</p>
              </div>

              <div className="flex flex-row items-center justify-around w-full gap-2 mt-3">
                <div className="px-2 py-2 font-semibold text-2xl bg-gray-200 border-none rounded-md shadow-md hover:shadow-none hover:opacity-90 hover:bg-purple-200 active:opacity-60 transition duration-300 cursor-pointer">
                  {event.payment_status &&
                    ((event.payment_status === 0 && <div>{"N/A"}</div>) ||
                      (event.payment_status === 1 && <div>{"Pay 10%"}</div>) ||
                      (event.payment_status === 2 && (
                        <div>{"Paid 10%!"}</div>
                      )) ||
                      (event.payment_status === 3 && <div>{"Pay 90%"}</div>) ||
                      (event.payment_status === 4 && <div>{"Paid 90%!"}</div>))}
                </div>
              </div>
            </div>
          </div>

          <hr className="border border-gray-300" />

          <div className="font-semibold underline underline-offset-8 mt-8">
            ALL PROJECTS ({submissions.length})
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {/* {submissions.map((submission) => (
              <div
                key={submission.submission_id}
                className="border rounded-md bg-gray-100 cursor-pointer"
                onClick={
                  event.payment_status === 4
                    ? () => {
                        router.push(
                          `${event_id}/submission/${submission.submission_id}`
                        );
                      }
                    : () => {}
                }
              >
                {submission.project_name}
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;
