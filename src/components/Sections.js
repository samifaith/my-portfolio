import React, { useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import "../App.css";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "../styles/Bubble.css";
import { SectionTemplate } from "../constants/sections";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

const BoxContent = ({ src, alt, download }) => {
	if (React.isValidElement(src)) {
		return src;
	}
	if (typeof src !== "string") return null;

	if (
		[".mp4", ".webm", ".ogg"].some((ext) => src.toLowerCase().endsWith(ext))
	) {
		return <video src={src} controls autoPlay loop muted type="video/mp4" />;
	}

	return download ? (
		<a href={src} download>
			<img src={src} alt={alt || "Box content"} />
		</a>
	) : (
		<img src={src} alt={alt || "Box content"} />
	);
};

const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "90%",
	maxWidth: "1000px",
	maxHeight: "90vh",
	bgcolor: "background.paper",
	borderRadius: "20px",
	boxShadow: 24,
	p: 0,
	overflow: "hidden",
};

const Sections = ({
	selectedSection,
	isModalOpen,
	setIsModalOpen,
	setSelectedSection,
}) => {
	useEffect(() => {
		const bubbles = gsap.utils.toArray(".bubble");

		const tl = gsap.timeline();

		bubbles.forEach((bubble, index) => {
			gsap.set(bubble, {
				opacity: 0,
				scale: 0,
			});

			tl.to(bubble, {
				opacity: 1,
				scale: 1,
				duration: 0.5,
				ease: "back.out(1.7)",
				delay: index * 0.2,
			});
		});

		return () => {
			tl.kill();
		};
	}, []);

	const handleBubbleClick = (section) => {
		setSelectedSection(section);
		setIsModalOpen(true);
	};

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
		setTimeout(() => setSelectedSection(null), 300);
	}, [setIsModalOpen, setSelectedSection]);

	// Navigate to next/previous section
	const navigateSection = useCallback(
		(direction) => {
			if (!selectedSection) return;

			const currentIndex = SectionTemplate.findIndex(
				(s) => s.title === selectedSection.title
			);
			let newIndex;

			if (direction === "next") {
				newIndex = (currentIndex + 1) % SectionTemplate.length;
			} else {
				newIndex =
					(currentIndex - 1 + SectionTemplate.length) % SectionTemplate.length;
			}

			setSelectedSection(SectionTemplate[newIndex]);
		},
		[selectedSection, setSelectedSection]
	);

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (!isModalOpen) return;

			switch (e.key) {
				case "ArrowLeft":
					e.preventDefault();
					navigateSection("prev");
					break;
				case "ArrowRight":
					e.preventDefault();
					navigateSection("next");
					break;
				case "Escape":
					e.preventDefault();
					closeModal();
					break;
				default:
					// No action for other keys
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isModalOpen, selectedSection, navigateSection, closeModal]);

	const bubbleContainerStyle = {
		position: "fixed",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "100%",
		height: "100vh",
		maxWidth: "1200px",
	};

	return (
		<>
			<Grid container className="thought-bubbles" sx={bubbleContainerStyle}>
				{SectionTemplate.map((section, index) => (
					<div
						key={index}
						className="bubble"
						onClick={() => handleBubbleClick(section)}
						style={{
							cursor: "pointer",
							position: "absolute",
							...(index === 0 && { top: "25%", left: "15%" }),
							...(index === 1 && { top: "20%", right: "15%" }),
							...(index === 2 && { bottom: "30%", left: "20%" }),
							...(index === 3 && { bottom: "35%", right: "20%" }),
						}}
					>
						<h4>{section.title}</h4>
					</div>
				))}
			</Grid>

			<Modal
				open={isModalOpen}
				onClose={closeModal}
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<Box sx={modalStyle}>
					<div className="modal-content">
						<div className="modal-header">
							<button
								onClick={() => navigateSection("prev")}
								className="nav-btn nav-btn-left"
								title="Previous section (Left Arrow)"
							>
								‹
							</button>
							<h2 id="modal-title" className="modal-title">
								{selectedSection?.title}
							</h2>
							<div className="modal-controls">
								<button
									onClick={() => navigateSection("next")}
									className="nav-btn nav-btn-right"
									title="Next section (Right Arrow)"
								>
									›
								</button>
								<button onClick={closeModal} className="close-btn">
									×
								</button>
							</div>
						</div>
						<div className="modal-body">
							<Grid container spacing={3} sx={{ p: 3 }}>
								<Grid item xs={12}>
									<p id="modal-description">{selectedSection?.content}</p>
								</Grid>
								{selectedSection?.boxKeys &&
									selectedSection.boxKeys.length > 0 && (
										<Grid item xs={12} className="portfolio-grid">
											{selectedSection.boxKeys.map((key, index) => (
												<div key={index} className="portfolio-item">
													<BoxContent
														src={key}
														alt={`${selectedSection.title} work ${index + 1}`}
														download={selectedSection.download}
													/>
												</div>
											))}
										</Grid>
									)}
							</Grid>
						</div>
					</div>
				</Box>
			</Modal>
		</>
	);
};

export default Sections;
