import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HISTORY_KEY = "portfolioProjectModal";
export function projectLocation(location, projectId, view = "live") {
 const params = new URLSearchParams(location.search);
 params.delete("project");
 params.delete("projectView");
 if (projectId) {
  params.set("project", projectId);
  if (view === "study") params.set("projectView", "study");
 }
 const search = params.toString();
 return { pathname: location.pathname, search: search ? `?${search}` : "", hash: location.hash };
}
export function projectHref(location, id, view = "study") {
 const next = projectLocation(location, id, view);
 return `${next.pathname}${next.search}${next.hash}`;
}

// One history entry per modal session. Project/view changes replace that entry,
// so Back dismisses and Forward reopens the latest project without extra traps.
export default function useProjectUrl(projects) {
 const location = useLocation();
 const navigate = useNavigate();
 const params = new URLSearchParams(location.search);
 const id = params.get("project");
 const project = projects.find(item => item.id === id) || null;
 const view = params.get("projectView") === "study" ? "study" : "live";
 const [retainedProject, setRetainedProject] = useState(project);
 const [unavailable, setUnavailable] = useState(false);
 const currentProject = useRef(project);
 currentProject.current = project;
 useEffect(() => {
  if (project) { setRetainedProject(project); setUnavailable(false); }
  else if (params.has("project") || params.has("projectView")) {
   setUnavailable(true);
   navigate(projectLocation(location, null), { replace: true, state: location.state });
  }
 }, [project, location.pathname, location.search, location.hash, location.state, navigate]);
 const openProject = useCallback((item) => {
  if (!projects.some(candidate => candidate.id === item.id)) return;
  setUnavailable(false);
  navigate(projectLocation(location, item.id), {
   replace: Boolean(project),
   state: project ? location.state : { ...location.state, [HISTORY_KEY]: { background: projectHref(location, null), previousState: location.state } },
  });
 }, [projects, project, location, navigate]);
 const closeProject = useCallback(() => {
  const marker = location.state?.[HISTORY_KEY];
  if (marker?.background === projectHref(location, null)) navigate(-1);
  else navigate(projectLocation(location, null), { replace: true, state: location.state });
 }, [location, navigate]);
 const setView = useCallback((nextView) => {
  if (project) navigate(projectLocation(location, project.id, nextView), { replace: true, state: location.state });
 }, [location, project, navigate]);
 const afterClose = useCallback(() => {
  // A cancelled exit must not clear a newly opened/Forward-restored project.
  if (!currentProject.current) setRetainedProject(null);
 }, []);
 return { selectedProject: project || retainedProject, isModalOpen: Boolean(project), openProject, closeProject, afterClose, view, setView, unavailable, shareHref: project ? projectHref(location, project.id) : "" };
}
