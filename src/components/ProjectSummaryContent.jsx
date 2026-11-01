import ProjectLink from "./ProjectLink";
import PublicProjectLink from "./PublicProjectLink";

// Source order matches the mobile reading order; desktop uses its pinned media.
const ProjectSummaryContent = ({ project, renderMedia, onOpen }) => <>
 {Boolean(project.image || project.video) && <div className="proto-mobile-media">{renderMedia(project, project.title, {imgClassName: "proto-mobile-media-item"})}</div>}
 <div className="proto-copy">
  <p className="proto-label">{project.label}</p>
  <h2>{project.title}</h2>
  <p>{project.description}</p>
  {project.tools?.length > 0 && <div className="proto-tool-list">{project.tools.map(tool => <span key={tool} className="proto-tool-tag">{tool}</span>)}</div>}
  <ProjectLink project={project} onOpen={onOpen} className="proto-cta">Learn More</ProjectLink>
  {project.visual?.type === "public-link" && <PublicProjectLink project={project} className="proto-public-link--mobile" />}
 </div>
</>;
export default ProjectSummaryContent;
