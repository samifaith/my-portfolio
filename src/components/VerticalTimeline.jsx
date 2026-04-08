import React, { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Timeline.css";

gsap.registerPlugin(ScrollTrigger);

const defaultItems = [
	{
		id: 1,
		year: "2009",
		title: "Graduated from Boston Latin Academy",
		text: "The school paper and track shaped how I work. I learned to hit deadlines, edit under pressure, and collaborate with care.",
		side: "left",
		skills: [
			"Team Leadership",
			"Writing & Communication",
			"Project Ownership",
			"Time Management",
			"Public Speaking",
		],
		techTools: ["Microsoft Office"],
	},
	{
		id: 2,
		year: "2010",
		title: "Center for Digital Imaging Arts at Boston University",
		text: "Studio training taught me to shape light, compose with intention, and run a consistent shoot-to-delivery workflow. I produced ~12–18 studio sets per term, maintained calibrated color across shoots, and cut edit time by ~25% using presets and checklists.",
		side: "right",
		skills: [
			"Photography & Composition",
			"Color Management",
			"Studio & Natural Lighting",
			"Content Workflow",
		],
		techTools: ["Adobe Photoshop", "Adobe Lightroom"],
	},
	{
		id: 3,
		year: "2018",
		title: "DeCoteau Photography",
		text: "Launched a portrait and wedding studio. Averaged ~20–30 shoots per season with on-time delivery at ~98%. Referral and repeat clients drove ~60% of bookings. Pre-shoot moodboards and shot lists cut revision cycles by ~40–50%.",
		side: "left",
		skills: [
			"Client Discovery",
			"Creative Direction",
			"Branding & Marketing",
			"Operations Management",
			"Customer Retention",
		],
		techTools: [
			"Adobe Illustrator",
			"Adobe InDesign",
			"MailChimp",
			"Squarespace",
			"Google Analytics",
			"WordPress",
		],
	},
	{
		id: 4,
		year: "2017",
		title: "Sandpiper Rentals · Martha's Vineyard",
		text: "Standardized listing templates and development the company's brand identity. Brought the average first-response time from ~24h to ~1h during peak season by implementing communication rotations, reduced avoidable listing errors to near-zero, and kept owner and guest satisfaction high via simple SOPs.",
		side: "right",
		skills: [
			"Customer Experience",
			"Property CMS",
			"Scheduling & Coordination",
			"Process Improvement",
			"Stakeholder Communication",
		],
		techTools: ["Adobe Illustrator", "Adobe InDesign", "MailChimp"],
	},
	{
		id: 5,
		year: "2018",
		title: "Wayfair · Campus Recruitment",
		text: "Sourced and shepherded early-career candidates, ran campus events, and supported structured interview loops. Increased representation of diversely qualified candidates in pipelines from ~7% to ~30%, trimmed time-to-fill by ~2 weeks on recurring roles, and held offer acceptance near ~70% by clarifying rubrics and smoothing loops.",
		side: "left",
		skills: [
			"Talent Sourcing",
			"Interview Facilitation",
			"Pipeline Management",
			"Hiring Metrics",
			"Diversity Initiatives",
		],
		techTools: ["Greenhouse", "HubSpot", "Hootsuite", "Google Suite"],
	},
	{
		id: 6,
		year: "2020",
		title: "Resilient Coders",
		text: "Shifted into software with full-stack projects. Delivered capstone apps with Lighthouse performance at ~95–98% on key flows, practiced agile development sprints, and shipped responsive UI with structured code reviews and issue tracking.",
		side: "right",
		skills: ["Responsive Design", "Agile Practices"],
		techTools: [
			"JavaScript",
			"React",
			"Node.js",
			"Next.js",
			"Express",
			"HTML5",
			"CSS3",
			"Git",
			"GitHub",
			"MongoDB",
		],
	},
	{
		id: 7,
		year: "2024",
		title: "AESARA Inc.",
		text: "Worked on the Health Economics and Outcomes Research (HEOR) evidence tool, ATLAS, utilizing product, design, and front-end development skills. Built ~20–30 reusable UI components and introduced design-systems. Helped move releases from ~1–2 to ~3–4 per quarter by tightening handoffs and acceptance criteria.",
		side: "left",
		skills: [
			"Product Development",
			"Design Systems",
			"Data-informed UX",
			"Cross-functional Collaboration",
			"Regulated Environments",
		],
		techTools: [
			"React",
			"TypeScript",
			"JavaScript",
			"Figma",
			"Articulate 360",
			"Adobe Suite",
			"GSAP",
			"Microsoft Sharepoint",
		],
	},
	{
		id: 8,
		year: "2026",
		title: "Johnson & Wales University · Food Studies, Media & Design",
		text: "I wanted to design a degree that blended culture, food systems, and storytelling into shippable work. I produced case studies, ran user tests on prototypes, and directed design and brand direction for the JWU innovation lab, The Launch Pad.",
		side: "right",
		skills: [
			"User-Centered Design",
			"Research & Case Studies",
			"Media Storytelling",
			"Food Systems & Culture",
			"Project Delivery",
		],
		techTools: [
			"Figma",
			"Adobe Creative Cloud",
			"Plasmic",
			"Elementor",
			"Webflow",
			"Microsoft CoPilot",
			"Tailwind CSS",
		],
	},
];

export default function VerticalTimeline({
	items = defaultItems,
	accent = "#c5ec56",
	order = "desc",
}) {
	const normalizedOrder = order === "asc" ? "asc" : "desc";
	const displayItems = useMemo(
		() => (normalizedOrder === "asc" ? items : [...items].reverse()),
		[items, normalizedOrder],
	);
	const containerRef = useRef(null);
	const cardsRef = useRef([]);
	const badgesRef = useRef([]);
	const oppositeRef = useRef([]);

	useLayoutEffect(() => {
		try {
			const ctx = gsap.context(() => {
				try {
					displayItems.forEach((item, i) => {
						try {
							const card = cardsRef.current[i];
							const badge = badgesRef.current[i];
							const opposite = oppositeRef.current[i];

							if (card) {
								gsap.fromTo(
									card,
									{ opacity: 0, y: 30, willChange: "opacity, transform" },
									{
										opacity: 1,
										y: 0,
										duration: 0.6,
										scrollTrigger: {
											trigger: card,
											start: "top 85%",
											toggleActions: "play none none reverse",
											fastScrollEnd: true,
										},
										clearProps: "willChange",
									},
								);
							}

							if (badge) {
								gsap.fromTo(
									badge,
									{ scale: 0, opacity: 0, willChange: "transform, opacity" },
									{
										scale: 1,
										opacity: 1,
										duration: 0.4,
										ease: "back.out(1.7)",
										scrollTrigger: {
											trigger: badge,
											start: "top 90%",
											toggleActions: "play none none reverse",
											fastScrollEnd: true,
										},
										clearProps: "willChange",
									},
								);
							}

							if (opposite) {
								// If card is on right, skills are on left (slide from left = negative x)
								// If card is on left, skills are on right (slide from right = positive x)
								gsap.fromTo(
									opposite,
									{
										opacity: 0,
										x: item.side === "right" ? -30 : 30,
										willChange: "opacity, transform",
									},
									{
										opacity: 1,
										x: 0,
										duration: 0.6,
										scrollTrigger: {
											trigger: opposite,
											start: "top 85%",
											toggleActions: "play none none reverse",
											fastScrollEnd: true,
										},
										clearProps: "willChange",
									},
								);
							}
						} catch (err) {
							console.error(`Failed to animate timeline item ${i}:`, err);
						}
					});
				} catch (err) {
					console.error("Timeline animation loop error:", err);
				}
			}, containerRef);

			return () => {
				try {
					ctx.revert();
				} catch (err) {
					console.error("GSAP context cleanup error:", err);
				}
			};
		} catch (err) {
			console.error("useLayoutEffect error:", err);
			return undefined;
		}
	}, [displayItems]);

	return (
		<section className="timeline-section" ref={containerRef}>
			<div className="timeline-header">
				<h2 className="timeline-heading">My Journey</h2>
				<a
					href="/Resume_DeCoteauSam2026.pdf"
					download="Resume_DeCoteauSam2026.pdf"
					className="resume-download-btn"
					aria-label="Download Resume"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 3V16M12 16L16 12M12 16L8 12"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M3 17V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V17"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<span>Resume</span>
				</a>
			</div>
			<div className="timeline-container">
				{/* The center vertical line */}
				<div className="timeline-line" style={{ backgroundColor: accent }} />

				{displayItems.map((item, i) => {
					const side = item.side === "right" ? "right" : "left";
					const oppositeSide = side === "right" ? "left" : "right";

					return (
						<div key={item.id || i} className={`timeline-item ${side}`}>
							<div
								className="timeline-badge"
								ref={(el) => (badgesRef.current[i] = el)}
								style={{ borderColor: accent, backgroundColor: accent }}
							>
								<span>{item.year}</span>
							</div>

							{/* Main description box */}
							<article
								className="timeline-card"
								ref={(el) => (cardsRef.current[i] = el)}
								style={{ borderColor: accent }}
							>
								<h3 className="timeline-title">{item.title}</h3>
								<p className="timeline-text">{item.text}</p>
							</article>

							{/* Skills or images on opposite side */}
							{(item.skills || item.techTools || item.images) && (
								<div
									className={`timeline-opposite ${oppositeSide}`}
									ref={(el) => (oppositeRef.current[i] = el)}
								>
									{item.skills && (
										<ul className="skills-list">
											{item.skills.map((skill, idx) => (
												<li key={idx}>{skill}</li>
											))}
										</ul>
									)}
									{item.techTools && (
										<div className="tech-tools">
											{item.techTools.map((tool, idx) => (
												<span key={idx} className="tech-tool-pill">
													{tool}
												</span>
											))}
										</div>
									)}
									{item.images && (
										<div className="project-mosaic">
											{item.images.map((img, idx) => (
												<img
													key={idx}
													src={img.src}
													alt={img.alt || `Project image ${idx + 1}`}
													className="project-image"
												/>
											))}
										</div>
									)}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
}
