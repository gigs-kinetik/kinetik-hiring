"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import { Timestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSubmissionsByEvent } from "../../lib/eventsContext";

interface Event {
  "Event ID": string;
  "Event Name": string;
  "Short Description": string;
  "Company": string;
  Deadline: {_seconds: number, _nanoseconds: number};
  Paid: number;
  "Prize List": string[];
  "Required Skills": string[];
}

interface DevelopersListProps {
  userEmail: string;
  events: Event[];
  filteredEvents: string[];
  handleApplyClick: (event: Event) => void;
  isApplied: (eventId: string) => boolean;
}

export function DevelopersList({
  userEmail,
  events,
  filteredEvents,
  handleApplyClick,
  isApplied,
}: DevelopersListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const router = useRouter();

  return (
    <div className="space-y-6 font-poppins">
      {events.map((event, index) => {
        if(filteredEvents.some(filteredEvent => filteredEvent === event["Event ID"])) {
            const eventDate = new Date(event['Deadline']._seconds * 1000);
            const isDeadlineValid = eventDate > new Date();
            return (
                <Card key={event["Event ID"]} className="overflow-hidden">
                    <CardHeader
                    className="cursor-pointer flex flex-row items-center justify-between"
                    onClick={() => toggleExpand(index)}
                    >
                    <div>
                        <CardTitle className="text-xl font-bold">
                        {event["Event Name"]}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500 mt-1">
                        {event["Company"]}
                        </CardDescription>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className={`px-2 py-2 font-semibold text-sm cursor-default border-none rounded-md hover:shadow-none hover:opacity-90 ${isApplied(event['Event ID']) ? 'bg-green-200 hover:bg-green-300' : 'bg-red-200 hover:bg-red-300'} active:opacity-60 transition duration-300`}>
                            {isApplied(event['Event ID']) ? 'Applied' : 'Not Applied!'}
                        </div>
                        {expandedIndex === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                    </div>
                    </CardHeader>
                    <AnimatePresence>
                    {expandedIndex === index && (
                        <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        >
                        <CardContent className="pt-4 pb-2">
                            <div className="grid gap-4">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Description</h3>
                                <p className="text-gray-700">
                                {event["Short Description"] ||
                                    "No description available"}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">
                                Prizes
                                </h3>
                                <ul className="list-disc list-inside space-y-1">
                                {event["Prize List"].map((prize, i) => (
                                    <li key={i} className="text-gray-700">
                                    {prize}
                                    </li>
                                ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">
                                Required Skills
                                </h3>
                                <ul className="list-disc list-inside space-y-1">
                                {event["Required Skills"].map((skill, i) => (
                                    <li key={i} className="text-gray-700">
                                    {skill}
                                    </li>
                                ))}
                                </ul>
                            </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-gray-500" />
                            <span className="text-sm text-gray-500">
                                Deadline: {eventDate.toLocaleDateString("en-US")}
                            </span>
                            </div>
                            <Button
                                onClick={() => {
                                    router.push(`/apply/${encodeURIComponent(event['Event Name'])}`)
                                }}
                                disabled={!isDeadlineValid}
                                className={`bg-black text-white hover:opacity-75 ${
                                    isApplied(event["Event ID"])
                                    ? "hidden"
                                    : ""
                                }`}
                                >
                                Apply
                            </Button>
                            <Button
                                onClick={async () => {
                                    const submissions = await getSubmissionsByEvent(event['Event ID'])
                                    if(submissions) {
                                        const userSubmission = submissions.filter((submission) => userEmail === submission['id'])[0]
                                        router.push(`${event["Event ID"]}/submission/${userSubmission['id']}`)
                                    }
                                    
                                }}
                                className={`bg-black text-white hover:opacity-75 ${
                                    isApplied(event["Event ID"])
                                    ? ""
                                    : "hidden"
                                }`}
                                >
                                View Your Submission
                            </Button>
                        </CardFooter>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </Card>
                );
            }
        })}
    </div>
  );
}
