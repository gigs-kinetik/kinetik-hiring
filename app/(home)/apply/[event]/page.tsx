"use client";

import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { BasicEvent } from "../../../../util/wrapper/basicTypes";
import { getInstance, getEvent } from "../../../../util/wrapper/globals";
import {
  CompanyInstance,
  UserInstance,
} from "../../../../util/wrapper/instance";
import { Company } from "../../../../util/wrapper/static";

export default function ApplyPage() {
  const router = useRouter();
  const { event: eventId } = useParams();
  const [projectLink, setProjectLink] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [additionalLink1, setAdditionalLink1] = useState("");
  const [additionalLink2, setAdditionalLink2] = useState("");
  const [additionalLink3, setAdditionalLink3] = useState("");
  const [validationError, setValidationError] = useState("");
  const [event, setEvent] = useState<BasicEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<CompanyInstance>(null);
  const [user, setUser] = useState<CompanyInstance | UserInstance | null>(null);

  useEffect(() => {
    async function func() {
      if (!user) setUser(await getInstance());
      if (eventId && user && user instanceof UserInstance) {
        const event = await getEvent(parseInt(eventId as string));
        // setCompany(await Company.getById(event.company_id));
        setEvent(event);
        const submissions = await user.getSubmissions();
        if (
          submissions.filter((sub) => sub.event_id === event.event_id).length >
          0
        ) {
          router.push("/home");
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    func();
  }, [router, user]);

  function toDatetime(datetime: any) {
    const date = new Date(datetime);

    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    return formattedDate + " at " + formattedTime;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectLink || !resumeLink || !videoLink) {
      setValidationError(
        "Project link, resume link, and video link are required."
      );
      return;
    } else {
      setValidationError("");
    }

    try {
      if (user instanceof UserInstance) {
        await user.createSubmission({
          event_id: event.event_id,
          project_name: `${user.firstName} ${user.lastName}'s -> ${event.event_name}`,
          project_description: `${user.firstName} ${user.lastName}'s -> ${event.event_name} -> Description`,
          project_link: projectLink,
          project_video_link: videoLink,
          resume_link: resumeLink,
          additional_links: [
            additionalLink1,
            additionalLink2,
            additionalLink3,
          ].filter((link) => link.length > 0),
        });
      } else {
        alert("You are not a user!");
        throw new Error("Not a user");
      }

      router.push("/home");
      alert("Submission successful!");
    } catch (error) {
      console.error("Error: ", error);
      alert("Submission failed.");
    }
  };

  if (loading || !event) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col ml-10 mr-10 mb-10 mt-4">
      <div className="flex flex-row mb-4 place align-middle">
        <Link href="/home">
          <ArrowUturnLeftIcon className="flex-shrink-0 size-7 mt-1 fill-gray-600" />
        </Link>
        <p className="font-poppins mt-1 ml-4 text-gray-600 font-normal text-lg">
          Challenge Submission
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col bg-white rounded-lg p-5">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="font-poppins mb-2 lg:flex lg:text-sm hidden text-gray-500">
                Sponsored by
              </div>
              <div className="font-poppins lg:text-3xl text-xl font-semibold text-logo-purple">
                {event.event_name}
              </div>
              <div className="font-poppins mt-2 lg:flex lg:text-xs hidden text-gray-500">
                Submit by {toDatetime(event.end_time)}
              </div>
            </div>
          </div>
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
            Task
          </div>
          <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
            {event.long_description}
          </div>
          <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
            Please contact info@kinetikgigs.com for any questions.
          </div>
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
            Prize Pool
          </div>
          {event.prize_list && event.prize_list.length > 0 ? (
            <ul
              className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple"
              style={{
                listStyleType: "disc",
                paddingLeft: "20px",
              }}
            >
              {event.prize_list.map((prize, index) => (
                <li key={index}>{prize}</li>
              ))}
            </ul>
          ) : (
            <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
              {event.prize_list || "No prizes available"}
            </div>
          )}
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
            Skill Requirements
          </div>
          <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
            This challenge will require you to utilize the following skills to
            the best of your ability:{" "}
            {event.required_skills && (
              <span className="font-poppins text-sm pr-2 text-logo-purple">
                {event.required_skills.join(", ")}.
              </span>
            )}
          </div>
          <div className="font-poppins sm:text-lg font-semibold text-sm text-logo-purple block mt-4">
            Upload Project Submission <span className="text-red-500">*</span>
          </div>
          <p className="font-poppins mt-1 sm:text-sm text-xs text-gray-500">
            Please attach your GitHub link (coding submission) or Google Drive
            link (business proposal) with proper access.
          </p>
          <input
            className="flex font-poppins max-w-96 text-sm text-gray-900 border border-gray-300 rounded-md cursor-text bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-logo-purple/90"
            type="text"
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
          />
          <p className="font-poppins sm:text-xs text-xs text-gray-500 mt-1 mb-4">
            GitHub, Google Drive
          </p>
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple block">
            Upload Resume <span className="text-red-500">*</span>
          </div>
          <p className="font-poppins mt-1 sm:text-sm text-xs text-gray-500">
            Please attach your resume with proper access. We collect resumes for
            potential sponsor hiring.
          </p>
          <input
            className="flex font-poppins max-w-96 text-sm text-gray-900 border border-gray-300 rounded-md cursor-text bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-logo-purple/90"
            type="text"
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
          />
          <p className="font-poppins sm:text-xs text-xs text-gray-500 mt-1 mb-4">
            Google Drive
          </p>
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple block">
            Upload Video Submission <span className="text-red-500">*</span>
          </div>
          <p className="font-poppins mt-1 sm:text-sm text-xs text-gray-500">
            Please attach a quick video of you explaining your product or
            proposal with proper access.
          </p>
          <input
            className="flex font-poppins max-w-96 text-sm text-gray-900 border border-gray-300 rounded-md cursor-text bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-logo-purple/90"
            type="text"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />
          <p className="font-poppins sm:text-xs text-xs text-gray-500 mt-1 mb-4">
            Google Drive, YouTube, Vimeo
          </p>
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple block">
            Upload Additional Attachments
          </div>
          <p className="font-poppins mt-1 sm:text-sm text-xs text-gray-500">
            Please attach any additional links for further review (i.e. website
            link, server/database link, research articles, etc).
          </p>
          <input
            className="flex font-poppins max-w-96 text-sm text-gray-900 border border-gray-300 rounded-md cursor-text bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-logo-purple/90"
            type="text"
            value={additionalLink1}
            onChange={(e) => setAdditionalLink1(e.target.value)}
          />
          <input
            className="flex font-poppins max-w-96 text-sm text-gray-900 border border-gray-300 rounded-md cursor-text bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-logo-purple/90 mt-2"
            type="text"
            value={additionalLink2}
            onChange={(e) => setAdditionalLink2(e.target.value)}
          />
          <input
            className="flex font-poppins max-w-96 text-sm text-gray-900 border border-gray-300 rounded-md cursor-text bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-logo-purple/90 mt-2"
            type="text"
            value={additionalLink3}
            onChange={(e) => setAdditionalLink3(e.target.value)}
          />
          {validationError && (
            <p className="font-poppins text-red-500 font-medium text-sm mt-4">
              {validationError}
            </p>
          )}
          <div>
            <button
              type="submit"
              className="rounded-lg bg-logo-purple/85 text-white font-poppins w-32 h-10 font-medium mt-6 mb-5"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
