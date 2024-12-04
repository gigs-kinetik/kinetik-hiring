"use client";

import React, { useRef, useState, useEffect } from 'react';
import { MdArrowOutward, MdCalendarMonth } from 'react-icons/md';
import { FaLink, FaGithub, FaTwitter, FaUser, FaPaperclip } from 'react-icons/fa';
import { MdFileCopy } from 'react-icons/md';

import { CompanyInstance } from '../../../../../util/wrapper/instance'
import { Company, User } from '../../../../../util/wrapper/static';

const SubmissionPage = ({ params }) => {
  const { event_id, submission_id } = params;
  const EventId = parseInt(event_id, 10);
  const SubmissionId = parseInt(submission_id, 10);

  // const projectTitle = "EcoTrack";
  // const submissionDate = "9/10/2024";
  // const projectImage = "/figma-logo.png";
  // const otherLinks = ['', ''];
  // const projectLink = "https://github.com/AkhilKrishna16/portfolio-2024-2025";
  // const resumeLink = "https://www.akhilkrishnamurthy.com/Akhil_Krishnamurthy_UT_Austin_Resume_2028.pdf";
  // const videoLink = "https://www.youtube.com/embed/G0eKzU_fV00";
  // const projectDescription = "EcoTrack is an innovative mobile application designed to empower users to monitor and reduce their carbon footprint. By integrating real-time data from various sources, EcoTrack provides personalized insights and actionable steps for users to make sustainable choices in their daily lives.";
  // const projectOutlook = "EcoTrack envisions a world where individuals are empowered to make informed and sustainable choices that collectively lead to a healthier planet. Our goal is to create a vibrant community of eco-conscious users who actively contribute to environmental preservation.";

  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState("overview");
  const [submission, setSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [links, setLinks] = useState([])
  const contactRef = useRef(null);

  useEffect(() => {
    async function getSubmissionDetails() {
      const loginResult = await Company.get(); 
      console.log(loginResult)
      if(loginResult) {
        const submissions = await loginResult.getSubmissions(EventId);
        if(submissions) {
          const selected_submission = (submissions.filter((submission) => submission.submission_id === SubmissionId));
          if(selected_submission) {
            setSubmission(selected_submission[0]);
            if(selected_submission[0]) {
              console.log(selected_submission[0].project_link)
              // console.log(selected_submission[0].project_link)
               const links = [
                { icon: <FaGithub />, text: "Project Link", url: selected_submission[0].project_link ? selected_submission[0].project_link : "#"},
                { icon: <MdCalendarMonth />, text: `Submitted on ${selected_submission[0].submission_time ? toDatetime(selected_submission[0].submission_time) : Date.now()}`},
                { icon: <FaPaperclip/>, text: "Resume", url: selected_submission[0].resume_link ? selected_submission[0].resume_link : "#"},
              ];
              const index = 1;
              if (selected_submission[0].additional_links) {
                for(const link in selected_submission[0].additional_links) {
                  links.push({icon: <FaLink />, text: `Additional Link ${index}`, url: selected_submission[0].additional_links[link]});
                }
              }
              setLinks(links);
              setIsLoading(false);
            }
            setIsLoading(false);
          } 
          setIsLoading(false);
        }
        setIsLoading(false);
      }
      setIsLoading(false);
    }
    getSubmissionDetails();
  }, [])

  function toDatetime(datetime: any) {
    const date = new Date(datetime);

    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    return formattedDate + " at " + formattedTime;
  }

  function getEmbedURL(link) {
    const url = new URL(link);
    if (url.hostname === 'www.youtube.com' && url.pathname === '/watch') {
      const videoId = url.searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return link;
  }

  

  // const links = [
  //   { icon: <FaGithub />, text: "Project Link", url: submission.project_link},
  //   { icon: <MdCalendarMonth />, text: `Submitted on ${toDatetime(submission.submission_time)}`},
  //   { icon: <FaPaperclip/>, text: "Resume", url: submission.resume_link },
  // ];

  // if (submission.additional_links) {
  //   links.push(
  //     ...submission.additional_links.map((link: string, index: number) => ({
  //       icon: <FaLink />, 
  //       text: Additional Link ${index},      
  //       url: link,
  //     }))
  //   );
  // }
 

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
          {/* <div className="flex justify-center w-full">
            <img src={projectImage} className="h-40 object-contain max-w-full" alt="Project logo"/>
          </div> */}

          <div className='flex flex-col gap-2'>
            <div onClick={scrollToCurrent} className="flex flex-col md:flex-row items-center md:items-end gap-3 cursor-pointer">
              <h2 className="text-4xl tracking-tight font-semibold">{submission.project_name}</h2>
              <div className='flex flex-col border-none bg-gray-200 rounded-md px-2 py-1'>
                {submission.submission_id}
              </div>
            </div>
          
            {/* <div className='flex flex-row items-center gap-2 border-none rounded-md mt-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-fill" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5"/>
              </svg>
              <p className='font-normal text-sm'>Submitted on <span className='text-purple-500'>10/15/2022</span></p>
            </div> */}
            
            
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-300 py-6 pl-3">
          {links.map((link, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="text-xl">{link.icon}</div>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                {link.text}
              </a>
              
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-300 w-full" />

        
        {/* <h1 className="text-2xl mb-4 mt-4">About</h1> */}

        {/* Tab navigation */}
        <div className="flex space-x-4 mt-4 border-gray-300">
          <button 
            onClick={() => setActiveTab("overview")} 
            className={`py-2 px-4 ${activeTab === "overview" ? "border-b-2 border-purple-500 font-semibold" : "text-gray-600"}`}
          >
            Project Overview
          </button>
          <button 
            onClick={() => setActiveTab("outlook")} 
            className={`py-2 px-4 ${activeTab === "outlook" ? "border-b-2 border-purple-500 font-semibold" : "text-gray-600"}`}
          >
            Future Outlook
          </button>
        </div>

        
        
        {/* Tab content */}
        <div className="mt-8">
          {activeTab === "overview" && (
            <>
              <p className="mb-4">{submission.project_description}</p>
            </>
          )}
          {activeTab === "outlook" && (
            <>
              <p>{submission.project_description}</p>
            </>
          )}
        </div>

        <div className='flex flex-row justify-center items-center w-full mt-8'>
          <iframe src={getEmbedURL(submission.project_video_link)} height='500' width='900' className='shadow-lg hover:shadow-none rounded-xl hover:scale-105 transition duration-300 border-none' allowFullScreen/>
        </div>
      </div>
    </div>)
  );
};

export default SubmissionPage;