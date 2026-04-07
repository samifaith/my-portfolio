import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { getModernImageSources } from "../utils/imageFormats";
import stories from "../constants/WritingPieces";
import caseStudies from "../constants/CaseStudies";
import WanderlustCaseStudyContent from "./WanderlustCaseStudyContent";

const PageLayout = ({
	title,
	description,
	children,
	backLink = "/",
	backText = "Back to Portfolio",
	isStoryPage = false,
	showModal = false,
	selectedProject = null,
	onCloseModal = () => {},
	onPreviousProject = null,
	onNextProject = null,
	hasPreviousProject = false,
	hasNextProject = false,
}) => {
	const selectedImageSources = selectedProject?.image
		? getModernImageSources(selectedProject.image)
		: null;
	const modalStoryId = selectedProject?.storyId || null;
	const modalStory =
		modalStoryId && stories[modalStoryId] ? stories[modalStoryId] : null;
	const modalCaseStudyId = selectedProject?.caseStudyId || null;
	const modalCaseStudy =
		modalCaseStudyId && caseStudies[modalCaseStudyId]
			? caseStudies[modalCaseStudyId]
			: null;
	const isClosableModal = showModal && selectedProject;

	useEffect(() => {
		if (!isClosableModal) {
			return;
		}

		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				onCloseModal();
				return;
			}

			if (
				event.key === "ArrowLeft" &&
				hasPreviousProject &&
				onPreviousProject
			) {
				onPreviousProject();
				return;
			}

			if (event.key === "ArrowRight" && hasNextProject && onNextProject) {
				onNextProject();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [
		hasNextProject,
		hasPreviousProject,
		isClosableModal,
		onCloseModal,
		onNextProject,
		onPreviousProject,
	]);

	return (
		<div className="min-h-screen bg-gray-50">
			{!isStoryPage && (
				<header className="bg-white shadow-sm p-6">
					<div className="max-w-6xl mx-auto flex items-center justify-between">
						<Link
							to={backLink}
							className="flex items-center space-x-2 text-gray-600"
						>
							<ArrowLeft className="w-5 h-5" />
							<span>{backText}</span>
						</Link>
						<h1
							className="text-3xl font-bold"
							style={{
								color: "#a2003b",
								fontFamily: "Impact, Poppins, sans-serif",
							}}
						>
							{title}
						</h1>
					</div>
				</header>
			)}

			<main className={`max-w-6xl mx-auto p-6 ${isStoryPage ? "py-12" : ""}`}>
				{isStoryPage && (
					<Link
						to={backLink}
						className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8"
					>
						<ArrowLeft className="w-4 h-4" />
						<span>{backText}</span>
					</Link>
				)}

				{description && !isStoryPage && (
					<div className="mb-8">
						<p className="text-lg text-gray-700 leading-relaxed">
							{description}
						</p>
					</div>
				)}

				{children}
			</main>

			{isClosableModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg w-full max-w-6xl max-h-full overflow-auto">
						<div className="p-8">
							<div className="flex items-center justify-between mb-4">
								<button
									onClick={onPreviousProject}
									className="text-gray-600 disabled:text-gray-300"
									disabled={!hasPreviousProject || !onPreviousProject}
									aria-label="Previous project"
								>
									<ChevronLeft className="w-6 h-6" />
								</button>
								<button
									onClick={onNextProject}
									className="text-gray-600 disabled:text-gray-300"
									disabled={!hasNextProject || !onNextProject}
									aria-label="Next project"
								>
									<ChevronRight className="w-6 h-6" />
								</button>
							</div>

							<div className="flex justify-between items-start mb-6">
								<div className="flex-1">
									<h2 className="text-3xl font-bold text-gray-800 mb-2">
										{selectedProject.title}
									</h2>
									<p className="text-gray-600">{selectedProject.type}</p>
								</div>
								<button
									onClick={onCloseModal}
									className="text-gray-400 ml-4"
									aria-label="Close modal"
								>
									✕
								</button>
							</div>

							{modalStory ? (
								<article>
									<p className="text-gray-600 mb-6">{modalStory.subtitle}</p>

									{modalStory.audioFile && (
										<div className="mb-6">
											<audio controls preload="metadata" className="w-full">
												<source src={modalStory.audioFile} type="audio/mpeg" />
												<source src={modalStory.audioFile} type="audio/mp3" />
												Your browser does not support the audio element.
											</audio>
										</div>
									)}

									{modalStory.pdfFile && (
										<section className="mb-6" aria-label="Article PDF viewer">
											<iframe
												src={`${modalStory.pdfFile}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
												title={`${modalStory.title} PDF viewer`}
												className="w-full h-[70vh] rounded-lg border border-gray-200"
												loading="lazy"
											/>
										</section>
									)}

									<div className="prose prose-lg max-w-none whitespace-pre-line text-gray-700">
										{modalStory.content}
									</div>
								</article>
							) : modalCaseStudy ? (
								<WanderlustCaseStudyContent caseStudy={modalCaseStudy} />
							) : selectedImageSources ? (
								<picture>
									<source
										srcSet={selectedImageSources.avif}
										type="image/avif"
									/>
									<source
										srcSet={selectedImageSources.webp}
										type="image/webp"
									/>
									<img
										src={selectedImageSources.fallback}
										alt={selectedProject.title}
										className="w-full max-h-96 object-contain mb-4"
										loading="lazy"
										decoding="async"
									/>
								</picture>
							) : null}

							{!modalStory && !modalCaseStudy && selectedProject.video && (
								<video
									src={selectedProject.video}
									className="w-full max-h-96 object-contain mb-4"
									controls
									playsInline
								/>
							)}

							{!modalStory && !modalCaseStudy && (
								<p className="text-gray-700">{selectedProject.description}</p>
							)}

							{!modalStory &&
								!modalCaseStudy &&
								Array.isArray(selectedProject.modalHighlights) &&
								selectedProject.modalHighlights.length > 0 && (
									<ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700">
										{selectedProject.modalHighlights.map((item) => (
											<li key={item}>{item}</li>
										))}
									</ul>
								)}

							{!modalStory &&
								!modalCaseStudy &&
								Array.isArray(selectedProject.modalTech) &&
								selectedProject.modalTech.length > 0 && (
									<p className="mt-4 text-sm text-gray-600">
										<span className="font-semibold text-gray-700">Tools:</span>{" "}
										{selectedProject.modalTech.join(" • ")}
									</p>
								)}

							{selectedProject.externalUrl && (
								<div className="mt-6">
									<a
										href={selectedProject.externalUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
									>
										Visit live website
									</a>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PageLayout;
