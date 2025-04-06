import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import "./App.css";
import Menu from "./components/Menu";
import Paint from "./components/Paint";
import Sections from "./components/Sections";
import ContactBar from "./components/Contact";
import ProjectModal from "./components/Projects";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const HomePage = ({ openModal }) => {
	return (
		<div className="root-container">
			<div className="title-container regular hero">
				<h1 className="title">I</h1>
				<h1 className="title">AM</h1>
				<h1 className="title">SAM</h1>
				<h2>CREATIVE DEVELOPER</h2>
			</div>
			<h3>scroll to see what's on my mind</h3>
			<div className="head" />
			<Sections />
			<div className="page-container" />
		</div>
	);
};

const App = () => {
	// Modal state

	const [originRect, setOriginRect] = useState(null);

	useEffect(() => {
		const commonScrollTrigger = {
			trigger: ".head",
			start: "top center",
			end: "bottom top",
			scrub: true,
			markers: false,
		};
		gsap.to(".head", {
			top: "100%",
			scale: 1.2,
			ease: "power2.out",
			scrollTrigger: {
				trigger: ".root-container",
				start: "top top",
				end: "80% center",
				scrub: true,
				markers: false,
			},
		});

		gsap.timeline({ scrollTrigger: commonScrollTrigger }).fromTo(
			".object1",
			{
				scale: 0.2,
				opacity: 0,
				x: 0,
				y: 0,
				transformOrigin: "50% 50%",
				rotate: 0,
			},
			{
				scale: 1,
				opacity: 1,
				motionPath: {
					path: ".path",
					relative: true,
					autoRotate: true,
					start: 0,
					end: 1,
				},
				ease: "power2.out",
			}
		);
	}, []);

	return (
		<>
			<Menu />
			<ContactBar />
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
			<ProjectModal originRect={originRect} />
			{/* Invisible SVG path for motion */}
			<svg width="0" height="0">
				<path className="path" d="M0,0 L0,-850" />
			</svg>
		</>
	);
};

export default App;
