import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/ExpertisePrototype.css";

gsap.registerPlugin(ScrollTrigger);

const ExpertisePrototypePage = () => {
	const navigate = useNavigate();
	const [activeIndex, setActiveIndex] = useState(0);
	const shellRef = useRef(null);
	const railRef = useRef(null);
	const pinnedFrameRef = useRef(null);
	const mediaRefs = useRef([]);
	const sectionRefs = useRef([]);
	const activeIndexRef = useRef(0);

	const sections = useMemo(
		() => [
			{
				id: "rowdy",
				title: "ROWDY Type Poster",
				description:
					"Typography exploration with bold, energetic design and expressive layout textures.",
				image: "/design/SD_TypePoster_ROWDY.png",
				label: "Design",
				bg: "#e2e6d5",
			},
			{
				id: "lombardia",
				title: "LOMBARDIA Type Poster",
				description:
					"Elegant letterform system inspired by editorial grids and classic Italian style language.",
				image: "/design/SD_TypePoster_LOMBARDIA.png",
				label: "Design",
				bg: "#d5e2ea",
			},
			{
				id: "vote",
				title: "Lady Liberty Says to Vote",
				description:
					"Campaign poster built for clarity, urgency, and high-impact public messaging.",
				image: "/design/Vote_Poster.png",
				label: "Design",
				bg: "#e9ddd3",
			},
			{
				id: "wanderlust",
				title: "Wanderlust Case Study",
				description:
					"UX/UI system for trip planning focused on legibility, confidence, and quick itinerary decisions.",
				image: "/design/SamDeCoteau_Vector.png",
				label: "Development",
				route: "/wanderlust-case-study",
				bg: "#ddd9ea",
			},
		],
		[],
	);

	useEffect(() => {
		document.body.classList.add("expertise-proto-theme");
		return () => {
			document.body.classList.remove("expertise-proto-theme");
		};
	}, []);

	useEffect(() => {
		activeIndexRef.current = activeIndex;
	}, [activeIndex]);

	useLayoutEffect(() => {
		if (!shellRef.current || sections.length < 2) {
			return undefined;
		}

		const mm = gsap.matchMedia();
		const ctx = gsap.context(() => {
			const mediaLayers = mediaRefs.current
				.slice(0, sections.length)
				.filter(Boolean);
			const contentSections = sectionRefs.current
				.slice(0, sections.length)
				.filter(Boolean);

			if (!contentSections.length || !mediaLayers.length) {
				return;
			}

			const lastIndex = mediaLayers.length - 1;
			const turnEase = gsap.parseEase("power2.inOut");
			const setLayerProgress = (segmentIndex, segmentProgress) => {
				mediaLayers.forEach((layer) => {
					gsap.set(layer, {
						opacity: 0,
						clipPath: "inset(0 0 0 100%)",
						rotationY: 0,
						scaleX: 1,
						xPercent: 0,
						filter: "brightness(1)",
						transformOrigin: "right center",
						zIndex: 1,
					});
				});

				gsap.set(mediaLayers[segmentIndex], {
					opacity: 1,
					clipPath: "inset(0 0 0 0)",
					zIndex: 3,
				});

				if (segmentIndex < lastIndex) {
					const incomingReveal = turnEase(segmentProgress);
					const foldDepth = Math.sin(incomingReveal * Math.PI * 0.9);
					const incomingFold = 1 - incomingReveal;

					gsap.set(mediaLayers[segmentIndex], {
						rotationY: 22 * incomingReveal,
						scaleX: 1 - 0.14 * incomingReveal,
						xPercent: -6 * incomingReveal,
						clipPath: `inset(0 ${incomingReveal * 100}% 0 0)`,
						filter: `brightness(${1 - 0.24 * foldDepth})`,
					});

					gsap.set(mediaLayers[segmentIndex + 1], {
						opacity: 1,
						clipPath: `inset(0 0 0 ${(1 - incomingReveal) * 100}%)`,
						transformOrigin: "right center",
						rotationY: 14 * incomingFold,
						scaleX: 0.9 + 0.1 * incomingReveal,
						xPercent: 3 * incomingFold,
						filter: `brightness(${0.86 + 0.14 * incomingReveal})`,
						zIndex: 2,
					});

					if (pinnedFrameRef.current) {
						pinnedFrameRef.current.style.setProperty(
							"--proto-turn-shadow",
							`${0.15 + 0.45 * foldDepth}`,
						);
					}
				} else if (pinnedFrameRef.current) {
					pinnedFrameRef.current.style.setProperty("--proto-turn-shadow", "0");
				}
			};

			setLayerProgress(0, 0);

			contentSections.forEach((section, index) => {
				ScrollTrigger.create({
					trigger: section,
					start: "top center",
					end: "bottom center",
					onEnter: () => setActiveIndex(index),
					onEnterBack: () => setActiveIndex(index),
				});
			});

			mm.add("(min-width: 1024px)", () => {
				const scrollDistance = () =>
					Math.max(railRef.current.scrollHeight - window.innerHeight, 1);

				ScrollTrigger.create({
					trigger: shellRef.current,
					start: "top top",
					end: () => `+=${scrollDistance()}`,
					pin: pinnedFrameRef.current,
					pinSpacing: false,
					anticipatePin: 1,
					invalidateOnRefresh: true,
				});

				ScrollTrigger.create({
					trigger: railRef.current,
					start: "top top",
					end: () => `+=${scrollDistance()}`,
					scrub: true,
					onUpdate: (self) => {
						if (lastIndex < 1) {
							return;
						}

						const raw = self.progress * lastIndex;
						const segmentIndex = Math.min(Math.floor(raw), lastIndex - 1);
						const segmentProgress = gsap.utils.clamp(0, 1, raw - segmentIndex);
						setLayerProgress(segmentIndex, segmentProgress);
					},
				});
			});

			ScrollTrigger.refresh();
		}, shellRef);

		return () => {
			mm.revert();
			ctx.revert();
		};
	}, [sections]);

	const activeSection = sections[activeIndex] || sections[0];

	return (
		<div className="proto-page" style={{ backgroundColor: activeSection.bg }}>
			<header className="proto-header">
				<Link to="/expertise" className="proto-back-link">
					Back to Expertise
				</Link>
			</header>

			<main className="proto-shell" ref={shellRef}>
				<section className="proto-left" ref={railRef}>
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
										if (item.route) {
											navigate(item.route);
										}
									}}
								>
									Learn More
								</button>
							</div>
							<div className="proto-mobile-media">
								<img src={item.image} alt={item.title} />
							</div>
						</article>
					))}
				</section>

				<section className="proto-right">
					<div className="proto-frame" ref={pinnedFrameRef}>
						{sections.map((item, index) => (
							<img
								key={item.id}
								src={item.image}
								alt={item.title}
								className="proto-layer"
								ref={(el) => {
									mediaRefs.current[index] = el;
								}}
							/>
						))}
					</div>
				</section>
			</main>
		</div>
	);
};

export default ExpertisePrototypePage;
