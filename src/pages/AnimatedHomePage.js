import { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Menu from "../components/Menu";
import Letter from "../components/DrawLetters";
import MadeByMeHand from "../components/MadeByMeHand";
import VerticalTimeline from "../components/VerticalTimeline";
import ScrollIndicator from "../components/ScrollIndicator";
import { SectionTemplate } from "../constants/sections";
import { useNavigate } from "react-router-dom";
import headshotImage from "../headshot.png";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const HomePageComponent = ({ bubbleSlot }) => {
	const paragraphRef = useRef(null);
	const signatureRef = useRef(null);
	const [typedText, setTypedText] = useState("");
	const [isTypingComplete, setIsTypingComplete] = useState(false);

	const fullText =
		"I run an independent studio dedicated to shaping culture through human-centered design. My process involves engaging with communities, developing early prototypes, and iterating to bring stories to life in impactful ways. With a strong focus on detail and purpose, I aim to develop meaningful brands and experiences that resonate and foster genuine connections. Together, we can create something extraordinary.";

	useEffect(() => {
		// Typing animation
		let currentIndex = 0;
		const typingSpeed = 25; // milliseconds per character

		const typeInterval = setInterval(() => {
			if (currentIndex <= fullText.length) {
				setTypedText(fullText.slice(0, currentIndex));
				currentIndex++;
			} else {
				clearInterval(typeInterval);
				setIsTypingComplete(true);

				// After typing completes, animate in the signature
				gsap.fromTo(
					signatureRef.current,
					{
						opacity: 0,
						y: 20,
					},
					{
						opacity: 1,
						y: 0,
						duration: 1,
						ease: "power2.out",
						delay: 0.3,
					}
				);
			}
		}, typingSpeed);

		return () => clearInterval(typeInterval);
	}, []);

	return (
		<>
			<div className="hero-wrap hero-split">
				{/* Left side - Text content */}
				<div className="hero-text-section">
					<p
						ref={paragraphRef}
						style={{
							minHeight: "200px",
							lineHeight: "1.6",
							marginBottom: "3rem",
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

				{/* Right side - Head */}
				<div className="hero-image-section">
					<div
						className="head"
						style={{ backgroundImage: `url(${headshotImage})` }}
					/>
				</div>

				{/* Scroll Indicator */}
				<ScrollIndicator />
			</div>
		</>
	);
};

const AnimatedHomePage = () => {
	const [selectedSection, setSelectedSection] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

	const openModal = (sectionTitle) => {
		const routes = {
			DESIGN: "/design",
			DEVELOPMENT: "/development",
			WRITING: "/writing",
			MEDIA: "/media",
		};

		if (routes[sectionTitle]) {
			navigate(routes[sectionTitle]);
		} else {
			const section = SectionTemplate.find((s) => s.title === sectionTitle);
			if (section) {
				setSelectedSection(section);
				setIsModalOpen(true);
			}
		}
	};

	return (
		<div>
			<Grid container justifyContent={"center"} m={2}>
				<Menu openModal={openModal} />
			</Grid>
			<HomePageComponent />
			<VerticalTimeline />
			<MadeByMeHand />
		</div>
	);
};

export default AnimatedHomePage;
