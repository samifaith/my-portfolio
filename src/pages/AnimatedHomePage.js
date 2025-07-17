import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Menu from "../components/Menu";
import Sections from "../components/Sections";
import Letter from "../components/DrawLetters";
import MadeByMeHand from "../components/MadeByMeHand";
import { SectionTemplate } from "../constants/sections";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const HomePageComponent = () => {
	return (
		<>
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
			>
				<h2>THE CREATIVE DEVELOPER</h2>
			</Grid>
			<Grid
				container
				className="root-container paint-wipe-container"
				spacing={5}
			>
				{["I", "AM"].map((word, i) => (
					<h1 className="title brush-reveal-text" key={i}>
						{word}
					</h1>
				))}
			</Grid>
			<Grid
				container
				className="root-container"
				justifyContent="center"
				alignItems="center"
			>
				<Letter />
			</Grid>
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
			>
				<div className="head" />
			</Grid>
		</>
	);
};

const AnimatedHomePage = () => {
	const [selectedSection, setSelectedSection] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

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
		<div>
			<Grid container justifyContent={"center"} m={2}>
				<Menu openModal={openModal} />
			</Grid>
			<HomePageComponent />
			<Sections
				selectedSection={selectedSection}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				setSelectedSection={setSelectedSection}
			/>
			<MadeByMeHand />
		</div>
	);
};

export default AnimatedHomePage;
