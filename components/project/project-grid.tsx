"use client"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Edit, MoreVertical } from 'lucide-react';

import { Timestamp } from "firebase/firestore";

import { useRouter } from 'next/navigation'
import { useState } from "react";
interface Submission {
  "Project Name": string;
  "Project Description": string;
  "Project Link": string;
  "Resume Link": string;
  "Submitted At": string;
  "Video Link": string;
  "Additional Links": string[] | null;
  id: string;
}

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


export function ProjectsGrid({ project, submissions, daysLeft }: { project: Project, submissions: Submission[] , daysLeft: number }) {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)

  const toggleSelection = (id: string) => {
    setSelected((prev) => (prev === id ? null : id)); 
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {submissions.map((submission) => (
        <div key={submission["id"]} className={`relative ${selected === submission["id"] ? 'opacity-60': ''}`}> 
          <Card key={submission["Project Name"]} className="bg-white/70 w-full max-w-[300px] shadow-md hover:shadow-none transition duration-300 cursor-pointer" onClick={project && submission && project["Paid"] === 3 ? () => {router.push(`${project["Event ID"]}/submission/${submission["id"]}`)} : () => {}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">{submission["Project Name"]}</h2>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {submission["Project Description"]}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Submitted At: {new Date(submission["Submitted At"]).toLocaleString()}
              </span>
            </CardFooter>
          </Card>
        </div>
        
      ))}
    </div>
  );
}

