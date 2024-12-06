"use client";

import React, { useRef, useState, useEffect } from "react";
import { MdCalendarMonth } from "react-icons/md";
import { FaLink, FaGithub, FaPaperclip } from "react-icons/fa";

import { Company } from "../../../../../util/wrapper/static";

const SubmissionPage = ({ params }) => {
  const { event_id, submission_id } = params;
  const EventId = parseInt(event_id, 10);
  const SubmissionId = parseInt(submission_id, 10);

  const [activeTab, setActiveTab] = useState("overview");
  const [submission, setSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [links, setLinks] = useState([]);
  const contactRef = useRef(null);

  useEffect(() => {
    async function getSubmissionDetails() {
      const loginResult = await Company.get();
      if (loginResult) {
        const submissions = await loginResult.getSubmissions(EventId);
        if (submissions) {
          const selected_submission = submissions.filter(
            (submission) => submission.submission_id === SubmissionId
          );
          if (selected_submission) {
            setSubmission(selected_submission[0]);
            if (selected_submission[0]) {
              console.log(selected_submission[0].project_link);

              const links = [
                {
                  icon: <FaGithub />,
                  text: "Github Link",
                  url: selected_submission[0].project_link
                    ? selected_submission[0].project_link
                    : "#",
                },
                {
                  icon: <MdCalendarMonth />,
                  text: `Submitted on ${
                    selected_submission[0].submission_time
                      ? toDatetime(selected_submission[0].submission_time)
                      : Date.now()
                  }`,
                },
                {
                  icon: <FaPaperclip />,
                  text: "Resume",
                  url: selected_submission[0].resume_link
                    ? selected_submission[0].resume_link
                    : "#",
                },
              ];
              const index = 1;
              if (selected_submission[0].additional_links) {
                for (const link in selected_submission[0].additional_links) {
                  links.push({
                    icon: <FaLink />,
                    text: `Additional Link ${index}`,
                    url: selected_submission[0].additional_links[link],
                  });
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
  }, []);

  function toDatetime(datetime: any) {
    const date = new Date(datetime);

    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    return formattedDate + " at " + formattedTime;
  }

  function getEmbedURL(link: any) {
    const url = new URL(link);
    if (url.hostname === "www.youtube.com" && url.pathname === "/watch") {
      const videoId = url.searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return link;
  }

  const scrollToCurrent = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin" />
    </div>
  ) : (
    submission && (
      <div className="min-h-screen font-poppins">
        <div className="max-w-[1200px] items-center px-6 py-8 bg-white rounded-2xl mt-10 mx-3 xl:mx-auto mb-10">
          <div className="md:items-start mb-10">
            <div className="flex flex-col gap-2">
              <div
                onClick={scrollToCurrent}
                className="flex flex-col md:flex-row items-center md:items-end gap-3 cursor-pointer"
              >
                <h2 className="text-4xl tracking-tight font-semibold">
                  {submission.project_name}
                </h2>
                <div className="flex flex-col border-none bg-gray-200 rounded-md px-2 py-1">
                  {submission.submission_id}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-300 py-6 pl-3">
            {links.map((link, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="text-xl">{link.icon}</div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {link.text}
                </a>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-gray-300 w-full" />

          <div className="flex space-x-4 mt-4 border-gray-300">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-2 px-4 ${
                activeTab === "overview"
                  ? "border-b-2 border-purple-500 font-semibold"
                  : "text-gray-600"
              }`}
            >
              Project Overview
            </button>
            <button
              onClick={() => setActiveTab("outlook")}
              className={`py-2 px-4 ${
                activeTab === "outlook"
                  ? "border-b-2 border-purple-500 font-semibold"
                  : "text-gray-600"
              }`}
            >
              Future Outlook
            </button>
          </div>

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

          <div className="flex flex-row justify-center items-center w-full mt-8">
            <iframe
              src={getEmbedURL(submission.project_video_link)}
              height="500"
              width="900"
              className="shadow-lg hover:shadow-none rounded-xl hover:scale-105 transition duration-300 border-none"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    )
  );
};

export default SubmissionPage;
