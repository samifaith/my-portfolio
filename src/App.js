import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import "./App.css";
import Menu from "./components/Menu";
import Paint from "./components/Paint";
import Sections from "./components/Sections";
import ContactBar from "./components/Contact";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const HomePage = () => {
	useEffect(() => {
		gsap.to(".brush-mask", {
			x: "100%",
			duration: 1,
			ease: "power2.out",
			stagger: 0.2,
			delay: 0.5,
		});
	}, []);

	return (
		<>
			<div className="root-container paint-wipe-container">
				{["I", "AM", "SAM"].map((word, i) => (
					<h1 className="title brush-reveal-text" key={i}>
						{word}
					</h1>
				))}
			</div>

			<div className="root-container ">
				<h2>CREATIVE DEVELOPER</h2>
				<h3>scroll to see what's currently on my mind</h3>
				<div className="head" />
				<Sections />
			</div>
		</>
	);
};

const App = () => {
	useEffect(() => {
		gsap.to(".head", {
			top: "100%",
			scale: 1.2,
			ease: "power2.out",
			scrollTrigger: {
				trigger: ".root-container",
				start: "top top",
				end: "100% center",
				scrub: true,
				markers: false,
			},
		});
	}, []);

	return (
		<>
			<Menu />
			<ContactBar />
			<Paint />
			<HomePage />
		</>
	);
};

export default App;
