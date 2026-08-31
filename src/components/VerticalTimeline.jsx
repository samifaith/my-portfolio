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
		text: "Where it started. I participated on the school paper and did competitive track, which meant deadlines I couldn't miss and teammates who noticed if I did. First real lesson in carrying my share.",
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
		text: "I couldn't draw to save my life, but I had an eye for composition. CDIA taught me why. Composition, color, how light behaves. Turns out a 'good eye' is a skill you can actually learn the mechanics of.",
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
		text: "Long before I was writing code, I was a photographer running my own business. Weddings teach you two things fast: how to see what everyone else in the room is missing, and how to stay calm when there's no second take. Between shoots I was designing photobooks, building the brand, chasing invoices. That's where I learned the difference between delivering a service and giving someone an experience they'll talk about for years.",
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
		text: "600+ properties, a 12-person team, and an island that seems to double in population every summer. I was tasked with rebuilding our internal processes leading to first-response times going from 24 hours to only 1. It's also where I got fluent in managing stakeholders, not taking feedback too personally, and developing interpersonal relationships I have to this day",
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
		text: "Wayfair is where I figured out that the most important thing you'll ever build is the team. I recruited engineers and co-led the WayBlack employee resource group. During my time there, I helped to increase the company's diversity and inclusion initiatives, leading to a more diverse hiring pool and process. Our recruiting moved diversity from 7% to 30% of the candidate pipeline, and I helped to create a more inclusive interview process that reduced bias and improved candidate experience. During that time, watching the engineers ship new products made me want to stop hiring builders and become one.",
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
		text: "I was a part of the Resilient Coders program, where I learned to build and maintain full-stack web applications. I learned to write code lean, and to hand off work with clear documentation. Mostly it's where 'human-centered' stopped being a phrase I said in interviews and became something I could actually build.",
		side: "right",
		skills: ["Responsive Design", "Agile Practices", "Full-Stack Development"],
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
			"Postman",
			"Figma",
			"Adobe Creative Suite",
			"Lighthouse",
		],
	},
	{
		id: 7,
		year: "2024",
		title: "AESARA Inc.",
		text: "In pharma, data has real-world impact. At AESARA, I streamlined the information architecture, created interface systems, and helped structure the UI library for ATLAS, their health economics platform. I also built a reusable component library that improved consistency across the product and reduced repeat development work.",
		side: "left",
		skills: [
			"UX Engineering",
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
		text: "I'm finishing up at Johnson & Wales, studying how design and media build community. My roots are still in the build. Enterprise tools for global health economists, diversity hiring at retail scale, interfaces people use whether or not they ever think about who made them.",
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

							<article
								className="timeline-card"
								ref={(el) => (cardsRef.current[i] = el)}
								style={{ borderColor: accent }}
							>
								<h3 className="timeline-title">{item.title}</h3>
								<p className="timeline-text">{item.text}</p>
							</article>

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
