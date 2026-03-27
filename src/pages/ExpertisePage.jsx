import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Compass, Code, Camera, Pen } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "../components/PageLayout";
import "../styles/MosaicGrid.css";

gsap.registerPlugin(ScrollTrigger);

const ExpertisePage = () => {
	const [selectedProject, setSelectedProject] = useState(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const shellRef = useRef(null);
	const stageRef = useRef(null);
	const stageFrameRef = useRef(null);
	const railRef = useRef(null);
	const panelRefs = useRef([]);
	const sectionRefs = useRef([]);

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
			image: "/writing/manger.png",
			tags: ["Culture", "Memoir", "Caribbean"],
			previewContent:
				"A nostalgic reflection on Caribbean culture, family traditions, and the complex relationship between immigrant identity and food.",
			description:
				"A nostalgic reflection on Caribbean culture, family traditions, and the complex relationship between immigrant identity and food.",
			type: "Memoir",
			theme: "Culture",
			route: "/expertise/eat-like-child",
			size: "medium",
		},
		{
			id: "home-cook",
			title: "The Rise of the Home Cook",
			category: "writing",
			image: "/writing/OuiChef.png",
			tags: ["Food", "Profile", "Cooking"],
			description:
				"An intimate look at a home chef who transforms family recipes into culinary magic through intuition and ancestral wisdom.",
			previewContent:
				"An intimate look at a home chef who transforms family recipes into culinary magic through intuition and ancestral wisdom.",
			type: "Profile",
			theme: "Food",
			route: "/expertise/home-cook",
			size: "medium",
		},
		{
			id: "tea-with-sami",
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
			route: "/expertise/tea-with-sami",
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

	const filteredProjects =
		activeFilter === "all"
			? allProjects
			: allProjects.filter((project) => project.category === activeFilter);
	const activeProject =
		filteredProjects[activeIndex] || filteredProjects[0] || null;

	const openProject = (project) => {
		if (!project) {
			return;
		}

		if (project.route) {
			navigate(project.route);
			return;
		}

		setSelectedProject(project);
	};

	useEffect(() => {
		document.body.classList.add("expertise-theme");
		return () => {
			document.body.classList.remove("expertise-theme");
		};
	}, []);

	useEffect(() => {
		setActiveIndex(0);
	}, [activeFilter]);

	useLayoutEffect(() => {
		if (!shellRef.current || !filteredProjects.length) {
			return undefined;
		}

		let mediaMatcher;
		const ctx = gsap.context(() => {
			const panels = panelRefs.current
				.slice(0, filteredProjects.length)
				.filter(Boolean);
			const sections = sectionRefs.current
				.slice(0, filteredProjects.length)
				.filter(Boolean);

			if (!panels.length || !sections.length) {
				return;
			}

			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			const activeRef = { value: 0 };
			const setActiveSafe = (index) => {
				if (activeRef.value === index) {
					return;
				}
				activeRef.value = index;
				setActiveIndex(index);
			};

			gsap.set(panels, {
				autoAlpha: 1,
				clipPath: "inset(0 0% 0% 0)",
				objectPosition: "50% 50%",
			});

			panels.forEach((panel, index) => {
				gsap.set(panel, {
					zIndex: panels.length - index,
				});
			});

			if (!prefersReducedMotion) {
				for (let i = 0; i < panels.length - 1; i += 1) {
					const transitionSection = sections[i + 1];
					if (!transitionSection) {
						continue;
					}

					const transitionTween = gsap.to(panels[i], {
						clipPath: "inset(0 0% 100% 0)",
						objectPosition: "50% 60%",
						ease: "none",
						paused: true,
					});

					ScrollTrigger.create({
						trigger: transitionSection,
						start: "top bottom",
						end: "top top",
						scrub: true,
						animation: transitionTween,
						onUpdate: (self) => {
							setActiveSafe(self.progress < 0.5 ? i : i + 1);
						},
					});
				}
			}

			mediaMatcher = gsap.matchMedia();
			mediaMatcher.add("(min-width: 1024px)", () =>
				ScrollTrigger.create({
					trigger: shellRef.current,
					start: "top top+=8",
					end: () =>
						`+=${Math.max(
							railRef.current.scrollHeight - window.innerHeight,
							0,
						)}`,
					pin: stageFrameRef.current,
					pinSpacing: false,
					anticipatePin: 1,
					invalidateOnRefresh: true,
				}),
			);

			ScrollTrigger.refresh();
		}, shellRef);

		return () => {
			if (mediaMatcher) {
				mediaMatcher.revert();
			}
			ctx.revert();
		};
	}, [activeFilter, filteredProjects.length]);

	return (
		<PageLayout
			title="EXPERTISE"
			// description="A curated collection of design, development, writing, and media projects that showcase my multidisciplinary approach to creating meaningful experiences."
			showModal={!!selectedProject}
			selectedProject={selectedProject}
			onCloseModal={() => setSelectedProject(null)}
		>
			<div className="expertise-page">
				{/* Filter Tabs */}
				<div className="filter-tabs">
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

				{activeProject && (
					<section
						className="split-reveal-shell"
						aria-label="Expertise stories"
						ref={shellRef}
					>
						<div className="split-stage" role="presentation" ref={stageRef}>
							<div className="split-stage-frame" ref={stageFrameRef}>
								{filteredProjects.map((project, index) => (
									<article
										key={project.id}
										className="split-stage-panel"
										ref={(element) => {
											panelRefs.current[index] = element;
										}}
									>
										{project.image && (
											<img
												src={project.image}
												alt={project.title}
												className="split-stage-media split-stage-media-image"
											/>
										)}
										{project.video && (
											<video
												src={project.video}
												className="split-stage-media split-stage-media-video"
												autoPlay
												muted
												loop
												playsInline
											/>
										)}
										{!project.image && !project.video && (
											<div className="split-stage-media split-stage-fallback" />
										)}
									</article>
								))}
								<div className="split-stage-overlay">
									<p className="split-stage-kicker">
										{activeProject.category} / {activeIndex + 1}
									</p>
									<h2>{activeProject.title}</h2>
									<p>
										{activeProject.description || activeProject.previewContent}
									</p>
									<button
										type="button"
										className="split-stage-cta"
										onClick={() => openProject(activeProject)}
									>
										View project
									</button>
								</div>
							</div>
						</div>

						<div className="split-rail" aria-label="Story list" ref={railRef}>
							{filteredProjects.map((project, index) => {
								const isActive = index === activeIndex;

								return (
									<article
										key={project.id}
										className={`split-section ${isActive ? "active" : ""}`}
										ref={(element) => {
											sectionRefs.current[index] = element;
										}}
										aria-current={isActive ? "true" : "false"}
									>
										<p className="split-item-index">
											{String(index + 1).padStart(2, "0")}
										</p>
										<h3>{project.title}</h3>
										<p>{project.description || project.previewContent}</p>
										<div className="split-item-meta">
											<span>{project.type || project.category}</span>
											<button
												type="button"
												className="split-item-link"
												onClick={() =>
													sectionRefs.current[index]?.scrollIntoView({
														behavior: "smooth",
														block: "center",
													})
												}
											>
												Reveal
											</button>
											<button
												type="button"
												className="split-item-link"
												onClick={() => openProject(project)}
											>
												Open
											</button>
										</div>
									</article>
								);
							})}
						</div>
					</section>
				)}

				{/* Empty State */}
				{filteredProjects.length === 0 && (
					<div className="empty-state">
						<div className="empty-state-content">
							<h3>No projects in this category yet</h3>
							<p>Check back soon for new work!</p>
						</div>
					</div>
				)}
			</div>
		</PageLayout>
	);
};

export default ExpertisePage;
