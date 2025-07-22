import { useState } from "react";
import PageLayout from "../components/PageLayout";
import ProjectCard from "../components/ProjectCard";

const DesignPage = () => {
	const [selectedProject, setSelectedProject] = useState(null);

	const projects = [
		{
			id: "rowdy-poster",
			title: "ROWDY Type Poster",
			image: "./SD_TypePoster_ROWDY.png",
			description: "Typography exploration with bold, energetic design",
		},
		{
			id: "lombardia-poster",
			title: "LOMBARDIA Type Poster",
			image: "./SD_TypePoster_LOMBARDIA.png",
			description: "Elegant typography inspired by Italian design",
		},
		{
			id: "vote-poster",
			title: "Vote Poster",
			image: "./Vote_Poster.png",
			description: "Political awareness campaign design",
		},
	];

	return (
		<PageLayout
			title="DESIGN"
			description="I have always been an artist, I have just added to the art mediums I'm skillful with. From graphic design to 3D modeling, I love to create. I have a passion for beautiful and functional designs that resonate."
			showModal={!!selectedProject}
			selectedProject={selectedProject}
			onCloseModal={() => setSelectedProject(null)}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
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

export default DesignPage;
