import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/FeaturedProjects.css";

const ribbonPhrases = [
	"products.",
	"platforms.",
	"web applications.",
	"interfaces.",
	"design systems.",
	"API platforms.",
	"backend services.",
	"distributed systems.",
	"data architectures.",
	"automation pipelines.",
	"infrastructure.",
	"developer tooling.",
	"performance systems.",
	"scalable software.",
	"technical foundations.",
];

const techStack = [
	"JavaScript", "React", "TypeScript", "Sass", "HTML/CSS",
	"WordPress", "Elementor", "MongoDB", "Auth0",
	"Figma", "Adobe XD", "Articulate 360",
	"PowerPoint", "Excel",
];

const projects = [
	{
		id: "atlas-heor",
		name: "ATLAS HEOR Tool",
		disciplines: ["UX/UI Design", "Data Visualization", "Life Sciences"],
		tenure: "Jun 2020 – May 2024",
		link: "https://www.arysana.com/atlas-platform",
		linkLabel: "View ATLAS",
		purpose:
			"A comprehensive data visualization platform for health economists at biopharmaceutical companies — built to make complex HEOR analyses accessible and client-presentable.",
		role: "Lead UX/UI designer. Owned end-to-end design: information architecture, interaction patterns, data visualization, and a scalable component system.",
		direction:
			"Clarity over cleverness. HEOR data is dense and high-stakes — the design had to earn trust through precision, consistency, and zero ambiguity.",
	},
	{
		id: "adhd-calculator",
		name: "ADHD Economic Impact Calculator",
		disciplines: ["UX/UI Design", "Health Economics", "Pharma"],
		link: "https://attentiononadhd.com/cost-calculator/",
		linkLabel: "View Live",
		purpose:
			"A public-facing interactive tool helping healthcare stakeholders understand the economic burden of ADHD — translating clinical data into personalized impact at the organization level.",
		role: "UX/UI designer. Designed the full calculator experience: input flows, results visualization, and a responsive layout serving both clinical and executive audiences.",
		direction:
			"Make hard numbers feel real. The calculator needed credibility and accessibility — not a research tool, but an advocacy instrument with unimpeachable data integrity.",
	},
];

const FeaturedProjects = () => {
	const trackRef = useRef(null);

	useEffect(() => {
		const track = trackRef.current;
		if (!track) return undefined;

		const totalWidth = track.scrollWidth / 2;
		if (!totalWidth) return undefined;

		const tween = gsap.to(track, {
			x: -totalWidth,
			duration: 35,
			ease: "none",
			repeat: -1,
			modifiers: {
				x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
			},
		});

		return () => tween.kill();
	}, []);

	return (
	<>
	<section className="aesara-section" aria-label="Enterprise work at AESARA Inc.">
		<div className="aesara-inner">
			<header className="aesara-header">
				<div className="aesara-rule" aria-hidden="true" />
				<p className="aesara-eyebrow">AESARA Inc. · Enterprise</p>
				<h2 className="aesara-heading">
					Enterprise<br />
					<span className="aesara-heading-sub">Work</span>
				</h2>
				<p className="aesara-note">
					Proprietary tools I designed at AESARA Inc. — not mine to share, but absolutely mine to be proud of.
				</p>
				<div className="aesara-stack">
					<p className="aesara-stack-label">Stack &amp; Tools</p>
					<ul className="aesara-stack-list">
						{techStack.map((tech) => (
							<li key={tech} className="aesara-stack-item">{tech}</li>
						))}
					</ul>
				</div>
			</header>

			<div className="aesara-grid">
				{projects.map((project) => (
					<article key={project.id} className="aesara-entry">
						<div className="aesara-entry-rule" aria-hidden="true" />
						<p className="aesara-entry-disciplines">
							{project.disciplines.join(" · ")}
						</p>
						<h3 className="aesara-entry-name">{project.name}</h3>
						{project.tenure && (
							<p className="aesara-entry-tenure">{project.tenure}</p>
						)}

						<div className="aesara-entry-study">
							<div className="aesara-study-field">
								<h4>Purpose</h4>
								<p>{project.purpose}</p>
							</div>
							<div className="aesara-study-field">
								<h4>My Role</h4>
								<p>{project.role}</p>
							</div>
							<div className="aesara-study-field">
								<h4>Direction</h4>
								<p>{project.direction}</p>
							</div>
						</div>

						<a
							href={project.link}
							className="aesara-entry-link"
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`${project.linkLabel} — opens in new tab`}
						>
							{project.linkLabel} →
						</a>
					</article>
				))}
			</div>
		</div>
	</section>

	<div className="aesara-ribbon" aria-hidden="true">
		<span className="aesara-ribbon-prefix">I build</span>
		<div className="aesara-ribbon-track-wrap">
			<div className="aesara-ribbon-track" ref={trackRef}>
				{[...ribbonPhrases, ...ribbonPhrases].map((phrase, i) => (
					<span
						// eslint-disable-next-line react/no-array-index-key
						key={i}
						className="aesara-ribbon-item"
					>
						{phrase}
					</span>
				))}
			</div>
		</div>
	</div>
	</>
	);
};

export default FeaturedProjects;
