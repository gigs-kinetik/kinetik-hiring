import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { MoreVertical } from "lucide-react";



export function ProjectsGrid({ projects }: { projects: [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pr-4">
      {projects.map((project) => (
        <Card key={project["id"]} className="bg-white/70">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">{project["name"]}</h2>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {project["description"]}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              {project["created"]}
            </span>
            <span className="text-sm font-medium">{project["progress"]}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
