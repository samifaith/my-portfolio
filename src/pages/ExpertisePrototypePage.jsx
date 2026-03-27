import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ExpertisePrototype.css";

const ExpertisePrototypePage = () => {
	const navigate = useNavigate();
	const [activeIndex, setActiveIndex] = useState(0);
	const sectionRefs = useRef([]);

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

	const activeSection = sections[activeIndex] || sections[0];

	return (
		<div className="proto-page" style={{ backgroundColor: activeSection.bg }}>
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
								<img src={item.image} alt={item.title} />
							</div>
						</article>
					))}
				</section>

				<section className="proto-right">
					<div className="proto-frame">
						<img
							src={activeSection.image}
							alt={activeSection.title}
							className="proto-layer"
						/>
					</div>
				</section>
			</main>
		</div>
	);
};

export default ExpertisePrototypePage;
