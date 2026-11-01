import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ProjectSummaryContent from "./ProjectSummaryContent";
import pageSource from "../pages/ExpertisePage.jsx?raw";
afterEach(cleanup);
const onOpen=vi.fn();
const renderMedia=(project,title)=>project.video ? <video aria-label={title} src={project.video}/> : <img alt={title} src={project.image}/>;
describe("project summary media order",()=>{
 it.each([{image:"/real.jpg"},{video:"/real.mp4"}])("places actual media before its summary in DOM order",media=>{
  const project={id:"real",title:"Real project",description:"Summary",...media};
  const {container}=render(<ProjectSummaryContent project={project} renderMedia={renderMedia} onOpen={onOpen}/>);
  expect(container.firstElementChild).toHaveClass("proto-mobile-media");
  expect(container.lastElementChild).toHaveClass("proto-copy");
  expect(screen.getAllByRole("heading",{name:"Real project"})).toHaveLength(1);
 });
 it("keeps CodeSwxtch one real summary and action without a synthetic image or empty media target",()=>{
  const project={id:"codeswxtch",title:"CodeSwxtch",description:"Summary",visual:{type:"text-only"}};
  const {container}=render(<ProjectSummaryContent project={project} renderMedia={renderMedia} onOpen={onOpen}/>);
  expect(container.querySelector(".proto-mobile-media")).toBeNull();
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
  expect(screen.getAllByText("CodeSwxtch")).toHaveLength(1);
  fireEvent.click(screen.getByRole("button",{name:"Learn More"})); expect(onOpen).toHaveBeenCalledWith(project);
  expect(pageSource).toContain('item.visual?.type === "text-only" ? null');
  expect(pageSource).toContain('visual: { type: "text-only" }');
 });
});
