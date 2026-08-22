import { useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { CardMedia, Card, CardContent, Typography } from "@mui/material";
import stories from "../constants/WritingPieces";
import caseStudies from "../constants/CaseStudies";
import WanderlustCaseStudyContent from "./WanderlustCaseStudyContent";
import { getModernImageSources } from "../utils/imageFormats";
import "../styles/ProjectCaseStudyModal.css";

const FOCUSABLE_SELECTOR =
	'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

const PROFESSIONAL_CONTRIBUTION_OVERRIDES = {
	"atlas-heor": {
		label: "AESARA · Selected Professional Contribution",
	},
	"adhd-calculator": {
		label: "AESARA · Selected Professional Contribution",
	},
};

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

const StudyFields = ({ study, tools, contributionMode = false }) => (
	<>
		<div className="case-study-field">
			<h3>{contributionMode ? "Context" : "Purpose"}</h3>
			<p>{study.purpose}</p>
		</div>
		<div className="case-study-field">
			<h3>{contributionMode ? "My Contribution" : "My Role"}</h3>
			<p>{study.role}</p>
		</div>
		<div className="case-study-field">
			<h3>{contributionMode ? "Approach" : "Direction"}</h3>
			<p>{study.direction}</p>
		</div>
		{tools && tools.length > 0 && (
			<div className="case-study-field">
				<h3>Tools</h3>
				<div className="case-study-tool-tags">
					{tools.map((tool) => (
						<span key={tool} className="case-study-tool-tag">{tool}</span>
					))}
				</div>
			</div>
		)}
	</>
);

const ProjectCaseStudyModal = ({ project, isOpen, onClose, onAfterClose, onNext, onPrev, hasNext, hasPrev }) => {
	const modalRef = useRef(null);
	const contentRef = useRef(null);
	const closeButtonRef = useRef(null);
	const previousOverflowRef = useRef(null);
	const previousFocusRef = useRef(null);
	const modalContent = useMemo(() => resolveModalContent(project), [project]);
	const professionalOverride = project
		? PROFESSIONAL_CONTRIBUTION_OVERRIDES[project.id]
		: null;
	const effectiveStudy = project?.study;
	const isProfessionalContribution = Boolean(professionalOverride);
	const isStory = modalContent.kind === "story";
	const isCaseStudy = modalContent.kind === "case-study";
	const isProjectModal = !isStory && !isCaseStudy;
	const story = isStory ? modalContent.story : null;
	const caseStudy = isCaseStudy ? modalContent.caseStudy : null;
	const projectImageSources = useMemo(
		() => (project?.image ? getModernImageSources(project.image) : null),
		[project?.image],
	);
	const storyParagraphs = useMemo(() => splitParagraphs(story?.content), [story?.content]);
	const storyMediaKind = useMemo(() => {
		if (!story) return null;
		if (story.pdfFile) return "pdf";
		if (story.coverImage && story.audioFile) return "image-audio";
		if (story.coverImage) return "image-only";
		return null;
	}, [story]);
	const prefersReducedMotion = useRef(
		typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches,
	).current;

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
				".case-study-header, .case-study-split-media, .case-study-split-text, .case-study-story-prose, .case-study-details, .case-study-overview-panel",
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
						gsap.set(contentRef.current, { opacity: 1, y: 0 });
						gsap.set(animatedBlocks, { opacity: 1, y: 0 });
						return undefined;
					}

					gsap.set(modalRef.current, { opacity: 0 });
					gsap.set(contentRef.current, {
						opacity: 0,
						y: 20,
					});
					gsap.set(animatedBlocks, { opacity: 0, y: 16 });

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
								opacity: 1,
								y: 0,
								duration: 0.5,
								ease: "power3.out",
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
						gsap.set(contentRef.current, { opacity: 0, y: 0 });
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
								opacity: 0,
								y: 14,
								duration: 0.28,
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

			if (e.key === "ArrowRight" && hasNext) {
				e.preventDefault();
				onNext();
				return;
			}

			if (e.key === "ArrowLeft" && hasPrev) {
				e.preventDefault();
				onPrev();
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
		[onClose, onNext, onPrev, hasNext, hasPrev],
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
				className="case-study-backdrop case-study-backdrop--split"
			>
				<div className="case-study-controls">
					{hasPrev && (
						<button
							type="button"
							className="case-study-nav"
							onClick={onPrev}
							aria-label="Previous project"
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<polyline points="15 18 9 12 15 6" />
							</svg>
						</button>
					)}
					{hasNext && (
						<button
							type="button"
							className="case-study-nav"
							onClick={onNext}
							aria-label="Next project"
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<polyline points="9 18 15 12 9 6" />
							</svg>
						</button>
					)}
					<button
						type="button"
						className="case-study-close"
						onClick={onClose}
						aria-label="Close modal"
						ref={closeButtonRef}
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>

				<div className="case-study-split">
					<div className="case-study-split-media">
						{isStory && story?.pdfFile && (
							<iframe
								src={`${story.pdfFile}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
								title={`${story.title} PDF viewer`}
								className="case-study-story-pdf"
								loading="lazy"
							/>
						)}
						{isStory && !story?.pdfFile && story?.coverImage && story?.audioFile && (
							<Card sx={{
								background: "rgba(0,0,0,0.25)",
								border: "1px solid rgba(246,230,222,0.15)",
								borderRadius: "20px",
								width: "min(90%, 380px)",
								overflow: "hidden",
								boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
								flexShrink: 0,
							}}>
								<CardMedia
									component="img"
									image={story.coverImage}
									alt={story.title}
									sx={{ objectFit: "contain", background: "rgba(0,0,0,0.15)", maxHeight: "300px" }}
								/>
								<CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5, pb: "20px !important", pt: 2, px: 2.5 }}>
									<Typography variant="overline" sx={{ color: "#c5ec56", letterSpacing: "0.1em", fontFamily: '"Avenir Next", sans-serif', lineHeight: 1 }}>
										{story.subtitle}
									</Typography>
									<Typography variant="subtitle1" sx={{ color: "#f6e6de", fontFamily: '"Avenir Next", sans-serif', fontWeight: 700, lineHeight: 1.3 }}>
										{story.title}
									</Typography>
									<audio
										controls
										src={story.audioFile}
										style={{ width: "100%", marginTop: "4px" }}
										aria-label={`${story.title} audio player`}
									>
										<source src={story.audioFile} type="audio/mpeg" />
										<source src={story.audioFile} type="audio/mp3" />
									</audio>
								</CardContent>
							</Card>
						)}
						{isStory && !story?.pdfFile && story?.coverImage && !story?.audioFile && (
							<img
								src={story.coverImage}
								alt={project.title}
								className="case-study-split-image"
								loading="lazy"
								decoding="async"
							/>
						)}
						{isCaseStudy && caseStudy && (
							<div
								className="case-study-overview-panel"
								style={{ background: caseStudy.theme?.coral }}
							>
								<p className="case-study-overview-text">{caseStudy.overview}</p>
								{caseStudy.meta && (
									<dl className="case-study-meta-list">
										{caseStudy.meta.map((m) => (
											<div key={m.label} className="case-study-meta-item">
												<dt>{m.label}</dt>
												<dd>{m.value}</dd>
											</div>
										))}
									</dl>
								)}
							</div>
						)}
						{isProjectModal && project.image && (
							<picture>
								{projectImageSources?.avif && (
									<source srcSet={projectImageSources.avif} type="image/avif" />
								)}
								{projectImageSources?.webp && (
									<source srcSet={projectImageSources.webp} type="image/webp" />
								)}
								<img
									src={projectImageSources?.fallback || project.image}
									alt={project.title}
									className="case-study-split-image"
									loading="lazy"
									decoding="async"
								/>
							</picture>
						)}
						{isProjectModal && !project.image && project.video && (
							<video
								src={project.video}
								className="case-study-split-image"
								controls
								muted
								playsInline
							/>
						)}
					</div>

					<div className="case-study-split-text">
						<header className="case-study-header">
							<div className="case-study-label-group">
								<span className="case-study-label">{project.label}</span>
								{professionalOverride?.label && (
									<span className="case-study-label case-study-label--soft">
										{professionalOverride.label}
									</span>
								)}
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
							<>
								{story.audioFile && !story.coverImage && (
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
								{effectiveStudy && (
									<div className="case-study-details">
										<StudyFields
											study={effectiveStudy}
											tools={project.tools}
											contributionMode={isProfessionalContribution}
										/>
									</div>
								)}
								<div className="case-study-story-prose">
									{storyParagraphs.map((paragraph, index) => (
										<p key={`${project.id}-paragraph-${index}`}>{paragraph}</p>
									))}
								</div>
							</>
						)}

						{isCaseStudy && caseStudy && (
							<>
								{effectiveStudy && (
									<div className="case-study-details">
										<StudyFields
											study={effectiveStudy}
											tools={project.tools}
											contributionMode={isProfessionalContribution}
										/>
									</div>
								)}
								<WanderlustCaseStudyContent caseStudy={caseStudy} />
							</>
						)}

						{isProjectModal && (
							<div className="case-study-details">
								{effectiveStudy ? (
									<StudyFields
										study={effectiveStudy}
										tools={project.tools}
										contributionMode={isProfessionalContribution}
									/>
								) : (
									<>
										<p>{project.description}</p>
										{project.role && (
											<div className="case-study-field">
												<h3>Role</h3>
												<p>{project.role}</p>
											</div>
										)}
										{project.result && (
											<div className="case-study-field">
												<h3>Result</h3>
												<p>{project.result}</p>
											</div>
										)}
									</>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectCaseStudyModal;
