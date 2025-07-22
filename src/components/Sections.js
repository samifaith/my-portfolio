import React, { useEffect, useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "../App.css";
import Grid from "@mui/material/Grid";
import "../styles/Bubble.css";
import { SectionTemplate } from "../constants/sections";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

const BoxContent = ({ src, alt, download }) => {
	if (React.isValidElement(src)) {
		return (
			<div
				style={{
					padding: "20px",
					color: "white",
					fontSize: "14px",
					lineHeight: "1.6",
				}}
			>
				{src}
			</div>
		);
	}
	if (typeof src !== "string") return null;

	if (
		[".mp4", ".webm", ".ogg"].some((ext) => src.toLowerCase().endsWith(ext))
	) {
		return (
			<video
				src={src}
				controls
				autoPlay
				loop
				muted
				style={{
					width: "100%",
					height: "auto",
					borderRadius: "8px",
				}}
			/>
		);
	}

	return download ? (
		<a href={src} download style={{ display: "block", width: "100%" }}>
			<img
				src={src}
				alt={alt || "Box content"}
				style={{
					width: "100%",
					height: "auto",
					borderRadius: "8px",
				}}
			/>
		</a>
	) : (
		<img
			src={src}
			alt={alt || "Box content"}
			style={{
				width: "100%",
				height: "auto",
				borderRadius: "8px",
			}}
		/>
	);
};

const Sections = ({
	selectedSection,
	isModalOpen,
	setIsModalOpen,
	setSelectedSection,
}) => {
	const modalOverlayRef = useRef(null);
	const contentAreaRef = useRef(null);
	const navigate = useNavigate();

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

	const handleSectionClick = (sectionTitle) => {
		// Define which sections should navigate vs open modal
		const routeMap = {
			DESIGN: "/design",
			DEVELOPMENT: "/development",
			WRITING: "/writing",
			MEDIA: "/media",
		};

		if (routeMap[sectionTitle]) {
			// Navigate to dedicated page
			navigate(routeMap[sectionTitle]);
		} else {
			// Open modal for other sections
			const section = SectionTemplate.find((s) => s.title === sectionTitle);
			if (section) {
				setSelectedSection(section);
				setIsModalOpen(true);
			}
		}
	};

	useEffect(() => {
		if (isModalOpen && modalOverlayRef.current) {
			setTimeout(() => {
				if (modalOverlayRef.current) {
					gsap.set(modalOverlayRef.current, {
						clipPath: "circle(0% at 50% 50%)",
					});

					gsap.to(modalOverlayRef.current, {
						duration: 0.8,
						clipPath: "circle(150% at 50% 50%)",
						ease: "power2.out",
					});

					if (contentAreaRef.current) {
						gsap.set(contentAreaRef.current, {
							clipPath: "circle(150% at 50% 50%)",
						});
					}
				}
			}, 10);
		} else if (!isModalOpen && modalOverlayRef.current) {
			gsap.to(modalOverlayRef.current, {
				duration: 0.6,
				clipPath: "circle(0% at 50% 50%)",
				ease: "power2.in",
			});
		}
	}, [isModalOpen]);

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
		setTimeout(() => setSelectedSection(null), 300);
	}, [setIsModalOpen, setSelectedSection]);

	const navigateSection = useCallback(
		(direction) => {
			if (!selectedSection || !contentAreaRef.current) return;

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

			gsap.to(contentAreaRef.current, {
				duration: 0.8,
				clipPath: "circle(0% at 50% 50%)",
				ease: "power2.in",
				onComplete: () => {
					setSelectedSection(SectionTemplate[newIndex]);

					gsap.fromTo(
						contentAreaRef.current,
						{
							clipPath: "circle(0% at 50% 50%)",
						},
						{
							duration: 0.8,
							clipPath: "circle(150% at 50% 50%)",
							ease: "power2.out",
						}
					);
				},
			});
		},
		[selectedSection, setSelectedSection]
	);

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
						onClick={() => handleSectionClick(section.title)}
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

			{isModalOpen && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						zIndex: 1000,
					}}
				>
					<div
						ref={modalOverlayRef}
						style={{
							position: "fixed",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							background: "black",
							clipPath: "circle(0% at 50% 50%)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
						onClick={closeModal}
					>
						<div
							style={{
								width: "100%",
								height: "100%",
								background: "black",
								color: "white",
								position: "relative",
								overflow: "hidden",
								fontFamily: "Poppins, sans-serif",
								display: "flex",
								flexDirection: "column",
							}}
							onClick={(e) => e.stopPropagation()}
						>
							<button
								onClick={closeModal}
								style={{
									position: "absolute",
									top: "20px",
									right: "20px",
									background: "none",
									border: "none",
									color: "white",
									fontSize: "30px",
									cursor: "pointer",
									zIndex: 1002,
								}}
							>
								×
							</button>

							<button
								onClick={() => navigateSection("prev")}
								style={{
									position: "absolute",
									top: "50%",
									left: "20px",
									transform: "translateY(-50%)",
									background: "none",
									border: "none",
									color: "white",
									fontSize: "40px",
									cursor: "pointer",
									zIndex: 1002,
								}}
								title="Previous section (Left Arrow)"
							>
								‹
							</button>

							<button
								onClick={() => navigateSection("next")}
								style={{
									position: "absolute",
									top: "50%",
									right: "20px",
									transform: "translateY(-50%)",
									background: "none",
									border: "none",
									color: "white",
									fontSize: "40px",
									cursor: "pointer",
									zIndex: 1002,
								}}
								title="Next section (Right Arrow)"
							>
								›
							</button>

							<div
								ref={contentAreaRef}
								className="modal-content-area"
								style={{
									flex: 1,
									overflow: "auto",
									padding: "60px 80px 120px 80px",
								}}
							>
								<div
									style={{
										fontSize: "16px",
										lineHeight: "1.6",
										fontFamily: "Poppins, sans-serif",
										marginBottom: "20px",
									}}
								>
									<p>{selectedSection?.content}</p>
								</div>

								{selectedSection?.boxKeys &&
									selectedSection.boxKeys.length > 0 && (
										<ImageList
											variant="masonry"
											cols={selectedSection.boxKeys.length === 1 ? 1 : 3}
											gap={8}
										>
											{selectedSection.boxKeys.map((key, index) => (
												<ImageListItem
													key={index}
													cols={selectedSection.boxKeys.length === 1 ? 1 : 1}
													rows={1}
												>
													<BoxContent
														src={key}
														alt={`${selectedSection.title} work ${index + 1}`}
														download={selectedSection.download}
													/>
												</ImageListItem>
											))}
										</ImageList>
									)}
							</div>

							<div
								style={{
									position: "fixed",
									bottom: "20px",
									left: "80px",
									fontSize: "clamp(40px, 8vw, 100px)",
									fontWeight: "900",
									color: "rgba(139, 21, 56, 0.6)",
									textTransform: "uppercase",
									letterSpacing: "0.06em",
									lineHeight: "0.8",
									fontFamily: "Impact, Arial Black, sans-serif",
									pointerEvents: "none",
									maxWidth: "calc(100vw - 160px)",
									wordWrap: "break-word",
								}}
							>
								{selectedSection?.title}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Sections;
