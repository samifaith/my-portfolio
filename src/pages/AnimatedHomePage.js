import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Menu from "../components/Menu";
import Letter from "../components/DrawLetters";
import MadeByMeHand from "../components/MadeByMeHand";
import VerticalTimeline from "../components/VerticalTimeline";
// import TechSkills from "../components/TechSkills";
import ScrollIndicator from "../components/ScrollIndicator";
import { useNavigate } from "react-router-dom";
import headshotImage from "../headshot.png";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const HomePageComponent = ({ openModal }) => {
	const signatureRef = useRef(null);
	const headRef = useRef(null);
	const [typedText, setTypedText] = useState("");
	const [isTypingComplete, setIsTypingComplete] = useState(false);

	const fullText =
		"I run an independent studio dedicated to shaping culture through human-centered design. My process involves engaging with communities, developing early prototypes, and iterating to bring stories to life in impactful ways. With a strong focus on detail and purpose, I aim to develop meaningful brands and experiences that resonate and foster genuine connections. Together, we can create something extraordinary.";

	// Animate headshot immediately on mount
	useEffect(() => {
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
			}
		);
	}, []);

	// Optimized typing effect using requestAnimationFrame
	useEffect(() => {
		let currentIndex = 0;
		let rafId = null;
		let lastTime = 0;
		const typingSpeed = 25;

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

					// Defer signature animation to reduce main thread blocking
					requestIdleCallback(
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
								}
							);
						},
						{ timeout: 500 }
					);
					return;
				}
			}

			rafId = requestAnimationFrame(typeNextChar);
		};

		rafId = requestAnimationFrame(typeNextChar);

		return () => {
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, []);

	return (
		<div className="hero-wrap">
			{/* Menu at the top */}
			<Menu openModal={openModal} />

			<div className="hero-split">
				<div className="hero-text-section">
					<p
						style={{
							minHeight: "200px",
							lineHeight: "1.8",
							marginBottom: "0",
							maxWidth: "600px",
							fontSize: "1.4rem",
							contain: "layout style",
						}}
					>
						{typedText}
						{!isTypingComplete && <span className="typing-cursor">|</span>}
					</p>
					<div
						ref={signatureRef}
						style={{
							opacity: 0,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "1rem",
							minHeight: "200px",
							contain: "layout style",
						}}
					>
						<h2 style={{ textAlign: "center" }}>THE CREATIVE DEVELOPER</h2>
						<div
							style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
						>
							{["I", "AM"].map((word, i) => (
								<h1 className="title brush-reveal-text" key={i}>
									{word}
								</h1>
							))}
						</div>
						<Letter />
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

	const openModal = useCallback(
		(sectionTitle) => {
			const routes = {
				DESIGN: "/design",
				DEVELOPMENT: "/development",
				WRITING: "/writing",
				MEDIA: "/media",
			};

			if (routes[sectionTitle]) {
				navigate(routes[sectionTitle]);
			}
		},
		[navigate]
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
