import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import "./App.css";
import Menu from "./components/Menu";
import Sections from "./components/Sections";
import ContactBar from "./components/Contact";
import Letter from "./components/DrawLetters";
import { SectionTemplate } from "./constants/sections";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const HomePage = () => {
	return (
		<>
			<Grid
				container
				direction="column"
				className="root-container paint-wipe-container"
			>
				{["I", "AM"].map((word, i) => (
					<h1 className="title brush-reveal-text" key={i}>
						{word}
					</h1>
				))}
				<Letter />
			</Grid>
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
			>
				<h2>CREATIVE DEVELOPER</h2>
				<h3>scroll to see what's currently on my mind</h3>
				<div className="head" />
			</Grid>
		</>
	);
};

const App = () => {
	const [selectedSection, setSelectedSection] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Function to open modal for specific section
	const openModal = (sectionTitle) => {
		const section = SectionTemplate.find((s) => s.title === sectionTitle);
		if (section) {
			setSelectedSection(section);
			setIsModalOpen(true);
		}
	};

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
			<Menu openModal={openModal} />
			<ContactBar />
			<HomePage />
			<Sections
				selectedSection={selectedSection}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				setSelectedSection={setSelectedSection}
			/>
		</>
	);
};

export default App;
