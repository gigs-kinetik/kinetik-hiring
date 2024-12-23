"use client";

import React, { useState } from "react";
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
  FinalPaid: string;
  "Prize List": string[];
  "Prize Amount": number;
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
                  project["FinalPaid"] === "Approved" ? "default" : "secondary"
                }
              >
                {project["FinalPaid"] === "Approved" ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approved
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4 mr-1" />
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
                  <Button
                    onClick={() =>
                      handlePay(
                        project["Event ID"],
                        project["Prize Amount"],
                        project["FinalPaid"] === "Approved" ? 90 : 10
                      )
                    }
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Pay {project["FinalPaid"] === "Approved" ? "90%" : "10%"}
                  </Button>
                </CardFooter>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
    </div>
  );
}
