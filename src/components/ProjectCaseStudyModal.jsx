import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { getModernImageSources } from "../utils/imageFormats";
import stories from "../constants/WritingPieces";
import caseStudies from "../constants/CaseStudies";
import WanderlustCaseStudyContent from "./WanderlustCaseStudyContent";
import "../styles/ProjectCaseStudyModal.css";

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

const ProjectCaseStudyModal = ({ project, isOpen, onClose }) => {
	const modalRef = useRef(null);
	const contentRef = useRef(null);
	const modalContent = resolveModalContent(project);
	const isStory = modalContent.kind === "story";
	const isCaseStudy = modalContent.kind === "case-study";
	const story = isStory ? modalContent.story : null;
	const caseStudy = isCaseStudy ? modalContent.caseStudy : null;
	const heroImagePath = story?.coverImage || project?.image || null;
	const heroImageSources = heroImagePath
		? getModernImageSources(heroImagePath)
		: null;
	const storyParagraphs = splitParagraphs(story?.content);

	useEffect(() => {
		try {
			if (!modalRef.current || !contentRef.current) {
				return undefined;
			}

			if (isOpen) {
				try {
					// Prevent body scroll
					document.body.style.overflow = "hidden";
				} catch (err) {
					console.error("Failed to set body overflow:", err);
				}

				try {
					// Entrance animation: backdrop fade + content scale & fade
					gsap.set([modalRef.current, contentRef.current], {
						pointerEvents: isOpen ? "auto" : "none",
					});

					gsap
						.timeline()
						.fromTo(
							modalRef.current,
							{
								opacity: 0,
							},
							{
								opacity: 1,
								duration: 0.4,
								ease: "power2.out",
							},
						)
						.fromTo(
							contentRef.current,
							{
								scale: 0.92,
								opacity: 0,
								y: 20,
							},
							{
								scale: 1,
								opacity: 1,
								y: 0,
								duration: 0.5,
								ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
							},
							0,
						);
				} catch (err) {
					console.error("Failed to animate modal entrance:", err);
				}
			} else {
				try {
					// Exit animation
					gsap
						.timeline()
						.to(
							contentRef.current,
							{
								scale: 0.92,
								opacity: 0,
								y: 20,
								duration: 0.35,
								ease: "power2.in",
							},
							0,
						)
						.to(
							modalRef.current,
							{
								opacity: 0,
								duration: 0.3,
								ease: "power2.in",
								onComplete: () => {
									try {
										document.body.style.overflow = "";
									} catch (err) {
										console.error("Failed to reset body overflow:", err);
									}
								},
							},
							0.05,
						);
				} catch (err) {
					console.error("Failed to animate modal exit:", err);
					try {
						document.body.style.overflow = "";
					} catch (resetErr) {
						console.error("Failed to reset body overflow on error:", resetErr);
					}
				}
			}

			return () => {
				try {
					document.body.style.overflow = "";
				} catch (err) {
					console.error("Failed to reset body overflow on cleanup:", err);
				}
			};
		} catch (err) {
			console.error("useEffect animation error:", err);
			return undefined;
		}
	}, [isOpen]);

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

	const imageSources = project.image
		? getModernImageSources(project.image)
		: null;

	return (
		<div
			ref={modalRef}
			className={`case-study-modal ${isOpen ? "is-open" : ""}`}
			onClick={handleBackdropClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby={`case-study-title-${project.id}`}
		>
			<div ref={contentRef} className="case-study-backdrop">
				<button
					type="button"
					className="case-study-close"
					onClick={onClose}
					aria-label="Close modal"
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
							{heroImagePath && heroImageSources && (
								<div className="case-study-media case-study-media--story">
									<picture>
										{heroImageSources.avif && (
											<source
												srcSet={heroImageSources.avif}
												type="image/avif"
											/>
										)}
										{heroImageSources.webp && (
											<source
												srcSet={heroImageSources.webp}
												type="image/webp"
											/>
										)}
										<img
											src={heroImagePath}
											alt={project.title}
											className="case-study-image"
										/>
									</picture>
								</div>
							)}

							{story.audioFile && (
								<div className="case-study-story-block">
									<h2>Listen</h2>
									<audio
										controls
										preload="metadata"
										className="case-study-story-audio"
									>
										<source src={story.audioFile} type="audio/mpeg" />
										<source src={story.audioFile} type="audio/mp3" />
										Your browser does not support the audio element.
									</audio>
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
						<div className="case-study-content">
							{(project.image || project.video) && (
								<div className="case-study-media">
									{project.image && imageSources && (
										<picture>
											{imageSources.avif && (
												<source srcSet={imageSources.avif} type="image/avif" />
											)}
											{imageSources.webp && (
												<source srcSet={imageSources.webp} type="image/webp" />
											)}
											<img
												src={project.image}
												alt={project.title}
												className="case-study-image"
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
