const PublicProjectLink = ({ project, className = "", tabIndex }) => (
	<a
		className={`proto-public-link ${className}`}
		href={project.route}
		target="_blank"
		rel="noopener noreferrer"
		tabIndex={tabIndex}
		aria-label={`View ${project.title} on its public website (opens in a new tab)`}
	>
		<span>View public product site <span aria-hidden="true">↗</span></span>
		<small>{new URL(project.route).hostname.replace(/^www\./, "")}</small>
	</a>
);

export default PublicProjectLink;
