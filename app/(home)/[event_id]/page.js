"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { db } from '../../../lib/firebaseConfig';
import { getEventById, getSubmissionsByEvent, getSubmissionDetails } from '../../../lib/eventsContext';

import { CircleX, MousePointer } from 'lucide-react'

import React from 'react';
import { Timestamp } from 'firebase/firestore';
import { ProjectsGrid } from '../../../components/project/project-grid';

const SubmissionsPage = ({ params }) => {
  const router = useRouter();
  const { event_id } = params;
  const EventId = decodeURIComponent(event_id);


  const [submissions, setSubmissions] = useState([]);
  const [event, setEvent] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)

  

  useEffect(() => {
    async function initializeCompany() {
      try {
        if(EventId) {
            const initEvent = await getEventById(EventId)
            if (initEvent) {
                setEvent(initEvent)
                setIsLoading(false)
                if(initEvent) {
                    const initSubmissions = await getSubmissionsByEvent(EventId)
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

  const now = new Date();
  let deadlineDate = event?.Deadline?.toDate();
  let timeDifference = deadlineDate ? deadlineDate - now : 0;
  let daysLeft = timeDifference > 0 ? Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) : 0;

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
                  <span className={`px-3 py-1 text-sm font-semibold bg-gray-200 rounded-full whitespace-nowrap ${daysLeft >= 10 ? 'bg-green-200': daysLeft > 5 ? 'bg-orange-200' : 'bg-red-200'}`}>
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
                    ${event && event["Prize Amount"]} USD
                  </h1>
                  <p className='mt-3'>
                    Prize Pool
                  </p>
                </div>

                
              </div>
              
            </div>

            <hr className="border border-gray-300"/>

            <div className='flex flex-row justify-between font-semibold underline underline-offset-8 mt-8 mb-8'>
                ALL PROJECTS ({submissions.length})
                {/* <div className={`${event && event["Paid"] === 3  && daysLeft <= 0 ? '': 'hidden'}`}>
                  {isSelecting ? <CircleX onClick={() => {setIsSelecting(!isSelecting)}} className="cursor-pointer"/> : <MousePointer onClick={() => {setIsSelecting(!isSelecting)}} className="cursor-pointer"/>}
                </div> */}
                
            </div>

            <ProjectsGrid submissions={submissions} project={event} daysLeft={daysLeft}/>

            
          </div>
        </div>
      </div>
    );
  };

export default SubmissionsPage;