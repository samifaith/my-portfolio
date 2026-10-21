import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ProjectCaseStudyModal from "./ProjectCaseStudyModal";

vi.mock("gsap", () => ({
	gsap: {
		set: vi.fn(),
		killTweensOf: vi.fn(),
		timeline: () => { const timeline = { to: () => timeline }; return timeline; },
	},
}));

afterEach(cleanup);
const project = { id: "discovereats", title: "DiscoverEats", label: "Development" };
const props = { project, isOpen: true, onClose: vi.fn(), hasNext: true, hasPrev: false };

describe("live project viewer", () => {
	it("keeps the same live frame mounted while visitors read and return to the case study", () => {
		render(<ProjectCaseStudyModal {...props} onNext={vi.fn()} />);
		const frame = screen.getByTitle("DiscoverEats live project");
		expect(frame).toBeVisible();
		expect(frame).toHaveAttribute("src", "https://discovereats.samoncanvas.com");
		fireEvent.click(screen.getByRole("button", { name: "Case study", exact: true }));
		expect(frame).not.toBeVisible();
		fireEvent.click(screen.getAllByRole("button", { name: "Explore the globe" })[0]);
		expect(screen.getByTitle("DiscoverEats live project")).toBe(frame);
		expect(frame).toBeVisible();
		expect(screen.getByRole("button", { name: "Live project", exact: true })).toHaveFocus();
	});

	it("leaves arrow keys in controls without navigating to another project", () => {
		const onNext = vi.fn();
		render(<ProjectCaseStudyModal {...props} onNext={onNext} />);
		fireEvent.keyDown(screen.getByRole("button", { name: "Case study", exact: true }), { key: "ArrowRight" });
		expect(onNext).not.toHaveBeenCalled();
		fireEvent.click(screen.getByRole("button", { name: "Next project" }));
		expect(onNext).toHaveBeenCalledOnce();
	});
});
