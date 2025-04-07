import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./../App.css";

const Menu = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const overlayRef = useRef(null);

	// Refs for the SVG lines (hamburger icon)
	const topLine = useRef(null);
	const middleLine = useRef(null);
	const bottomLine = useRef(null);

	// Toggle menu open/closed
	const toggleMenu = () => {
		setMenuOpen((prev) => !prev);
	};

	// Animate overlay using GSAP when menuOpen changes
	useEffect(() => {
		if (menuOpen) {
			gsap.to(overlayRef.current, {
				duration: 0.8,
				clipPath: "circle(150% at 50% 50%)",
				ease: "power2.out",
			});
		} else {
			gsap.to(overlayRef.current, {
				duration: 0.8,
				clipPath: "circle(0% at 100% 0%)",
				ease: "power2.in",
			});
		}
	}, [menuOpen]);

	// Animate the SVG stroke color based on menu state
	useEffect(() => {
		if (menuOpen) {
			gsap.to([topLine.current, middleLine.current, bottomLine.current], {
				stroke: "oldlace",
				duration: 0.3,
			});
		} else {
			gsap.to([topLine.current, middleLine.current, bottomLine.current], {
				stroke: "black",
				duration: 0.3,
			});
		}
	}, [menuOpen]);

	// GSAP hover animations for the SVG button
	const handleSvgMouseEnter = () => {
		gsap.to(topLine.current, {
			duration: 0.3,
			y: 8,
			rotation: 45,
			transformOrigin: "center",
		});
		gsap.to(bottomLine.current, {
			duration: 0.3,
			y: -8,
			rotation: -45,
			transformOrigin: "center",
		});
		gsap.to(middleLine.current, { duration: 0.3, opacity: 0 });
	};

	const handleSvgMouseLeave = () => {
		gsap.to(topLine.current, { duration: 0.3, y: 0, rotation: 0 });
		gsap.to(bottomLine.current, { duration: 0.3, y: 0, rotation: 0 });
		gsap.to(middleLine.current, { duration: 0.3, opacity: 1 });
	};

	// Functions to animate menu item letters (for additional style)
	const handleMouseEnterLetters = (e) => {
		const letters = e.currentTarget.querySelectorAll(".letter");
		gsap.to(letters, {
			y: -5,
			skewY: 5,
			css: { color: "black", textShadow: "4px 4px 0 rgba(255,255,255,0.8)" },
			stagger: 0.05,
			duration: 0.3,
			ease: "power2.out",
		});
	};

	const handleMouseLeaveLetters = (e) => {
		const letters = e.currentTarget.querySelectorAll(".letter");
		gsap.to(letters, {
			y: 0,
			skewY: 0,
			css: { color: "oldlace", textShadow: "none" },
			stagger: 0.05,
			duration: 0.3,
			ease: "power2.out",
		});
	};

	const scrollToSection = (sectionId) => {
		const target = document.getElementById(sectionId);
		if (target) {
			target.scrollIntoView({ behavior: "smooth" });
		}
	};

	const renderMenuItem = (text, sectionId) => (
		<li>
			<span
				className="menu-item"
				onClick={() => {
					scrollToSection(sectionId);
					toggleMenu();
				}}
				onMouseEnter={handleMouseEnterLetters}
				onMouseLeave={handleMouseLeaveLetters}
			>
				{text.split("").map((char, index) => (
					<h4 key={index} className="letter">
						{char}
					</h4>
				))}
			</span>
		</li>
	);

	return (
		<>
			<button
				className="menu-button"
				onClick={toggleMenu}
				onMouseEnter={handleSvgMouseEnter}
				onMouseLeave={handleSvgMouseLeave}
				style={{
					background: "none",
					border: "none",
					cursor: "pointer",
					padding: 0,
				}}
			>
				<svg width="40" height="40" viewBox="0 0 40 40">
					<line
						ref={topLine}
						x1="8"
						y1="12"
						x2="32"
						y2="12"
						stroke="black"
						strokeWidth="4"
						strokeLinecap="round"
					/>
					<line
						ref={middleLine}
						x1="8"
						y1="20"
						x2="32"
						y2="20"
						stroke="black"
						strokeWidth="4"
						strokeLinecap="round"
					/>
					<line
						ref={bottomLine}
						x1="8"
						y1="28"
						x2="32"
						y2="28"
						stroke="black"
						strokeWidth="4"
						strokeLinecap="round"
					/>
				</svg>
			</button>
			<div ref={overlayRef} className="menu-overlay">
				<nav>
					<ul>
						{renderMenuItem("HOME", "home")}
						{renderMenuItem("DESIGN", "design")}
						{renderMenuItem("DEVELOPMENT", "development")}
						{renderMenuItem("WRITING", "writing")}
						{renderMenuItem("PHOTOGRAPHY", "photography")}
					</ul>
				</nav>
			</div>
		</>
	);
};

export default Menu;
