import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import "../styles/StretchText.css";

const StretchText = ({ text }) => {
	const containerRef = useRef(null);
	const textRef = useRef(null);
	const charsRef = useRef([]);

	// We store ephemeral data in refs so re-renders don’t reset them
	const isMouseDownRef = useRef(false);
	const mouseInitialYRef = useRef(0);
	const mouseFinalYRef = useRef(0);
	const charIndexSelectedRef = useRef(0);
	const charHeightRef = useRef(0);
	const dragYScaleRef = useRef(0);

	// Hard-coded “initial” and “target” values (instead of :root variables)
	const weightInit = 600;
	const weightTarget = 400;
	const weightDiff = weightInit - weightTarget;

	const stretchInit = 150; // e.g., "150" if you were using “font-stretch: 150%”
	const stretchTarget = 80;
	const stretchDiff = stretchInit - stretchTarget;

	const maxYScale = 2.5;
	const elasticDropOff = 0.8;

	useEffect(() => {
		if (!textRef.current) return;

		// 1) Split the text into .char spans
		const split = new SplitType(textRef.current, {
			types: "chars",
			charsClass: "char", // So we can style them if needed
		});
		charsRef.current = split.chars;

		// 2) Animate the text in from above
		animateTextIn();

		// 3) Measure initial character height
		charHeightRef.current = textRef.current.offsetHeight;

		// 4) Attach global listeners
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
		window.addEventListener("resize", handleResize);

		// Cleanup
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("resize", handleResize);
		};
		// eslint-disable-next-line
	}, []);

	// Initial text drop/scale animation
	const animateTextIn = () => {
		const firstChar = charsRef.current[0];
		if (!firstChar) return;

		// measure boundingRect to offset “from” position
		const rect = firstChar.getBoundingClientRect();

		gsap.from(charsRef.current, {
			y: () => -1 * (rect.y + charHeightRef.current + 500),
			fontWeight: weightTarget,
			fontStretch: stretchTarget,
			scaleY: 2,
			ease: "elastic(0.2, 0.1)",
			duration: 1.5,
			delay: 0.5,
			stagger: {
				each: 0.05,
				from: "random",
			},
			onComplete: initCharEvents,
		});
	};

	// Once the letters have dropped in, we attach mousedown listeners to each char
	const initCharEvents = () => {
		charsRef.current.forEach((charEl, index) => {
			// Prevent highlight on mousedown
			charEl.addEventListener("mousedown", (e) => {
				e.preventDefault(); // stops text selection
				isMouseDownRef.current = true;
				mouseInitialYRef.current = e.clientY;
				charIndexSelectedRef.current = index;
				document.body.classList.add("grab");
			});
		});
	};

	// On mousemove, if dragging, recalc & apply transforms
	const handleMouseMove = (e) => {
		if (isMouseDownRef.current) {
			mouseFinalYRef.current = e.clientY;
			calcDist();
			setFontDragDimensions();
		}
	};

	// On mouseup, snap back
	const handleMouseUp = () => {
		if (isMouseDownRef.current) {
			isMouseDownRef.current = false;
			snapBackText();
			document.body.classList.remove("grab");
		}
	};

	// On resize, recalc the character height
	const handleResize = () => {
		if (textRef.current) {
			charHeightRef.current = textRef.current.offsetHeight;
		}
	};

	// Calc the user’s drag distance as a fraction
	const calcDist = () => {
		const maxYDragDist = charHeightRef.current * (maxYScale - 1);
		const distY = mouseInitialYRef.current - mouseFinalYRef.current;
		let dragYScale = distY / maxYDragDist;

		if (dragYScale > maxYScale - 1) {
			dragYScale = maxYScale - 1;
		} else if (dragYScale < -0.5) {
			dragYScale = -0.5;
		}
		dragYScaleRef.current = dragYScale;
	};

	// Apply the “drag” transforms to each char
	const setFontDragDimensions = () => {
		gsap.to(charsRef.current, {
			y: (index) => {
				const frac = calcFracDispersion(index);
				return frac * -50;
			},
			fontWeight: (index) => {
				const frac = calcFracDispersion(index);
				return weightInit - frac * weightDiff;
			},
			fontStretch: (index) => {
				const frac = calcFracDispersion(index);
				return stretchInit - frac * stretchDiff;
			},
			scaleY: (index) => {
				let scaleY = 1 + calcFracDispersion(index);
				return scaleY < 0.5 ? 0.5 : scaleY;
			},
			ease: "power4",
			duration: 0.6,
		});
	};

	// Helper: calculates how far each char is from the selected char
	const calcFracDispersion = (index) => {
		const numChars = charsRef.current.length;
		const dispersion =
			1 -
			Math.abs(index - charIndexSelectedRef.current) /
				(numChars * elasticDropOff);
		return dispersion * dragYScaleRef.current;
	};

	// Snap everything back
	const snapBackText = () => {
		gsap.to(charsRef.current, {
			y: 0,
			fontWeight: weightInit,
			fontStretch: stretchInit,
			scale: 1,
			ease: "elastic(0.35, 0.1)",
			duration: 1,
			stagger: {
				each: 0.02,
				from: charIndexSelectedRef.current,
			},
		});
	};

	return (
		<div ref={containerRef} className="stage" style={{ overflow: "visible" }}>
			<h1 ref={textRef} className="txt" style={{ margin: 0 }}>
				{text}
			</h1>
		</div>
	);
};

export default StretchText;
