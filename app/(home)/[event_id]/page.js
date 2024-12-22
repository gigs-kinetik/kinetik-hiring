"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { db } from '../../../lib/firebaseConfig';
import { getEventById, getSubmissionsByEvent, getSubmissionDetails } from '../../../lib/eventsContext';

import React from 'react';

const SubmissionsPage = ({ params }) => {
  const router = useRouter();
  const { event_id } = params;
  const EventId = decodeURIComponent(event_id);


  const [submissions, setSubmissions] = useState([]);
  const [company, setCompany] = useState(null)
  const [event, setEvent] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)

  const deadlineDate = new Date()
  const now = new Date()

  function toDatetime(datetime) {
    const date = new Date(datetime);

    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    return formattedDate + " at " + formattedTime;
  }

  const timeDifference = deadlineDate - now;
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  useEffect(() => {
    console.log(EventId)
    async function initializeCompany() {
      try {
        if(EventId) {
            const initEvent = await getEventById(EventId)
            if (initEvent) {
                setEvent(initEvent)
                setIsLoading(false)
                if(initEvent) {
                    const initSubmissions = await getSubmissionsByEvent(EventId)
                    console.log(initSubmissions)
                    if(initSubmissions) {
                        const submissionDetails = await getSubmissionDetails(EventId, initSubmissions)
                        setSubmissions(submissionDetails)
                        console.log(submissionDetails)
                        setIsLoading(false)
                    }
                    setIsLoading(false)
                }
                setIsLoading(false)
            } 
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
      } catch (e) {
        setError(e)
        setIsLoading(false)
      }
      setIsLoading(false)
    }
    initializeCompany();
  }, []);
return (
    isLoading ? 
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin" />
    </div> : 

    <div className="min-h-screen font-poppins">
      <div className="max-w-[1200px] mx-auto px-6 bg-white rounded-2xl mt-10 mb-10 h-screen">
        <div className="py-8">
          <div className="flex justify-between items-start mb-6">
            <div className="max-w-[600px]">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-semibold text-gray-900 tracking-wide">
                  {event && event["Event Name"].toUpperCase()}
                </h1>
                <span className={`px-3 py-1 text-sm font-semibold  rounded-full whitespace-nowrap`}>
                  {timeDifference > 0 ? `${daysLeft} day${daysLeft !== 1 ? 's': ''} left!`: `Passed deadline!`}
                </span>
              </div>
              
              <div className="mt-5 font-normal text-[16px] text-gray-500">
                hosted by {event && event["Company"]}
              </div>
              
              <div className="mt-4">
                Participate till {' '}
                <span className="text-black font-semibold border rounded-md bg-gray-200 px-2 py-1">
                  {event && event["Deadline"].toDate().toLocaleString()}
                </span>
              </div>

              <div className="mt-5 text-gray-700 max-w-full break-words">
                {event && event["Short Description"]}
              </div>
            </div>

            <div className='flex flex-col items-center'>
              <div className="flex flex-col justify-center h-full text-center border-none rounded-lg bg-gray-200 px-8 py-4">
                <h1 className='font-semibold text-3xl'>
                  {event && event["Prize Amount"]} USD
                </h1>
                <p className='mt-3'>
                  Prize Pool
                </p>
              </div>

              <div className='flex flex-row items-center justify-around w-full gap-2 mt-3'>
                <div className='px-2 py-2 font-semibold text-2xl bg-gray-200 border-none rounded-md shadow-md hover:shadow-none hover:opacity-90 hover:bg-purple-200 active:opacity-60 transition duration-300 cursor-pointer'>
                  {event && event["InitPaid"] && event["FinalPaid"] && 
                    (event["InitPaid"] === "" && <div>{"N/A"}</div> 
                        || event["InitPaid"] !== "Approved" && <div>{"Pay 10%"}</div> 
                        || event["InitPaid"] === "Approved" && event["FinalPaid"] !== "Approved" && <div>{"Paid 10%!"}</div> 
                        || event["FinalPaid"] !== "Approved" && <div>{"Pay 90%"}</div> 
                        || event["FinalPaid"] === "Approved" && <div>{"Paid 90%!"}</div>)
                  }
                </div>
              </div>
            </div>
            
          </div>

          <hr className="border border-gray-300"/>

          <div className='font-semibold underline underline-offset-8 mt-8'>
              ALL PROJECTS ({submissions.length})
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {submissions.map((submission, index) => (
              <div key={index} className='border rounded-md text-gray-600 bg-gray-100 cursor-pointer' onClick={event && event["FinalPaid"] === "Approved" ? () => {router.push(`${event_id}/submission/${submission["id"]}`)} : () => {}}>
                {submission["Project Name"]}
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;