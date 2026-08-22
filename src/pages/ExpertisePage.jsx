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

const SECTION_PRIORITY = {
	discovereats: 0,
	"atlas-heor": 1,
	"adhd-calculator": 2,
	life2life: 3,
};

const ExpertisePage = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [selectedProject, setSelectedProject] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isReturnToTopVisible, setIsReturnToTopVisible] = useState(false);
	const [isAboveProtoPage, setIsAboveProtoPage] = useState(true);
	const [topOffset, setTopOffset] = useState("0px");
	const [navFilterSlot, setNavFilterSlot] = useState(null);
	const [mobileFilterSlot, setMobileFilterSlot] = useState(null);
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

	const baseSections = useMemo(
		() => [
			{
				id: "eat-like-child",
				title: "Eat Like a Child",
				description:
					"A personal essay about cultural identity through food — the immigrant experience of rejecting what you later grieve.",
				image: "/writing/manger.webp",
				label: "Writing",
				category: "Writing",
				route: "/expertise-archived/eat-like-child",
				bg: "#e7ddd2",
				tools: ["Illustrator", "Photoshop", "InDesign"],
				study: {
					purpose:
						"Use food and memory as a lens for examining how immigrant identity changes across generations.",
					role: "Writer and art director. Crafted the personal essay and designed the full editorial layout in Illustrator, Photoshop, and InDesign.",
					direction:
						"Warm, tactile typography built to evoke memory. The layout takes its time the way a good meal does — nothing rushed, nothing wasted.",
				},
			},
			{
				id: "home-cook",
				title: "The Rise of the Home Cook",
				description:
					"An exposé with Arielle Faria — a home chef whose story illuminates the cultural shift toward cooking as craft, identity, and inheritance.",
				image: "/writing/OuiChef.webp",
				label: "Writing",
				category: "Writing",
				route: "/expertise-archived/home-cook",
				bg: "#e5e6d7",
				tools: ["Photoshop"],
				study: {
					purpose:
						"Use one home cook’s story to connect personal cooking practices to broader shifts in how people learn, share, and build identity around food.",
					role: "Writer and editorial designer. Conducted the interview, wrote the feature, and designed the print spread for the fictional Oui Chef magazine.",
					direction:
						"Editorial restraint with warmth. Let the story carry the weight — clean hierarchy, honest photography, type that guides without imposing.",
				},
			},
			{
				id: "tea-with-sami",
				title: "Tea with Sami",
				description:
					"A fictional podcast episode exploring the origin story of Nashville Hot Chicken, connecting food history to culture and folklore.",
				image: "/writing/revengehot.gif",
				label: "Writing",
				category: "Writing",
				route: "/expertise-archived/tea-with-sami",
				bg: "#d8dde7",
				tools: ["Audacity", "Photoshop"],
				study: {
					purpose:
						"Build a fictional food-history podcast format that could extend into a larger series about the stories behind what we eat.",
					role: "Writer, audio producer, and cover artist. Scripted and recorded the episode; designed cover art in Photoshop.",
					direction:
						"The cover needed to feel like a guilty pleasure — bold, irreverent, impossible to ignore. Saturated reds and smoky darks to match the heat of the subject.",
				},
			},
			{
				id: "discovereats",
				title: "Discover Eats",
				description:
					"A personal project, designed and built as a food-origin encyclopedia exploring the stories, techniques, and cultural significance behind the dishes we love.",
				image: "/discovereatssh.png",
				label: "Development",
				category: "Product + Development",
				route: "https://discovereats.samoncanvas.com",
				featured: true,
				bg: "#f5e6d3",
				tools: [
					"React",
					"GSAP",
					"MUI",
					"Claude AI",
					"Figma",
					"Lighthouse",
					"D3",
					"ThreeJS",
				],
				study: {
					purpose:
						"Create a browsable experience that makes food history approachable without flattening the cultural context behind each dish.",
					role: "Independent product designer and developer. Conceptualized, designed, and built the platform end to end.",
					direction:
						"Food is storytelling. The experience needed to feel like opening a beautifully bound cookbook — rich with detail, intuitive navigation, and genuine curiosity.",
				},
			},
			{
				id: "life2life",
				title: "Life 2 Life Travel Agency | Web Interface",
				description:
					"A concept travel agency specializing in AI-cultivated travel experiences.",
				image: "/design/SamDeCoteau_Vector.avif",
				label: "Development",
				category: "Product + Development",
				route: "/expertise",
				bg: "#d8e4d9",
				tools: ["React", "CSS", "Vite"],
				study: {
					purpose:
						"Explore how AI-driven recommendations could feel personal and aspirational without making the interface feel automated or impersonal.",
					role: "Front-end developer. Built the full interface in React with modern CSS layout and interaction design.",
					direction:
						"Sky-meets-horizon color language. Designed to feel effortlessly curated — like a conversation with someone who's been everywhere and knows exactly what you'd love.",
				},
			},
			{
				id: "atlas-heor",
				title: "ATLAS HEOR Platform",
				description:
					"The challenge was mimicking complex real-world processes while keeping the data understandable. At AESARA, I contributed to UX, front-end development, data visualization, information architecture, and reusable interface systems.",
				label: "AESARA · UX + FRONT-END",
				category: "Product + Development",
				route: "https://www.arysana.com/atlas-platform",
				bg: "#dce5de",
				tools: ["UX/UI", "Data Visualization", "Design Systems", "Life Sciences"],
				visual: {
					type: "enterprise",
					eyebrow: "AESARA Inc. · Selected Contribution",
					metrics: ["HEOR", "B2B SaaS", "UX + Front-End"],
				},
				study: {
					purpose:
						"ATLAS is AESARA’s enterprise health economics platform, built to support complex HEOR workflows for biopharma teams.",
					role: "As part of the AESARA product and engineering team, I contributed UX and front-end work across information architecture, interaction patterns, data visualization, and reusable interface patterns.",
					direction:
						"The work required translating dense HEOR workflows and layered stakeholder needs into interfaces that were clear, consistent, and trustworthy within an iterative product environment.",
				},
			},
			{
				id: "adhd-calculator",
				title: "ADHD Economic Impact Calculator",
				description:
					"An interactive cost calculator that translates ADHD economic data into personalized, country-level results. At AESARA, I led the UX/UI, including input flows, responsive behavior, and results presentation.",
				label: "AESARA · UX/UI",
				category: "Product + Development",
				route: "https://attentiononadhd.com/cost-calculator/",
				bg: "#e7e2d7",
				tools: ["UX/UI", "Health Economics", "Responsive Design", "Pharma"],
				visual: {
					type: "enterprise",
					eyebrow: "AESARA Inc. · Selected Contribution",
					metrics: ["Calculator", "Healthcare", "UX/UI"],
				},
				study: {
					purpose:
						"Delivered through AESARA, the calculator turned health-economic research into an accessible client-facing experience for healthcare stakeholders.",
					role: "I led the UX/UI for the calculator experience, including input flows, results presentation, and responsive behavior.",
					direction:
						"The experience had to work for people with varying levels of subject-matter knowledge while staying clear, credible, and easy to navigate.",
				},
			},
			{
				id: "rowdy",
				title: "ROWDY Type Poster",
				description:
					"Type study inspired by the UK punk scene of the late 70s utilizing the typeface Rowdy by Benjamin Busse.",
				image: "/design/SD_TypePoster_ROWDY.avif",
				label: "Design",
				category: "Design",
				route: "/expertise",
				bg: "#e2e6d5",
				tools: ["Illustrator"],
				study: {
					purpose:
						"Explore how typography, scale, and composition could recreate punk’s visual tension without losing structure.",
					role: "Designer and art director. Concept and full execution in Illustrator.",
					direction:
						"Tension within structure. Punk broke rules by knowing them — so the layout follows a strict grid it then deliberately fractures. Compressed type, raw edges, confrontational scale.",
				},
			},
			{
				id: "lombardia",
				title: "LOMBARDIA Type Poster",
				description:
					"My take on a Saul Bass-inspired type poster using the typeface Lombardia by Luciano Perondi.",
				image: "/design/SD_TypePoster_LOMBARDIA.avif",
				label: "Design",
				category: "Design",
				route: "/expertise",
				bg: "#d5e2ea",
				tools: ["Illustrator"],
				study: {
					purpose:
						"Study how reduction, shape, and typographic composition can communicate a cinematic idea with minimal elements.",
					role: "Designer. Concept and execution in Illustrator.",
					direction:
						"Less to say more. Bass condensed entire narratives into a single gesture. The driving question: what is the minimum needed to communicate maximum impact?",
				},
			},
			{
				id: "vote",
				title: "Lady Liberty Says to Vote",
				description:
					"A poster encouraging voter participation, inspired by the 'We Can Do It!' Rosie the Riveter poster — reframed through Lady Liberty.",
				image: "/design/Vote_Poster.avif",
				label: "Design",
				category: "Design",
				route: "/expertise",
				bg: "#e9ddd3",
				tools: ["Illustrator"],
				study: {
					purpose:
						"Use familiar American visual language to make a civic message immediately recognizable and emotionally direct.",
					role: "Designer and illustrator. First serious vector illustration work; built entirely in Illustrator.",
					direction:
						"Familiar form, fresh urgency. Leverage recognition to lower the barrier — make something people feel before they think about it.",
				},
			},
			{
				id: "black-unicorn",
				title: "Black Unicorn",
				description:
					"Conceptual branding and poster design for a personal brand celebrating the unconventional creative path.",
				image: "/design/BlackUnicorn.avif",
				label: "Design",
				category: "Design",
				route: "/expertise",
				bg: "#ddd9ea",
				tools: ["Illustrator", "Photoshop"],
				study: {
					purpose:
						"Develop a visual identity around individuality, creative independence, and the tension between visibility and difference.",
					role: "Brand strategist, designer, illustrator. Developed the full visual identity: wordmark, poster system, and design language.",
					direction:
						"Darkness and iridescence in equal measure. The palette moves from deep black through electric violet — power, mystery, and a quiet refusal to be ordinary.",
				},
			},
			{
				id: "diving-film",
				title: "Diving",
				description:
					"A short film compiled from personal dive footage in Cabo San Lucas, Mexico — capturing what it feels like to be underwater.",
				video: "/photography/diving.MP4",
				label: "Media",
				category: "Media",
				route: "/expertise",
				bg: "#d9e0e5",
				tools: ["Premiere Pro"],
				study: {
					purpose:
						"Translate the sensory experience of diving into a short film centered on pace, movement, and atmosphere.",
					role: "Cinematographer and editor. Shot on GoPro; assembled, color-graded, and paced in Premiere Pro.",
					direction:
						"Let the ocean do the talking. The edit follows the rhythm of the water — unhurried, punctuated by sudden color and movement. No narration. No music that fights the footage.",
				},
			},
		],
		[],
	);

	const sections = useMemo(
		() =>
			[...baseSections].sort((leftSection, rightSection) => {
				const leftPriority = SECTION_PRIORITY[leftSection.id] ?? 100;
				const rightPriority = SECTION_PRIORITY[rightSection.id] ?? 100;
				return leftPriority - rightPriority;
			}),
		[baseSections],
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
									getNumericCssVar(
										computedStyles.getPropertyValue("--proto-top-offset"),
									) +
									getNumericCssVar(
										computedStyles.getPropertyValue("--proto-jump-height"),
									);

								const maxScroll = Math.max(
									1,
									pageElement.scrollHeight - window.innerHeight,
								);

								const points = sectionElements.map((sectionElement) => {
									const sectionTopScroll =
										sectionElement.offsetTop -
										pageElement.offsetTop -
										pageTopOffset;
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
										clipPath: "inset(0% 0% 0% 0%)",
									});
								} catch (err) {
									console.error(`Failed to set layer ${index}:`, err);
								}
							});

							let activeLayerIndex = 0;

							const showLayer = (nextIndex, direction = 1, animate = true) => {
								if (!layerWrappers[nextIndex]) {
									return;
								}

								gsap.to(pinTargetElement, {
									autoAlpha: 1,
									duration: animate ? TRANSITION_TIMINGS.tintDuration * 0.5 : 0,
									ease: "power2.out",
									overwrite: true,
								});

								const previousLayer = layerWrappers[activeLayerIndex];
								const nextLayer = layerWrappers[nextIndex];
								const revealFrom =
									direction >= 0
										? "inset(100% 0% 0% 0%)"
										: "inset(0% 0% 100% 0%)";

								gsap.killTweensOf(layerWrappers);

								layerWrappers.forEach((layerWrapper, index) => {
									gsap.set(layerWrapper, {
										zIndex:
											index === nextIndex
												? sections.length + 1
												: sections.length - index,
									});
								});

								if (!animate || nextIndex === activeLayerIndex) {
									gsap.set(layerWrappers, {
										autoAlpha: (index) => (index === nextIndex ? 1 : 0),
										clipPath: "inset(0% 0% 0% 0%)",
									});
									activeLayerIndex = nextIndex;
									return;
								}

								gsap.set(layerWrappers, {
									autoAlpha: (index) =>
										index === activeLayerIndex || index === nextIndex ? 1 : 0,
									clipPath: "inset(0% 0% 0% 0%)",
								});

								gsap.set(nextLayer, {
									clipPath: revealFrom,
								});

								gsap.to(nextLayer, {
									clipPath: "inset(0% 0% 0% 0%)",
									duration: TRANSITION_TIMINGS.layerDuration,
									ease: "power2.inOut",
									overwrite: true,
									onComplete: () => {
										gsap.set(layerWrappers, {
											autoAlpha: (index) => (index === nextIndex ? 1 : 0),
											clipPath: "inset(0% 0% 0% 0%)",
										});
									},
								});

								if (previousLayer && previousLayer !== nextLayer) {
									gsap.to(previousLayer, {
										autoAlpha: 0,
										duration: TRANSITION_TIMINGS.layerDuration * 0.65,
										ease: "power2.out",
										overwrite: true,
									});
								}

								activeLayerIndex = nextIndex;
							};

							showLayer(0, 1, false);

							ScrollTrigger.create({
								trigger: pageElement,
								start: "top top",
								end: "bottom bottom",
								pin: pinTargetElement,
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
							});

							sectionRefs.current
								.slice(0, sections.length)
								.forEach((sectionElement, index) => {
									try {
										if (!sectionElement) {
											return;
										}

										ScrollTrigger.create({
											trigger: sectionElement,
											start: "top center",
											end: "bottom center",
											onEnter: () => {
												showLayer(index, 1);
												setActiveIndex((prev) =>
													prev === index ? prev : index,
												);
											},
											onEnterBack: () => {
												showLayer(index, -1);
												setActiveIndex((prev) =>
													prev === index ? prev : index,
												);
											},
										});
									} catch (err) {
										console.error(
											`Failed to create section trigger ${index}:`,
											err,
										);
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
		const mobileSlot = document.getElementById("mobile-filter-slot");
		setMobileFilterSlot(mobileSlot);
		return () => {
			setNavFilterSlot(null);
			setMobileFilterSlot(null);
		};
	}, []);

	const jumpFilters = useMemo(
		() => [...new Set(sections.map((section) => section.category || section.label))],
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
			const featuredIndex = sections.findIndex((section) => section.featured);
			if (featuredIndex >= 0) {
				sectionRefs.current[featuredIndex]?.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
			return;
		}
		const targetIndex = sections.findIndex(
			(section) => (section.category || section.label) === label,
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

			const featuredBottom =
				featuredElement.offsetTop + featuredElement.offsetHeight;
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
		if (item.route && item.route.startsWith("http")) {
			window.open(item.route, "_blank", "noopener,noreferrer");
			return;
		}
		handleOpenProjectModal(item);
	};

	const renderProjectMedia = (
		item,
		altText,
		{ pictureClassName, imgClassName } = {},
	) => {
		if (item.visual?.type === "enterprise") {
			return (
				<div
					className={`${imgClassName || ""} proto-enterprise-media`.trim()}
					role="img"
					aria-label={altText}
				>
					<div className="proto-enterprise-media-inner">
						<p className="proto-enterprise-media-eyebrow">
							{item.visual.eyebrow}
						</p>
						<h3>{item.title}</h3>
						<p>{item.study?.purpose || item.description}</p>
						<div className="proto-enterprise-media-metrics">
							{item.visual.metrics?.map((metric) => (
								<span key={metric}>{metric}</span>
							))}
						</div>
					</div>
				</div>
			);
		}

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
					? isAboveProtoPage
						? "is-active"
						: ""
					: (activeSection.category || activeSection.label) === filterLabel
						? "is-active"
						: ""
			}`}
			onClick={() => handleJumpTo(filterLabel)}
		>
			{filterLabel}
		</button>
	));

	const mobileFilterButtons = ["Featured", ...jumpFilters].map(
		(filterLabel) => (
			<button
				key={filterLabel}
				type="button"
				className={`mobile-filter-btn ${
					filterLabel === "Featured"
						? isAboveProtoPage
							? "is-active"
							: ""
						: (activeSection.category || activeSection.label) === filterLabel
							? "is-active"
							: ""
				}`}
				onClick={() => {
					handleJumpTo(filterLabel);
					document.getElementById("mobile-menu-overlay")?.click();
				}}
			>
				{filterLabel}
			</button>
		),
	);

	return (
		<>
			{navFilterSlot &&
				createPortal(
					<div className="proto-jump-controls">{filterButtons}</div>,
					navFilterSlot,
				)}
			{mobileFilterSlot &&
				createPortal(
					<div className="mobile-filter-group">
						<p className="mobile-filter-label">Jump to</p>
						<div className="mobile-filter-btns">{mobileFilterButtons}</div>
					</div>,
					mobileFilterSlot,
				)}
			<div className="proto-jump-wrap">
				<section
					ref={jumpRef}
					className="proto-jump"
					aria-label="Jump to section"
				>
					<p className="proto-jump-label">Jump to</p>
					<div className="proto-jump-controls">{filterButtons}</div>
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
												<span key={tool} className="proto-tool-tag">
													{tool}
												</span>
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
						Return to top
					</button>
				)}
			</div>
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
		</>
	);
};

export default ExpertisePage;
