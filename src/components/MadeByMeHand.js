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
				bottom: "-20px",
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
						boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
						transform: "rotate(-5deg)",
					}}
				>
					Made by Me
				</div>

				{/* Stick holding sign */}
				<div
					style={{
						width: "2px",
						height: "25px",
						background: "#8B4513",
						marginBottom: "2px",
					}}
				></div>

				{/* Hand and wrist */}
				<div
					style={{
						fontSize: "24px",
						transform: "rotate(15deg)",
					}}
				>
					✋
				</div>

				{/* Arm/wrist extending down */}
				<div
					style={{
						width: "8px",
						height: "40px",
						background: "linear-gradient(to bottom, #FDBCB4, #F4A688)",
						borderRadius: "4px 4px 0 0",
						marginTop: "-5px",
					}}
				></div>
			</div>
		</a>
	);
};

export default MadeByMeHand;
