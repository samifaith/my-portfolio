import React, { useEffect } from "react";
import "../styles/ExpertisePrototype.css";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const sections = [
	{
		title: "Green Cityscape",
		desc: "Vibrant streets with vertical gardens and solar buildings. This oasis thrives on renewable energy, smart transport, and green spaces for biodiversity.",
		img: "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/cu8978xjlsjjpjk52ta0.webp",
		color: "#D5FF37",
		bg: "#EDF9FF",
		alt: "Green Architecture",
	},
	{
		title: "Blue Urban Oasis",
		desc: "Avenues with azure facades and eco-structures. This hub uses clean energy, smart transit, and parks for urban wildlife.",
		img: "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/trh7c8ufv1dqfrofdytd.webp",
		color: "#7DD6FF",
		bg: "#FFECF2",
		alt: "Blue Architecture",
	},
	{
		title: "Fluid Architecture",
		desc: "Desert refuge with fluid architecture and glowing interiors. This sanctuary harnesses solar power, sustainable design, and natural harmony for resilient living.",
		img: "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/aw6qwur0pggp5r03whjq.webp",
		color: "#FFA0B0",
		bg: "#FFE8DB",
		alt: "Pink Architecture",
	},
	{
		title: "Martian Arches",
		desc: "Ethereal structures arc over tranquil waters, bathed in the glow of a setting Martian sun. This desolate beauty showcases the stark, captivating landscape of the red planet.",
		img: "https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/sqwn8u84zd1besgl0zpd.webp",
		color: "#FFA17B",
		bg: "#FFF7E0",
		alt: "Orange Architecture",
	},
];

const ExpertisePrototypePage = () => {
	useEffect(() => {
		const lenis = new Lenis({
			duration: 0.08,
			easing: (t) => t, // linear easing for consistent scroll
			smooth: true,
			gestureDirection: "vertical",
			smoothTouch: true,
			touchMultiplier: 2,
		});

		function raf(time) {
			lenis.raf(time);
			ScrollTrigger.update();
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);

		// Set z-index for images (top image = highest z)
		document.querySelectorAll(".arch-section__img-wrapper").forEach((el, i) => {
			el.style.zIndex = sections.length - i;
		});

		// GSAP Mask Reveal for each section
		const images = gsap.utils.toArray(".arch-section__img-wrapper img");
		const sectionEls = gsap.utils.toArray(".arch-section");
		const bgColors = sections.map((s) => s.bg);

		// Desktop: pin and mask reveal
		ScrollTrigger.matchMedia({
			"(min-width: 769px)": function () {
				images.forEach((img, i) => {
					const tl = gsap.timeline({
						scrollTrigger: {
							trigger: sectionEls[i],
							start: "top center+=10%",
							end: "bottom center-=10%",
							scrub: true,
							pin: sectionEls[i].querySelector(".arch-section__right"),
							pinSpacing: true,
						},
					});
					tl.fromTo(
						img,
						{ clipPath: "inset(0 0 100% 0)", objectPosition: "0px 60%" },
						{
							clipPath: "inset(0 0 0% 0)",
							objectPosition: "0px 0%",
							duration: 1.5,
							ease: "power2.inOut",
						},
					).to(
						"body",
						{
							backgroundColor: bgColors[i],
							duration: 1.5,
							ease: "power2.inOut",
						},
						0.2,
					);
				});
			},
			"(max-width: 768px)": function () {
				images.forEach((img, i) => {
					const tl = gsap.timeline({
						scrollTrigger: {
							trigger: sectionEls[i],
							start: "top 80%",
							end: "bottom 20%",
							scrub: true,
						},
					});
					tl.fromTo(
						img,
						{ objectPosition: "0px 60%" },
						{ objectPosition: "0px 30%", duration: 1.5, ease: "none" },
					).to(
						"body",
						{
							backgroundColor: bgColors[i],
							duration: 1.5,
							ease: "power2.inOut",
						},
						0.2,
					);
				});
			},
		});

		// Cleanup
		return () => {
			ScrollTrigger.getAll().forEach((st) => st.kill());
			gsap.globalTimeline.clear();
		};
	}, []);

	return (
		<div className="container">
			<div className="spacer"></div>
			{sections.map((section, idx) => (
				<div className="arch-section" key={section.title}>
					<div className="arch-section__left">
						<h2 className="arch-section__header">{section.title}</h2>
						<p className="arch-section__desc">{section.desc}</p>
						<a
							className="arch-section__link"
							href="#"
							style={{ backgroundColor: section.color }}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="11"
								height="11"
								fill="none"
							>
								<path
									fill="#121212"
									d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z"
								/>
							</svg>{" "}
							<span>Learn More</span>
						</a>
					</div>
					<div className="arch-section__right">
						<div className="arch-section__img-wrapper">
							<img src={section.img} alt={section.alt} />
						</div>
					</div>
				</div>
			))}
			<div className="spacer"></div>
		</div>
	);
};

export default ExpertisePrototypePage;
