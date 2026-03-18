import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";

vi.mock("./pages/AnimatedHomePage", () => ({
	default: () => <div>Animated Home</div>,
}));

vi.mock("./pages/ExpertisePage", () => ({
	default: () => <div>Expertise</div>,
}));

vi.mock("./pages/WritingPage", () => ({
	default: () => <div>Writing</div>,
}));

vi.mock("./development/Wander", () => ({
	default: () => <div>Wander</div>,
}));

describe("App", () => {
	it("renders the app shell", () => {
		const { container } = render(<App />);
		expect(container.querySelector(".App")).toBeInTheDocument();
	});
});
