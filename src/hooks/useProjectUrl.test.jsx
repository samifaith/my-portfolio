import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate, useLocation } from "react-router-dom";
import useProjectUrl from "./useProjectUrl";
afterEach(cleanup);
const projects = [{id:"discovereats", title:"DiscoverEats"}, {id:"atlas-heor", title:"ATLAS"}];
function Harness({ router }) {
 const modal = useProjectUrl(projects);
 const location = useLocation();
 router.navigate = useNavigate();
 router.state = { location };
 return <><output data-testid="url">{location.pathname}{location.search}{location.hash}</output><output data-testid="project">{modal.isModalOpen ? modal.selectedProject.id : "closed"}</output><output data-testid="retained">{modal.selectedProject?.id}</output><output data-testid="view">{modal.view}</output><output data-testid="notice">{String(modal.unavailable)}</output><a href={modal.shareHref}>Share</a>{projects.map(p=><button key={p.id} onClick={()=>modal.openProject(p)}>{p.title}</button>)}<button onClick={modal.closeProject}>Close</button><button onClick={modal.afterClose}>Exit finished</button><button onClick={()=>modal.setView("study")}>Study</button><button onClick={()=>modal.setView("live")}>Live</button></>;
}
function setup(entry="/expertise") {
 const router = {};
 const result=render(<MemoryRouter initialEntries={[entry]}><Harness router={router}/></MemoryRouter>);
 return {router,...result};
}
const current=()=>screen.getByTestId("project").textContent;
describe("shareable project history",()=>{
 it("opens direct case-study entry and closes without leaving the portfolio or losing unrelated URL state", async()=>{
  setup("/expertise?utm_source=friend&project=discovereats&projectView=study#selected");
  expect(current()).toBe("discovereats"); expect(screen.getByTestId("view")).toHaveTextContent("study");
  fireEvent.click(screen.getByText("Close"));
  await waitFor(()=>expect(current()).toBe("closed"));
  expect(screen.getByTestId("url")).toHaveTextContent("/expertise?utm_source=friend#selected");
 });
 it("supports repeated open, Back, Forward and close cycles without stale exit callbacks",async()=>{
  const {router}=setup("/expertise?filter=work#selected");
  for(let i=0;i<3;i++){
   fireEvent.click(screen.getByText("DiscoverEats")); expect(current()).toBe("discovereats");
   await act(()=>router.navigate(-1)); expect(current()).toBe("closed");
   await act(()=>router.navigate(1)); expect(current()).toBe("discovereats");
   fireEvent.click(screen.getByText("Exit finished")); expect(current()).toBe("discovereats");
   fireEvent.click(screen.getByText("Close"));
   await waitFor(()=>expect(current()).toBe("closed"));
   expect(screen.getByTestId("url")).toHaveTextContent("/expertise?filter=work#selected");
   fireEvent.click(screen.getByText("Exit finished")); expect(screen.getByTestId("retained")).toBeEmptyDOMElement();
  }
 });
 it("replaces project/view within one modal history entry and Forward restores latest selection",async()=>{
  const {router}=setup();
  fireEvent.click(screen.getByText("DiscoverEats"));
  fireEvent.click(screen.getByText("Study")); expect(screen.getByTestId("url")).toHaveTextContent("projectView=study");
  fireEvent.click(screen.getByText("ATLAS")); expect(current()).toBe("atlas-heor");
  await act(()=>router.navigate(-1)); expect(current()).toBe("closed");
  await act(()=>router.navigate(1)); expect(current()).toBe("atlas-heor");
  expect(screen.getByText("Share")).toHaveAttribute("href","/expertise?project=atlas-heor&projectView=study");
 });
 it.each(["missing", "pocketplay", "vote", "", "<script>"])("rejects unavailable id %s without exposing hidden projects",async(id)=>{
  setup(`/expertise?keep=yes&project=${encodeURIComponent(id)}&projectView=study#work`);
  await waitFor(()=>expect(screen.getByTestId("url")).toHaveTextContent("/expertise?keep=yes#work"));
  expect(current()).toBe("closed"); expect(screen.getByTestId("notice")).toHaveTextContent("true");
 });
 it("reloads a copied permalink with no prior history, preserving view",()=>{
  const first=setup("/expertise?keep=yes");
  fireEvent.click(screen.getByText("DiscoverEats"));
  const href=screen.getByText("Share").getAttribute("href"); first.unmount();
  setup(href); expect(current()).toBe("discovereats"); expect(screen.getByTestId("view")).toHaveTextContent("study");
  fireEvent.click(screen.getByText("Close")); expect(current()).toBe("closed");
 });
 it("preserves external history state while changing view",()=>{
  const {router}=setup({pathname:"/expertise",search:"?project=discovereats",state:{campaign:"existing"}});
  fireEvent.click(screen.getByText("Study")); expect(router.state.location.state).toEqual({campaign:"existing"});
  fireEvent.click(screen.getByText("Live")); expect(screen.getByTestId("view")).toHaveTextContent("live");
 });
});
