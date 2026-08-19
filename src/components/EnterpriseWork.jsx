import "../styles/ExpertisePrototype.css";

const enterpriseProjects = [
	{
		id: "atlas-heor",
		disciplines: ["UX/UI Design", "Data Visualization", "Life Sciences"],
		name: "ATLAS HEOR Tool",
		tenure: "Jun 2020 – May 2024",
		link: "https://www.arysana.com/atlas-platform",
		linkLabel: "View ATLAS",
		context:
			"ATLAS is an AESARA-owned enterprise platform for health economics and outcomes research teams. This portfolio entry reflects my contributions while working at AESARA, not ownership of the product.",
		contribution:
			"Contributed UX and front-end work across information architecture, interaction patterns, data visualization, and reusable interface patterns within the larger product and engineering team.",
		approach:
			"Worked within a lean, iterative product environment where complex HEOR workflows had to become clear, consistent, and trustworthy for cross-functional users.",
	},
	{
		id: "adhd-calculator",
		disciplines: ["UX/UI Design", "Health Economics", "Responsive Design"],
		name: "ADHD Economic Impact Calculator",
		link: "https://attentiononadhd.com/cost-calculator/",
		linkLabel: "View Live",
		context:
			"A client-facing calculator delivered through AESARA to help healthcare stakeholders explore the economic burden of ADHD. This entry reflects my contribution as part of the AESARA team.",
		contribution:
			"Contributed to UX/UI design for the calculator experience, including input flows, results presentation, responsive behavior, and translating complex economic information into a more approachable interface.",
		approach:
			"Balanced clarity, accessibility, credibility, and data integrity so the experience could serve both specialist and executive audiences without reading like a research spreadsheet.",
	},
];

const EnterpriseWork = () => (
	<section
		className="enterprise-section"
		aria-label="Selected professional contributions at AESARA Inc."
	>
		<div className="enterprise-shell">
			<header className="enterprise-intro">
				<div className="enterprise-rule" aria-hidden="true" />
				<p className="enterprise-eyebrow">AESARA Inc. · Professional Work</p>
				<h2 className="enterprise-heading">
					Selected
					<br />
					<span className="enterprise-heading-sub">Contributions</span>
				</h2>
				<p className="enterprise-note">
					The products below were owned by AESARA and its clients. I am showing
					selected areas I contributed to while working as part of those teams.
				</p>
				<div className="enterprise-stack">
					<p className="enterprise-stack-label">Why it matters</p>
					<p className="enterprise-stack-copy">
						This work required translating dense information, layered stakeholder
						needs, and regulated-domain complexity into interfaces people could
						understand and trust.
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
								<h4>Context</h4>
								<p>{project.context}</p>
							</div>
							<div className="enterprise-study-field">
								<h4>My Contribution</h4>
								<p>{project.contribution}</p>
							</div>
							<div className="enterprise-study-field">
								<h4>Approach</h4>
								<p>{project.approach}</p>
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
