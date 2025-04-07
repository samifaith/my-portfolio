import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import "../App.css";
import Grid from "@mui/material/Grid2";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

const SectionTemplate = [
	{
		title: "DESIGN",
		content:
			"I have always been an artist, I have just added to the art mediums I'm skillful with. From graphic design to 3D modeling, I love to create. I have a passion for beautiful and functional designs that resonate.",
		boxKeys: [
			"./SD_TypePoster_ROWDY.png",
			"./SD_TypePoster_LOMBARDIA.png",
			"./Vote_Poster.png",
		],
	},
	{
		title: "DEVELOPMENT",
		content:
			"I fuse logic with artistry to craft immersive digital experiences. Whether building robust front-end applications or experimenting with new technologies, I see every line of code as a chance to bring fresh ideas to life.",
		boxKeys: ["./SamDeCoteau_Vector.png"],
	},
	{
		title: "WRITING",
		content:
			"I want to be Anthony Bourdain without the vices. I want to travel the world sharing the stories and culture of others. We are all the children of a Diaspora. Oftentimes, we have more similarities than differences, yet we focus less on the people and more on our perspectives. I want to write about food, culture, and the people I meet along the way.",
	},
	{
		title: "PHOTOGRAPHY",
		content:
			"I've always loved intimate weddings. I get to spend time with each subject understanding who they are and what's important to them. The impact of a shared emotion or laughter caught in motion. I want the picture to capture the story being told.",
		boxKeys: ["./diving.MP4"],
	},
	{
		title: "CONTACT",
		content:
			"Let's connect! I am always looking for new opportunities and collaborations. Whether you want to work together or just chat, feel free to reach out.",
		justifyContent: "flex-start",
		boxKeys: ["./Resume_DeCoteau_Sam_2025.png"],
		download: true,
	},
];

const isVideo = (url) => {
	if (!url) return false;
	return [".mp4", ".webm", ".ogg"].some((ext) =>
		url.toLowerCase().endsWith(ext)
	);
};

const BoxContent = ({ src, alt, download }) => {
	return isVideo(src) ? (
		<video src={src} controls autoPlay loop muted type="video/mp4" />
	) : download ? (
		<a href={src} download>
			<img src={src} alt={alt || "Box content"} />
		</a>
	) : (
		<img src={src} alt={alt || "Box content"} />
	);
};

const Sections = () => {
	useEffect(() => {
		const sections = gsap.utils.toArray(".section");
		sections.forEach((section) => {
			const headerWrapper = section.querySelector(".section-header-wrapper");
			const content = section.querySelector(".section-content");

			// Combine pinning and scaling/opacity animation for the header
			if (headerWrapper) {
				gsap
					.timeline({
						scrollTrigger: {
							trigger: section,
							start: "top top",
							end: "bottom top",
							scrub: true,
							pin: headerWrapper,
							pinSpacing: false,
							markers: false,
						},
					})
					.fromTo(
						headerWrapper,
						{ scale: 0.5, opacity: 0 },
						{ scale: 1, opacity: 1, ease: "power2.out" }
					);
			}

			// Animate the section content from the fixed head element's center
			if (content) {
				const headEl = document.querySelector(".head");
				let offsetX = 0,
					offsetY = 0;
				if (headEl) {
					const headRect = headEl.getBoundingClientRect();
					const contentRect = content.getBoundingClientRect();
					const headCenterX =
						headRect.left + headRect.width / 2 + window.scrollX;
					const headCenterY =
						headRect.top + headRect.height / 2 + window.scrollY;
					const contentCenterX =
						contentRect.left + contentRect.width / 2 + window.scrollX;
					const contentCenterY =
						contentRect.top + contentRect.height / 2 + window.scrollY;
					offsetX = headCenterX - contentCenterX;
					offsetY = headCenterY - contentCenterY;
				}
				gsap.fromTo(
					content,
					{
						scale: 0.1,
						opacity: 0,
						x: offsetX,
						y: offsetY,
						transformOrigin: "50% 50%",
					},
					{
						scale: 1,
						opacity: 1,
						x: 0,
						y: 0,
						ease: "power2.out",
						duration: 1,
						scrollTrigger: {
							trigger: section,
							start: "top center",
							end: "bottom center",
							scrub: true,
							markers: false,
						},
					}
				);
			}
		});
	}, []);

	return (
		<Grid container className="sections-container section-content">
			{SectionTemplate.map((section, index) => (
				<Grid
					container
					key={index}
					id={section.title.toLowerCase()}
					className="section"
				>
					<Grid container className="section-header-wrapper">
						<h4>{section.title}</h4>
					</Grid>
					<Grid
						container
						justifyContent="center"
						spacing={2}
						className="section-content"
					>
						<Grid container justifyContent="center">
							<Grid size={5} alignContent="flex-end">
								<p>{section.content}</p>
							</Grid>
							<Grid size="auto" ml={-4}>
								<div className="box-frame" />
							</Grid>
						</Grid>
						{section.boxKeys && (
							<Grid
								container
								className="sporadic-container"
								justifyContent="center"
							>
								{section.boxKeys.map((key, index) => (
									<Grid className="work-box" key={index}>
										<BoxContent src={key} alt={`Box ${index + 1}`} />
									</Grid>
								))}
							</Grid>
						)}
					</Grid>
				</Grid>
			))}
		</Grid>
	);
};

export default Sections;
