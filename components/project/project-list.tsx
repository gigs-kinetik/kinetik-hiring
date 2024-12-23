"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import { Timestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Trash2,
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

interface Project {
  "Event ID": string;
  "Event Name": string;
  "Short Description": string;
  "Long Description": string;
  Deadline: Timestamp;
  Paid: number;
  "Prize List": string[];
  "Prize Amount": number;
  "Required Skills": string[];
}

interface ProjectsListProps {
  projects: Project[];
  handlePay: (eventId: string, prizeAmount: number, percentage: number) => void;
  handleDelete: (eventId: string) => void;
}

export function ProjectsList({
  projects,
  handlePay,
  handleDelete,
}: ProjectsListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const router = useRouter()

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <Card key={project["Event ID"]} className="overflow-hidden">
          <CardHeader
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleExpand(index)}
          >
            <div>
              <CardTitle className="text-xl font-bold">
                {project["Event Name"]}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 mt-1">
                {project["Short Description"]}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-4">
                <div className={`px-2 py-2 font-semibold text-sm cursor-default border-none rounded-md hover:shadow-none hover:opacity-90 ${project["Paid"] && project["Paid"] === 1 ? 'bg-red-200 hover:bg-red-300' : project["Paid"] === 2 ? 'bg-orange-200 hover:bg-orange-300' : project["Paid"] === 3 ? 'bg-blue-200 hover:bg-blue-200' : 'bg-green-200 hover:bg-green-200'} active:opacity-60 transition duration-300`}>
                    {project && project["Paid"] && 
                      (project["Paid"] === 0 && <div>{"N/A"}</div> 
                          || project["Paid"] === 1 && <div>{"Pay 10%"}</div> 
                          || project["Paid"] === 2 && <div>{"Pay 90%!"}</div> 
                          || project["Paid"] === 3 && <div>{"Select Winner!"}</div>)
                          || project["Paid"] === 4 && <div>{"Prize Distributed!"}</div>
                    }
                  </div>
              
              {expandedIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(project["Event ID"]);
                }}
              >
                <Trash2 className="h-5 w-5 text-red-500 hover:text-red-700" />
              </Button>
              
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
                      <h3 className="font-semibold text-lg mb-2">
                        Description
                      </h3>
                      <p className="text-gray-700">
                        {project["Long Description"]}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Prizes</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {project["Prize List"].map((prize, i) => (
                          <li key={i} className="text-gray-700">
                            {prize}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Skills Needed</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {project["Required Skills"].map((skill, i) => (
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
                      Deadline:{" "}
                      {(project["Deadline"] as Timestamp)
                        .toDate()
                        .toLocaleDateString()}
                    </span>
                  </div>
                  <div className='flex flex-col justify-center gap-3'>
                    <Button
                      onClick={
                        (e) => {
                            if(project["Paid"] >= 2) {
                              e.preventDefault()
                              router.push(`/${encodeURIComponent(`${project["Event ID"]}`)}`)
                            } else {
                              e.preventDefault()
                              alert("Please pay the 10% first before seeing submissions.")
                            }
                          }}
                      className="bg-black text-white hover:opacity-75">
                      View Submission
                    </Button>
                    <Button
                      onClick={() => {
                        if (project["Paid"] === 1) {
                          handlePay(project["Event ID"], project["Prize Amount"], 10);
                        } else if(project["Paid"] === 2) {
                          handlePay(project["Event ID"], project["Prize Amount"], 90);
                        }
                      }}
                      className={`bg-black hover:opacity-75 text-white border-none rounded-md ${project["Paid"] === 3 || project["Paid"] === 4 ? "hidden": ""}`}
                    >
                      {project["Paid"] === 1  ? "Pay 10%" : project["Paid"] === 2 ? "Pay 90%" : "Approved!"}
                    </Button>
                  </div>
                  
                </CardFooter> 
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
    </div>
  );
}
