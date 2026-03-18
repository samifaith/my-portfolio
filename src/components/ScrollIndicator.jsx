import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/ScrollIndicator.css";

const ScrollIndicator = () => {
	const arrowRef = useRef(null);

	useEffect(() => {
		// Floating animation
		gsap.to(arrowRef.current, {
			y: 10,
			duration: 1.5,
			ease: "power1.inOut",
			repeat: -1,
			yoyo: true,
		});
	}, []);

	const handleClick = () => {
		window.scrollTo({
			top: window.innerHeight,
			behavior: "smooth",
		});
	};

	return (
		<div className="scroll-indicator" onClick={handleClick}>
			<div className="scroll-text">Scroll Down</div>
			<div ref={arrowRef} className="scroll-arrow">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 5V19M12 19L5 12M12 19L19 12"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		</div>
	);
};

export default ScrollIndicator;
