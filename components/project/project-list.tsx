import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../../components/ui/button";
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { getSubmissionsByEvent } from "../../lib/eventsContext";

// 

export function ProjectsList({
  projects,
  handlePay,
  handleDelete,
}: {
  projects: [];
  handlePay: Function;
  handleDelete: Function;
}) {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [submissionsLength, setSubmissionsLength] = useState(0);
  const router = useRouter();

  const monitorIndex = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  const monitorSubmissions = async (index: number) => {
    try {
      const submissions = await getSubmissionsByEvent(projects[index]["Event ID"]);
      setSubmissionsLength(submissions ? submissions.length : 0);
    } catch (error) {
      console.error("Error fetching submissions: ", error);
      setSubmissionsLength(0);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 font-poppins">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-poppins border-none text-purple-500/85">Name</TableHead>
              <TableHead className="font-poppins border-none text-purple-500/85">Description</TableHead>
              <TableHead className="font-poppins border-none text-purple-500/85">Deadline</TableHead>
              <TableHead className="font-poppins border-none text-purple-500/85">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, index) => (
              <>
                <TableRow 
                  key={project["Event Name"]}
                  className="cursor-pointer hover:bg-gray-50 w-80"
                  onClick={() => {monitorIndex(index); monitorSubmissions(index)}}
                >
                  <TableCell className={`font-poppins font-bold`}>{project["Event Name"]}</TableCell>
                  <TableCell className={`font-poppins ${expandedIndex === index ? 'font-bold' : ''}`}>{project["Short Description"]}</TableCell>
                  <TableCell className={`font-poppins ${expandedIndex === index ? 'font-bold' : ''}`}>{(project["Deadline"] as Timestamp).toDate().toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div 
                      className={`
                        font-poppins ${expandedIndex === index ? 'font-bold' : ''} px-2 py-1 
                        ${project["FinalPaid"] === "Approved" ? 'hover:text-green-500 transition duration-300' : 
                          project["InitPaid"] === "Approved" ? 'hover:text-orange-500 transition duration-300' : 
                          'hover:text-red-500 transition duration-300'}
                      `}
                    >
                      {project["FinalPaid"] === "Approved" ? "Project Approved!" : 
                      project["InitPaid"] === "Approved" ? "Pay 90%" : "Pay 10%"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedIndex === index && (
                  <TableRow>
                    <TableCell colSpan={5} className="bg-gray-50 p-4">
                      <div className="mx-auto w-11/12 lg:w-5/6 xl:w-3/4">
                        <div className="grid gap-4">
                          <div className="flex flex-row items-center justify-between">
                            <div className="w-64 h-40 overflow-auto">
                              <h3 className="font-poppins font-semibold mb-2">Description</h3>
                              <p className="font-poppins">
                                {project["Long Description"] + project["Long Description"]}
                              </p>
                            </div>
                            <div>
                              <Button
                                className="bg-black hover:bg-gray-800 text-white font-poppins hover:opacity-75"
                                onClick={(e) => {
                                  if (project["InitPaid"] === "Approved") {
                                    e.preventDefault();
                                    router.push(`/${encodeURIComponent(project["Event ID"])}`);
                                  } else {
                                    e.preventDefault();
                                    alert("Must pay the initial 10% to see submissions.");
                                  }
                                }}
                              >
                                View Results
                              </Button>
                            </div>
                          </div>

                          <div className="flex flex-row items-start gap-4">
                            <div className="flex-1">
                              <h3 className="font-poppins font-semibold mb-2">Prizes</h3>
                              <ul className="list-disc list-inside font-poppins">
                                {(project["Prize List"] as []).map((prize, i) => (
                                  <li key={i}>{prize}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-poppins font-semibold mb-2">Required Skills</h3>
                              <p className="font-poppins">
                                {(project["Required Skills"] as []).join(", ")}
                              </p>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-poppins font-semibold mb-2">Submissions</h3>
                              <p className="font-poppins">{submissionsLength}</p>
                            </div>
                            <div className="flex justify-end items-center">
                              <Button
                                onClick={() =>
                                  project["InitPaid"] === "Approved"
                                    ? handlePay(
                                        project["Event ID"],
                                        project["Prize Amount"],
                                        90
                                      )
                                    : handlePay(
                                        project["Event ID"],
                                        project["Prize Amount"],
                                        10
                                      )
                                }
                                className={`${
                                  project["FinalPaid"] === "Approved" ? "hidden" : ""
                                } bg-black hover:opacity-75 text-white font-poppins`}
                              >
                                Pay
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}


              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
