import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import WritingPage from "./WritingPage";

afterEach(() => {
	cleanup();
});

const renderStoryRoute = (initialPath) =>
	render(
		<MemoryRouter initialEntries={[initialPath]}>
			<Routes>
				<Route path="/expertise-archived/:storyId" element={<WritingPage />} />
			</Routes>
		</MemoryRouter>,
	);

describe("WritingPage story detail", () => {
	it("renders one PDF viewer and story text for the home cook article", () => {
		renderStoryRoute("/expertise-archived/home-cook");

		expect(
			screen.queryByRole("img", {
				name: /the rise of the home cook: arielle faria cover image/i,
			}),
		).not.toBeInTheDocument();

		const pdfViewer = screen.getByTitle(/pdf viewer/i);
		expect(pdfViewer).toHaveAttribute(
			"src",
			expect.stringContaining(
				"/writing/Oui Chef - Faria.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH",
			),
		);

		expect(
			screen.getByText(/"Who made the mac & cheese\?"/i),
		).toBeInTheDocument();
	});

	it("renders one PDF viewer and story text for eat-like-child after merging manger assets", () => {
		renderStoryRoute("/expertise-archived/eat-like-child");

		const pdfViewer = screen.getByTitle(/eat like a child pdf viewer/i);
		expect(pdfViewer).toHaveAttribute(
			"src",
			expect.stringContaining(
				"/writing/manger.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH",
			),
		);

		expect(
			screen.queryByRole("img", {
				name: /eat like a child cover image/i,
			}),
		).not.toBeInTheDocument();

		expect(screen.getByText(/"Again\?!"/i)).toBeInTheDocument();
	});

	it("renders Tea with Sami GIF cover and MUI audio player on the article page", () => {
		renderStoryRoute("/expertise-archived/tea-with-sami");

		expect(
			screen.getByRole("link", { name: /back to expertise/i }),
		).toHaveAttribute("href", "/expertise-archived");

		expect(
			screen.getByRole("img", {
				name: /tea with sami: revenge served hot! cover image/i,
			}),
		).toBeInTheDocument();

		expect(
			screen.getByLabelText(/tea with sami: revenge served hot! audio player/i),
		).toBeInTheDocument();
	});
});
