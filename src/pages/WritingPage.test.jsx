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
				<Route path="/writing/:storyId" element={<WritingPage />} />
			</Routes>
		</MemoryRouter>,
	);

describe("WritingPage story detail", () => {
	it("renders one PDF viewer and story text for the home cook article", () => {
		renderStoryRoute("/writing/home-cook");

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

	it("does not render a PDF viewer for stories without a pdf file", () => {
		renderStoryRoute("/writing/eat-like-child");
		expect(screen.queryByTitle(/pdf viewer/i)).not.toBeInTheDocument();
	});
});
