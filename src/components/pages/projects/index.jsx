import Card from "@/components/atom/card/index";
import { static_data } from "@/data/static/index";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProjectsPage = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {static_data.pages.projects.simple_projects.map((project) => (
          <Card
            key={project.id}
            className="cursor-pointer relative" // Added relative positioning
            subtitle={project.name}
            content={project.desc}
            hoverEffect="scale"
          >
            <div className="flex justify-end mb-2">
              <Badge variant="secondary">
                آخرین آپدیت : {project.updated_at}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
