import "../styles/ExpertisePrototype.css";

const enterpriseProjects = [
	{
		id: "atlas-heor",
		disciplines: ["UX/UI Design", "Data Visualization", "Life Sciences"],
		name: "ATLAS HEOR Tool",
		tenure: "Jun 2020 – May 2024",
		link: "https://www.arysana.com/atlas-platform",
		linkLabel: "View ATLAS",
		purpose:
			"A data visualization platform for health economists at biopharmaceutical companies — built to make complex HEOR analyses and tracking accessible and client-presentable.",
		role: "Lead UX designer. Owned strategic design: information architecture, interaction patterns, data visualization, and a scalable component system.",
		direction:
			"Move fast. Our team prioritized lean and agile development. Product early, receive feedback, and iterate. Valuing clarity over complexity. HEOR data is dense and teams, cross-functional — the design had to succeed in precision, consistency, and have zero ambiguity.",
	},
	{
		id: "adhd-calculator",
		disciplines: ["UX/UI Design", "Health Economics", "Pharma"],
		name: "ADHD Economic Impact Calculator",
		link: "https://attentiononadhd.com/cost-calculator/",
		linkLabel: "View Live",
		purpose:
			"A public-facing interactive tool helping healthcare stakeholders understand the economic burden of ADHD — translating clinical data into personalized impact at the country level.",
		role: "UX/UI designer. Designed the full calculator experience: input flows, results visualization, and a responsive layout serving both clinical and executive audiences.",
		direction:
			"Make hard numbers feel real. The calculator needed credibility and accessibility — not a research tool, but an advocacy instrument with unimpeachable data integrity.",
	},
];

const EnterpriseWork = () => (
	<section
		className="enterprise-section"
		aria-label="Enterprise work at AESARA Inc."
	>
		<div className="enterprise-shell">
			<header className="enterprise-intro">
				<div className="enterprise-rule" aria-hidden="true" />
				<p className="enterprise-eyebrow">AESARA Inc. · Enterprise</p>
				<h2 className="enterprise-heading">
					Enterprise
					<br />
					<span className="enterprise-heading-sub">Work</span>
				</h2>
				<p className="enterprise-note">
					Proprietary tools I designed at AESARA Inc. — not mine, but absolutely
					mine to be proud of.
				</p>
				<div className="enterprise-stack">
					<p className="enterprise-stack-label">Why it matters</p>
					<p className="enterprise-stack-copy">
						The work had to handle dense data, layered stakeholder needs, and
						the kind of rigor that makes a platform feel trustworthy.
					</p>
				</div>
			</header>

			<div className="enterprise-grid">
				{enterpriseProjects.map((project) => (
					<article key={project.id} className="enterprise-card">
						<div className="enterprise-card-rule" aria-hidden="true" />
						<p className="enterprise-card-disciplines">
							{project.disciplines.join(" · ")}
						</p>
						<h3 className="enterprise-card-name">{project.name}</h3>
						{project.tenure && (
							<p className="enterprise-card-tenure">{project.tenure}</p>
						)}

						<div className="enterprise-card-study">
							<div className="enterprise-study-field">
								<h4>Purpose</h4>
								<p>{project.purpose}</p>
							</div>
							<div className="enterprise-study-field">
								<h4>My Role</h4>
								<p>{project.role}</p>
							</div>
							<div className="enterprise-study-field">
								<h4>Direction</h4>
								<p>{project.direction}</p>
							</div>
						</div>

						<a
							href={project.link}
							className="enterprise-card-link"
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
);

export default EnterpriseWork;
