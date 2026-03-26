import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import App from "./App";

vi.mock("./pages/AnimatedHomePage", () => ({
	default: () => <div>Animated Home</div>,
}));

vi.mock("./pages/ExpertisePage", () => ({
	default: () => <div>Expertise</div>,
}));

vi.mock("./pages/WritingPage", () => ({
	default: () => {
		const location = useLocation();
		return <div>Writing route: {location.pathname}</div>;
	},
}));

vi.mock("./development/Wander", () => ({
	default: () => <div>Wander</div>,
}));

describe("App", () => {
	it("renders the app shell", () => {
		const { container } = render(<App />);
		expect(container.querySelector(".App")).toBeInTheDocument();
	});

	it("redirects legacy writing article routes to expertise article routes", () => {
		window.history.pushState({}, "", "/writing/home-cook");
		render(<App />);

		expect(window.location.pathname).toBe("/expertise/home-cook");
		expect(
			screen.getByText("Writing route: /expertise/home-cook"),
		).toBeInTheDocument();
	});
});
