import { useState } from "react";
import { Compass, Code, Camera, Pen } from "lucide-react";
import PageLayout from "../components/PageLayout";
import ProjectCard from "../components/ProjectCard";
import "../styles/MosaicGrid.css";

const ExpertisePage = () => {
	const [selectedProject, setSelectedProject] = useState(null);
	const [activeFilter, setActiveFilter] = useState("all");

	// Unified projects from all expertise areas
	const allProjects = [
		// DESIGN PROJECTS
		{
			id: "rowdy-poster",
			title: "ROWDY Type Poster",
			image: "/design/SD_TypePoster_ROWDY.png",
			description: "Typography exploration with bold, energetic design",
			category: "design",
			size: "medium", // for mosaic sizing
		},
		{
			id: "lombardia-poster",
			title: "LOMBARDIA Type Poster",
			image: "/design/SD_TypePoster_LOMBARDIA.png",
			description: "Elegant typography inspired by Italian design",
			category: "design",
			size: "medium",
		},
		{
			id: "vote-poster",
			title: "Lady Liberty Says to Vote",
			image: "/design/Vote_Poster.png",
			description: "Political awareness poster design",
			category: "design",
			size: "medium",
		},
		{
			id: "black-unicorn",
			title: "Black Unicorn",
			image: "/design/BlackUnicorn.png",
			description: "Illustration and brand expression study",
			category: "design",
			size: "medium",
		},
		{
			id: "sam-vector",
			title: "Life 2 Life Travel Agency | Web Interface",
			image: "/design/SamDeCoteau_Vector.png",
			description: "Vector portrait exploration",
			category: "design",
			size: "medium",
		},

		// DEVELOPMENT PROJECTS
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
			category: "development",
			size: "large",
			customLayout: true,
		},

		// WRITING PROJECTS
		{
			id: "eat-like-child",
			title: "Eat Like a Child",
			category: "writing",
			tags: ["Culture", "Memoir", "Caribbean"],
			previewContent:
				"A nostalgic reflection on Caribbean culture, family traditions, and the complex relationship between immigrant identity and food.",
			type: "Memoir",
			theme: "Culture",
			route: "/writing/eat-like-child",
			size: "medium",
		},
		{
			id: "home-cook",
			title: "The Rise of the Home Cook",
			category: "writing",
			tags: ["Food", "Profile", "Cooking"],
			previewContent:
				"An intimate look at a home chef who transforms family recipes into culinary magic through intuition and ancestral wisdom.",
			type: "Profile",
			theme: "Food",
			route: "/writing/home-cook",
			size: "medium",
		},
		{
			id: "tea-with-sami",
			title: "Tea with Sami",
			category: "writing",
			tags: ["Audio", "Relationships", "Growth"],
			previewContent:
				"An intimate conversation exploring relationships, personal growth, and the stories we tell ourselves about justice and healing.",
			type: "Audio",
			theme: "Podcast",
			route: "/writing/tea-with-sami",
			size: "medium",
		},

		// MEDIA PROJECTS
		{
			id: "diving-film",
			title: "Diving",
			type: "Photography / Video",
			description: "Short motion capture from the photography collection.",
			video: "/photography/diving.MP4",
			backgroundIcon: Camera,
			category: "media",
			size: "large",
		},
	];

	const filters = [
		{ id: "all", label: "All Work", icon: null },
		{ id: "design", label: "Design", icon: Pen },
		{ id: "development", label: "Development", icon: Code },
		{ id: "writing", label: "Writing", icon: Pen },
		{ id: "media", label: "Media", icon: Camera },
	];

	const filteredProjects =
		activeFilter === "all"
			? allProjects
			: allProjects.filter((project) => project.category === activeFilter);

	return (
		<PageLayout
			title="EXPERTISE"
			// description="A curated collection of design, development, writing, and media projects that showcase my multidisciplinary approach to creating meaningful experiences."
			showModal={!!selectedProject}
			selectedProject={selectedProject}
			onCloseModal={() => setSelectedProject(null)}
		>
			{/* Filter Tabs */}
			<div className="filter-tabs">
				{filters.map((filter) => (
					<button
						key={filter.id}
						onClick={() => setActiveFilter(filter.id)}
						className={`filter-tab ${
							activeFilter === filter.id ? "active" : ""
						}`}
					>
						{filter.icon && <filter.icon className="filter-icon" />}
						<span>{filter.label}</span>
					</button>
				))}
			</div>

			{/* Mosaic Grid */}
			<div className="mosaic-grid">
				{filteredProjects.map((project, index) => (
					<div
						key={project.id}
						className={`mosaic-item mosaic-${
							project.size || "medium"
						} reveal-item`}
						style={{ animationDelay: `${index * 0.1}s` }}
					>
						<ProjectCard
							projectData={project}
							onProjectClick={setSelectedProject}
						/>
					</div>
				))}
			</div>

			{/* Empty State */}
			{filteredProjects.length === 0 && (
				<div className="empty-state">
					<div className="empty-state-content">
						<h3>No projects in this category yet</h3>
						<p>Check back soon for new work!</p>
					</div>
				</div>
			)}
		</PageLayout>
	);
};

export default ExpertisePage;
