import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

const ProjectModal = ({ open, originRect, onClose, content }) => {
	const containerRef = useRef(null);
	const contentRef = useRef(null);

	useEffect(() => {
		if (open && originRect && containerRef.current && contentRef.current) {
			// Set initial position using the box's bounding rect
			gsap.set(containerRef.current, {
				top: originRect.top,
				left: originRect.left,
				width: originRect.width,
				height: originRect.height,
				position: "fixed",
				zIndex: 1001,
				background: "rgba(255,255,255,0.95)",
			});
			// Animate container to fullscreen
			gsap.to(containerRef.current, {
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				duration: 0.6,
				ease: "power2.inOut",
				onComplete: () => {
					// Fade in content after expansion
					gsap.fromTo(
						contentRef.current,
						{ opacity: 0 },
						{ opacity: 1, duration: 0.4 }
					);
				},
			});
		}
	}, [open, originRect]);

	const handleClose = () => {
		// Fade out content first
		gsap.to(contentRef.current, {
			opacity: 0,
			duration: 0.2,
			onComplete: () => {
				// Animate container back to originRect
				gsap.to(containerRef.current, {
					top: originRect.top,
					left: originRect.left,
					width: originRect.width,
					height: originRect.height,
					duration: 0.5,
					ease: "power2.inOut",
					onComplete: onClose,
				});
			},
		});
	};

	if (!open || !originRect) return null;

	return createPortal(
		<div ref={containerRef} onClick={handleClose} style={{ cursor: "pointer" }}>
			<button
				onClick={handleClose}
				style={{
					position: "absolute",
					top: 20,
					right: 20,
					zIndex: 1003,
				}}
			>
				Close
			</button>
			<div ref={contentRef} style={{ padding: "2rem", marginTop: "3rem" }}>
				{content}
			</div>
		</div>,
		document.body
	);
};

export default ProjectModal;
