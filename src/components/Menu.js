import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./../App.css";
import Lottie from "lottie-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Menu = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const overlayRef = useRef(null);
	const lottieRef = useRef();

	const toggleMenu = () => {
		setMenuOpen((prev) => !prev);
		console.log("Toggle menu called");
		if (lottieRef.current) {
			lottieRef.current.play();
		}
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

	const handleMouseEnter = (e) => {
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

	const handleMouseLeave = (e) => {
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
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
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
			<button className="menu-button" onClick={toggleMenu}>
				<DotLottieReact src="./hamMenu.json" loop autoplay />
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
