import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getModernImageSources } from "../utils/imageFormats";
import ProjectCaseStudyModal from "../components/ProjectCaseStudyModal";
import "../styles/ExpertisePrototype.css";

gsap.registerPlugin(ScrollTrigger);

const ExpertisePrototypePage = () => {
	const navigate = useNavigate();
	const [activeIndex, setActiveIndex] = useState(0);
	const [selectedProject, setSelectedProject] = useState(null);
	const sectionRefs = useRef([]);
	const pageRef = useRef(null);
	const rightColumnRef = useRef(null);
	const layerWrapRefs = useRef([]);

	const sections = useMemo(
		() => [
			{
				id: "eat-like-child",
				title: "Eat Like a Child",
				description:
					"A nostalgic reflection on culture, family traditions, and immigrant identity through food.",
				image: "/writing/manger.webp",
				label: "Writing",
				route: "/expertise/eat-like-child",
				bg: "#e7ddd2",
			},
			{
				id: "home-cook",
				title: "The Rise of the Home Cook",
				description:
					"Profile feature on home-chef creativity, intuition, and culinary storytelling.",
				image: "/writing/OuiChef.webp",
				label: "Writing",
				route: "/expertise/home-cook",
				bg: "#e5e6d7",
			},
			{
				id: "tea-with-sami",
				title: "Tea with Sami",
				description:
					"An intimate audio conversation on relationships, growth, and healing.",
				image: "/writing/revengehot.gif",
				label: "Writing",
				route: "/expertise/tea-with-sami",
				bg: "#d8dde7",
			},
			{
				id: "life2life",
				title: "Life 2 Life Travel Agency | Web Interface",
				description: "Vector portrait exploration.",
				image: "/design/SamDeCoteau_Vector.avif",
				label: "Development",
				route: "/expertise",
				bg: "#d8e4d9",
			},
			{
				id: "wanderlust",
				title: "Wanderlust",
				description:
					"A comprehensive travel planning app designed to simplify trip organization and enhance user experience through intuitive design.",
				label: "Development",
				role: "UX/UI Designer",
				result:
					"Streamlined user interface reducing trip planning steps and improving information architecture.",
				route: "/wanderlust-case-study",
				bg: "#fae8d7",
			},
			{
				id: "rowdy",
				title: "ROWDY Type Poster",
				description: "Typography exploration with bold, energetic design.",
				image: "/design/SD_TypePoster_ROWDY.avif",
				label: "Design",
				route: "/expertise",
				bg: "#e2e6d5",
			},
			{
				id: "lombardia",
				title: "LOMBARDIA Type Poster",
				description: "Elegant typography inspired by Italian design.",
				image: "/design/SD_TypePoster_LOMBARDIA.avif",
				label: "Design",
				route: "/expertise",
				bg: "#d5e2ea",
			},
			{
				id: "vote",
				title: "Lady Liberty Says to Vote",
				description: "Political awareness poster design.",
				image: "/design/Vote_Poster.avif",
				label: "Design",
				route: "/expertise",
				bg: "#e9ddd3",
			},
			{
				id: "black-unicorn",
				title: "Black Unicorn",
				description: "Illustration and brand expression study.",
				image: "/design/BlackUnicorn.avif",
				label: "Design",
				route: "/expertise",
				bg: "#ddd9ea",
			},
			{
				id: "diving-film",
				title: "Diving",
				description: "Short motion capture from the photography collection.",
				video: "/photography/diving.MP4",
				label: "Media",
				route: "/expertise",
				bg: "#d9e0e5",
			},
		],
		[],
	);

	useEffect(() => {
		try {
			const contentSections = sectionRefs.current
				.slice(0, sections.length)
				.filter(Boolean);

			if (!contentSections.length) {
				return undefined;
			}

			const observer = new IntersectionObserver(
				(entries) => {
					try {
						const visibleEntries = entries
							.filter((entry) => entry.isIntersecting)
							.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

						if (!visibleEntries.length) {
							return;
						}

						const topEntry = visibleEntries[0];
						const nextIndex = contentSections.findIndex(
							(section) => section === topEntry.target,
						);

						if (nextIndex >= 0) {
							setActiveIndex(nextIndex);
						}
					} catch (err) {
						console.error("IntersectionObserver callback error:", err);
					}
				},
				{
					root: null,
					rootMargin: "-24% 0px -24% 0px",
					threshold: [0.25, 0.5, 0.75],
				},
			);

			contentSections.forEach((section) => observer.observe(section));

			return () => {
				observer.disconnect();
			};
		} catch (err) {
			console.error("IntersectionObserver setup error:", err);
			return undefined;
		}
	}, [sections]);

	useLayoutEffect(() => {
		try {
			if (typeof window === "undefined") {
				return undefined;
			}

			const reducedMotionQuery = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			);

			if (reducedMotionQuery.matches) {
				return undefined;
			}

			const mm = gsap.matchMedia();

			mm.add("(min-width: 1025px)", () => {
				try {
					const pageElement = pageRef.current;
					const rightColumnElement = rightColumnRef.current;
					const pinTargetElement =
						rightColumnElement?.querySelector(".proto-image-stack") || null;
					const layerWrappers = layerWrapRefs.current.filter(Boolean);

					if (
						!pageElement ||
						!rightColumnElement ||
						!pinTargetElement ||
						layerWrappers.length < 2
					) {
						return undefined;
					}

					const ctx = gsap.context(() => {
						try {
							gsap.set(layerWrappers, {
								willChange: "clip-path, opacity",
							});

							layerWrappers.forEach((layerWrapper, index) => {
								try {
									gsap.set(layerWrapper, {
										zIndex: sections.length - index,
										autoAlpha: index === 0 ? 1 : 0,
										clipPath:
											index === 0
												? "inset(0px 0px 0px 0px)"
												: "inset(100% 0px 0px 0px)",
									});
								} catch (err) {
									console.error(`Failed to set layer ${index}:`, err);
								}
							});

							const masterTimeline = gsap.timeline({
								scrollTrigger: {
									trigger: pageElement,
									start: "top top",
									end: "bottom bottom",
									pin: pinTargetElement,
									scrub: true,
									anticipatePin: 1,
									invalidateOnRefresh: true,
									fastScrollEnd: true,
								},
							});

							sections.forEach((_, index) => {
								try {
									const currentLayer = layerWrappers[index];
									const nextLayer = layerWrappers[index + 1];

									if (!currentLayer) {
										return;
									}

									const segmentTimeline = gsap.timeline();

									if (nextLayer) {
										segmentTimeline
											.set(
												nextLayer,
												{
													autoAlpha: 1,
												},
												0,
											)
											.to(
												currentLayer,
												{
													clipPath: "inset(0px 0px 100% 0px)",
													duration: 1.5,
													ease: "none",
												},
												0,
											)
											.to(
												nextLayer,
												{
													clipPath: "inset(0px 0px 0px 0px)",
													duration: 1.5,
													ease: "none",
												},
												0,
											)
											.set(
												currentLayer,
												{
													autoAlpha: 0,
												},
												1.5,
											);
									}

									masterTimeline.add(segmentTimeline);
								} catch (err) {
									console.error(`Failed to add segment ${index}:`, err);
								}
							});
						} catch (err) {
							console.error("GSAP context creation error:", err);
						}
					}, pageElement);

					return () => {
						try {
							ctx.revert();
						} catch (err) {
							console.error("GSAP context cleanup error:", err);
						}
					};
				} catch (err) {
					console.error("GSAP matchMedia callback error:", err);
					return undefined;
				}
			});

			return () => {
				try {
					mm.revert();
				} catch (err) {
					console.error("GSAP matchMedia cleanup error:", err);
				}
			};
		} catch (err) {
			console.error("useLayoutEffect error:", err);
			return undefined;
		}
	}, [sections]);

	const activeSection = sections[activeIndex] || sections[0];

	useEffect(() => {
		try {
			const pageElement = pageRef.current;
			const rootElement = document.documentElement;

			if (!pageElement || !activeSection?.bg) {
				return undefined;
			}

			rootElement.style.setProperty("--site-nav-tint", activeSection.bg);

			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			if (prefersReducedMotion) {
				pageElement.style.backgroundColor = activeSection.bg;
				return undefined;
			}

			gsap.to(pageElement, {
				backgroundColor: activeSection.bg,
				duration: 0.9,
				ease: "power2.out",
				overwrite: "auto",
			});

			return () => {
				try {
					gsap.killTweensOf(pageElement);
					rootElement.style.removeProperty("--site-nav-tint");
				} catch (err) {
					console.error("Failed to cleanup background color tween:", err);
				}
			};
		} catch (err) {
			console.error("Background color transition error:", err);
			return undefined;
		}
	}, [activeSection]);

	const jumpFilters = useMemo(
		() => ["All", ...new Set(sections.map((section) => section.label))],
		[sections],
	);

	const handleJumpTo = (label) => {
		if (label === "All") {
			pageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
			return;
		}

		const targetIndex = sections.findIndex(
			(section) => section.label === label,
		);
		if (targetIndex < 0) {
			return;
		}

		sectionRefs.current[targetIndex]?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	const renderProjectMedia = (
		item,
		altText,
		{ pictureClassName, imgClassName } = {},
	) => {
		if (item.video) {
			return (
				<video
					src={item.video}
					className={imgClassName}
					muted
					loop
					autoPlay
					playsInline
					aria-label={altText}
				/>
			);
		}

		const imagePath = item.image;

		if (!imagePath) {
			return null;
		}

		const imageSources = getModernImageSources(imagePath);

		if (!imageSources) {
			return null;
		}

		return (
			<picture className={pictureClassName}>
				{imageSources.avif && (
					<source srcSet={imageSources.avif} type="image/avif" />
				)}
				{imageSources.webp && (
					<source srcSet={imageSources.webp} type="image/webp" />
				)}
				<img
					src={imageSources.fallback}
					alt={altText}
					className={imgClassName}
				/>
			</picture>
		);
	};

	return (
		<div
			ref={pageRef}
			className="proto-page"
			style={{ backgroundColor: sections[0].bg }}
		>
			<main className="proto-shell">
				<section className="proto-jump" aria-label="Jump to section">
					<p className="proto-jump-label">Jump to</p>
					<div className="proto-jump-controls">
						{jumpFilters.map((filterLabel) => (
							<button
								key={filterLabel}
								type="button"
								className={`proto-jump-btn ${
									activeSection.label === filterLabel ? "is-active" : ""
								}`}
								onClick={() => {
									handleJumpTo(filterLabel);
								}}
							>
								{filterLabel}
							</button>
						))}
					</div>
				</section>

				<section className="proto-left">
					{sections.map((item, index) => (
						<article
							className="proto-section"
							key={item.id}
							ref={(el) => {
								sectionRefs.current[index] = el;
							}}
						>
							<div className="proto-copy">
								<p className="proto-label">{item.label}</p>
								<h2>{item.title}</h2>
								<p>{item.description}</p>
								<button
									type="button"
									className="proto-cta"
									onClick={() => {
										setSelectedProject(item);
									}}
								>
									Learn More
								</button>
							</div>
							<div className="proto-mobile-media">
								{renderProjectMedia(item, item.title, {
									imgClassName: "proto-mobile-media-item",
								})}
							</div>
						</article>
					))}
				</section>

				<section ref={rightColumnRef} className="proto-right">
					<div
						className="proto-image-stack"
						style={{ backgroundColor: activeSection.bg }}
					>
						{sections.map((item, index) => (
							<div
								className="proto-layer-wrap"
								key={item.id}
								style={{ backgroundColor: item.bg }}
								ref={(el) => {
									layerWrapRefs.current[index] = el;
								}}
							>
								{renderProjectMedia(item, item.title, {
									pictureClassName: "proto-layer-picture",
									imgClassName: "proto-layer",
								})}
							</div>
						))}
					</div>
				</section>
			</main>

			<ProjectCaseStudyModal
				project={selectedProject}
				isOpen={!!selectedProject}
				onClose={() => setSelectedProject(null)}
			/>
		</div>
	);
};

export default ExpertisePrototypePage;
