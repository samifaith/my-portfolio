import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Timeline.css";

gsap.registerPlugin(ScrollTrigger);

const defaultItems = [
	{
		id: 1,
		year: "2009",
		title: "Graduated from Boston Latin Academy",
		text: "I participated in various extracurricular activities including the track and field team and the school newspaper, which helped me develop strong collaborative skills. Ultimately though, by my senior year, I still wasn't entirely sure about my future career path, but I was eager to explore different opportunities and find my passion.",
		side: "left",
	},
	{
		id: 2,
		year: "2009",
		title: "Center for Digital Imaging Arts at Boston University (2009-2010)",
		text: "An affiliate school of Boston University in Waltham, MA offered specialized training in digital arts and imaging. Here, I honed my skills in photography, graphic design, and digital media production, which laid the foundation for my future endeavors in creative technology.",
		side: "right",
	},
	{
		id: 3,
		year: "2012",
		title: "DeCoteau Photography",
		text: "I started my own photography business, specializing in portrait and wedding photography. This venture allowed me to apply my technical skills while also developing my entrepreneurial abilities, client relations, and business management experience.",
		side: "left",
	},
	{
		id: 4,
		year: "2012",
		title: "Sandpiper Rentals (2012-2013)",
		text: "A vacation rental company on Martha's Vineyard appreciated my skillset and offered me a role where I managed property listings, coordinated bookings, and ensured excellent customer service for guests. This role enhanced my organizational skills and attention to detail in a fast-paced environment.",
		side: "right",
	},
	{
		id: 5,
		year: "2012",
		title: "Wayfair",
		text: "Wayfair was expanding its campus recruitment team and found my diverse background appealing. I contributed to talent acquisition efforts, helping to identify and recruit top candidates for various roles within the company. This experience sharpened my interpersonal skills and deepened my understanding of meeting the needs of the business.",
		side: "left",
	},
	{
		id: 6,
		year: "2012",
		title: "Resilient Coders",
		text: "During my time at Wayfair, I connected with engineers who had graduated from Resilient Coders, a coding bootcamp focused on underrepresented communities. Intrigued by their journeys, I decided to enroll in the program myself. This decision marked a significant turning point in my career, as I transitioned from recruitment into the world of software development.",
		side: "right",
	},
	{
		id: 7,
		year: "2012",
		title: "AESARA Inc.",
		text: "AESARA Inc. was a boutique firm focused on innovative solutions in the pharma industry. I joined their team to contribute to product development and engineering efforts, gaining valuable experience in agile methodologies and collaborative software development.",
		side: "left",
	},
	{
		id: 8,
		year: "2024",
		title: "Johnson & Wales University (2024-2026)",
		text: "With a solid foundation in software development, I decided to further enhance my skills by pursuing an interdisciplinary degree in Food Studies, Media, and Design at Johnson & Wales University. This academic pursuit is equipping me with advanced knowledge and preparing me for the next phase of my career in creative technology.",
		side: "right",
	},
];

export default function VerticalTimeline({
	items = defaultItems,
	accent = "#ffd0d7",
}) {
	const containerRef = useRef(null);
	const cardsRef = useRef([]);
	const badgesRef = useRef([]);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			items.forEach((item, i) => {
				const card = cardsRef.current[i];
				const badge = badgesRef.current[i];

				if (card) {
					gsap.fromTo(
						card,
						{ opacity: 0, y: 30 },
						{
							opacity: 1,
							y: 0,
							duration: 0.6,
							scrollTrigger: {
								trigger: card,
								start: "top 85%",
								toggleActions: "play none none reverse",
							},
						}
					);
				}

				if (badge) {
					gsap.fromTo(
						badge,
						{ scale: 0, opacity: 0 },
						{
							scale: 1,
							opacity: 1,
							duration: 0.4,
							ease: "back.out(1.7)",
							scrollTrigger: {
								trigger: badge,
								start: "top 90%",
								toggleActions: "play none none reverse",
							},
						}
					);
				}
			});
		}, containerRef);

		return () => ctx.revert();
	}, [items]);

	return (
		<section className="timeline-section" ref={containerRef}>
			<h2 className="timeline-heading">My Journey</h2>
			<div className="timeline-container">
				{/* The center vertical line */}
				<div className="timeline-line" style={{ backgroundColor: accent }} />

				{items.map((item, i) => {
					const side = item.side === "right" ? "right" : "left";

					return (
						<div key={item.id || i} className={`timeline-item ${side}`}>
							<div
								className="timeline-badge"
								ref={(el) => (badgesRef.current[i] = el)}
								style={{ borderColor: accent, backgroundColor: accent }}
							>
								<span>{item.year}</span>
							</div>
							<article
								className="timeline-card"
								ref={(el) => (cardsRef.current[i] = el)}
								style={{ borderColor: accent }}
							>
								<h3 className="timeline-title">{item.title}</h3>
								<p className="timeline-text">{item.text}</p>
							</article>
						</div>
					);
				})}
			</div>
		</section>
	);
}
