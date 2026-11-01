import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import CaseStudyNarrative from "./CaseStudyNarrative";
import { getModernImageSources } from "../utils/imageFormats";
import narratives from "../constants/CaseStudyNarratives.json";
afterEach(cleanup);

describe("evidence-led case studies", () => {
 it("does not request nonexistent alternate formats for original screenshots", () => {
  expect(getModernImageSources("/case-studies/discovereats-dark-mode.jpg")).toEqual({avif: null, webp: null, fallback: "/case-studies/discovereats-dark-mode.jpg"});
 });
 it("keeps DiscoverEats desktop-first limits and the live-view action", () => {
  const onExplore = vi.fn();
  render(<CaseStudyNarrative projectId="discovereats" onExplore={onExplore} />);
  expect(screen.getByText(/A complete small-screen experience/)).toBeVisible();
  expect(screen.getByRole("img")).toHaveAttribute("src", "/case-studies/discovereats-dark-mode.jpg");
  fireEvent.click(screen.getByRole("button", {name: "Explore the globe"}));
  expect(onExplore).toHaveBeenCalledOnce();
 });
 it("labels ADHD captures as aggregate demonstration states, not outcomes", () => {
  render(<CaseStudyNarrative projectId="adhd-calculator" />);
  expect(screen.getAllByRole("img")).toHaveLength(2);
  expect(screen.getByText(/hypothetical 50% setting/)).toBeVisible();
  expect(screen.getByText(/not ownership of the economic methodology/)).toBeVisible();
  for (const image of screen.getAllByRole("img")) expect(image.closest("a")).toHaveAttribute("rel", "noopener noreferrer");
 });
 it.each(["atlas-heor", "codeswxtch"])("does not invent an application screenshot for %s", id => {
  render(<CaseStudyNarrative projectId={id} />);
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
  expect(screen.getAllByRole("heading").length).toBeGreaterThan(3);
 });
 it("excludes editorial notes and unverified corrected scores from published data", () => {
  for (const entry of Object.values(narratives)) {
   expect(Object.keys(entry).sort()).toEqual(["meta", "sections", "subtitle", "title"]);
  }
  expect(JSON.stringify(narratives)).not.toMatch(/scored in the 90s|personalized, country-level/);
  expect(JSON.stringify(narratives.codeswxtch)).toMatch(/Calibration is ongoing/);
 });
});
