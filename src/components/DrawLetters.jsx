import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/Letters.css";
import Grid from "@mui/material/Grid";

export default function Letter() {
	const svgRef = useRef(null);

	useLayoutEffect(() => {
		// local handle to the timeline so cleanup sees a stable reference
		let localDrawTween = null;
		// scope animations to the svgRef to avoid global selector leakage
		const ctx = gsap.context(() => {
			const svg = svgRef.current;
			if (!svg) return;

			const mainPath = svg.querySelector("path.sam-text");
			const glowPath = svg.querySelector("path.glow-path");
			const feGaussian = svg.querySelector("feGaussianBlur");
			if (!mainPath) return;

			const length = mainPath.getTotalLength();

			const prefersReducedMotion =
				window.matchMedia &&
				window.matchMedia("(prefers-reduced-motion: reduce)").matches;

			// set initial appearance & dash attributes
			gsap.set(mainPath, {
				attr: {
					stroke: "#a2003b",
					"stroke-width": 7,
					fill: "none",
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					"stroke-dasharray": length,
					"stroke-dashoffset": length,
				},
				style: { vectorEffect: "non-scaling-stroke" },
			});

			if (glowPath) {
				// ensure glow is hidden during the draw phase (only show at end)
				gsap.set(glowPath, {
					attr: {
						filter: "url(#neon-blur)",
						stroke: "#a2003b",
						"stroke-width": 14,
						fill: "none",
						opacity: 0, // <-- was 0.45, start fully hidden
					},
				});
			}

			if (!prefersReducedMotion) {
				// sequence: draw -> quick snap-to-full glow -> hold -> snap back to start for repeat
				// timings are tuned to make the glow feel instantaneous at the end of the draw
				const drawDuration = 4; // how long the path draws
				const overlap = 0.35; // start the glow just before the draw completes

				// timeline: repeat forever, no yoyo. We'll snap properties back to initial values at the end
				const tl = gsap.timeline({ repeat: -1, yoyo: false, repeatDelay: 0 });

				// capture local refs so cleanup uses stable references (prevents lint warning)

				// ensure initial states are applied at the start of every cycle
				if (feGaussian) tl.set(feGaussian, { attr: { stdDeviation: 0 } }, 0);
				if (glowPath) tl.set(glowPath, { attr: { opacity: 0 } }, 0);
				tl.set(mainPath, { attr: { "stroke-dashoffset": length } }, 0);
				tl.set(svg, { filter: "none" }, 0);

				// draw the path
				tl.to(mainPath, {
					duration: drawDuration,
					attr: { "stroke-dashoffset": 0 },
					ease: "power1.inOut",
				});

				// make the glow ramp very fast and use no easing so it snaps to full instantly
				const rampDuration = 0.12; // very quick ramp into full glow
				const holdAtFull = 0.8; // hold the full glow for a short time

				if (glowPath && feGaussian) {
					tl.to(
						feGaussian,
						{
							duration: rampDuration,
							attr: { stdDeviation: 18 },
							ease: "none",
						},
						`-=${overlap}`,
					);
					tl.to(
						glowPath,
						{
							duration: rampDuration,
							attr: { opacity: 0.95 },
							ease: "none",
						},
						"<",
					);
				} else {
					tl.to(
						svg,
						{
							duration: rampDuration,
							filter: "drop-shadow(0 20px 70px rgba(162,0,59,0.34))",
							ease: "none",
						},
						`-=${overlap}`,
					);
				}

				tl.to(
					mainPath,
					{ duration: rampDuration, stroke: "#ff4d79", ease: "none" },
					"<",
				);
				tl.to({}, { duration: holdAtFull });

				// snap properties back to their initial values immediately before the timeline restarts
				if (glowPath && feGaussian) {
					tl.set(feGaussian, { attr: { stdDeviation: 0 } });
					tl.set(glowPath, { attr: { opacity: 0 } });
				} else {
					tl.set(svg, { filter: "none" });
				}
				tl.set(mainPath, { attr: { stroke: "#a2003b" } });

				localDrawTween = tl;
			}
		}, svgRef);

		// cleanup all GSAP effects created in this context
		return () => {
			if (localDrawTween) localDrawTween.kill();
			ctx.revert(); // removes animations and restores original DOM styles
		};
	}, []);

	return (
		<>
			<Grid
				container
				className="animated-neon"
				sx={{ justifyContent: "center", alignItems: "center" }}
			>
				<svg
					ref={svgRef}
					viewBox="0 0 600 300"
					preserveAspectRatio="xMidYMid meet"
					style={{
						width: "100%",
						maxWidth: "600px",
						height: "auto",
						display: "block",
						marginTop: "-65px",
						zIndex: 50,
					}}
				>
					<defs>
						<filter id="neon-blur" x="-50%" y="-50%" width="200%" height="200%">
							<feGaussianBlur
								in="SourceGraphic"
								stdDeviation="0"
								result="blur"
							/>
							<feMerge>
								<feMergeNode in="blur" />
							</feMerge>
						</filter>
					</defs>

					<g transform="translate(0, 0)" className="sam-text">
						{/* glow path sits behind main path */}
						<path
							className="glow-path"
							d="M590.17,148.24c-6.51,22.51-11.67,77.71-37.9,84.51-22.95,2.02-24.62-25.31-25.64-42.01-.53-9.26-.68-18.55-1.58-27.77-1.22-12.77-4.53-31.16-20.73-31.1-33.14,1.23-53.92,38.77-60.53,67.62-.04.24-.43.2-.43-.04-.3-8.19-.52-16.39-1.49-24.51-1.46-12.02-4.54-24.61-13.05-33.63-8.42-8.93-21.73-12.59-33.56-9.36-11.84,3.04-22.01,11.64-27.33,22.61-5.49,10.96-9.7,22.58-12.58,34.5-1.92,7.94-3.19,16.05-3.57,24.21,0,0-.72-.03-.72-.03,1.14-28.41,2.79-56.8,4.64-85.18,0,0,.1.01.1.01-7.82,34.88-20.86,76.05-56.44,91.31-38.84,14.72-49.04-8.7-47.69-43.62.31-9.3,1.4-18.56,2.35-27.79,0,0,.55.09.55.09-5.08,23.11-19.09,44.74-39.89,56.58-8.21,4.63-17.55,8.59-27.19,7.21-17.31-2.9-17.26-22.63-10.3-35.14,12.92-24.82,42.01-36.73,68.91-37.25,1.19-.06,2.37.05,3.56-.24,0,0,0,.95,0,.95-11.89-.06-23.76,1.8-35.11 5.35-22.86 7.07-43.05 20.33-63.4 32.6-10.16 6.14-20.75 12.27-31.36 17.24-10.95 6.45-22.08 12.58-33.01 19.04-21.71 12.88-43.38 27.03-59.48 46.76-7.98 9.81-14.27 21.07-17.77 33.24 0 0 .01-.07 .01-.07-.14 1.8-.19 3.61-.06 5.41.85 13.99 12.89 21.53 25.66 23.66 17.45 2.88 37.41-.25 52.72-9.28 9.26-5.8 15.25-15.92 18.04-26.31 6.8-28.47-7.97-59.41-29.41-77.98-16.59-14.33-35.99-25.14-52.38-39.77-10.83-9.65-20.71-21.74-23.13-36.44-3.44-22.18 8.9-43.26 21.48-60.55 17.8-23.25 41.26-41.94 67.04-55.67 24.39-12.73 57.58-24.71 83.8-10.92 25.82 14.71 16.89 47.34 5.11 68.6-7.5 16.43-20.94 31.45-38.9 36.13 14.3-3.7 25.91-14.23 33.64-26.51 7.23-12.59 14.03-25.96 16.22-40.46 3.99-25.68-11.93-41.84-37.07-43.46C107.35-2.33 48.61 38.33 22.71 73.28 10.18 90.51-2.05 111.49 1.37 133.55c6.46 35.19 50.79 53.76 75.45 75.88 21.64 18.74 36.5 49.77 29.68 78.55-2.3 8.89-7.04 17.24-13.84 23.46-4.2 3.6-9.23 6.13-14.35 8.12-16.72 6.11-37.14 8.37-53.89 1.42-11.09-4.71-17.03-14.72-15.68-26.79 7.03-24.85 25.39-44.55 45.65-59.67 20.36-15.31 43.02-27.09 64.89-39.99 10.79-5.08 21.14-11.06 31.36-17.24 10.21-6.16 20.33-12.52 30.81-18.27 20.82-11.66 44.12-20.13 68.26-19.8.64.02.62.95 0 .96-2.37-.38-4.75-.05-7.13.06-20.9 1.75-42.38 9.38-56.64 25.3-6.1 7.01-11.15 15.5-12.17 24.87-1.26 9.73 3.53 19.17 13.84 20.66 9.38 1.37 18.66-2.55 26.7-7.06 12.31-7 22.43-17.56 29.48-29.8 4.72-8.17 8.14-17.08 10.22-26.28.03-.15.18-.25.33-.21.14.03.23.16.22.3-.97 9.25-2.09 18.47-2.42 27.75-.41 16.65.06 42.18 19.93 47.04 9.09 1.83 18.64-.45 27.17-3.69 26.52-10.78 40.85-38.28 49.37-64.13 2.95-8.82 5.12-17.97 7.13-26.99-1.5 28.35-2.98 56.83-3.97 85.25 0 .2-.18.36-.38.35-.2 0-.36-.18-.35-.38.71-16.45 5.01-32.57 11.15-47.78 3.19-7.55 6.38-15.34 12.03-21.43 14.28-16.06 39.54-19.41 55.01-3.11 8.58 9.13 11.68 21.89 13.12 33.98.96 8.16 1.15 16.37 1.44 24.56 0 0-.43-.04-.43-.04 6.7-29.02 27.57-66.72 60.96-67.92 16.4-.04 19.9 18.45 21.1 31.45 2.03 18.34.06 37.4 5.89 55.13 3.3 9.6 10.46 15.25 20.9 14.34 3.7-.86 7.44-3.05 10.23-5.81 8.57-8.52 12.75-20.36 16.36-31.66 4.81-14.99 7.15-31.71 11.37-46.7h0Z"
						/>
						{/* main drawn path */}
						<path
							className="sam-text"
							style={{
								strokeLinecap: "round",
								strokeLinejoin: "round",
							}}
							d="M590.17,148.24c-6.51,22.51-11.67,77.71-37.9,84.51-22.95,2.02-24.62-25.31-25.64-42.01-.53-9.26-.68-18.55-1.58-27.77-1.22-12.77-4.53-31.16-20.73-31.1-33.14,1.23-53.92,38.77-60.53,67.62-.04.24-.43.2-.43-.04-.3-8.19-.52-16.39-1.49-24.51-1.46-12.02-4.54-24.61-13.05-33.63-8.42-8.93-21.73-12.59-33.56-9.36-11.84,3.04-22.01,11.64-27.33,22.61-5.49,10.96-9.7,22.58-12.58,34.5-1.92,7.94-3.19,16.05-3.57,24.21,0,0-.72-.03-.72-.03,1.14-28.41,2.79-56.8,4.64-85.18,0,0,.1.01.1.01-7.82,34.88-20.86,76.05-56.44,91.31-38.84,14.72-49.04-8.7-47.69-43.62.31-9.3,1.4-18.56,2.35-27.79,0,0,.55.09.55.09-5.08,23.11-19.09,44.74-39.89,56.58-8.21,4.63-17.55,8.59-27.19,7.21-17.31-2.9-17.26-22.63-10.3-35.14,12.92-24.82,42.01-36.73,68.91-37.25,1.19-.06,2.37.05,3.56-.24,0,0,0,.95,0,.95-11.89-.06-23.76,1.8-35.11 5.35-22.86 7.07-43.05 20.33-63.4 32.6-10.16 6.14-20.75 12.27-31.36 17.24-10.95 6.45-22.08 12.58-33.01 19.04-21.71 12.88-43.38 27.03-59.48 46.76-7.98 9.81-14.27 21.07-17.77 33.24 0 0 .01-.07.01-.07-.14,1.8-.19,3.61-.06 5.41.85 13.99,12.89 21.53,25.66 23.66,17.45 2.88 37.41-.25 52.72-9.28,9.26-5.8,15.25-15.92,18.04-26.31,6.8-28.47-7.97-59.41-29.41-77.98-16.59-14.33-35.99-25.14-52.38-39.77-10.83-9.65-20.71-21.74-23.13-36.44-3.44-22.18,8.9-43.26,21.48-60.55,17.8-23.25,41.26-41.94,67.04-55.67,24.39-12.73 57.58-24.71 83.8-10.92,25.82 14.71 16.89 47.34 5.11 68.6-7.5 16.43-20.94 31.45-38.9 36.13 14.3-3.7 25.91-14.23 33.64-26.51 7.23-12.59 14.03-25.96 16.22-40.46 3.99-25.68-11.93-41.84-37.07-43.46C107.35-2.33,48.61,38.33,22.71,73.28,10.18 90.51-2.05 111.49 1.37 133.55c6.46 35.19 50.79 53.76 75.45 75.88 21.64 18.74 36.5 49.77 29.68 78.55-2.3 8.89-7.04 17.24-13.84 23.46-4.2 3.6-9.23 6.13-14.35 8.12-16.72 6.11-37.14 8.37-53.89 1.42-11.09-4.71-17.03-14.72-15.68-26.79 7.03-24.85 25.39-44.55 45.65-59.67 20.36-15.31 43.02-27.09 64.89-39.99 10.79-5.08 21.14-11.06 31.36-17.24 10.21-6.16 20.33-12.52 30.81-18.27 20.82-11.66 44.12-20.13 68.26-19.8.64.02.62.95 0 .96-2.37-.38-4.75-.05-7.13.06-20.9 1.75-42.38 9.38-56.64 25.3-6.1 7.01-11.15 15.5-12.17 24.87-1.26 9.73 3.53 19.17 13.84 20.66 9.38 1.37 18.66-2.55 26.7-7.06 12.31-7 22.43-17.56 29.48-29.8 4.72-8.17 8.14-17.08 10.22-26.28.03-.15.18-.25.33-.21.14.03.23.16.22.3-.97 9.25-2.09 18.47-2.42 27.75-.41 16.65.06 42.18 19.93 47.04 9.09 1.83 18.64-.45 27.17-3.69 26.52-10.78 40.85-38.28 49.37-64.13 2.95-8.82 5.12-17.97 7.13-26.99-1.5 28.35-2.98 56.83-3.97 85.25 0 .2-.18.36-.38.35-.2 0-.36-.18-.35-.38.71-16.45 5.01-32.57 11.15-47.78 3.19-7.55 6.38-15.34 12.03-21.43 14.28-16.06 39.54-19.41 55.01-3.11 8.58 9.13 11.68 21.89 13.12 33.98.96 8.16 1.15 16.37 1.44 24.56 0 0-.43-.04-.43-.04 6.7-29.02 27.57-66.72 60.96-67.92 16.4-.04 19.9 18.45 21.1 31.45 2.03 18.34.06 37.4 5.89 55.13 3.3 9.6 10.46 15.25 20.9 14.34 3.7-.86 7.44-3.05 10.23-5.81 8.57-8.52 12.75-20.36 16.36-31.66 4.81-14.99 7.15-31.71 11.37-46.7h0Z"
						/>
					</g>
				</svg>
			</Grid>
		</>
	);
}
