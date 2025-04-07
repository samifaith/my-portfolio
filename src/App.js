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
	return (
		<div className="root-container">
			<div>
				<h1 className="title">I</h1>
				<h1 className="title">AM</h1>
				<h1 className="title">SAM</h1>
				<h2>CREATIVE DEVELOPER</h2>
			</div>
			<h3>scroll to see what's currently on my mind</h3>
			<div className="head" />
			<Sections />
		</div>
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
