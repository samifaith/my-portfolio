import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { SITE_ORIGIN, projectMetadata, routeMetadata, getMetadata } from "./catalog.mjs";

describe("SEO metadata catalog", () => {
 it("covers exactly visible projects, never hidden vote or PocketPlay", () => {
  const source = readFileSync(join(process.cwd(), "src/pages/ExpertisePage.jsx"), "utf8");
  const ids = [...source.matchAll(/\bid: "([^"]+)"/g)].map(match => match[1]).filter(id => !["vote", "pocketplay"].includes(id));
  expect(Object.keys(projectMetadata).sort()).toEqual(ids.sort());
  for (const id of ["vote", "pocketplay", "missing", "__proto__", "constructor"]) {
   expect(getMetadata("/expertise", `?project=${id}`)).toBe(routeMetadata["/expertise"]);
  }
 });
 it("uses absolute canonicals and existing, appropriate public image files", () => {
  for (const entry of [...Object.values(routeMetadata), ...Object.values(projectMetadata)]) {
   expect(entry.canonical.startsWith(SITE_ORIGIN)).toBe(true);
   expect(entry.image.startsWith(`${SITE_ORIGIN}/`)).toBe(true);
   expect(existsSync(join(process.cwd(), "public", new URL(entry.image).pathname))).toBe(true);
   expect(entry.title.length).toBeGreaterThan(15);
   expect(entry.description.length).toBeGreaterThan(50);
   expect(entry.imageAlt.length).toBeGreaterThan(15);
  }
  expect(projectMetadata["atlas-heor"].imageAlt).toMatch(/portrait/);
  expect(projectMetadata.codeswxtch.imageAlt).toMatch(/portrait/);
  expect(projectMetadata["adhd-calculator"].description).toMatch(/aggregated across 12 countries/);
 });
 it("does not create duplicates for live/study or tracking variations", () => {
  for (const id of Object.keys(projectMetadata)) {
   for (const suffix of ["", "&projectView=study", "&projectView=live&utm_source=share", "&ref=email"]) {
    expect(getMetadata("/expertise", `?project=${id}${suffix}`)).toBe(projectMetadata[id]);
   }
   expect(projectMetadata[id].canonical).not.toMatch(/projectView|utm_|ref=|#/);
  }
 });
 it("provides unique titles and descriptions per canonical resource", () => {
  const byCanonical = new Map([...Object.values(routeMetadata), ...Object.values(projectMetadata)].map(meta => [meta.canonical, meta]));
  expect(new Set([...byCanonical.values()].map(meta => meta.title)).size).toBe(byCanonical.size);
  expect(new Set([...byCanonical.values()].map(meta => meta.description)).size).toBe(byCanonical.size);
 });
 it("retains legitimate archives and consolidates their duplicate modal/legacy URLs", () => {
  for (const id of ["eat-like-child", "home-cook", "tea-with-sami"]) {
   const archived = routeMetadata[`/expertise-archived/${id}`];
   expect(projectMetadata[id]).toBe(archived);
   expect(getMetadata(`/writing/${id}`, "?utm_source=old")).toBe(archived);
  }
  expect(getMetadata("/writing")).toBe(routeMetadata["/expertise-archived"]);
  expect(getMetadata("/expertise-prototype")).toBe(routeMetadata["/expertise"]);
  expect(getMetadata("/wanderlust-case-study/")).toBe(routeMetadata["/wanderlust-case-study"]);
 });
 it("does not pretend unknown pages are the homepage", () => {
  expect(getMetadata("/not-a-page")).toBeNull();
  expect(getMetadata("/writing/unknown")).toBeNull();
  expect(getMetadata("/", "?utm_source=friend")).toBe(routeMetadata["/"]);
 });
});
