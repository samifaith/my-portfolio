import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getModernImageSources } from "../utils/imageFormats";
import "../styles/ExpertisePrototype.css";

gsap.registerPlugin(ScrollTrigger);

const ExpertisePrototypePage = () => {
	const navigate = useNavigate();
	const [activeIndex, setActiveIndex] = useState(0);
	const sectionRefs = useRef([]);
	const pageRef = useRef(null);
	const rightColumnRef = useRef(null);
	const layerWrapRefs = useRef([]);

	const sections = useMemo(
		() => [
			{
				id: "rowdy",
				title: "ROWDY Type Poster",
				description:
					"Typography exploration with bold, energetic design and expressive layout textures.",
				image: "/design/SD_TypePoster_ROWDY.avif",
				label: "Design",
				bg: "#e2e6d5",
			},
			{
				id: "lombardia",
				title: "LOMBARDIA Type Poster",
				description:
					"Elegant letterform system inspired by editorial grids and classic Italian style language.",
				image: "/design/SD_TypePoster_LOMBARDIA.avif",
				label: "Design",
				bg: "#d5e2ea",
			},
			{
				id: "vote",
				title: "Lady Liberty Says to Vote",
				description:
					"Campaign poster built for clarity, urgency, and high-impact public messaging.",
				image: "/design/Vote_Poster.avif",
				label: "Design",
				bg: "#e9ddd3",
			},
			{
				id: "wanderlust",
				title: "Wanderlust Case Study",
				description:
					"UX/UI system for trip planning focused on legibility, confidence, and quick itinerary decisions.",
				image: "/design/SamDeCoteau_Vector.avif",
				label: "Development",
				route: "/wanderlust-case-study",
				bg: "#ddd9ea",
			},
		],
		[],
	);

	useEffect(() => {
		const contentSections = sectionRefs.current
			.slice(0, sections.length)
			.filter(Boolean);

		if (!contentSections.length) {
			return undefined;
		}

		const observer = new IntersectionObserver(
			(entries) => {
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
	}, [sections]);

	useLayoutEffect(() => {
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
			const pageElement = pageRef.current;
			const rightColumnElement = rightColumnRef.current;
			const layerWrappers = layerWrapRefs.current.filter(Boolean);

			if (!pageElement || !rightColumnElement || layerWrappers.length < 2) {
				return undefined;
			}

			const layerImages = layerWrappers
				.map((layerWrapper) => layerWrapper.querySelector("img"))
				.filter(Boolean);

			const ctx = gsap.context(() => {
				gsap.set(layerWrappers, {
					clipPath: "inset(0px 0px 0px 0px)",
					willChange: "clip-path",
				});
				gsap.set(layerImages, {
					objectPosition: "0px 50%",
					willChange: "object-position",
				});

				layerWrappers.forEach((layerWrapper, index) => {
					gsap.set(layerWrapper, {
						zIndex: sections.length - index,
					});
				});

				const masterTimeline = gsap.timeline({
					scrollTrigger: {
						trigger: pageElement,
						start: "top top",
						end: "bottom bottom",
						pin: rightColumnElement,
						scrub: true,
						anticipatePin: 1,
						invalidateOnRefresh: true,
						fastScrollEnd: true,
					},
				});

				sections.forEach((_, index) => {
					const currentLayer = layerWrappers[index];
					const nextLayer = layerWrappers[index + 1];
					const currentImage = layerImages[index];
					const nextImage = layerImages[index + 1];

					if (!currentLayer || !currentImage) {
						return;
					}

					const segmentTimeline = gsap.timeline();

					if (nextLayer && nextImage) {
						segmentTimeline
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
								nextImage,
								{
									objectPosition: "0px 40%",
									duration: 1.5,
									ease: "none",
								},
								0,
							);
					}

					masterTimeline.add(segmentTimeline);
				});
			}, pageElement);

			return () => ctx.revert();
		});

		return () => {
			mm.revert();
		};
	}, [sections]);

	const activeSection = sections[activeIndex] || sections[0];

	const renderProjectImage = (
		imagePath,
		altText,
		{ pictureClassName, imgClassName } = {},
	) => {
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
			style={{ backgroundColor: activeSection.bg }}
		>
			<header className="proto-header">
				<Link to="/expertise" className="proto-back-link">
					Back to Expertise
				</Link>
			</header>

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
								{item.route && (
									<button
										type="button"
										className="proto-cta"
										onClick={() => {
											navigate(item.route);
										}}
									>
										Learn More
									</button>
								)}
							</div>
							<div className="proto-mobile-media">
								{renderProjectImage(item.image, item.title)}
							</div>
						</article>
					))}
				</section>

				<section ref={rightColumnRef} className="proto-right">
					<div className="proto-image-stack">
						{sections.map((item, index) => (
							<div
								className="proto-layer-wrap"
								key={item.id}
								ref={(el) => {
									layerWrapRefs.current[index] = el;
								}}
							>
								{renderProjectImage(item.image, item.title, {
									pictureClassName: "proto-layer-picture",
									imgClassName: "proto-layer",
								})}
							</div>
						))}
					</div>
				</section>
			</main>
		</div>
	);
};

export default ExpertisePrototypePage;
