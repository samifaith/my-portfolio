import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const MadeByMeHand = () => {
	const handRef = useRef(null);

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

	return (
		<a
			href="/about"
			ref={handRef}
			style={{
				position: "fixed",
				bottom: "0px",
				right: "30px",
				textDecoration: "none",
				color: "inherit",
				zIndex: 100,
				cursor: "pointer",
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
					Made by Me ❤️
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
		</a>
	);
};

export default MadeByMeHand;
