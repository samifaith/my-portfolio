import React, { useEffect, useId, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { getModernImageSources } from "../utils/imageFormats";

const FOCUSABLE_SELECTOR =
	'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

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
	renderModalContent = null,
	isModalContentLoading = false,
}) => {
	const selectedImageSources = selectedProject?.image
		? getModernImageSources(selectedProject.image)
		: null;
	const isClosableModal = showModal && selectedProject;
	const dialogTitleId = useId();
	const modalContainerRef = useRef(null);
	const closeButtonRef = useRef(null);
	const lastFocusedElementRef = useRef(null);
	const customModalContent =
		selectedProject && typeof renderModalContent === "function"
			? renderModalContent(selectedProject)
			: null;

	useEffect(() => {
		if (!isClosableModal) {
			return;
		}

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		lastFocusedElementRef.current =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;

		requestAnimationFrame(() => {
			if (closeButtonRef.current) {
				closeButtonRef.current.focus();
				return;
			}

			if (modalContainerRef.current) {
				modalContainerRef.current.focus();
			}
		});

		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				onCloseModal();
				return;
			}

			if (event.key === "Tab") {
				const modalElement = modalContainerRef.current;
				if (!modalElement) {
					return;
				}

				const focusableElements = Array.from(
					modalElement.querySelectorAll(FOCUSABLE_SELECTOR),
				).filter((element) => element.getClientRects().length > 0);

				if (focusableElements.length === 0) {
					event.preventDefault();
					modalElement.focus();
					return;
				}

				const firstElement = focusableElements[0];
				const lastElement = focusableElements[focusableElements.length - 1];
				const activeElement = document.activeElement;

				if (event.shiftKey) {
					if (
						activeElement === firstElement ||
						!modalElement.contains(activeElement)
					) {
						event.preventDefault();
						lastElement.focus();
					}
					return;
				}

				if (
					activeElement === lastElement ||
					!modalElement.contains(activeElement)
				) {
					event.preventDefault();
					firstElement.focus();
				}
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
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", handleKeyDown);
			if (lastFocusedElementRef.current) {
				lastFocusedElementRef.current.focus();
			}
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
		<div className="min-h-screen bg-gray-50 mt-14">
			<main className={`max-w-6xl mx-auto p-4 ${isStoryPage ? "py-8" : ""}`}>
				{isStoryPage && (
					<Link
						to={backLink}
						className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
					>
						<ArrowLeft className="w-4 h-4" />
						<span>{backText}</span>
					</Link>
				)}

				{description && !isStoryPage && (
					<div className="mb-6">
						<p className="text-lg text-gray-700 leading-relaxed">
							{description}
						</p>
					</div>
				)}

				{children}
			</main>

			{isClosableModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[130] p-4">
					<div
						ref={modalContainerRef}
						role="dialog"
						aria-modal="true"
						aria-labelledby={dialogTitleId}
						tabIndex={-1}
						className="bg-white rounded-lg w-full max-w-6xl max-h-full overflow-auto"
					>
						<div className="p-8">
							<div className="flex items-center justify-between mb-4">
								<IconButton
									onClick={onPreviousProject}
									disabled={!hasPreviousProject || !onPreviousProject}
									aria-label="Previous project"
									size="small"
									sx={{ color: "#4b5563" }}
								>
									<ChevronLeft className="w-6 h-6" />
								</IconButton>
								<IconButton
									onClick={onNextProject}
									disabled={!hasNextProject || !onNextProject}
									aria-label="Next project"
									size="small"
									sx={{ color: "#4b5563" }}
								>
									<ChevronRight className="w-6 h-6" />
								</IconButton>
							</div>

							<div className="flex justify-between items-start mb-6">
								<div className="flex-1">
									<h2
										id={dialogTitleId}
										className="text-3xl font-bold text-gray-800 mb-2"
									>
										{selectedProject.title}
									</h2>
									<p className="text-gray-600">{selectedProject.type}</p>
								</div>
								<IconButton
									ref={closeButtonRef}
									onClick={onCloseModal}
									aria-label="Close modal"
									size="small"
									sx={{ ml: 1, color: "#9ca3af" }}
								>
									✕
								</IconButton>
							</div>

							{customModalContent ? (
								customModalContent
							) : isModalContentLoading ? (
								<p className="text-gray-600">Loading content...</p>
							) : selectedImageSources ? (
								<picture>
									{selectedImageSources.avif && (
										<source
											srcSet={selectedImageSources.avif}
											type="image/avif"
										/>
									)}
									{selectedImageSources.webp && (
										<source
											srcSet={selectedImageSources.webp}
											type="image/webp"
										/>
									)}
									<img
										src={selectedImageSources.fallback}
										alt={selectedProject.title}
										className="w-full max-h-96 object-contain mb-4"
										loading="lazy"
										decoding="async"
									/>
								</picture>
							) : null}

							{!customModalContent && selectedProject.video && (
								<video
									src={selectedProject.video}
									className="w-full max-h-96 object-contain mb-4"
									controls
									playsInline
								/>
							)}

							{!customModalContent && (
								<p className="text-gray-700">{selectedProject.description}</p>
							)}

							{!customModalContent &&
								Array.isArray(selectedProject.modalHighlights) &&
								selectedProject.modalHighlights.length > 0 && (
									<ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700">
										{selectedProject.modalHighlights.map((item) => (
											<li key={item}>{item}</li>
										))}
									</ul>
								)}

							{!customModalContent &&
								Array.isArray(selectedProject.modalTech) &&
								selectedProject.modalTech.length > 0 && (
									<p className="mt-4 text-sm text-gray-600">
										<span className="font-semibold text-gray-700">Tools:</span>{" "}
										{selectedProject.modalTech.join(" • ")}
									</p>
								)}

							{selectedProject.externalUrl && (
								<div className="mt-6">
									<Button
										component="a"
										href={selectedProject.externalUrl}
										target="_blank"
										rel="noopener noreferrer"
										variant="outlined"
										size="small"
										sx={{ textTransform: "none" }}
									>
										Visit live website
									</Button>
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
