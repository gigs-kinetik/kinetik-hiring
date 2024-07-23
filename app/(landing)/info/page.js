"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../../lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function InfoPage() {
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [eventNames, setEventNames] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const checkAccessCode = async () => {
    try {
      const formattedAccessCode = accessCode.toUpperCase();
      const accessCodeRef = doc(db, "Company Information", "Access Codes");
      const docSnap = await getDoc(accessCodeRef);
      const data = docSnap.data();
      if (data.hasOwnProperty(formattedAccessCode)) {
        setEventNames(data[formattedAccessCode]);
        sessionStorage.setItem(
          "filteredEvents",
          JSON.stringify(data[formattedAccessCode])
        );
        setError("");
        router.push("/home");
      } else {
        setError("Incorrect access code, please try again.");
        setEventNames([]);
      }
    } catch (error) {
      console.error("Error checking access code:", error);
      setError("Error checking access code. Please try again later.");
      setEventNames([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accessCode.trim() !== "") {
      checkAccessCode();
    }
  };

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (!storedEmail) {
      router.push("/login");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  return (
    <div className="font-poppins h-full flex flex-col">
      <div className="flex h-screen bg-gradient-to-tl from-logo-purple/95 via-mid-purple/40 via-65% to-transparent items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <form onSubmit={handleSubmit}>
            <div className="bg-off-white/40 rounded-lg">
              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="md:text-lg text-md font-medium rounded-lg border-0 text-logo-purple bg-transparent focus:ring-2 focus:ring-inset focus:ring-logo-purple/75 text-center w-80 placeholder-gray-600"
                placeholder="Enter your access code"
              />
            </div>
            <button
              type="submit"
              className="md:text-lg text-md font-semibold text-white bg-logo-purple px-4 py-2 rounded-lg hover:bg-opacity-80 mt-6"
            >
              Submit
            </button>
          </form>
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}
