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
		text: "Where it started. I ran the school paper and competitive track in the same season, which meant deadlines I couldn't miss and teammates who noticed if I did. First real lesson in carrying my share. I've been running on that same fuel since.",
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
		text: "I couldn't draw to save my life, but I knew what looked right. CDIA taught me why. Composition, color, how light behaves when you stop fighting it and start planning around it. Turns out 'good eye' is a skill you can actually learn the mechanics of.",
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
		text: "600+ properties, a 12-person team, and an island that doubles in population every summer. I stopped inheriting the process and rebuilt it — first-response time went from 24 hours to 1. It's also where I got fluent in demanding stakeholders, which is a polite way of describing a homeowner calling about a broken hot tub on the Fourth of July.",
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
		text: "Wayfair is where I figured out that the most important thing you'll ever build is the team. I recruited engineers and co-led the WayBlack ERG, and watching those engineers ship things made me want to stop hiring builders and become one. Our recruiting moved diversity from 7% to 30% — not because we found a better checkbox, but because we stopped treating potential like it only comes from four schools. If it isn't inclusive, it isn't finished.",
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
		text: "The part where I stopped handing off mockups and started shipping the thing myself. Full-stack JavaScript, React, Node, Mongo, chasing Lighthouse scores like they were a personal grudge. I learned to write code lean enough that someone else could read it at 2am, and to hand off work without hovering. Mostly it's where 'human-centered' stopped being a phrase I said in interviews and became something I could actually build.",
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
		text: "At AESARA, I worked across UX, front-end development, and product strategy in a field where the data was complex. On ATLAS, I helped shape releases through information architecture, interaction design, data visualization, and reusable UI patterns. I also built and contributed to a system of 30+ reusable components, making the product more consistent and reducing repeat work for engineering. The goal was simple: make complex health economics data easier to use.",
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
		text: "I don't work in silos and I've stopped apologizing for it. I'm finishing at Johnson & Wales, studying how food and media build community — which sounds like a detour from code until you notice both are systems for getting people to care about something. My roots are still in the build. Enterprise tools for global health economists, diversity hiring at retail scale, interfaces people use whether or not they ever think about who made them.",
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
