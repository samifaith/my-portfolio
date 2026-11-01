import source from "./FeaturedProjects.jsx?raw";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import FeaturedProjects, { SHOW_CONSULTING_APPROACH } from "./FeaturedProjects";
vi.mock("gsap", () => ({ gsap: { registerPlugin: vi.fn(), to: () => ({kill: vi.fn()}) } }));
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: { create: () => ({kill: vi.fn()}) } }));
afterEach(cleanup);
describe("optional consulting approach", () => {
 it("is disabled and absent from rendered content", () => {
  const {container} = render(<FeaturedProjects />);
  expect(SHOW_CONSULTING_APPROACH).toBe(false);
  expect(screen.queryByText("How I work")).not.toBeInTheDocument();
  expect(container.querySelector(".featured-approach")).not.toBeInTheDocument();
  expect(screen.getByRole("heading",{name:"Architecture"})).toBeVisible();
 });
 it("preserves all original section code and copy for re-enablement", () => {
  expect(source).toContain('SHOW_CONSULTING_APPROACH && <section className="featured-approach"');
  for (const text of ["How I work", "Audit → Architect → Build → Validate → Enable", "I want to leave every product and team better than I found them", "Understand the workflow, constraints", "Define front-end boundaries", "Implement the critical paths", "Check keyboard access, motion", "Leave clear components, documentation"]) expect(source).toContain(text);
 });
});
