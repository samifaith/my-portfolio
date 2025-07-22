import { useState } from "react";
import { Compass, Code } from "lucide-react";
import PageLayout from "../components/PageLayout";
import ProjectCard from "../components/ProjectCard";

const DevelopmentPage = () => {
	const [selectedProject, setSelectedProject] = useState(null);

	const projects = [
		{
			id: "wanderlust",
			title: "Wanderlust",
			type: "UX/UI Case Study",
			description:
				"A comprehensive travel planning app designed to simplify trip organization and enhance user experience through intuitive design.",
			role: "UX/UI Designer",

			backgroundIcon: Compass,
			accentIcon: Code,
			backgroundGradient: "from-orange-400 to-red-500",
			route: "/wanderlust-case-study",
			customLayout: true,
		},
	];

	return (
		<PageLayout
			title="DEVELOPMENT"
			description="I fuse logic with artistry to craft immersive digital experiences. Whether building robust front-end applications or experimenting with new technologies, I see every line of code as a chance to bring fresh ideas to life."
			showModal={!!selectedProject}
			selectedProject={selectedProject}
			onCloseModal={() => setSelectedProject(null)}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{projects.map((project) => (
					<ProjectCard
						key={project.id}
						projectData={project}
						onProjectClick={setSelectedProject}
					/>
				))}
			</div>
		</PageLayout>
	);
};

export default DevelopmentPage;
