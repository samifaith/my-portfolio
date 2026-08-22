import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Letter from "../components/DrawLetters";
import MadeByMeHand from "../components/MadeByMeHand";
import VerticalTimeline from "../components/VerticalTimeline";
import ScrollIndicator from "../components/ScrollIndicator";
import headshotImage from "../illustratedheadshot.webp";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

ScrollTrigger.config({
	autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
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

const HomePageComponent = () => {
	const signatureRef = useRef(null);
	const headRef = useRef(null);

	const fullText =
		"I’m drawn to the space where storytelling, systems, and culture overlap. My work usually starts with a small obsession, a question I can’t leave alone, or a detail others overlook. That curiosity becomes the foundation for how I design, write, and make sense of the world around me.";

	const hasAnimationPlayed = getAnimationPlayedInSession();

	const [typedText, setTypedText] = useState(
		hasAnimationPlayed ? fullText : "",
	);
	const [isTypingComplete, setIsTypingComplete] = useState(hasAnimationPlayed);

	useEffect(() => {
		try {
			if (hasAnimationPlayed) {
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
		} catch (err) {
			console.error("Failed to animate headshot:", err);
			try {
				if (headRef.current) {
					headRef.current.style.opacity = "1";
				}
			} catch (resetErr) {
				console.error("Failed to reset headshot on error:", resetErr);
			}
		}
	}, [hasAnimationPlayed]);

	useEffect(() => {
		if (hasAnimationPlayed) {
			return;
		}

		let currentIndex = 0;
		let rafId = null;
		let lastTime = 0;
		const typingSpeed = 3;

		const typeNextChar = (timestamp) => {
			try {
				if (!lastTime) lastTime = timestamp;
				const elapsed = timestamp - lastTime;

				if (elapsed > typingSpeed) {
					if (currentIndex <= fullText.length) {
						setTypedText(fullText.slice(0, currentIndex));
						currentIndex++;
						lastTime = timestamp;
					} else {
						setIsTypingComplete(true);
						setAnimationPlayedInSession();
						return;
					}
				}

				rafId = requestAnimationFrame(typeNextChar);
			} catch (err) {
				console.error("Typing animation error:", err);
				setIsTypingComplete(true);
				setAnimationPlayedInSession();
			}
		};

		rafId = requestAnimationFrame(typeNextChar);

		return () => {
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, [hasAnimationPlayed, fullText]);

	useEffect(() => {
		try {
			if (hasAnimationPlayed) {
				gsap.set(signatureRef.current, { opacity: 1, y: 0 });
				return;
			}

			gsap.fromTo(
				signatureRef.current,
				{ opacity: 0, y: 12, willChange: "opacity, transform" },
				{
					opacity: 1,
					y: 0,
					duration: 0.45,
					ease: "power2.out",
					clearProps: "willChange",
				},
			);
		} catch (err) {
			console.error("Failed to set signature visibility:", err);
			try {
				if (signatureRef.current) {
					signatureRef.current.style.opacity = "1";
				}
			} catch (resetErr) {
				console.error("Failed to reset signature on error:", resetErr);
			}
		}
	}, [hasAnimationPlayed]);

	return (
		<div className="hero-wrap">
			<div className="hero-split">
				<div className="hero-text-section">
					<div ref={signatureRef} className="signature-section">
						<h2 className="signature-title">UX ENGINEER + PRODUCT DESIGNER</h2>
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
						<p
							className="intro-paragraph intro-paragraph--spacer"
							aria-hidden="true"
						>
							{fullText}
						</p>
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
						style={{ backgroundImage: `url(${headshotImage})` }}
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
	useEffect(() => {
		ScrollTrigger.refresh();
	}, []);

	return (
		<div>
			<HomePageComponent />
			<VerticalTimeline />
			<MadeByMeHand />
		</div>
	);
};

export default AnimatedHomePage;
