import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/FeaturedProjects.css";

gsap.registerPlugin(ScrollTrigger);

const ribbonPhrases = [
	"products.",
	"platforms.",
	"web applications.",
	"interfaces.",
	"design systems.",
	"data visualization.",
	"responsive experiences.",
	"prototypes.",
	"component systems.",
	"product workflows.",
	"front-end experiences.",
	"interaction patterns.",
];

const WritingIcon = () => (
	<svg className="featured-focus-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
		<path d="M12 19l7-7 3 3-7 7-3-3z" />
		<path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18" />
		<path d="M2 2l7.586 7.586" />
		<circle cx="11" cy="11" r="2" />
	</svg>
);

const ProductIcon = () => (
	<svg className="featured-focus-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
		<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
		<polyline points="3.27 6.96 12 12.01 20.73 6.96" />
		<line x1="12" y1="22.08" x2="12" y2="12" />
	</svg>
);

const VisualIcon = () => (
	<svg className="featured-focus-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
		<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
		<circle cx="12" cy="12" r="3" />
	</svg>
);

const focusAreas = [
	{
		name: "Writing",
		description: "Essays, editorial design, and the occasional long-form rabbit hole.",
		Icon: WritingIcon,
	},
	{
		name: "Product thinking",
		description: "Interfaces, workflows, and systems that have to stay useful under pressure.",
		Icon: ProductIcon,
	},
	{
		name: "Visual systems",
		description: "Brand moments, poster studies, and layout decisions that carry personality.",
		Icon: VisualIcon,
	},
];

