"use client";

import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../../../lib/firebaseConfig";
import { doc, setDoc, collection } from "firebase/firestore";
import validator from 'validator'


export default function ApplyPage() {
  const router = useRouter();
  const [projectLink, setProjectLink] = useState("");
  const [projectName, setProjectName] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [projectDescription, setProjectDescription] = useState("")
  const [additionalLink1, setAdditionalLink1] = useState("");
  const [additionalLink2, setAdditionalLink2] = useState("");
  const [additionalLink3, setAdditionalLink3] = useState("");
  const [validationError, setValidationError] = useState("");
  const [event, setEventInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedEvent = sessionStorage.getItem("currentEvent");
    if (storedEvent) {
      const eventInfo = JSON.parse(storedEvent);
      setEventInfo(eventInfo);
      const submissionIds = sessionStorage.getItem("submissionIds");
      if (submissionIds.includes(eventInfo["Event ID"])) {
        router.push("/home");
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [router]);

  const githubCheck = (projectURL) => {
    const validUrl = validator.isURL(projectURL, {
      protocols: ['http', 'https'],
      require_protocol: true, 
    });

    const projectCheck = projectURL.toLowerCase().includes('github')
    if(!projectCheck || !validUrl) {
      alert("Project link is not a GitHub link.")
    }
    return projectCheck && validUrl;
  }

  const resumeCheck = (resumeURL) => {
    const validUrl = validator.isURL(resumeURL, {
      protocols: ['http', 'https'],
      require_protocol: true,
    });

    const isPdf = resumeURL.toLowerCase().endsWith('.pdf')
    if(!isPdf || !validUrl) {
      alert("Resume link is not a valid PDF file.")
    }
    return validUrl && isPdf;
  }

  const videoCheck = (videoURL) => {
    const validUrl = validator.isURL(videoURL, {
      protocols: ['http', 'https'],
      require_protocol: true,
    });

    const youtubeCheck = videoURL.toLowerCase().includes('youtube') && videoURL.toLowerCase().includes('watch')
    if(!validUrl || !youtubeCheck) {
      alert("Video link is not a YouTube link. Please give a YouTube video.")
    }
    return validUrl && youtubeCheck;
  }

  const additionalLinkCheck = (additionalLinks) => {
    console.log(additionalLinks)
    for(const link of additionalLinks) {
      if(link !== "") {
        console.log('here')
        const validUrl = validator.isURL(link, {
          protocols: ['http', 'https'],
          require_protocol: true,
        });
  
        if(!validUrl) {
          alert(link + " is invalid. Please enter a proper 'http' or 'https' link.")
          return false;
        }
      } else {
        continue;
      }
    }

    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = sessionStorage.getItem("userEmail");
    if (!projectLink || !resumeLink || !videoLink) {
      setValidationError(
        "Project link, resume link, and video link are required."
      );
      return;
    } else {
      setValidationError("");
    }

    try {
      const userInfoRef = doc(db, "User Information", userEmail);
      const submissionsRef = collection(userInfoRef, "Submissions");
      const options = { timeZone: "America/Chicago", timeZoneName: "short" };
      const currDate = new Date()
        .toLocaleDateString("en-US", options)
        .split(", ")[0];
      const currTime = new Date().toLocaleTimeString("en-US", options);

      if(projectDescription.length > 0 && projectName.length > 0 && videoCheck(videoLink) && githubCheck(projectLink) && resumeCheck(resumeLink) && additionalLinkCheck([additionalLink1, additionalLink2, additionalLink3])) {
        await setDoc(doc(submissionsRef, event["Event ID"]), {
          "Event Name": event["Event Name"],
          "Project Name": projectName,
          "Project Description": projectDescription,
          "Submitted At": currDate + ", " + currTime,
          "Project Link": projectLink,
          "Resume Link": resumeLink,
          "Video Link": videoLink,
          "Other Links": [
            additionalLink1,
            additionalLink2,
            additionalLink3,
          ].filter((link) => link !== ""),
        });
        const eventSubmissionRef = doc(db, "Events", event["Event ID"]);
        const submissionsRef2 = collection(eventSubmissionRef, "Submissions");
        await setDoc(doc(submissionsRef2, userEmail), {});
        router.push("/home");
        alert("Submission successful!");
      } 
    } catch (error) {
      console.error("Error adding document: ", error);
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
                Sponsored by {event["Company"]}
              </div>
              <div className="font-poppins lg:text-3xl text-xl font-semibold text-logo-purple">
                {event["Event Name"]}
              </div>
              <div className="font-poppins mt-2 lg:flex lg:text-xs hidden text-gray-500">
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
            </div>
          </div>
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
            Task
          </div>
          <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
            {event["Long Description"]}
          </div>
          <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
            Please contact {event["Contact"]} for any questions.
          </div>
          {event["Features"] && event["Features"].length > 0 && (
            <div>
              <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
                Features
              </div>
              <ul
                className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple"
                style={{
                  listStyleType: "disc",
                  paddingLeft: "20px",
                }}
              >
                {event["Features"].map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
            Prize Pool
          </div>
          {event["Prizes Description"] ? (
            <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
              {event["Prizes Description"]}
            </div>
          ) : (
            event["Prize List"] &&
            event["Prize List"].length > 0 && (
              <ul
                className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple"
                style={{
                  listStyleType: "disc",
                  paddingLeft: "20px",
                }}
              >
                {event["Prize List"].map((prize, index) => (
                  <li key={index}>{prize}</li>
                ))}
              </ul>
            )
          )}
          <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
            Skill Requirements
          </div>
          <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
            This challenge will require you to utilize the following skills to
            the best of your ability:{" "}
            {event["Required Skills"] && (
              <span className="font-poppins text-sm pr-2 text-logo-purple">
                {event["Required Skills"].join(", ")}.
              </span>
            )}
          </div>
          <div className="font-poppins sm:text-lg font-semibold text-sm text-logo-purple block mt-4">
            Enter Project Name <span className="text-red-500">*</span>
          </div>
          <p className="font-poppins mt-1 sm:text-sm text-xs text-gray-500">
            Please enter your project's name.
          </p>
          <input
            className="flex font-poppins max-w-96 text-sm text-gray-900 border border-gray-300 rounded-md cursor-text bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-logo-purple/90"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <div className="font-poppins sm:text-lg font-semibold text-sm text-logo-purple block mt-4">
            Enter Project Description <span className="text-red-500">*</span>
          </div>
          <p className="font-poppins mt-1 sm:text-sm text-xs text-gray-500">
            Please enter your project's description.
          </p>
          <input
            className="flex font-poppins max-w-96 text-sm text-gray-900 border border-gray-300 rounded-md cursor-text bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-logo-purple/90"
            type="text"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <div className="font-poppins sm:text-lg font-semibold text-sm text-logo-purple block mt-4">
            Upload Project Submission <span className="text-red-500">*</span>
          </div>
          <p className="font-poppins mt-1 sm:text-sm text-xs text-gray-500">
            Please attach your GitHub link with proper access.
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
            Please attach your resume with proper access. Make sure that it is a '.pdf' link.
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
            Please attach a quick video of you explaining your product on YouTube.
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
