"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";

export default function CompanyDashboard() {
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [deadline, setDeadline] = useState("");
  const [eventName, setEventName] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [prizeList, setPrizeList] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !company || !contact || !deadline || !eventName || 
        !longDescription || !shortDescription || !prizeList || 
        !requiredSkills
      ) {
        setError("All fields are required.");
        return;
      }
      
      const prizes = prizeList.split(',').map(prize => prize.trim());
      const skills = requiredSkills.split(',').map(skill => skill.trim());

      await addDoc(collection(db, "Events"), {
        Company: company,
        Contact: contact,
        Deadline: deadline,
        "Event Name": eventName,
        "Long Description": longDescription,
        "Short Description": shortDescription,
        "Prize List": prizes,
        "Required Skills": skills,
      });

      setSuccess("Event added successfully!");
      setError("");
      setCompany("");
      setContact("");
      setDeadline("");
      setEventName("");
      setLongDescription("");
      setShortDescription("");
      setPrizeList("");
      setRequiredSkills("");
    } catch (error) {
      setError("Failed to add event.");
      setSuccess("");
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="flex flex-col items-center ml-10 mr-10 mb-10 mt-4">
      <div className="flex flex-row mb-4 items-center w-full max-w-4xl">
        <button onClick={() => router.push("/home")} className="mr-4">
          <ArrowUturnLeftIcon className="w-6 h-6 text-gray-600" />
        </button>
        <p className="font-poppins text-gray-600 font-normal text-lg">
          Company Dashboard
        </p>
      </div>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-5">
        <h2 className="font-poppins text-xl font-semibold text-logo-purple mb-4">
          Add New Event
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="font-poppins text-sm mt-4 text-gray-600">
            <label className="block mb-2">
              Company
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md"
                required
              />
            </label>
            <label className="block mb-2">
              Contact
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md"
                required
              />
            </label>
            <label className="block mb-2">
              Deadline
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md"
                required
              />
            </label>
            <label className="block mb-2">
              Event Name
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md"
                required
              />
            </label>
            <label className="block mb-2">
              Long Description
              <textarea
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md"
                required
              />
            </label>
            <label className="block mb-2">
              Short Description
              <textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md"
                required
              />
            </label>
            <label className="block mb-2">
              Prize List (comma-separated)
              <input
                type="text"
                value={prizeList}
                onChange={(e) => setPrizeList(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md"
                required
              />
            </label>
            <label className="block mb-4">
              Required Skills (comma-separated)
              <input
                type="text"
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md"
                required
              />
            </label>
            {error && (
              <p className="text-red-500 font-medium text-sm mt-4">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-500 font-medium text-sm mt-4">
                {success}
              </p>
            )}
            <button
              type="submit"
              className="rounded-lg bg-logo-purple/85 text-white font-poppins w-32 h-10 font-medium mt-6"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
