import React, { createContext, useState, useEffect, useContext } from "react";

const EventsContext = createContext();

export const useEvents = () => {
  return useContext(EventsContext);
};

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllSetupDocuments = async () => {
    try {
      const response = await fetch("/api/getSetupDocs");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchAllSetupDocuments();
  }, []);

  return (
    <EventsContext.Provider value={{ events, error }}>
      {children}
    </EventsContext.Provider>
  );
};
