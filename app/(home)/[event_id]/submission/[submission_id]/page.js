"use client"

import { useRouter } from 'next/navigation'
import { MdCalendarMonth } from 'react-icons/md';
import { FaLink, FaGithub, FaPaperclip } from 'react-icons/fa';
import React, { useState, useEffect, useRef } from 'react'
import { getSubmissionDetails as submission_details } from '../../../../../lib/eventsContext';
import { Timestamp } from 'firebase/firestore';

const SubmissionPage = ({ params }) => {

    const {event_id, submission_id} = params
    const EventId = decodeURIComponent(event_id)
    const SubmissionId = decodeURIComponent(submission_id)

    const [activeTab, setActiveTab] = useState("overview");
    const [submission, setSubmission] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [links, setLinks] = useState([])
    const contactRef = useRef(null);
  
    useEffect(() => {
      async function getSubmissionDetails() {
          const submission = await submission_details(EventId, [{"id": SubmissionId}]);
          setSubmission(submission[0])
          if(submission) {
                 const links = [
                  { icon: <FaGithub />, text: "Github Link", url: submission[0]["Project Link"]},
                  { icon: <MdCalendarMonth />, text: `Submitted on ${submission[0]["Submitted At"] ? submission[0]["Submitted At"].toDate().toLocaleDateString() : Timestamp.now().toDate().toLocaleDateString()}`},
                  { icon: <FaPaperclip/>, text: "Resume", url: submission[0]["Resume Link"]},
                ];
                const index = 1;
                if (submission[0]["Additional Links"]) {
                  for(const link in submission[0]["Additional Links"]) {
                    links.push({icon: <FaLink />, text: `Additional Link ${index}`, url: submission[0]["Additional Links"][link]});
                  }
                }
                setLinks(links);
                setIsLoading(false);
            setIsLoading(false);
          }
          setIsLoading(false);

        setIsLoading(false);
      }
      getSubmissionDetails();
      setIsLoading(false)
    }, [])
  
    function getEmbedURL(link) {
      const url = new URL(link);
      if (url.hostname === 'www.youtube.com' && url.pathname === '/watch') {
        const videoId = url.searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return link;
    }
   
  
    const scrollToCurrent = () => {
      contactRef.current?.scrollIntoView({ behavior: 'smooth' })
    };
  
    return isLoading ? 
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin" />
      </div> : 
    (
      (submission && <div className="min-h-screen font-poppins">
        <div className="max-w-[1200px] items-center px-6 py-8 bg-white rounded-2xl mt-10 mx-3 xl:mx-auto mb-10">
          <div className="md:items-start mb-10">
            <div className='flex flex-col gap-2'>
              <div onClick={scrollToCurrent} className="flex flex-col md:flex-row items-center md:items-end gap-3 cursor-pointer">
                <h2 className="text-4xl tracking-tight font-semibold">{submission["Project Name"]}</h2>
              </div>
            </div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-300 py-6 pl-3">
            {links.map((link, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="text-xl">{link.icon}</div>
                {link.url ? <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  {link.text}
                </a> : <div className="">
                  {link.text}
                </div>}
                
                
              </div>
            ))}
          </div>
  
          <div className="pt-8 border-t border-gray-300 w-full" />
  
          <div className="flex space-x-4 mt-4 border-gray-300">
            <button 
              onClick={() => setActiveTab("overview")} 
              className={`py-2 px-4 ${activeTab === "overview" ? "border-b-2 border-purple-500 font-semibold" : "text-gray-600"}`}
            >
              Project Overview
            </button>
          </div>
  
          <div className="mt-8">
            {activeTab === "overview" && (
              <>
                <p className="mb-4">{submission["Project Description"]}</p>
              </>
            )}
            
          </div>
  
          <div className='flex flex-row justify-center items-center w-full mt-8'>
            <iframe src={getEmbedURL(submission["Video Link"])} height='500' width='900' className='shadow-lg hover:shadow-none rounded-xl hover:scale-105 transition duration-300 border-none' allowFullScreen/>
          </div>
        </div>
      </div>)
    );
  };
  
  export default SubmissionPage;