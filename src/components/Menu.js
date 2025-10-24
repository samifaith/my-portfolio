import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate, useLocation } from "react-router-dom";
import "./../App.css";

const Menu = ({ openModal }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const overlayRef = useRef(null);

	const topLine = useRef(null);
	const middleLine = useRef(null);
	const bottomLine = useRef(null);

	const navigate = useNavigate();
	const location = useLocation();
	const isHomePage = location.pathname === "/";

	const toggleMenu = () => {
		setMenuOpen((prev) => !prev);
	};

	useEffect(() => {
		const nav = overlayRef.current?.querySelector("nav");

		if (menuOpen) {
			gsap.to(overlayRef.current, {
				duration: 0.8,
				clipPath: "circle(150% at 50% 50%)",
				ease: "power2.out",
			});
			// Animate nav content to be visible
			if (nav) {
				gsap.to(nav, {
					opacity: 1,
					duration: 0.5,
					delay: 0.3,
					ease: "power2.out",
				});
			}
		} else {
			gsap.to(overlayRef.current, {
				duration: 0.8,
				clipPath: "circle(0% at 100% 0%)",
				ease: "power2.in",
			});
			// Hide nav content
			if (nav) {
				gsap.to(nav, {
					opacity: 0,
					duration: 0.3,
					ease: "power2.in",
				});
			}
		}
	}, [menuOpen]);

	useEffect(() => {
		if (menuOpen) {
			gsap.to([topLine.current, middleLine.current, bottomLine.current], {
				stroke: "oldlace",
				duration: 0.3,
			});
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
			gsap.to(topLine.current, { duration: 0.3, y: 0, rotation: 0 });
			gsap.to(bottomLine.current, { duration: 0.3, y: 0, rotation: 0 });
			gsap.to(middleLine.current, { duration: 0.3, opacity: 1 });
		}
	}, [menuOpen]);

	useEffect(() => {
		const handleEscapeKey = (event) => {
			if (event.key === "Escape" && menuOpen) {
				setMenuOpen(false);
			}
		};

		if (menuOpen) {
			document.addEventListener("keydown", handleEscapeKey);
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

	const handleMenuItemClick = (sectionTitle) => {
		if (sectionTitle === "home") {
			if (isHomePage) {
				window.scrollTo({ top: 0, behavior: "smooth" });
			} else {
				navigate("/");
			}
		} else if (sectionTitle === "EXPERTISE") {
			navigate("/expertise");
		} else if (isHomePage && openModal) {
			openModal(sectionTitle);
		}

		setMenuOpen(false);
	};

	const handleOverlayClick = (e) => {
		if (e.target === overlayRef.current) {
			setMenuOpen(false);
		}
	};

	const renderMenuItem = (text, sectionTitle) => (
		<li key={sectionTitle}>
			<span
				className="menu-item"
				onClick={() => handleMenuItemClick(sectionTitle)}
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

	const renderDesktopMenuItem = (text, sectionTitle) => (
		<li key={sectionTitle} className="desktop-menu-item">
			<span
				className="desktop-menu-link"
				onClick={() => handleMenuItemClick(sectionTitle)}
			>
				{text}
			</span>
		</li>
	);

	return (
		<>
			{/* Desktop Navigation */}
			<nav className="desktop-nav">
				<ul>
					{renderDesktopMenuItem("HOME", "home")}
					{renderDesktopMenuItem("EXPERTISE", "EXPERTISE")}
					{/* LinkedIn Link */}
					<li className="desktop-menu-item">
						<a
							href="https://www.linkedin.com/in/samdecoteau"
							target="_blank"
							rel="noopener noreferrer"
							className="linkedin-link"
							aria-label="LinkedIn Profile"
						>
							<svg
								width="32"
								height="32"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="1.5"
								/>
								<path
									d="M8 10V16M8 8V8.5M12 16V13M12 13V10M12 13C12 10.5 16 10.5 16 13V16"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</a>
					</li>
				</ul>
			</nav>

			{/* Mobile Hamburger Menu */}
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
						{renderMenuItem("EXPERTISE", "EXPERTISE")}
						<li>
							<a
								href="https://www.linkedin.com/in/samdecoteau"
								target="_blank"
								rel="noopener noreferrer"
								className="menu-item linkedin-mobile"
								aria-label="LinkedIn Profile"
							>
								<svg
									width="32"
									height="32"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<circle
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="1.5"
									/>
									<path
										d="M8 10V16M8 8V8.5M12 16V13M12 13V10M12 13C12 10.5 16 10.5 16 13V16"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
};

export default Menu;
