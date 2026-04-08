import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const MadeByMeHand = () => {
	const widgetRef = useRef(null);
	const orbRef = useRef(null);
	const blobPathRef = useRef(null);
	const panelPathRef = useRef(null);
	const bubbleRefs = useRef([]);
	const hoverTextRef = useRef(null);
	const listPanelRef = useRef(null);
	const [isHovered, setIsHovered] = useState(false);

	const BLOB_PATHS = {
		compact: "M56 18 H150 V88 L96 141 V88 H56 Z",
		expanded:
			"M18 20 C26 8, 194 8, 202 20 C214 40, 214 120, 202 140 C194 152, 26 152, 18 140 C6 120, 6 40, 18 20 Z",
	};

	const PANEL_PATHS = {
		compact: "M66 30 H140 V84 L104 118 V84 H66 Z",
		expanded:
			"M34 32 C42 24, 178 24, 186 32 C194 40, 194 120, 186 128 C178 136, 42 136, 34 128 C26 120, 26 40, 34 32 Z",
	};

	const FLAT_GREEN = "#bff142";

	const BUBBLE_BACKGROUNDS = [FLAT_GREEN, FLAT_GREEN, FLAT_GREEN];

	useEffect(() => {
		try {
			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			if (widgetRef.current) {
				gsap.set(widgetRef.current, {
					y: 100,
					opacity: 0,
				});

				gsap.to(widgetRef.current, {
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: "power2.out",
					delay: 0.5,
				});
			}

			if (!prefersReducedMotion && bubbleRefs.current.length) {
				const bubbles = bubbleRefs.current.filter(Boolean);
				gsap.set(hoverTextRef.current, { opacity: 1, scale: 1 });
				gsap.set(listPanelRef.current, { opacity: 0, y: 10, scale: 0.95 });

				bubbles.forEach((bubble, index) => {
					const duration = 2 + index * 0.32;
					gsap.to(bubble, {
						x: index % 2 === 0 ? 8 : -7,
						y: index % 3 === 0 ? -10 : 8,
						scale: 1.08,
						duration,
						repeat: -1,
						yoyo: true,
						ease: "sine.inOut",
					});
				});

				if (orbRef.current) {
					gsap.set(orbRef.current, { force3D: true, willChange: "transform" });
					gsap.to(orbRef.current, {
						y: -5,
						repeat: -1,
						yoyo: true,
						duration: 2.6,
						ease: "sine.inOut",
					});
				}
			}
		} catch (err) {
			console.error("Failed to animate hover widget:", err);
		}

		return () => {
			gsap.killTweensOf(widgetRef.current);
			gsap.killTweensOf(orbRef.current);
			gsap.killTweensOf(blobPathRef.current);
			gsap.killTweensOf(panelPathRef.current);
			gsap.killTweensOf(bubbleRefs.current);
			gsap.killTweensOf(hoverTextRef.current);
			gsap.killTweensOf(listPanelRef.current);
		};
	}, []);

	useEffect(() => {
		try {
			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			if (
				orbRef.current &&
				hoverTextRef.current &&
				listPanelRef.current &&
				blobPathRef.current &&
				panelPathRef.current
			) {
				const bubbles = bubbleRefs.current.filter(Boolean);
				const morphDuration = prefersReducedMotion ? 0 : 0.52;

				if (isHovered) {
					gsap.to(orbRef.current, {
						scale: 1,
						duration: prefersReducedMotion ? 0 : 0.3,
						ease: "sine.out",
					});
					gsap.to(hoverTextRef.current, {
						opacity: 0,
						scale: 0.86,
						duration: prefersReducedMotion ? 0 : 0.28,
						ease: "sine.out",
					});
					gsap.to(listPanelRef.current, {
						opacity: 1,
						y: 0,
						scale: 1,
						duration: prefersReducedMotion ? 0 : 0.34,
						ease: "sine.out",
					});
					gsap.to(blobPathRef.current, {
						attr: { d: BLOB_PATHS.expanded },
						duration: morphDuration,
						ease: "sine.inOut",
					});
					gsap.to(panelPathRef.current, {
						attr: { d: PANEL_PATHS.expanded },
						duration: morphDuration,
						ease: "sine.inOut",
					});
					gsap.to(bubbles, {
						opacity: 0.3,
						duration: prefersReducedMotion ? 0 : 0.2,
						ease: "power1.out",
					});
				} else {
					gsap.to(listPanelRef.current, {
						opacity: 0,
						y: 10,
						scale: 0.95,
						duration: prefersReducedMotion ? 0 : 0.3,
						ease: "sine.in",
					});
					gsap.to(hoverTextRef.current, {
						opacity: 1,
						scale: 1,
						duration: prefersReducedMotion ? 0 : 0.3,
						ease: "sine.inOut",
					});
					gsap.to(orbRef.current, {
						scale: 0.5,
						duration: prefersReducedMotion ? 0 : 0.28,
						ease: "power2.in",
					});
					gsap.to(blobPathRef.current, {
						attr: { d: BLOB_PATHS.compact },
						duration: morphDuration,
						ease: "sine.inOut",
					});
					gsap.to(panelPathRef.current, {
						attr: { d: PANEL_PATHS.compact },
						duration: morphDuration,
						ease: "sine.inOut",
					});
					gsap.to(bubbles, {
						opacity: 0.9,
						duration: prefersReducedMotion ? 0 : 0.22,
						ease: "power1.inOut",
					});
				}
			}
		} catch (err) {
			console.error("Hover animation error:", err);
		}
	}, [isHovered]);

	const techStack = ["React 19", "GSAP", "MUI", "Tailwind", "Router"];

	return (
		<div
			ref={widgetRef}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onFocus={() => setIsHovered(true)}
			onBlur={() => setIsHovered(false)}
			style={{
				position: "fixed",
				bottom: "22px",
				right: "20px",
				zIndex: 110,
				cursor: "pointer",
				fontFamily: '"Avenir Next", "Helvetica Neue", Arial, sans-serif',
				userSelect: "none",
			}}
		>
			<button
				type="button"
				aria-label="Website by me"
				ref={orbRef}
				style={{
					position: "relative",
					width: 156,
					height: 114,
					background: "transparent",
					border: "none",
					padding: 0,
					margin: 0,
					outline: "none",
					transformOrigin: "100% 100%",
					transform: "scale(0.5)",
					willChange: "transform",
					filter: "drop-shadow(0 10px 16px rgba(80, 78, 121, 0.14))",
				}}
			>
				<svg
					aria-hidden="true"
					viewBox="0 0 220 160"
					style={{
						position: "relative",
						display: "block",
						width: "100%",
						height: "100%",
					}}
				>
					<defs>
						<linearGradient
							id="hover-blob"
							x1="0%"
							y1="0%"
							x2="100%"
							y2="100%"
							gradientTransform="rotate(18)"
						>
							<stop offset="0%" stopColor={FLAT_GREEN} />
							<stop offset="100%" stopColor={FLAT_GREEN} />
						</linearGradient>
						<linearGradient id="hover-core" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor={FLAT_GREEN} />
							<stop offset="100%" stopColor={FLAT_GREEN} />
						</linearGradient>
					</defs>
					<path
						ref={blobPathRef}
						d={BLOB_PATHS.compact}
						fill="url(#hover-blob)"
						opacity="0.94"
					/>
					<path
						ref={panelPathRef}
						d={PANEL_PATHS.compact}
						fill="url(#hover-core)"
					/>
				</svg>

				<div
					ref={hoverTextRef}
					style={{
						position: "absolute",
						left: "clamp(2rem, 1.7rem + 1vw, 2.65rem)",
						top: "clamp(0.7rem, 0.5rem + 0.5vw, 0.95rem)",
						width: "clamp(3.4rem, 2.8rem + 1.9vw, 4.7rem)",
						height: "clamp(2.15rem, 1.8rem + 1.1vw, 3rem)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "clamp(0.85rem, 0.6rem + 0.7vw, 1.05rem)",
						fontWeight: 800,
						letterSpacing: "0.02em",
						color: "#27420f",
						textShadow: "none",
						padding: "0 8px",
						textAlign: "center",
						lineHeight: 1,
					}}
				>
					Psst!
				</div>

				<div
					ref={listPanelRef}
					style={{
						position: "absolute",
						left: "clamp(1.1rem, 0.9rem + 0.8vw, 1.75rem)",
						right: "clamp(1.1rem, 0.9rem + 0.8vw, 1.75rem)",
						top: "clamp(1.1rem, 0.9rem + 0.8vw, 1.75rem)",
						bottom: "clamp(1rem, 0.8rem + 0.7vw, 1.5rem)",
						display: "grid",
						alignContent: "start",
						gap: "clamp(0.2rem, 0.15rem + 0.1vw, 0.35rem)",
						padding:
							"clamp(0.4rem, 0.32rem + 0.25vw, 0.75rem) clamp(0.45rem, 0.35rem + 0.3vw, 0.95rem)",
						borderRadius: "clamp(0.7rem, 0.55rem + 0.4vw, 1rem)",
						background: "rgba(248, 238, 232, 0.92)",
						border: "1px solid rgba(255,255,255,0.85)",
						backdropFilter: "blur(8px)",
						boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
						color: "#6c2828",
						textAlign: "left",
						pointerEvents: "none",
					}}
				>
					<div
						style={{
							fontSize: "clamp(0.48rem, 0.36rem + 0.22vw, 0.68rem)",
							fontWeight: 700,
							textTransform: "uppercase",
							letterSpacing: "0.03em",
						}}
					>
						Built with
					</div>
					<ul
						style={{
							margin: 0,
							padding: 0,
							listStyle: "none",
							fontSize: "clamp(0.5rem, 0.38rem + 0.25vw, 0.72rem)",
							lineHeight: 1.2,
							display: "grid",
							gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
							gap: "2px 8px",
						}}
					>
						{techStack.map((tech) => (
							<li key={tech}>{tech}</li>
						))}
					</ul>
				</div>

				{[
					{ left: 12, top: 38, size: 9 },
					{ left: 18, top: 102, size: 12 },
					{ left: 38, top: 130, size: 10 },
					{ left: 188, top: 24, size: 10 },
					{ left: 200, top: 50, size: 11 },
					{ left: 178, top: 92, size: 8 },
				].map((bubble, index) => (
					<span
						key={`${bubble.left}-${bubble.top}`}
						ref={(el) => {
							bubbleRefs.current[index] = el;
						}}
						aria-hidden="true"
						style={{
							position: "absolute",
							left: bubble.left,
							top: bubble.top,
							width: bubble.size,
							height: bubble.size,
							borderRadius: "50%",
							background: BUBBLE_BACKGROUNDS[index % BUBBLE_BACKGROUNDS.length],
							border: "none",
							boxShadow: "none",
							opacity: 0.9,
						}}
					/>
				))}
			</button>
		</div>
	);
};

export default MadeByMeHand;
