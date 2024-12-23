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
              <Badge
                variant={
                  project["Paid"] === 3 ? "default" : "secondary"
                }
              >
                {project["Paid"] === 3 ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-[30px]" />
                    Approved
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4 mr-[30px]" />
                    Pending Payment
                  </>
                )}
              </Badge>
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
                  <div className='flex flex-row justify-center gap-3'>
                    <Button
                    onClick={
                      (e) => {
                          if(project["Paid"] === 2) {
                            e.preventDefault()
                            router.push(`/${encodeURIComponent(`${project["Event ID"]}`)}`)
                          } else {
                            e.preventDefault()
                            alert("Please pay the 10% first before seeing submissions.")
                          }
                        }}
                    className="bg-black text-white">
                      View Submission
                    </Button>
                    <Button
                      onClick={() => {
                        if (project["Paid"] === 1) {
                          handlePay(project["Event ID"], project["Prize Amount"], 10);
                        } else {
                          handlePay(project["Event ID"], project["Prize Amount"], 90);
                        }
                      }}
                      className={`bg-black hover:bg-purple-700 text-white border-none rounded-md ${project["Paid"] === 3 ? "hidden": ""}`}
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