const FeaturedProjects = () => {
	const heroRef = useRef(null);
	const diagramRef = useRef(null);
	const trackRef = useRef(null);

	useEffect(() => {
		const hero = heroRef.current;
		const diagram = diagramRef.current;
		if (!hero || !diagram) return undefined;
		const track = trackRef.current;

		const handlePointerMove = (event) => {
			const bounds = hero.getBoundingClientRect();
			const x = (event.clientX - bounds.left) / bounds.width - 0.5;
			const y = (event.clientY - bounds.top) / bounds.height - 0.5;
			hero.style.setProperty("--hero-mouse-x", `${x * 100}`);
			hero.style.setProperty("--hero-mouse-y", `${y * 100}`);
			gsap.to(diagram, { x: x * 22, y: y * 16, duration: 0.55, ease: "power3.out", overwrite: "auto" });
		};

		const handlePointerLeave = () => {
			gsap.to(diagram, { x: 0, y: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" });
			hero.style.setProperty("--hero-mouse-x", "0");
			hero.style.setProperty("--hero-mouse-y", "0");
		};

		hero.addEventListener("pointermove", handlePointerMove);
		hero.addEventListener("pointerleave", handlePointerLeave);

		const circWriting = diagram.querySelector(".featured-venn-writing");
		const circProduct = diagram.querySelector(".featured-venn-product");
		const circVisual = diagram.querySelector(".featured-venn-visual");
		const vennTweens = [
			circWriting && gsap.to(circWriting, { y: -4, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut" }),
			circProduct && gsap.to(circProduct, { y: -3, duration: 3.6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 }),
			circVisual && gsap.to(circVisual, { y: 4, duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 }),
		].filter(Boolean);

		const scrollTrigger = ScrollTrigger.create({
			trigger: hero,
			scrub: 0.5,
			start: "top top",
			end: "bottom top",
			onUpdate: (self) => {
				const scale = 1 + self.progress * 0.03;
				gsap.to(diagram, { scale, duration: 0.2, ease: "none", overwrite: "auto" });
			},
		});

		const totalWidth = track?.scrollWidth / 2;
		if (!track || !totalWidth) {
			return () => {
				hero.removeEventListener("pointermove", handlePointerMove);
				hero.removeEventListener("pointerleave", handlePointerLeave);
				scrollTrigger.kill();
				vennTweens.forEach((t) => t.kill());
			};
		}

		const tween = gsap.to(track, {
			x: -totalWidth,
			duration: 35,
			ease: "none",
			repeat: -1,
			modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth) },
		});

		return () => {
			tween.kill();
			scrollTrigger.kill();
			vennTweens.forEach((t) => t.kill());
			hero.removeEventListener("pointermove", handlePointerMove);
			hero.removeEventListener("pointerleave", handlePointerLeave);
		};
	}, []);

	return (
		<>
			<section className="featured-section" aria-label="Selected work overview" ref={heroRef}>
				<div className="featured-atmosphere" aria-hidden="true">
					<svg viewBox="0 0 1440 980" preserveAspectRatio="none" className="featured-atmosphere-svg">
						<defs>
							<filter id="featured-noise">
								<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
								<feColorMatrix type="saturate" values="0" />
								<feComponentTransfer><feFuncA type="table" tableValues="0 0 0.035" /></feComponentTransfer>
							</filter>
						</defs>
						<rect width="1440" height="980" filter="url(#featured-noise)" opacity="0.35" />
						<path d="M-20 40 L410 40" className="featured-draft-line" />
						<path d="M138 100 C220 70, 290 145, 392 110" className="featured-draft-line featured-draft-line-soft" />
						<path d="M980 120 L1390 20" className="featured-draft-line" />
						<path d="M1040 740 C1180 690, 1260 770, 1440 710" className="featured-draft-line featured-draft-line-soft" />
					</svg>
					<span className="featured-vignette featured-vignette-left" />
					<span className="featured-vignette featured-vignette-right" />
				</div>

				<div className="featured-inner">
					<div className="featured-copy">
						<p className="featured-eyebrow">Selected work</p>
						<h1 className="featured-heading">
							<span className="featured-heading-line">I turn</span>
							<span className="featured-heading-line">complexity</span>
							<span className="featured-heading-line featured-heading-line-emphasis">
								into <span className="featured-clarity">clarity.
									<svg className="featured-clarity-stroke" viewBox="0 0 340 26" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
										<defs><filter id="featured-rough"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" /><feDisplacementMap in="SourceGraphic" scale="2.2" /></filter></defs>
										<path d="M 8 16 C 60 6, 130 22, 200 12 C 260 6, 305 18, 332 10" stroke="#b8c87a" strokeWidth="9" fill="none" strokeLinecap="round" filter="url(#featured-rough)" opacity="0.55" />
										<path d="M 10 18 C 70 10, 140 24, 205 14 C 265 8, 308 20, 330 12" stroke="#b8c87a" strokeWidth="5" fill="none" strokeLinecap="round" filter="url(#featured-rough)" opacity="0.95" />
										<path d="M 12 20 C 80 14, 150 26, 200 16" stroke="#cad88e" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
									</svg>
								</span>
							</span>
						</h1>
						<p className="featured-lede">
							I bring visions to life. Working across product design, development, and user-centered experiences, I turn ideas and complex workflows into clear interfaces. I first came to product work through photography, where I learned how much framing, design theory, and iteration can change an experience. Today, that same attention to detail shows up in how I approach design systems, accessibility, and thoughtful interaction. The following work is a collection of where those ideas tend to go.
						</p>
					</div>

					<div className="featured-diagram" ref={diagramRef} role="img" aria-label="Writing, product design, and visual systems overlap">
						<svg
							className="featured-venn-svg"
							viewBox="0 0 600 650"
							xmlns="http://www.w3.org/2000/svg"
						>
							<defs>
								<filter
									id="fvn-grain-purple"
									x="-20%"
									y="-20%"
									width="140%"
									height="140%"
								>
									<feTurbulence
										type="fractalNoise"
										baseFrequency="0.7"
										numOctaves="2"
										seed="2"
									/>
									<feColorMatrix values="0 0 0 0 0.54  0 0 0 0 0.47  0 0 0 0 0.65  0 0 0 0.7 0" />
									<feComposite in2="SourceGraphic" operator="in" />
									<feMerge>
										<feMergeNode in="SourceGraphic" />
										<feMergeNode />
									</feMerge>
								</filter>
								<filter
									id="fvn-grain-green"
									x="-20%"
									y="-20%"
									width="140%"
									height="140%"
								>
									<feTurbulence
										type="fractalNoise"
										baseFrequency="0.75"
										numOctaves="2"
										seed="5"
									/>
									<feColorMatrix values="0 0 0 0 0.56  0 0 0 0 0.62  0 0 0 0 0.36  0 0 0 0.7 0" />
									<feComposite in2="SourceGraphic" operator="in" />
									<feMerge>
										<feMergeNode in="SourceGraphic" />
										<feMergeNode />
									</feMerge>
								</filter>
								<filter
									id="fvn-grain-yellow"
									x="-20%"
									y="-20%"
									width="140%"
									height="140%"
								>
									<feTurbulence
										type="fractalNoise"
										baseFrequency="0.7"
										numOctaves="2"
										seed="9"
									/>
									<feColorMatrix values="0 0 0 0 0.78  0 0 0 0 0.59  0 0 0 0 0.21  0 0 0 0.7 0" />
									<feComposite in2="SourceGraphic" operator="in" />
									<feMerge>
										<feMergeNode in="SourceGraphic" />
										<feMergeNode />
									</feMerge>
								</filter>
								<radialGradient id="fvn-purple" cx="50%" cy="50%" r="55%">
									<stop offset="0%" stopColor="#9d8bba" stopOpacity="0.7" />
									<stop offset="65%" stopColor="#7d6ba0" stopOpacity="0.65" />
									<stop offset="100%" stopColor="#5e4f80" stopOpacity="0.4" />
								</radialGradient>
								<radialGradient id="fvn-green" cx="50%" cy="50%" r="55%">
									<stop offset="0%" stopColor="#a3b572" stopOpacity="0.65" />
									<stop offset="65%" stopColor="#7d8c52" stopOpacity="0.65" />
									<stop offset="100%" stopColor="#5a6638" stopOpacity="0.4" />
								</radialGradient>
								<radialGradient id="fvn-yellow" cx="50%" cy="50%" r="55%">
									<stop offset="0%" stopColor="#e5b65a" stopOpacity="0.7" />
									<stop offset="65%" stopColor="#c69533" stopOpacity="0.65" />
									<stop offset="100%" stopColor="#8a661f" stopOpacity="0.4" />
								</radialGradient>
							</defs>

							<circle
								cx="300"
								cy="300"
								r="240"
								fill="none"
								stroke="rgba(236,231,216,0.18)"
								strokeWidth="1"
								strokeDasharray="2 6"
							/>

							<g style={{ mixBlendMode: "screen" }}>
								<circle
									className="featured-venn-writing"
									cx="220"
									cy="220"
									r="155"
									fill="url(#fvn-purple)"
									filter="url(#fvn-grain-purple)"
								/>
								<circle
									className="featured-venn-product"
									cx="380"
									cy="220"
									r="155"
									fill="url(#fvn-green)"
									filter="url(#fvn-grain-green)"
								/>
								<circle
									className="featured-venn-visual"
									cx="300"
									cy="355"
									r="155"
									fill="url(#fvn-yellow)"
									filter="url(#fvn-grain-yellow)"
								/>
							</g>

							<g fill="none" opacity="0.4">
								<circle
									cx="220"
									cy="220"
									r="155"
									stroke="#9d8bba"
									strokeWidth="0.6"
								/>
								<circle
									cx="380"
									cy="220"
									r="155"
									stroke="#a3b572"
									strokeWidth="0.6"
								/>
								<circle
									cx="300"
									cy="355"
									r="155"
									stroke="#e5b65a"
									strokeWidth="0.6"
								/>
							</g>

							<g stroke="rgba(236,231,216,0.55)" strokeWidth="1" fill="none">
								<line x1="90" y1="80" x2="190" y2="185" />
								<circle
									cx="90"
									cy="80"
									r="3"
									fill="none"
									stroke="rgba(236,231,216,0.7)"
								/>
								<circle cx="190" cy="185" r="3" fill="rgba(236,231,216,0.85)" />

								<line x1="510" y1="80" x2="410" y2="185" />
								<circle
									cx="510"
									cy="80"
									r="3"
									fill="none"
									stroke="rgba(236,231,216,0.7)"
								/>
								<circle cx="410" cy="185" r="3" fill="rgba(236,231,216,0.85)" />

								<line x1="300" y1="530" x2="300" y2="395" />
								<circle
									cx="300"
									cy="530"
									r="3"
									fill="none"
									stroke="rgba(236,231,216,0.7)"
								/>
								<circle cx="300" cy="395" r="3" fill="rgba(236,231,216,0.85)" />

								<line x1="190" y1="185" x2="300" y2="295" />
								<line x1="410" y1="185" x2="300" y2="295" />
								<line x1="300" y1="395" x2="300" y2="295" />
							</g>

							<circle cx="300" cy="295" r="7" fill="#ece7d8" />
							<circle
								cx="300"
								cy="295"
								r="11"
								fill="none"
								stroke="rgba(236,231,216,0.25)"
								strokeWidth="1"
							/>
						</svg>

						<div className="featured-venn-label featured-venn-label-writing">
							<span className="featured-venn-cap">Writing</span>
							<span className="featured-venn-desc">
								Make ideas
								<br />
								resonate.
							</span>
						</div>
						<div className="featured-venn-label featured-venn-label-product">
							<span className="featured-venn-cap">Product Design</span>
							<span className="featured-venn-desc">
								Make things
								<br />
								work.
							</span>
						</div>
						<div className="featured-venn-label featured-venn-label-visual">
							<span className="featured-venn-cap">Visual Systems</span>
							<span className="featured-venn-desc">
								Make it
								<br />
								memorable.
							</span>
						</div>
					</div>
				</div>

				<div className="featured-focus-grid">
					{focusAreas.map(({ name, description, Icon }) => (
						<article className="featured-focus-card" key={name}>
							<div className="featured-focus-card-top"><Icon /><span>{name}</span></div>
							<p>{description}</p>
						</article>
					))}
				</div>
			</section>

			<div className="featured-ribbon" aria-hidden="true">
				<div className="featured-ribbon-track" ref={trackRef}>
					{[...ribbonPhrases, ...ribbonPhrases].map((phrase, index) => (
						<span className="featured-ribbon-item" key={`${phrase}-${index}`}><span className="featured-ribbon-dot">•</span>{phrase}</span>
					))}
				</div>
			</div>
		</>
	);
};

export default FeaturedProjects;
