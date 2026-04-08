import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { CardMedia } from "@mui/material";
import stories from "../constants/WritingPieces";
import caseStudies from "../constants/CaseStudies";
import WanderlustCaseStudyContent from "./WanderlustCaseStudyContent";
import { getModernImageSources } from "../utils/imageFormats";
import "../styles/ProjectCaseStudyModal.css";

const FOCUSABLE_SELECTOR =
	'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

const splitParagraphs = (content) =>
	content
		? content
				.split(/\n\s*\n/)
				.map((paragraph) => paragraph.trim())
				.filter(Boolean)
		: [];

const resolveModalContent = (project) => {
	if (!project) {
		return { kind: "project" };
	}

	const story = stories[project.id];
	if (story) {
		return { kind: "story", story };
	}

	const caseStudy = caseStudies[project.id];
	if (caseStudy) {
		return { kind: "case-study", caseStudy };
	}

	return { kind: "project" };
};

const ProjectCaseStudyModal = ({ project, isOpen, onClose, onAfterClose }) => {
	const modalRef = useRef(null);
	const contentRef = useRef(null);
	const closeButtonRef = useRef(null);
	const previousOverflowRef = useRef(null);
	const previousFocusRef = useRef(null);
	const modalContent = resolveModalContent(project);
	const isStory = modalContent.kind === "story";
	const isCaseStudy = modalContent.kind === "case-study";
	const isProjectModal = !isStory && !isCaseStudy;
	const isWideModal = isStory || isCaseStudy;
	const story = isStory ? modalContent.story : null;
	const caseStudy = isCaseStudy ? modalContent.caseStudy : null;
	const heroImagePath = story?.coverImage || project?.image || null;
	const projectImageSources = project?.image
		? getModernImageSources(project.image)
		: null;
	const shouldShowStoryCover = isStory && project?.id === "tea-with-sami";
	const storyParagraphs = splitParagraphs(story?.content);
	const prefersReducedMotion =
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	const restoreBodyOverflow = useCallback(() => {
		try {
			if (previousOverflowRef.current !== null) {
				document.body.style.overflow = previousOverflowRef.current;
				previousOverflowRef.current = null;
			}
		} catch (err) {
			console.error("Failed to restore body overflow:", err);
		}
	}, []);

	useEffect(() => {
		try {
			if (!modalRef.current || !contentRef.current) {
				return undefined;
			}

			const animatedBlocks = contentRef.current.querySelectorAll(
				".case-study-header, .case-study-content, .case-study-embedded-case-study, .case-study-details, .case-study-media, .case-study-story-block, .case-study-story-prose",
			);

			gsap.set([modalRef.current, contentRef.current], {
				pointerEvents: isOpen ? "auto" : "none",
			});
			gsap.killTweensOf(modalRef.current);
			gsap.killTweensOf(contentRef.current);
			gsap.killTweensOf(animatedBlocks);

			if (isOpen) {
				try {
					// Preserve existing overflow state so we do not clobber other overlays.
					if (previousOverflowRef.current === null) {
						previousOverflowRef.current = document.body.style.overflow;
					}
					document.body.style.overflow = "hidden";
				} catch (err) {
					console.error("Failed to set body overflow:", err);
				}

				try {
					previousFocusRef.current = document.activeElement;
					closeButtonRef.current?.focus();
				} catch (err) {
					console.error("Failed to move focus to modal:", err);
				}

				try {
					if (prefersReducedMotion) {
						gsap.set(modalRef.current, { opacity: 1 });
						gsap.set(contentRef.current, {
							scale: 1,
							opacity: 1,
							y: 0,
							rotateX: 0,
						});
						gsap.set(animatedBlocks, { opacity: 1, y: 0 });
						return undefined;
					}

					gsap.set(modalRef.current, { opacity: 0 });
					gsap.set(contentRef.current, {
						scale: 0.96,
						opacity: 0,
						y: 26,
						rotateX: -6,
						transformOrigin: "50% 8%",
					});
					gsap.set(animatedBlocks, { opacity: 0, y: 16 });

					if (prefersReducedMotion) {
						gsap.set(modalRef.current, { opacity: 1 });
						gsap.set(contentRef.current, { scale: 1, opacity: 1, y: 0 });
						return undefined;
					}

					gsap
						.timeline()
						.to(
							modalRef.current,
							{
								opacity: 1,
								duration: 0.38,
								ease: "power3.out",
							},
							0,
						)
						.to(
							contentRef.current,
							{
								scale: 1,
								opacity: 1,
								y: 0,
								rotateX: 0,
								duration: 0.62,
								ease: "power4.out",
							},
							0,
						)
						.to(
							animatedBlocks,
							{
								opacity: 1,
								y: 0,
								stagger: 0.045,
								duration: 0.42,
								ease: "power2.out",
							},
							0.2,
						);
				} catch (err) {
					console.error("Failed to animate modal entrance:", err);
				}
			} else {
				try {
					if (prefersReducedMotion) {
						gsap.set(contentRef.current, {
							scale: 1,
							opacity: 0,
							y: 0,
							rotateX: 0,
						});
						gsap.set(modalRef.current, { opacity: 0, pointerEvents: "none" });
						restoreBodyOverflow();
						onAfterClose?.();
						return undefined;
					}

					gsap
						.timeline()
						.to(
							animatedBlocks,
							{
								opacity: 0,
								y: 10,
								stagger: { each: 0.02, from: "end" },
								duration: 0.16,
								ease: "power2.in",
							},
							0,
						)
						.to(
							contentRef.current,
							{
								scale: 0.97,
								opacity: 0,
								y: 18,
								rotateX: 3,
								duration: 0.3,
								ease: "power3.in",
							},
							0.05,
						)
						.to(
							modalRef.current,
							{
								opacity: 0,
								duration: 0.24,
								ease: "power3.in",
								onComplete: () => {
									restoreBodyOverflow();
									onAfterClose?.();
								},
							},
							0.1,
						);
				} catch (err) {
					console.error("Failed to animate modal exit:", err);
					restoreBodyOverflow();
					onAfterClose?.();
				}
			}

			return undefined;
		} catch (err) {
			console.error("useEffect animation error:", err);
			return undefined;
		}
	}, [isOpen, onAfterClose, prefersReducedMotion, restoreBodyOverflow]);

	useEffect(() => {
		return () => {
			restoreBodyOverflow();
			try {
				if (previousFocusRef.current instanceof HTMLElement) {
					previousFocusRef.current.focus();
				}
			} catch (err) {
				console.error("Failed to restore focus:", err);
			}
		};
	}, [restoreBodyOverflow]);

	const handleBackdropClick = useCallback(
		(e) => {
			if (e.target === modalRef.current) {
				onClose();
			}
		},
		[onClose],
	);

	const handleKeyDown = useCallback(
		(e) => {
			if (e.key === "Escape") {
				onClose();
				return;
			}

			if (e.key === "Tab" && contentRef.current) {
				const focusableElements =
					contentRef.current.querySelectorAll(FOCUSABLE_SELECTOR);

				if (!focusableElements.length) {
					return;
				}

				const firstElement = focusableElements[0];
				const lastElement = focusableElements[focusableElements.length - 1];

				if (e.shiftKey && document.activeElement === firstElement) {
					e.preventDefault();
					lastElement.focus();
					return;
				}

				if (!e.shiftKey && document.activeElement === lastElement) {
					e.preventDefault();
					firstElement.focus();
				}
			}
		},
		[onClose],
	);

	useEffect(() => {
		try {
			if (isOpen) {
				window.addEventListener("keydown", handleKeyDown);
				return () => {
					try {
						window.removeEventListener("keydown", handleKeyDown);
					} catch (err) {
						console.error("Failed to remove keydown listener:", err);
					}
				};
			}
		} catch (err) {
			console.error("Failed to add keydown listener:", err);
			return undefined;
		}
	}, [isOpen, handleKeyDown]);

	if (!project) return null;

	return (
		<div
			ref={modalRef}
			className={`case-study-modal ${isOpen ? "is-open" : ""}`}
			onClick={handleBackdropClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby={`case-study-title-${project.id}`}
		>
			<div
				ref={contentRef}
				className={`case-study-backdrop ${
					isWideModal ? "case-study-backdrop--wide" : ""
				} ${isProjectModal ? "case-study-backdrop--project-contained" : ""}`}
			>
				<button
					type="button"
					className="case-study-close"
					onClick={onClose}
					aria-label="Close modal"
					ref={closeButtonRef}
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>

				<div className="case-study-container">
					<header className="case-study-header">
						<div className="case-study-label-group">
							<span className="case-study-label">{project.label}</span>
							{isStory && story?.subtitle && (
								<span className="case-study-label case-study-label--soft">
									{story.subtitle}
								</span>
							)}
							{isCaseStudy && caseStudy?.subtitle && (
								<span className="case-study-label case-study-label--soft">
									{caseStudy.subtitle}
								</span>
							)}
						</div>
						<h1
							id={`case-study-title-${project.id}`}
							className="case-study-title"
						>
							{project.title}
						</h1>
						<p className="case-study-intro">
							{story?.subtitle || caseStudy?.overview || project.description}
						</p>
					</header>

					{isStory && (
						<div className="case-study-content case-study-content--story">
							{shouldShowStoryCover && heroImagePath && (
								<div className="case-study-media case-study-media--story">
									<img
										src={heroImagePath}
										alt={project.title}
										className="case-study-image case-study-image--story-cover"
										loading="lazy"
										decoding="async"
									/>
								</div>
							)}

							{story.audioFile && (
								<div className="case-study-story-block">
									<h2>Listen</h2>
									<CardMedia
										component="audio"
										controls
										preload="metadata"
										src={story.audioFile}
										aria-label={`${story.title} audio player`}
										className="case-study-story-audio"
										sx={{ width: "100%", display: "block" }}
									>
										<source src={story.audioFile} type="audio/mpeg" />
										<source src={story.audioFile} type="audio/mp3" />
										Your browser does not support the audio element.
									</CardMedia>
								</div>
							)}

							{story.pdfFile && (
								<div className="case-study-story-block">
									<h2>Read the Article</h2>
									<iframe
										src={`${story.pdfFile}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
										title={`${story.title} PDF viewer`}
										className="case-study-story-pdf"
										loading="lazy"
									/>
								</div>
							)}

							<div className="case-study-story-prose">
								{storyParagraphs.map((paragraph, index) => (
									<p key={`${project.id}-paragraph-${index}`}>{paragraph}</p>
								))}
							</div>
						</div>
					)}

					{isCaseStudy && caseStudy && (
						<div className="case-study-embedded-case-study">
							<WanderlustCaseStudyContent caseStudy={caseStudy} />
						</div>
					)}

					{!isStory && !isCaseStudy && (
						<div className="case-study-content case-study-content--split">
							{(project.image || project.video) && (
								<div className="case-study-media case-study-media--split">
									{project.image && (
										<picture>
											{projectImageSources?.avif && (
												<source
													srcSet={projectImageSources.avif}
													type="image/avif"
												/>
											)}
											{projectImageSources?.webp && (
												<source
													srcSet={projectImageSources.webp}
													type="image/webp"
												/>
											)}
											<img
												src={projectImageSources?.fallback || project.image}
												alt={project.title}
												className="case-study-image"
												loading="lazy"
												decoding="async"
											/>
										</picture>
									)}
									{project.video && (
										<video
											src={project.video}
											className="case-study-video"
											controls
											muted
											playsInline
										/>
									)}
								</div>
							)}

							<div className="case-study-details">
								<h2>About This Project</h2>
								<p>{project.description}</p>

								{project.role && (
									<div className="case-study-field">
										<h3>Role</h3>
										<p>{project.role}</p>
									</div>
								)}

								{project.tools && (
									<div className="case-study-field">
										<h3>Tools & Skills</h3>
										<p>{project.tools}</p>
									</div>
								)}

								{project.result && (
									<div className="case-study-field">
										<h3>Result</h3>
										<p>{project.result}</p>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProjectCaseStudyModal;
