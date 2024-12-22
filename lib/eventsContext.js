import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from './firebaseConfig'

import {
  getDoc,
  getDocs,
  doc,
  collection,
} from "firebase/firestore";

const EventsContext = createContext();

export const useEvents = () => {
  return useContext(EventsContext);
};

export async function getEventById(eventId) {
  try {
    const eventDocRef = doc(db, "Events", eventId)

    const eventDoc = await getDoc(eventDocRef)

    if(eventDoc.exists()) {
      return eventDoc.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching document: ", error)
  }
}

export async function getSubmissionsByEvent(eventId) {
  try {
    const submissionDocs = collection(db, "Events", eventId, "Submissions")

    const querySnapshot = await getDocs(submissionDocs);

    const submissions = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Add the document ID for reference
      ...doc.data(), // Spread document data
    }));

    return submissions;
  } catch (error) {
    console.error("Error fetching document: ", error)
    throw error
  }
}

export async function getSubmissionDetails(eventId, submissionIds) {
  try {
    const snapshots = []
    for(const submissionId in submissionIds) {
      const submissionDocs = collection(db, "User Information", submissionIds[submissionId]["id"], "Submissions")
      const querySnapshot = await getDocs(submissionDocs)
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (doc.id === eventId) {
          snapshots.push({
            id: submissionIds[submissionId]["id"], // Document ID
            ...data,   // Document data
          });
        }
      });
    }
    return snapshots
  } catch (error) {
    console.error("Error fetching document: ", error)
    throw error
  }
}

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const fetchEventDocs = async () => {
    try {
      const response = await fetch("/api/getEventDocs");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchEventDocs();
  }, []);

  return (
    <EventsContext.Provider value={events}>{children}</EventsContext.Provider>
  );
};
