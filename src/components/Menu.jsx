import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate, useLocation } from "react-router-dom";
import "./../App.css";

const Menu = ({ openModal }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [contactMenuOpen, setContactMenuOpen] = useState(false);
	const overlayRef = useRef(null);
	const contactMenuRef = useRef(null);
	const previousOverflowRef = useRef(null);
	const hasAppliedScrollLockRef = useRef(false);

	const topLine = useRef(null);
	const middleLine = useRef(null);
	const bottomLine = useRef(null);

	const navigate = useNavigate();
	const location = useLocation();
	const isHomePage = location.pathname === "/";

	const applyScrollLock = () => {
		if (hasAppliedScrollLockRef.current) {
			return;
		}

		previousOverflowRef.current = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		hasAppliedScrollLockRef.current = true;
	};

	const restoreScrollLock = () => {
		if (!hasAppliedScrollLockRef.current) {
			return;
		}

		document.body.style.overflow = previousOverflowRef.current ?? "";
		previousOverflowRef.current = null;
		hasAppliedScrollLockRef.current = false;
	};

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
				stroke: "#a8b56a",
				duration: 0.3,
			});
			gsap.to(topLine.current, { duration: 0.3, y: 0, rotation: 0 });
			gsap.to(bottomLine.current, { duration: 0.3, y: 0, rotation: 0 });
			gsap.to(middleLine.current, { duration: 0.3, opacity: 1 });
		}
	}, [menuOpen]);

	useEffect(() => {
		const handleDocumentClick = (event) => {
			if (
				contactMenuRef.current &&
				!contactMenuRef.current.contains(event.target)
			) {
				setContactMenuOpen(false);
			}
		};

		const handleEscapeKey = (event) => {
			if (event.key === "Escape") {
				setContactMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleDocumentClick);
		document.addEventListener("keydown", handleEscapeKey);

		return () => {
			document.removeEventListener("mousedown", handleDocumentClick);
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, []);

	useEffect(() => {
		const handleEscapeKey = (event) => {
			if (event.key === "Escape" && menuOpen) {
				setMenuOpen(false);
			}
		};

		if (menuOpen) {
			document.addEventListener("keydown", handleEscapeKey);
			applyScrollLock();
		} else {
			restoreScrollLock();
		}

		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
			restoreScrollLock();
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
			css: { color: "#c5ec56", textShadow: "0 0 24px rgba(197,236,86,0.45)" },
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

	const toggleContactMenu = () => {
		setContactMenuOpen((prev) => !prev);
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
					<li id="nav-filter-slot" className="desktop-menu-item nav-filter-slot"></li>
					{/* LinkedIn Link */}
					<li className="desktop-menu-item desktop-menu-item--icons-start">
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
					<li className="desktop-menu-item dropdown" ref={contactMenuRef}>
						<button
							type="button"
							className="contact-link"
							onClick={toggleContactMenu}
							aria-label="Contact information"
							aria-expanded={contactMenuOpen}
							aria-controls="contact-info-dropdown"
							aria-haspopup="true"
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
									d="M7 9H17V15H7V9ZM7 9L12 12.5L17 9"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
						{contactMenuOpen && (
							<div
								id="contact-info-dropdown"
								className="contact-dropdown"
								aria-labelledby="contact-dropdown-title"
							>
								<p
									id="contact-dropdown-title"
									className="contact-dropdown-title"
								>
									Contact
								</p>
								<address className="contact-dropdown-address">
									<a
										href="mailto:sfdecoteau@gmail.com"
										className="contact-dropdown-item"
									>
										Email: sfdecoteau@gmail.com
									</a>
									<a href="tel:+16179472402" className="contact-dropdown-item">
										Phone: (617) 947-2402
									</a>
									<p className="contact-dropdown-item">
										Location: Remote / MA, RI
									</p>
								</address>
							</div>
						)}
					</li>
				</ul>
			</nav>

			{/* Mobile Hamburger Menu */}
			<button
				className={`menu-button ${menuOpen ? "menu-open" : ""}`}
				onClick={toggleMenu}
				onMouseEnter={handleSvgMouseEnter}
				onMouseLeave={handleSvgMouseLeave}
				aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
				aria-expanded={menuOpen}
				aria-controls="mobile-menu-overlay"
			>
				<svg width="40" height="40" viewBox="0 0 40 40">
					<line
						ref={topLine}
						x1="8"
						y1="12"
						x2="32"
						y2="12"
						stroke="#a8b56a"
						strokeWidth="4"
						strokeLinecap="round"
					/>
					<line
						ref={middleLine}
						x1="8"
						y1="20"
						x2="32"
						y2="20"
						stroke="#a8b56a"
						strokeWidth="4"
						strokeLinecap="round"
					/>
					<line
						ref={bottomLine}
						x1="8"
						y1="28"
						x2="32"
						y2="28"
						stroke="#a8b56a"
						strokeWidth="4"
						strokeLinecap="round"
					/>
				</svg>
			</button>
			<div
				ref={overlayRef}
				id="mobile-menu-overlay"
				className="menu-overlay"
				onClick={handleOverlayClick}
			>
				<nav>
					<ul>
						{renderMenuItem("HOME", "home")}
						{renderMenuItem("EXPERTISE", "EXPERTISE")}
						<li
							id="mobile-filter-slot"
							className="mobile-filter-slot"
							onClick={(e) => e.stopPropagation()}
						/>
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
