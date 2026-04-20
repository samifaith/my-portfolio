import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ChevronUp } from "lucide-react";
import { getModernImageSources } from "../utils/imageFormats";
import ProjectCaseStudyModal from "../components/ProjectCaseStudyModal";
import FeaturedProjects from "../components/FeaturedProjects";
import "../styles/ExpertisePrototype.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const TRANSITION_TIMINGS = {
	layerDuration: 1.2,
	nextLayerOffset: 0.08,
	layerHideDelay: 1.21,
	tintDuration: 0.9,
	scrub: 0.55,
	snapDelay: 0.08,
	snapMinDuration: 0.2,
	snapMaxDuration: 0.5,
};

const ExpertisePage = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [selectedProject, setSelectedProject] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isReturnToTopVisible, setIsReturnToTopVisible] = useState(false);
	const [isAboveProtoPage, setIsAboveProtoPage] = useState(true);
	const [topOffset, setTopOffset] = useState("0px");
	const [navFilterSlot, setNavFilterSlot] = useState(null);
	const sectionRefs = useRef([]);
	const pageRef = useRef(null);
	const featuredRef = useRef(null);
	const jumpRef = useRef(null);
	const rightColumnRef = useRef(null);
	const imageStackRef = useRef(null);
	const layerWrapRefs = useRef([]);
	const refreshRafRef = useRef(null);

	const requestScrollTriggerRefresh = useCallback(() => {
		if (typeof window === "undefined") {
			return;
		}

		if (refreshRafRef.current) {
			cancelAnimationFrame(refreshRafRef.current);
		}

		refreshRafRef.current = requestAnimationFrame(() => {
			ScrollTrigger.refresh();
			refreshRafRef.current = null;
		});
	}, []);

	const sections = useMemo(
		() => [
			{
				id: "eat-like-child",
				title: "Eat Like a Child",
				description: "A personal essay on cultural identity through food — the immigrant experience of rejecting what you later grieve.",
				image: "/writing/manger.webp",
				label: "Writing",
				route: "/expertise-archived/eat-like-child",
				bg: "#e7ddd2",
				tools: ["Illustrator", "Photoshop", "InDesign"],
				study: {
					purpose: "Explore the intersection of immigrant identity, generational memory, and food — told through the lens of a child who didn't know what she had until it was gone.",
					role: "Writer and art director. Crafted the personal essay and designed the full editorial layout in Illustrator, Photoshop, and InDesign.",
					direction: "Warm, tactile typography to evoke memory. The layout breathes the way a good meal lingers — unhurried, generous, layered with meaning.",
				},
			},
			{
				id: "home-cook",
				title: "The Rise of the Home Cook",
				description: "A profile of Arielle Faria — a home chef whose story illuminates the cultural shift toward cooking as craft, identity, and inheritance.",
				image: "/writing/OuiChef.webp",
				label: "Writing",
				route: "/expertise-archived/home-cook",
				bg: "#e5e6d7",
				tools: ["Photoshop"],
				study: {
					purpose: "Profile Arielle Faria and use her story to explore what food culture means in the age of the home cook — from PBS cooking shows to kitchen witchcraft.",
					role: "Writer and editorial designer. Conducted the interview, wrote the feature, and designed the print spread for Oui Chef magazine.",
					direction: "Editorial restraint with warmth. Let the story carry the weight — clean hierarchy, honest photography, type that guides without imposing.",
				},
			},
			{
				id: "tea-with-sami",
				title: "Tea with Sami",
				description: "A fictional podcast episode exploring the origin story of Nashville Hot Chicken, connecting food history to culture and folklore.",
				image: "/writing/revengehot.gif",
				label: "Writing",
				route: "/expertise-archived/tea-with-sami",
				bg: "#d8dde7",
				tools: ["Audacity", "Photoshop"],
				study: {
					purpose: "Create a fictional podcast episode that connects food history to culture and folklore — part of a larger series on the stories behind what we eat.",
					role: "Writer, audio producer, and cover artist. Scripted and recorded the episode; designed cover art in Photoshop.",
					direction: "The cover needed to feel like a guilty pleasure — bold, irreverent, impossible to ignore. Saturated reds and smoky darks to match the heat of the subject.",
				},
			},
			{
				id: "life2life",
				title: "Life 2 Life Travel Agency | Web Interface",
				description: "A homepage concept for a travel agency specializing in AI-cultivated travel experiences.",
				image: "/design/SamDeCoteau_Vector.avif",
				label: "Development",
				route: "/expertise",
				bg: "#d8e4d9",
				tools: ["React", "CSS", "Vite"],
				study: {
					purpose: "Concept a homepage for an AI-curated travel agency — exploring how to make algorithmic curation feel personal and aspirational rather than algorithmic.",
					role: "Front-end developer. Built the full interface in React with modern CSS layout and interaction design.",
					direction: "Sky-meets-horizon color language. Designed to feel effortlessly curated — like a conversation with someone who's been everywhere and knows exactly what you'd love.",
				},
			},
			{
				id: "wanderlust",
				title: "Wanderlust",
				description: "Travel-planning app concept designed to reduce decision fatigue through a swipe-first discovery flow for budget-conscious travelers.",
				image: "/design/SamDeCoteau_Vector.avif",
				label: "Development",
				role: "UX/UI Designer",
				result: "Streamlined user interface reducing trip planning steps and improving information architecture.",
				route: "/wanderlust-case-study",
				bg: "#fae8d7",
				tools: ["Figma", "Miro", "Maze"],
				study: {
					purpose: "Simplify travel planning for budget-conscious users through a swipe-first discovery flow that reduces decision fatigue and speeds up itinerary building.",
					role: "Lead UX Designer. Led research, synthesis, wireframing, and iterative usability testing across an 8-week sprint with a team of four.",
					direction: "Borrowed the mental model of dating apps — swipe right on the trip, left on the overwhelm. Made a famously frustrating process feel like a game.",
				},
			},
			{
				id: "rowdy",
				title: "ROWDY Type Poster",
				description: "Type study inspired by the UK punk scene of the late 70s utilizing the typeface Rowdy by Benjamin Busse.",
				image: "/design/SD_TypePoster_ROWDY.avif",
				label: "Design",
				route: "/expertise",
				bg: "#e2e6d5",
				tools: ["Illustrator"],
				study: {
					purpose: "A typographic study channeling the visual energy of UK punk — using Rowdy by Benjamin Busse as the vessel for controlled chaos.",
					role: "Designer and art director. Concept and full execution in Illustrator.",
					direction: "Tension within structure. Punk broke rules by knowing them — so the layout follows a strict grid it then deliberately fractures. Compressed type, raw edges, confrontational scale.",
				},
			},
			{
				id: "lombardia",
				title: "LOMBARDIA Type Poster",
				description: "My take on a Saul Bass-inspired type poster using the typeface Lombardia by Luciano Perondi.",
				image: "/design/SD_TypePoster_LOMBARDIA.avif",
				label: "Design",
				route: "/expertise",
				bg: "#d5e2ea",
				tools: ["Illustrator"],
				study: {
					purpose: "A tribute to the visual grammar of Saul Bass — exploring reduction, shape, and cinematic composition through the typeface Lombardia by Luciano Perondi.",
					role: "Designer. Concept and execution in Illustrator.",
					direction: "Less to say more. Bass condensed entire narratives into a single gesture. The driving question: what is the minimum needed to communicate maximum impact?",
				},
			},
			{
				id: "vote",
				title: "Lady Liberty Says to Vote",
				description: "A poster encouraging voter participation, inspired by the 'We Can Do It!' Rosie the Riveter poster — reframed through Lady Liberty.",
				image: "/design/Vote_Poster.avif",
				label: "Design",
				route: "/expertise",
				bg: "#e9ddd3",
				tools: ["Illustrator"],
				study: {
					purpose: "A poster encouraging civic participation — remixing the iconography of 'We Can Do It!' through the lens of Lady Liberty, making urgency feel both timeless and immediate.",
					role: "Designer and illustrator. First serious vector illustration work; built entirely in Illustrator.",
					direction: "Familiar form, fresh urgency. Leverage recognition to lower the barrier — make something people feel before they think about it.",
				},
			},
			{
				id: "black-unicorn",
				title: "Black Unicorn",
				description: "Conceptual branding and poster design for a personal brand celebrating the unconventional creative path.",
				image: "/design/BlackUnicorn.avif",
				label: "Design",
				route: "/expertise",
				bg: "#ddd9ea",
				tools: ["Illustrator", "Photoshop"],
				study: {
					purpose: "Conceptual brand identity for those who don't fit the mold, don't want to, and have made that their superpower.",
					role: "Brand strategist, designer, illustrator. Developed the full visual identity: wordmark, poster system, and design language.",
					direction: "Darkness and iridescence in equal measure. The palette moves from deep black through electric violet — power, mystery, and a quiet refusal to be ordinary.",
				},
			},
			{
				id: "diving-film",
				title: "Diving",
				description: "A short film compiled from personal dive footage in Cabo San Lucas, Mexico — capturing what it feels like to be underwater.",
				video: "/photography/diving.MP4",
				label: "Media",
				route: "/expertise",
				bg: "#d9e0e5",
				tools: ["Premiere Pro"],
				study: {
					purpose: "Capture and edit personal footage from a scuba diving trip in Cabo San Lucas — creating a short film that communicates the disorienting calm of being underwater.",
					role: "Cinematographer and editor. Shot on GoPro; assembled, color-graded, and paced in Premiere Pro.",
					direction: "Let the ocean do the talking. The edit follows the rhythm of the water — unhurried, punctuated by sudden color and movement. No narration. No music that fights the footage.",
				},
			},
		],
		[],
	);

	useEffect(() => {
		try {
			if (
				typeof window !== "undefined" &&
				window.matchMedia("(min-width: 1025px)").matches
			) {
				return undefined;
			}

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
					const pinTargetElement = imageStackRef.current;
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
							const getNumericCssVar = (value) => {
								const parsed = Number.parseFloat(value || "0");
								return Number.isFinite(parsed) ? parsed : 0;
							};

							const getSectionSnapPoints = () => {
								const sectionElements = sectionRefs.current
									.slice(0, sections.length)
									.filter(Boolean);

								if (!sectionElements.length || !pageElement) {
									return [0, 1];
								}

								const computedStyles = window.getComputedStyle(pageElement);
								const pageTopOffset =
									getNumericCssVar(computedStyles.getPropertyValue("--proto-top-offset")) +
									getNumericCssVar(computedStyles.getPropertyValue("--proto-jump-height"));

								const maxScroll = Math.max(
									1,
									pageElement.scrollHeight - window.innerHeight,
								);

								const points = sectionElements.map((sectionElement) => {
									const sectionTopScroll =
										sectionElement.offsetTop - pageElement.offsetTop - pageTopOffset;
									return gsap.utils.clamp(0, 1, sectionTopScroll / maxScroll);
								});

								if (!points.length) {
									return [0, 1];
								}

								points[0] = 0;
								points[points.length - 1] = 1;

								return points;
							};

							const getNearestSectionIndex = (progress) => {
								const snapPoints = getSectionSnapPoints();
								let nearestIndex = 0;
								let minDistance = Number.POSITIVE_INFINITY;

								snapPoints.forEach((snapPoint, index) => {
									const distance = Math.abs(progress - snapPoint);
									if (distance < minDistance) {
										minDistance = distance;
										nearestIndex = index;
									}
								});

								return nearestIndex;
							};

							gsap.set(layerWrappers, {
								willChange: "clip-path, opacity, transform",
							});

							if (pinTargetElement) {
								gsap.set(pinTargetElement, {
									"--proto-stack-tint": sections[activeIndex]?.bg,
								});
							}

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
									scrub: TRANSITION_TIMINGS.scrub,
									snap: {
										snapTo: (progress) => {
											const snapPoints = getSectionSnapPoints();
											let nearestPoint = snapPoints[0] ?? 0;
											let minDistance = Number.POSITIVE_INFINITY;

											snapPoints.forEach((snapPoint) => {
												const distance = Math.abs(progress - snapPoint);
												if (distance < minDistance) {
													minDistance = distance;
													nearestPoint = snapPoint;
												}
											});

											return nearestPoint;
										},
										delay: TRANSITION_TIMINGS.snapDelay,
										duration: {
											min: TRANSITION_TIMINGS.snapMinDuration,
											max: TRANSITION_TIMINGS.snapMaxDuration,
										},
										ease: "power2.inOut",
										inertia: false,
									},
									anticipatePin: 1,
									invalidateOnRefresh: true,
									fastScrollEnd: false,
									onUpdate: (self) => {
										const nextIndex = getNearestSectionIndex(self.progress);
										setActiveIndex((prev) =>
											prev === nextIndex ? prev : nextIndex,
										);
									},
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
													duration: TRANSITION_TIMINGS.layerDuration,
													ease: "power2.inOut",
												},
												0,
											)
											.to(
												nextLayer,
												{
													clipPath: "inset(0px 0px 0px 0px)",
													duration: TRANSITION_TIMINGS.layerDuration,
													ease: "power2.inOut",
												},
												0.08,
											)
											.set(
												currentLayer,
												{
													autoAlpha: 0,
												},
												1.21,
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

			const pinTargetElement = imageStackRef.current;

			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;
			const tintVars = {
				"--site-nav-tint": activeSection.bg,
				"--proto-page-tint": activeSection.bg,
			};

			if (prefersReducedMotion) {
				Object.entries(tintVars).forEach(([property, value]) => {
					rootElement.style.setProperty(property, value);
					pageElement.style.setProperty(property, value);
				});
				pageElement.style.backgroundColor = activeSection.bg;
				return undefined;
			}

			gsap.to(rootElement, {
				"--site-nav-tint": activeSection.bg,
				duration: TRANSITION_TIMINGS.tintDuration,
				ease: "power2.out",
				overwrite: "auto",
			});

			gsap.to(pageElement, {
				"--proto-page-tint": activeSection.bg,
				backgroundColor: activeSection.bg,
				duration: TRANSITION_TIMINGS.tintDuration,
				ease: "power2.out",
				overwrite: "auto",
			});

			if (pinTargetElement) {
				gsap.to(pinTargetElement, {
					"--proto-stack-tint": activeSection.bg,
					duration: TRANSITION_TIMINGS.tintDuration,
					ease: "power2.out",
					overwrite: "auto",
				});
			}

			return () => {
				try {
					gsap.killTweensOf(pageElement);
					gsap.killTweensOf(rootElement);
					if (pinTargetElement) {
						gsap.killTweensOf(pinTargetElement);
					}
					rootElement.style.removeProperty("--site-nav-tint");
					pageElement.style.removeProperty("--proto-page-tint");
					if (pinTargetElement) {
						pinTargetElement.style.removeProperty("--proto-stack-tint");
					}
				} catch (err) {
					console.error("Failed to cleanup background color tween:", err);
				}
			};
		} catch (err) {
			console.error("Background color transition error:", err);
			return undefined;
		}
	}, [activeSection]);

	useEffect(() => {
		const pageElement = pageRef.current;
		const jumpElement = jumpRef.current;

		if (!pageElement || !jumpElement) {
			return undefined;
		}

		const updateJumpHeight = () => {
			const jumpHeight = Math.ceil(jumpElement.getBoundingClientRect().height);
			pageElement.style.setProperty("--proto-jump-height", `${jumpHeight}px`);
			requestScrollTriggerRefresh();
		};

		updateJumpHeight();

		const resizeObserver = new ResizeObserver(updateJumpHeight);
		resizeObserver.observe(jumpElement);

		window.addEventListener("resize", updateJumpHeight);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener("resize", updateJumpHeight);
			pageElement.style.removeProperty("--proto-jump-height");
		};
	}, [isModalOpen, requestScrollTriggerRefresh]);

	useEffect(() => {
		const slot = document.getElementById("nav-filter-slot");
		setNavFilterSlot(slot);
		return () => setNavFilterSlot(null);
	}, []);

	const jumpFilters = useMemo(
		() => [...new Set(sections.map((section) => section.label))],
		[sections],
	);

	useEffect(() => {
		const updateTopOffset = () => {
			const nav = document.querySelector(".desktop-nav");
			const navStyles = nav ? window.getComputedStyle(nav) : null;
			const isDesktopNavVisible =
				nav &&
				navStyles &&
				navStyles.display !== "none" &&
				nav.offsetHeight > 0;

			setTopOffset(isDesktopNavVisible ? `${nav.offsetHeight}px` : "0px");
			requestScrollTriggerRefresh();
		};

		updateTopOffset();
		window.addEventListener("resize", updateTopOffset);

		return () => {
			window.removeEventListener("resize", updateTopOffset);
		};
	}, [requestScrollTriggerRefresh]);

	useEffect(() => {
		return () => {
			if (refreshRafRef.current) {
				cancelAnimationFrame(refreshRafRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (document.readyState === "complete") {
			requestScrollTriggerRefresh();
			return undefined;
		}
		window.addEventListener("load", requestScrollTriggerRefresh);
		return () => {
			window.removeEventListener("load", requestScrollTriggerRefresh);
		};
	}, [requestScrollTriggerRefresh]);

	const handleJumpTo = (label) => {
		if (label === "Featured") {
			gsap.to(window, { scrollTo: 0, duration: 0.8, ease: "power2.inOut" });
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

	useEffect(() => {
		const updateVisibility = () => {
			const featuredElement = featuredRef.current;

			if (!featuredElement || isModalOpen) {
				setIsReturnToTopVisible(false);
				return;
			}

			const featuredBottom = featuredElement.offsetTop + featuredElement.offsetHeight;
			setIsReturnToTopVisible(window.scrollY >= featuredBottom - 24);
		};

		updateVisibility();
		window.addEventListener("scroll", updateVisibility, { passive: true });
		window.addEventListener("resize", updateVisibility);

		return () => {
			window.removeEventListener("scroll", updateVisibility);
			window.removeEventListener("resize", updateVisibility);
		};
	}, [isModalOpen]);

	useEffect(() => {
		const updatePosition = () => {
			const pageElement = pageRef.current;
			if (!pageElement) return;
			setIsAboveProtoPage(window.scrollY < pageElement.offsetTop - 50);
		};
		updatePosition();
		window.addEventListener("scroll", updatePosition, { passive: true });
		return () => window.removeEventListener("scroll", updatePosition);
	}, []);

	const handleReturnToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleOpenProjectModal = (item) => {
		setSelectedProject(item);
		setIsModalOpen(true);
	};

	const handleCloseProjectModal = () => {
		setIsModalOpen(false);
	};

	const handleAfterProjectModalClose = useCallback(() => {
		setSelectedProject(null);
	}, []);

	const selectedIndex = useMemo(
		() => sections.findIndex((s) => s.id === selectedProject?.id),
		[sections, selectedProject],
	);

	const handleNavigateModal = useCallback(
		(direction) => {
			const nextIndex = selectedIndex + direction;
			if (nextIndex >= 0 && nextIndex < sections.length) {
				setSelectedProject(sections[nextIndex]);
			}
		},
		[sections, selectedIndex],
	);

	const handleProjectPrimaryAction = (item) => {
		handleOpenProjectModal(item);
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
					loading="lazy"
					decoding="async"
				/>
			</picture>
		);
	};

	const filterButtons = ["Featured", ...jumpFilters].map((filterLabel) => (
		<button
			key={filterLabel}
			type="button"
			className={`proto-jump-btn ${
				filterLabel === "Featured"
					? isAboveProtoPage ? "is-active" : ""
					: activeSection.label === filterLabel ? "is-active" : ""
			}`}
			onClick={() => handleJumpTo(filterLabel)}
		>
			{filterLabel}
		</button>
	));

	return (
		<>
		{navFilterSlot && createPortal(
			<div className="proto-jump-controls">{filterButtons}</div>,
			navFilterSlot
		)}
		<div className="proto-jump-wrap">
			<section
				ref={jumpRef}
				className="proto-jump"
				aria-label="Jump to section"
			>
				<p className="proto-jump-label">Jump to</p>
				<div className="proto-jump-controls">
					{filterButtons}
				</div>
			</section>
		</div>
		<div ref={featuredRef}>
			<FeaturedProjects />
		</div>
		<div
			ref={pageRef}
			className="proto-page"
			style={{
				"--proto-top-offset": topOffset,
				"--proto-page-tint": sections[0].bg,
				backgroundColor: sections[0].bg,
			}}
		>
			<main className="proto-shell">
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
								{item.tools && item.tools.length > 0 && (
									<div className="proto-tool-list">
										{item.tools.map((tool) => (
											<span key={tool} className="proto-tool-tag">{tool}</span>
										))}
									</div>
								)}
								<button
									type="button"
									className="proto-cta"
									onClick={() => {
										handleProjectPrimaryAction(item);
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
						ref={imageStackRef}
						className="proto-image-stack"
						style={{ "--proto-stack-tint": sections[0].bg }}
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
								<button
									type="button"
									className="proto-layer-link"
									onClick={() => {
										handleProjectPrimaryAction(item);
									}}
									aria-label={`Learn more about ${item.title}`}
									tabIndex={index === activeIndex ? 0 : -1}
									disabled={index !== activeIndex}
								>
									{renderProjectMedia(item, item.title, {
										pictureClassName: "proto-layer-picture",
										imgClassName: "proto-layer",
									})}
								</button>
							</div>
						))}
					</div>
				</section>
			</main>

			{isReturnToTopVisible && (
				<button
					type="button"
					className="proto-return-to-top is-visible"
					onClick={handleReturnToTop}
					aria-label="Return to top"
				>
					<ChevronUp className="proto-return-to-top-icon" />
					<span>Top</span>
				</button>
			)}

			{selectedProject && (
				<ProjectCaseStudyModal
					project={selectedProject}
					isOpen={isModalOpen}
					onClose={handleCloseProjectModal}
					onAfterClose={handleAfterProjectModalClose}
					onPrev={() => handleNavigateModal(-1)}
					onNext={() => handleNavigateModal(1)}
					hasPrev={selectedIndex > 0}
					hasNext={selectedIndex > -1 && selectedIndex < sections.length - 1}
				/>
			)}
		</div>
		</>
	);
};

export default ExpertisePage;
