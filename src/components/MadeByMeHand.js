import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const MadeByMeHand = () => {
	const handRef = useRef(null);
	const signRef = useRef(null);
	const techStackRef = useRef(null);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (handRef.current) {
			// Initial position - hand starts below screen
			gsap.set(handRef.current, {
				y: 100,
				opacity: 0,
			});

			// Animate hand raising up with sign
			gsap.to(handRef.current, {
				y: 0,
				opacity: 1,
				duration: 1.5,
				ease: "power2.out",
				delay: 2, // Delay to let bubbles animate first
			});
		}
	}, []);

	useEffect(() => {
		if (signRef.current && techStackRef.current) {
			if (isHovered) {
				// Expand animation
				gsap.to(signRef.current, {
					padding: "12px 16px",
					minWidth: 180,
					duration: 0.4,
					ease: "power2.out",
				});
				gsap.fromTo(
					techStackRef.current,
					{
						height: 0,
						opacity: 0,
						marginTop: 0,
					},
					{
						height: "auto",
						opacity: 1,
						marginTop: 8,
						duration: 0.4,
						ease: "power2.out",
					}
				);
			} else {
				// Collapse animation
				gsap.to(techStackRef.current, {
					height: 0,
					opacity: 0,
					marginTop: 0,
					duration: 0.3,
					ease: "power2.in",
				});
				gsap.to(signRef.current, {
					padding: "8px 12px",
					minWidth: "auto",
					duration: 0.3,
					ease: "power2.in",
					delay: 0.1,
				});
			}
		}
	}, [isHovered]);

	const techStack = [
		"React 19",
		"GSAP",
		"Material-UI",
		"Tailwind CSS",
		"React Router",
		"Lottie",
	];

	return (
		<div
			ref={handRef}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				position: "fixed",
				bottom: "0px",
				right: "30px",
				textDecoration: "none",
				color: "inherit",
				zIndex: 100,
				cursor: "default",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					fontSize: "12px",
					fontFamily: "Poppins, sans-serif",
				}}
			>
				{/* Sign */}
				<div
					ref={signRef}
					style={{
						background: "white",
						color: "black",
						padding: "8px 12px",
						borderRadius: "4px",
						border: "2px solid #333",
						marginBottom: "5px",
						fontSize: "10px",
						fontWeight: "bold",
						transform: "rotate(-5deg)",
					}}
				>
					<div>Website by Me ❤️</div>
					<div
						ref={techStackRef}
						style={{
							height: 0,
							opacity: 0,
							overflow: "hidden",
							paddingTop: "8px",
							borderTop: "1px solid #ddd",
							fontSize: "9px",
							textAlign: "left",
						}}
					>
						<div style={{ fontWeight: "bold", marginBottom: "4px" }}>
							Built with:
						</div>
						{techStack.map((tech, index) => (
							<div key={index} style={{ marginBottom: "2px" }}>
								• {tech}
							</div>
						))}
					</div>
				</div>

				{/* Stick holding sign */}
				<div
					style={{
						width: "2px",
						height: "60px",
						background: "#8B4513",
						marginTop: "-5px",
					}}
				/>

				{/* Hand and wrist */}
				<div
					style={{
						fontSize: "24px",
						marginTop: "-20px",
						transform: "rotate(-90deg)",
					}}
				>
					👊🏾
				</div>
			</div>
		</div>
	);
};

export default MadeByMeHand;
