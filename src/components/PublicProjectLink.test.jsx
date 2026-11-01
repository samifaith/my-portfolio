import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import PublicProjectLink from "./PublicProjectLink";

afterEach(cleanup);

describe("public product links", () => {
	it.each([
		["ATLAS HEOR Platform", "https://www.arysana.com/atlas-platform", "arysana.com"],
		["ADHD Economic Impact Calculator", "https://attentiononadhd.com/cost-calculator/", "attentiononadhd.com"],
	])("links %s to its public product without repeating its summary", (title, route, host) => {
		render(<PublicProjectLink project={{ title, route, description: "Project summary" }} />);
		const link = screen.getByRole("link", { name: `View ${title} on its public website (opens in a new tab)` });
		expect(link).toHaveAttribute("href", route);
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noopener noreferrer");
		expect(screen.getByText(host)).toBeVisible();
		expect(screen.queryByText("Project summary")).not.toBeInTheDocument();
		expect(screen.queryByRole("heading")).not.toBeInTheDocument();
	});

	it("removes an inactive media-layer link from sequential keyboard navigation", () => {
		render(<PublicProjectLink project={{ title: "ATLAS", route: "https://www.arysana.com/atlas-platform" }} tabIndex={-1} />);
		expect(screen.getByRole("link")).toHaveAttribute("tabindex", "-1");
	});
});
