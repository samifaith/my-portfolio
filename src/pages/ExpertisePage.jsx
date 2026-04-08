import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Compass, Code, Camera, Pen, ChevronUp } from "lucide-react";
import PageLayout from "../components/PageLayout";
import ProjectCard from "../components/ProjectCard";
import "../styles/MosaicGrid.css";

const ExpertisePage = () => {
	const [selectedProject, setSelectedProject] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const [storiesById, setStoriesById] = useState(null);
	const [caseStudiesById, setCaseStudiesById] = useState(null);
	const [CaseStudyContentComponent, setCaseStudyContentComponent] =
		useState(null);
	const [isModalContentLoading, setIsModalContentLoading] = useState(false);
	const [modalContentError, setModalContentError] = useState(null);
	const [isReturnToTopVisible, setIsReturnToTopVisible] = useState(false);
	const filterTabsRef = useRef(null);

	// Unified projects from all expertise areas
	const allProjects = useMemo(
		() => [
			// DESIGN PROJECTS
			{
				id: "rowdy-poster",
				title: "ROWDY Type Poster",
				image: "/design/SD_TypePoster_ROWDY.webp",
				description: "Typography exploration with bold, energetic design",
				category: "design",
				size: "medium", // for mosaic sizing
			},
			{
				id: "lombardia-poster",
				title: "LOMBARDIA Type Poster",
				image: "/design/SD_TypePoster_LOMBARDIA.webp",
				description: "Elegant typography inspired by Italian design",
				category: "design",
				size: "medium",
			},
			{
				id: "vote-poster",
				title: "Lady Liberty Says to Vote",
				image: "/design/Vote_Poster.webp",
				description: "Political awareness poster design",
				category: "design",
				size: "medium",
			},
			{
				id: "black-unicorn",
				title: "Black Unicorn",
				image: "/design/BlackUnicorn.webp",
				description: "Illustration and brand expression study",
				category: "design",
				size: "medium",
			},
			{
				id: "sam-vector",
				title: "Life 2 Life Travel Agency | Web Interface",
				image: "/design/SamDeCoteau_Vector.webp",
				description: "Vector portrait exploration",
				category: "design",
				size: "medium",
			},

			// DEVELOPMENT PROJECTS
			{
				id: "tekada-cost-calculator",
				title: "Tekada Cost Calculator",
				type: "Design + Front-End Development",
				description:
					"Designed and built the front-end experience for Tekada's ADHD cost calculator while working at AESARA.",
				modalHighlights: [
					"Defined the UX flow to guide caregivers through cost inputs and scenario comparisons.",
					"Designed an approachable interface that turns complex healthcare cost variables into understandable outputs.",
					"Implemented responsive front-end behaviors to keep interactions fast and clear across device sizes.",
				],
				modalTech: [
					"UX/UI Design",
					"Interaction Design",
					"Front-End Development",
				],
				role: "Product Designer / Front-End Developer",
				backgroundIcon: Compass,
				accentIcon: Code,
				externalUrl: "https://attentiononadhd.com/cost-calculator/",
				category: "development",
				size: "large",
			},
			{
				id: "wanderlust",
				caseStudyId: "wanderlust",
				title: "Wanderlust",
				type: "UX/UI Case Study",
				description:
					"A comprehensive travel planning app designed to simplify trip organization and enhance user experience through intuitive design.",
				image: "/design/SamDeCoteau_Vector.avif",
				role: "UX/UI Designer",
				backgroundIcon: Compass,
				accentIcon: Code,
				backgroundGradient: "from-orange-400 to-red-500",
				category: "development",
				size: "large",
				customLayout: true,
			},

			// WRITING PROJECTS
			{
				id: "eat-like-child",
				storyId: "eat-like-child",
				title: "Eat Like a Child",
				category: "writing",
				image: "/writing/manger.webp",
				tags: ["Culture", "Memoir", "Caribbean"],
				previewContent:
					"A nostalgic reflection on Caribbean culture, family traditions, and the complex relationship between immigrant identity and food.",
				description:
					"A nostalgic reflection on Caribbean culture, family traditions, and the complex relationship between immigrant identity and food.",
				type: "Memoir",
				theme: "Culture",
				size: "medium",
			},
			{
				id: "home-cook",
				storyId: "home-cook",
				title: "The Rise of the Home Cook",
				category: "writing",
				image: "/writing/OuiChef.webp",
				tags: ["Food", "Profile", "Cooking"],
				description:
					"An intimate look at a home chef who transforms family recipes into culinary magic through intuition and ancestral wisdom.",
				previewContent:
					"An intimate look at a home chef who transforms family recipes into culinary magic through intuition and ancestral wisdom.",
				type: "Profile",
				theme: "Food",
				size: "medium",
			},
			{
				id: "tea-with-sami",
				storyId: "tea-with-sami",
				title: "Tea with Sami",
				category: "writing",
				image: "/writing/revengehot.gif",
				tags: ["Audio", "Relationships", "Growth"],
				previewContent:
					"An intimate conversation exploring relationships, personal growth, and the stories we tell ourselves about justice and healing.",
				description:
					"An intimate conversation exploring relationships, personal growth, and the stories we tell ourselves about justice and healing.",
				type: "Audio",
				theme: "Podcast",
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
		],
		[],
	);

	const filters = [
		{ id: "all", label: "All Work", icon: null },
		{ id: "design", label: "Design", icon: Pen },
		{ id: "development", label: "Development", icon: Code },
		{ id: "writing", label: "Writing", icon: Pen },
		{ id: "media", label: "Media", icon: Camera },
	];

	const validFilterIds = useMemo(
		() => new Set(filters.map((filter) => filter.id)),
		[],
	);
	const queryFilter = searchParams.get("filter");
	const activeFilter = validFilterIds.has(queryFilter) ? queryFilter : "all";

	const handleFilterChange = (filterId) => {
		if (filterId === "all") {
			setSearchParams({});
			return;
		}

		setSearchParams({ filter: filterId });
	};

	const filteredProjects = useMemo(
		() =>
			activeFilter === "all"
				? allProjects
				: allProjects.filter((project) => project.category === activeFilter),
		[activeFilter, allProjects],
	);

	const selectedProjectIndex = selectedProject
		? filteredProjects.findIndex((project) => project.id === selectedProject.id)
		: -1;

	useEffect(() => {
		if (!selectedProject) {
			setIsModalContentLoading(false);
			setModalContentError(null);
			return;
		}

		const needsStoryContent = Boolean(selectedProject.storyId && !storiesById);
		const needsCaseStudyData = Boolean(
			selectedProject.caseStudyId && !caseStudiesById,
		);
		const needsCaseStudyComponent = Boolean(
			selectedProject.caseStudyId && !CaseStudyContentComponent,
		);

		if (!needsStoryContent && !needsCaseStudyData && !needsCaseStudyComponent) {
			setIsModalContentLoading(false);
			setModalContentError(null);
			return;
		}

		let isMounted = true;

		const loadModalContent = async () => {
			setIsModalContentLoading(true);
			setModalContentError(null);

			try {
				const loaders = [];

				if (needsStoryContent) {
					loaders.push(import("../constants/WritingPieces"));
				}

				if (needsCaseStudyData) {
					loaders.push(import("../constants/CaseStudies"));
				}

				if (needsCaseStudyComponent) {
					loaders.push(import("../components/WanderlustCaseStudyContent"));
				}

				const results = await Promise.all(loaders);
				let resultIndex = 0;

				if (needsStoryContent) {
					const module = results[resultIndex++];
					if (isMounted) {
						setStoriesById(module.default);
					}
				}

				if (needsCaseStudyData) {
					const module = results[resultIndex++];
					if (isMounted) {
						setCaseStudiesById(module.default);
					}
				}

				if (needsCaseStudyComponent) {
					const module = results[resultIndex++];
					if (isMounted) {
						setCaseStudyContentComponent(() => module.default);
					}
				}
			} catch (error) {
				console.error("Failed to load modal content", error);
				if (isMounted) {
					setModalContentError(
						"We couldn't load this content right now. Please close and try again.",
					);
				}
			} finally {
				if (isMounted) {
					setIsModalContentLoading(false);
				}
			}
		};

		loadModalContent();

		return () => {
			isMounted = false;
		};
	}, [
		CaseStudyContentComponent,
		caseStudiesById,
		selectedProject,
		storiesById,
	]);

	const renderModalContent = (project) => {
		if (!project) {
			return null;
		}

		if ((project.storyId || project.caseStudyId) && modalContentError) {
			return <p className="text-red-600">{modalContentError}</p>;
		}

		if (project.storyId) {
			const story = storiesById?.[project.storyId];
			if (!story) {
				return null;
			}

			return (
				<article>
					<p className="text-gray-600 mb-6">{story.subtitle}</p>

					{story.audioFile && (
						<div className="mb-6">
							<audio controls preload="metadata" className="w-full">
								<source src={story.audioFile} type="audio/mpeg" />
								<source src={story.audioFile} type="audio/mp3" />
								Your browser does not support the audio element.
							</audio>
						</div>
					)}

					{story.pdfFile && (
						<section className="mb-6" aria-label="Article PDF viewer">
							<iframe
								src={`${story.pdfFile}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
								title={`${story.title} PDF viewer`}
								className="w-full h-[70vh] rounded-lg border border-gray-200"
								loading="lazy"
							/>
						</section>
					)}

					<div className="prose prose-lg max-w-none whitespace-pre-line text-gray-700">
						{story.content}
					</div>
				</article>
			);
		}

		if (project.caseStudyId) {
			const caseStudy = caseStudiesById?.[project.caseStudyId];
			if (!caseStudy || !CaseStudyContentComponent) {
				return null;
			}

			const CaseStudyContent = CaseStudyContentComponent;
			return <CaseStudyContent caseStudy={caseStudy} />;
		}

		return null;
	};

	const handlePreviousProject = useCallback(() => {
		if (selectedProjectIndex > 0) {
			setSelectedProject(filteredProjects[selectedProjectIndex - 1]);
		}
	}, [filteredProjects, selectedProjectIndex]);

	const handleNextProject = useCallback(() => {
		if (
			selectedProjectIndex >= 0 &&
			selectedProjectIndex < filteredProjects.length - 1
		) {
			setSelectedProject(filteredProjects[selectedProjectIndex + 1]);
		}
	}, [filteredProjects, selectedProjectIndex]);

	const handleCloseModal = useCallback(() => {
		setSelectedProject(null);
	}, []);

	useEffect(() => {
		const updateVisibility = () => {
			const filterTabsElement = filterTabsRef.current;

			if (!selectedProject || !filterTabsElement) {
				setIsReturnToTopVisible(false);
				return;
			}

			const filterBottomOffset =
				filterTabsElement.offsetTop + filterTabsElement.offsetHeight;
			const scrolledPastFilters = window.scrollY >= filterBottomOffset - 24;
			setIsReturnToTopVisible(scrolledPastFilters);
		};

		updateVisibility();
		window.addEventListener("scroll", updateVisibility, { passive: true });
		window.addEventListener("resize", updateVisibility);

		return () => {
			window.removeEventListener("scroll", updateVisibility);
			window.removeEventListener("resize", updateVisibility);
		};
	}, [selectedProject]);

	const handleReturnToTop = useCallback(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return (
		<>
			<PageLayout
				title="EXPERTISE"
				// description="A curated collection of design, development, writing, and media projects that showcase my multidisciplinary approach to creating meaningful experiences."
				showModal={!!selectedProject}
				selectedProject={selectedProject}
				renderModalContent={renderModalContent}
				isModalContentLoading={isModalContentLoading}
				onCloseModal={handleCloseModal}
				onPreviousProject={handlePreviousProject}
				onNextProject={handleNextProject}
				hasPreviousProject={selectedProjectIndex > 0}
				hasNextProject={
					selectedProjectIndex >= 0 &&
					selectedProjectIndex < filteredProjects.length - 1
				}
			>
				{/* Filter Tabs */}
				<div ref={filterTabsRef} className="filter-tabs">
					{filters.map((filter) => (
						<button
							key={filter.id}
							onClick={() => handleFilterChange(filter.id)}
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
								forceModal
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

			<button
				type="button"
				className={`return-to-top ${isReturnToTopVisible ? "is-visible" : ""}`}
				onClick={handleReturnToTop}
				aria-label="Return to top"
			>
				<ChevronUp className="return-to-top-icon" />
				<span>Top</span>
			</button>
		</>
	);
};

export default ExpertisePage;
