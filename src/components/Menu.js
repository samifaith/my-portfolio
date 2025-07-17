import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./../App.css";

const Menu = ({ openModal }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const overlayRef = useRef(null);

	const topLine = useRef(null);
	const middleLine = useRef(null);
	const bottomLine = useRef(null);

	const toggleMenu = () => {
		setMenuOpen((prev) => !prev);
	};

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

	useEffect(() => {
		if (menuOpen) {
			gsap.to([topLine.current, middleLine.current, bottomLine.current], {
				stroke: "oldlace",
				duration: 0.3,
			});
			// Transform to X shape when menu is open
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
		} else {
			gsap.to([topLine.current, middleLine.current, bottomLine.current], {
				stroke: "black",
				duration: 0.3,
			});
			// Reset to hamburger shape when menu is closed
			gsap.to(topLine.current, { duration: 0.3, y: 0, rotation: 0 });
			gsap.to(bottomLine.current, { duration: 0.3, y: 0, rotation: 0 });
			gsap.to(middleLine.current, { duration: 0.3, opacity: 1 });
		}
	}, [menuOpen]);

	// Add escape key functionality
	useEffect(() => {
		const handleEscapeKey = (event) => {
			if (event.key === "Escape" && menuOpen) {
				setMenuOpen(false);
			}
		};

		if (menuOpen) {
			document.addEventListener("keydown", handleEscapeKey);
			// Prevent body scroll when menu is open
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
			document.body.style.overflow = "unset";
		};
	}, [menuOpen]);

	const handleSvgMouseEnter = () => {
		if (!menuOpen) {
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
		}
	};

	const handleSvgMouseLeave = () => {
		if (!menuOpen) {
			gsap.to(topLine.current, { duration: 0.3, y: 0, rotation: 0 });
			gsap.to(bottomLine.current, { duration: 0.3, y: 0, rotation: 0 });
			gsap.to(middleLine.current, { duration: 0.3, opacity: 1 });
		}
	};

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

	const handleMenuItemClick = (text, sectionTitle) => {
		if (sectionTitle === "home") {
			window.scrollTo({ top: 0, behavior: "smooth" });
		} else {
			openModal(sectionTitle);
		}
		toggleMenu();
	};

	// Handle clicking on overlay background to close menu
	const handleOverlayClick = (e) => {
		// Close menu only if clicking on the overlay itself, not on the nav content
		if (e.target === overlayRef.current) {
			setMenuOpen(false);
		}
	};

	const renderMenuItem = (text, sectionTitle) => (
		<li>
			<span
				className="menu-item"
				onClick={() => handleMenuItemClick(text, sectionTitle)}
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
				className={`menu-button ${menuOpen ? "menu-open" : ""}`}
				onClick={toggleMenu}
				onMouseEnter={handleSvgMouseEnter}
				onMouseLeave={handleSvgMouseLeave}
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
			<div
				ref={overlayRef}
				className="menu-overlay"
				onClick={handleOverlayClick}
			>
				<nav>
					<ul>
						{renderMenuItem("HOME", "home")}
						{renderMenuItem("DESIGN", "DESIGN")}
						{renderMenuItem("DEVELOPMENT", "DEVELOPMENT")}
						{renderMenuItem("WRITING", "WRITING")}
						{renderMenuItem("MEDIA", "MEDIA")}
					</ul>
				</nav>
			</div>
		</>
	);
};

export default Menu;
