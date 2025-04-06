import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../App.css";
import Grid from "@mui/material/Grid2";

gsap.registerPlugin(ScrollTrigger);

const SectionTemplate = [
	{
		title: "DESIGN",
		content:
			"I have always been an artist, I have just added to the art mediums I'm skillful with. From graphic design to 3D modeling, I love to create. I have a passion for beautiful and functional designs that resonate.",
		justifyContent: "flex-end",
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
		justifyContent: "flex-end",
		boxKeys: ["./SamDeCoteau_Vector.png"],
	},
	{
		title: "WRITING",
		content:
			"I want to be Anthony Bourdain without the vices. I want to travel the world sharing the stories and culture of others. We are all the children of a Diaspora. Oftentimes, we have more similarities than differences, yet we focus less on the people and more on our perspectives. I want to write about food, culture, and the people I meet along the way.",
		justifyContent: "flex-end",
	},
	{
		title: "PHOTOGRAPHY",
		content:
			"I've always loved intimate weddings. I get to spend time with each subject understanding who they are and what's important to them. The impact of a shared emotion or laughter caught in motion. I want the picture to capture the story being told.",
		justifyContent: "flex-end",
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

const Sections = ({ openModal }) => {
	useEffect(() => {
		const sections = gsap.utils.toArray(".section");
		sections.forEach((section) => {
			const headerWrapper = section.querySelector(".section-header-wrapper");
			const content = section.querySelector(".section-content");

			if (headerWrapper) {
				ScrollTrigger.create({
					trigger: section,
					start: "top top",
					end: "bottom top",
					pin: headerWrapper,
					pinSpacing: false,
					markers: false,
				});

				gsap.fromTo(
					headerWrapper,
					{ scale: 0.05, opacity: 0.8 },
					{
						scale: 1,
						opacity: 1,
						ease: "power2.out",
						scrollTrigger: {
							trigger: section,
							start: "top top",
							end: "bottom top",
							scrub: true,
							markers: false,
						},
					}
				);
			}

			gsap.utils.toArray(".sporadic-container .work-box").forEach((box) => {
				gsap.to(box, {
					scale: 1,
					scrollTrigger: {
						trigger: box,
						start: "top 80%",
						end: "bottom 60%",
						scrub: true,
						markers: false,
					},
				});
			});

			if (content) {
				gsap.fromTo(
					content,
					{ scale: 0.1, opacity: 0.8 },
					{
						scale: 1,
						opacity: 1,
						ease: "power2.out",
						scrollTrigger: {
							trigger: section,
							start: "top center",
							end: "bottom top",
							scrub: true,
							markers: false,
						},
					}
				);
			}
		});
	}, []);

	return (
		<div className="sections-container">
			<Grid container direction="column" className="snap-container">
				{SectionTemplate.map((section, index) => (
					<div
						key={index}
						id={section.title.toLowerCase()}
						className="section genie-text snap"
						style={{
							position: "relative",
						}}
					>
						<Grid container justifyContent={section.justifyContent}>
							<div className="section-header-wrapper">
								<h4>{section.title}</h4>
							</div>
						</Grid>

						<div className="section-content">
							<Grid
								container
								className="content-box"
								justifyContent={section.justifyContent}
								alignItems="flex-end"
							>
								<Grid size={5}>
									<p>{section.content}</p>
								</Grid>
								<Grid size="auto">
									<div>
										<div className="box-frame" />
									</div>
								</Grid>
							</Grid>
							<div className="sporadic-container">
								{section.boxKeys &&
									section.boxKeys.map((key, index) => (
										<div className="work-box" key={index}>
											<BoxContent src={key} alt={`Box ${index + 1}`} />
										</div>
									))}
							</div>
						</div>
					</div>
				))}
			</Grid>
		</div>
	);
};

export default Sections;
