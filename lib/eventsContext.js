import React, { createContext, useState, useEffect, useContext } from "react";

const EventsContext = createContext();

export const useEvents = () => {
  return useContext(EventsContext);
};

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const fetchEventDocs = async () => {
    try {
      const response = await fetch("/api/getEventDocs", { cache: "no-store" });
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
