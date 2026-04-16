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
		text: "Where the creativity started. Balancing the school paper with competitive track was my first lesson in hitting deadlines and participating with a team under pressure. I’ve been running with that same hustle ever since.",
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
		text: "I couldn't draw but I knew what looked good--I had a good 'eye'. This was a deep dive into the technical side of the lens. I learned the science of composition and how to handle a studio.",
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
		text: "Long before I was writing code, I was a photographer. My years in photography and handling its operations taught me two things: how to see what others miss, and how to stay calm when the stakes are high. Whether I was photographing a wedding or designing photobook layouts, I was learning how to define my voice, creating the moment where a service becomes an experience.",
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
		text: "A masterclass in dynamic operations. I managed the logistics for 600+ properties and a 12-person team. I didn’t just follow processes—I built the engine, slashing first-response times from 24 hours to 1. This was where I learned to drive change, manage demanding stakeholders, and move with purpose when the pressure was on.",
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
		text: "Wayfair was where I learned that the most important product you ever build is the team itself. As a recruiter and co-leader of the WayBlack ERG, I was introduced to engineers driving change, inspiring me to take that same leap. Our recruitment efforts managed to move the needle on diversity from 7% to 30% because we stopped looking at checkboxes and started looking at human potential. I bring that same lens to my work today: if it isn't inclusive, it isn't finished.",
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
		text: "This was my deep dive into the 'how.' I believe a designer who understands the code makes for a better collaborator. At Resilient Coders, I grounded my creative skills in technical development, shipping full-stack applications, aiming for near-perfect Lighthouse scores. It taught me the art of lean code, delegation and collaboration, and ultimately to create human-centered products that deliver.",
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
		text: "In the world of Health Economics, data is usually dense and complex. At AESARA, my job was to make it fluid and intuitive. I took lead on UX product strategy for the ATLAS platform, where I wasn't just designing—I was conceptualizing each release. By creating a system of 30+ reusable components, I didn't just help the product look better; I streamlined the development process. I turned clinical data into something real, interactive, and—most importantly—usable.",
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
		text: "I don’t believe in silos. My work intersects high-level systems thinking and the stories that drive them. I’m wrapping up at Johnson & Wales, thinking about how we build community through food and media, but my roots are in the code. I’ve built enterprise tools for global consultants and scaled diversity for retail giants. I’m not just designing interfaces; I’m architecting the way people interact with their world.",
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
