import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Menu from "../components/Menu";
import Letter from "../components/DrawLetters";
import MadeByMeHand from "../components/MadeByMeHand";
import VerticalTimeline from "../components/VerticalTimeline";
import ScrollIndicator from "../components/ScrollIndicator";
import { useNavigate } from "react-router-dom";
import headshotImage from "../illustratedheadshot.png";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Configure ScrollTrigger for smooth scrolling
ScrollTrigger.config({
	autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
	ignoreMobileResize: true,
});

const ANIMATION_SESSION_KEY = "homePageAnimationPlayed";

const getAnimationPlayedInSession = () => {
	try {
		return sessionStorage.getItem(ANIMATION_SESSION_KEY) === "true";
	} catch {
		return false;
	}
};

const setAnimationPlayedInSession = () => {
	try {
		sessionStorage.setItem(ANIMATION_SESSION_KEY, "true");
	} catch {
		// Ignore storage failures in restricted contexts.
	}
};

const requestIdle =
	typeof window !== "undefined" && "requestIdleCallback" in window
		? window.requestIdleCallback.bind(window)
		: (callback) =>
				setTimeout(
					() => callback({ didTimeout: false, timeRemaining: () => 0 }),
					1,
				);

const cancelIdle =
	typeof window !== "undefined" && "cancelIdleCallback" in window
		? window.cancelIdleCallback.bind(window)
		: (id) => clearTimeout(id);

const HomePageComponent = ({ openModal }) => {
	const signatureRef = useRef(null);
	const headRef = useRef(null);

	const fullText =
		"Welcome to my ever changing portfolio, shaping culture through human-centered design. I look to listen and engage with communities, developing prototypes, and iterating to bring stories to life in meaningful ways. With a strong focus on detail and purpose, I look to imagine and bring to life meaningful brands and experiences that resonate and foster genuine connections. Together, we can create something truly extraordinary.";

	// Check if animation has been shown this session
	const hasAnimationPlayed = getAnimationPlayedInSession();

	const [typedText, setTypedText] = useState(
		hasAnimationPlayed ? fullText : "",
	);
	const [isTypingComplete, setIsTypingComplete] = useState(hasAnimationPlayed);

	// Animate headshot immediately on mount (or show instantly if animation already played)
	useEffect(() => {
		if (hasAnimationPlayed) {
			// Show instantly if animation has already played
			gsap.set(headRef.current, { opacity: 1, scale: 1 });
		} else {
			gsap.fromTo(
				headRef.current,
				{
					opacity: 0,
					scale: 0.8,
					willChange: "opacity, transform",
				},
				{
					opacity: 1,
					scale: 1,
					duration: 1.2,
					ease: "power2.out",
					clearProps: "willChange",
				},
			);
		}
	}, [hasAnimationPlayed]);

	// Optimized typing effect using requestAnimationFrame (skip if already played)
	useEffect(() => {
		// Skip animation if it has already played before
		if (hasAnimationPlayed) {
			return;
		}

		let currentIndex = 0;
		let rafId = null;
		let idleId = null;
		let lastTime = 0;
		const typingSpeed = 3; // ~1.2 seconds total for full paragraph

		const typeNextChar = (timestamp) => {
			if (!lastTime) lastTime = timestamp;
			const elapsed = timestamp - lastTime;

			if (elapsed > typingSpeed) {
				if (currentIndex <= fullText.length) {
					setTypedText(fullText.slice(0, currentIndex));
					currentIndex++;
					lastTime = timestamp;
				} else {
					setIsTypingComplete(true);

					// Mark animation as played for this session
					setAnimationPlayedInSession();

					// Defer signature animation to reduce main thread blocking
					idleId = requestIdle(
						() => {
							gsap.fromTo(
								signatureRef.current,
								{ opacity: 0, y: 20, willChange: "opacity, transform" },
								{
									opacity: 1,
									y: 0,
									duration: 1,
									ease: "power2.out",
									delay: 0.3,
									clearProps: "willChange",
								},
							);
						},
						{ timeout: 500 },
					);
					return;
				}
			}

			rafId = requestAnimationFrame(typeNextChar);
		};

		rafId = requestAnimationFrame(typeNextChar);

		return () => {
			if (rafId) cancelAnimationFrame(rafId);
			if (idleId) cancelIdle(idleId);
		};
	}, [hasAnimationPlayed, fullText]);

	// Show signature section instantly if animation has already played
	useEffect(() => {
		if (hasAnimationPlayed) {
			gsap.set(signatureRef.current, { opacity: 1, y: 0 });
		}
	}, [hasAnimationPlayed]);

	return (
		<div className="hero-wrap">
			{/* Menu at the top */}
			<Menu openModal={openModal} />

			<div className="hero-split">
				<div className="hero-text-section">
					<div ref={signatureRef} className="signature-section">
						<h2 className="signature-title">THE CREATIVE DEVELOPER</h2>
						<div className="signature-words">
							{["I", "AM"].map((word, i) => (
								<h1 className="title brush-reveal-text" key={i}>
									{word}
								</h1>
							))}
						</div>
						<Letter />
					</div>
					<div className="intro-paragraph-wrapper">
						{/* Invisible full text reserves the correct height at all times */}
						<p
							className="intro-paragraph intro-paragraph--spacer"
							aria-hidden="true"
						>
							{fullText}
						</p>
						{/* Visible typed text overlays the spacer */}
						<p className="intro-paragraph intro-paragraph--visible">
							{typedText}
							{!isTypingComplete && <span className="typing-cursor">|</span>}
						</p>
					</div>
				</div>

				<div className="hero-image-section">
					<div
						ref={headRef}
						className="head"
						style={{
							backgroundImage: `url(${headshotImage})`,
						}}
						role="img"
						aria-label="Headshot of Sam DeCoteau"
					/>
				</div>
			</div>

			<ScrollIndicator />
		</div>
	);
};

const AnimatedHomePage = () => {
	const navigate = useNavigate();

	// Refresh ScrollTrigger on mount to ensure smooth scrolling
	useEffect(() => {
		ScrollTrigger.refresh();

		return () => {
			// Clean up all ScrollTriggers when unmounting
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	const openModal = useCallback(
		(sectionTitle) => {
			const routes = {
				DESIGN: "/expertise?filter=design",
				DEVELOPMENT: "/expertise?filter=development",
				WRITING: "/expertise?filter=writing",
				MEDIA: "/expertise?filter=media",
			};

			if (routes[sectionTitle]) {
				navigate(routes[sectionTitle]);
			}
		},
		[navigate],
	);

	return (
		<div>
			<HomePageComponent openModal={openModal} />
			<VerticalTimeline />
			{/* <TechSkills /> */}
			<MadeByMeHand />
		</div>
	);
};

export default AnimatedHomePage;
