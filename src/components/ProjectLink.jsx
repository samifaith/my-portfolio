import { projectMetadata, SITE_ORIGIN } from "../seo/catalog.mjs";

export function projectLinkHref(project) {
 const canonical=projectMetadata[project.id]?.canonical;
 return canonical ? canonical.replace(SITE_ORIGIN,"") : `/expertise?project=${encodeURIComponent(project.id)}`;
}
export function isPlainLinkClick(event) {
 return !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.altKey && !event.shiftKey && (!event.currentTarget.target || event.currentTarget.target === "_self");
}
export default function ProjectLink({project,onOpen,children,disabled=false,...props}) {
 return <a {...props} href={projectLinkHref(project)} aria-hidden={disabled ? true : undefined} tabIndex={disabled ? -1 : props.tabIndex} inert={disabled ? true : undefined} onClick={event=>{
  if (disabled) {event.preventDefault();return;}
  if (isPlainLinkClick(event)) {event.preventDefault();onOpen(project);}
 }}>{children}</a>;
}
