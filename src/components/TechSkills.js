import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/TechSkills.css";

gsap.registerPlugin(ScrollTrigger);

const techSkills = [
	{ name: "JavaScript", size: "large", icon: "⚡", color: "#F7DF1E" },
	{ name: "React", size: "large", icon: "⚛️", color: "#61DAFB" },
	{ name: "TypeScript", size: "medium", icon: "📘", color: "#3178C6" },
	{ name: "Node.js", size: "medium", icon: "🟢", color: "#339933" },
	{ name: "Python", size: "medium", icon: "🐍", color: "#3776AB" },
	{ name: "HTML5", size: "medium", icon: "🌐", color: "#E34F26" },
	{ name: "CSS3", size: "medium", icon: "🎨", color: "#1572B6" },
	{ name: "Git", size: "medium", icon: "🔀", color: "#F05032" },
	{ name: "GSAP", size: "small", icon: "🎬", color: "#88CE02" },
	{ name: "Figma", size: "medium", icon: "🎭", color: "#F24E1E" },
	{ name: "Photoshop", size: "small", icon: "🖼️", color: "#31A8FF" },
	{ name: "Next.js", size: "small", icon: "▲", color: "#000000" },
	{ name: "Tailwind", size: "small", icon: "💨", color: "#06B6D4" },
	{ name: "MongoDB", size: "small", icon: "🍃", color: "#47A248" },
	{ name: "PostgreSQL", size: "small", icon: "🐘", color: "#4169E1" },
	{ name: "REST API", size: "small", icon: "🔌", color: "#FF6C37" },
	{ name: "GraphQL", size: "small", icon: "◈", color: "#E10098" },
	{ name: "AWS", size: "small", icon: "☁️", color: "#FF9900" },
];

export default function TechSkills() {
	const containerRef = useRef(null);
	const bubblesRef = useRef([]);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Animate bubbles in on scroll
			bubblesRef.current.forEach((bubble, i) => {
				if (bubble) {
					gsap.fromTo(
						bubble,
						{
							scale: 0,
							opacity: 0,
						},
						{
							scale: 1,
							opacity: 1,
							duration: 0.6,
							ease: "back.out(1.7)",
							scrollTrigger: {
								trigger: bubble,
								start: "top 90%",
								toggleActions: "play none none reverse",
							},
							delay: i * 0.05,
						}
					);

					// Floating animation
					gsap.to(bubble, {
						y: "random(-10, 10)",
						x: "random(-5, 5)",
						rotation: "random(-5, 5)",
						duration: "random(2, 4)",
						repeat: -1,
						yoyo: true,
						ease: "sine.inOut",
					});
				}
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<section className="tech-skills-section" ref={containerRef}>
			<h2 className="tech-skills-heading">Technical Arsenal</h2>
			<div className="tech-bubbles-container">
				{techSkills.map((tech, i) => (
					<div
						key={tech.name}
						ref={(el) => (bubblesRef.current[i] = el)}
						className={`tech-bubble ${tech.size}`}
						style={{
							"--bubble-color": tech.color,
						}}
					>
						<span className="tech-icon">{tech.icon}</span>
						<span className="tech-name">{tech.name}</span>
					</div>
				))}
			</div>
		</section>
	);
}
