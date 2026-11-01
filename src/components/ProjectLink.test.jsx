import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ProjectLink from "./ProjectLink";
afterEach(cleanup);
const project={id:"discovereats",title:"DiscoverEats"};
describe("crawlable project links",()=>{
 it("exposes canonical href and intercepts a normal click for the same-page modal",()=>{
  const onOpen=vi.fn();render(<ProjectLink project={project} onOpen={onOpen}>Learn More</ProjectLink>);
  const link=screen.getByRole('link');expect(link).toHaveAttribute('href','/expertise?project=discovereats');
  expect(fireEvent.click(link,{button:0})).toBe(false);expect(onOpen).toHaveBeenCalledWith(project);
 });
 it.each([{metaKey:true},{ctrlKey:true},{shiftKey:true},{altKey:true},{button:1}])("preserves native modified/new-tab navigation %o",options=>{
  const onOpen=vi.fn();render(<ProjectLink project={project} onOpen={onOpen}>Learn More</ProjectLink>);
  const link=screen.getByRole('link');const event=new MouseEvent('click',{bubbles:true,cancelable:true,...options});
  // Cancel default after React has handled it to avoid jsdom trying navigation.
  let prevented;document.addEventListener('click',e=>{prevented=e.defaultPrevented;e.preventDefault();},{once:true});
  fireEvent(link,event);expect(prevented).toBe(false);expect(onOpen).not.toHaveBeenCalled();
 });
 it("keeps inactive pinned layers non-interactive",()=>{
  const onOpen=vi.fn();const {container}=render(<ProjectLink project={project} onOpen={onOpen} disabled>Learn More</ProjectLink>);
  const link=container.querySelector('a');expect(link).toHaveAttribute('inert');expect(link).toHaveAttribute('tabindex','-1');fireEvent.click(link);expect(onOpen).not.toHaveBeenCalled();
 });
});
