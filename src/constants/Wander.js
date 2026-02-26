import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ── Brand Colors ── */
const C = {
	coral: "#E8634A",
	coralLight: "#FFF0ED",
	sand: "#F5E6D3",
	sage: "#7A9E7E",
	sageLight: "#EDF5EE",
	navy: "#2C3E50",
	warm: "#FAF7F4",
	white: "#FFFFFF",
	gray: "#888",
	border: "#E8E2DA",
};

const WanderlustCaseStudyPage = () => {
	const navigate = useNavigate();

	return (
		<div style={{ minHeight: "100vh", background: C.warm }}>
			{/* Sticky Header */}
			<header
				style={{
					position: "sticky",
					top: 0,
					zIndex: 10,
					background: "rgba(250,247,244,0.92)",
					backdropFilter: "blur(12px)",
					borderBottom: `1px solid ${C.border}`,
					padding: "1rem 2rem",
				}}
			>
				<div
					style={{
						maxWidth: "900px",
						margin: "0 auto",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<button
						onClick={() => navigate(-1)}
						style={{
							display: "flex",
							alignItems: "center",
							gap: "0.5rem",
							background: "none",
							border: "none",
							cursor: "pointer",
							fontSize: "0.95rem",
							color: "#555",
						}}
						aria-label="Go back"
					>
						<ArrowLeft size={18} />
						Back
					</button>
					<span style={{ fontWeight: 600, fontSize: "1rem", color: C.navy }}>
						Wanderlust
					</span>
					<div style={{ width: "60px" }} />
				</div>
			</header>

			{/* Content */}
			<main style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 2rem 6rem" }}>

				{/* ── Hero ── */}
				<section style={{ textAlign: "center", marginBottom: "2rem" }}>
					<p style={{ ...label, marginBottom: "1rem" }}>UX / UI Concept Project</p>
					<h1
						style={{
							fontSize: "clamp(2rem, 5vw, 3.5rem)",
							fontWeight: 700,
							color: C.navy,
							marginBottom: "1.5rem",
							lineHeight: 1.15,
						}}
					>
						Wanderlust
					</h1>
					<p
						style={{
							fontSize: "1.15rem",
							color: "#666",
							maxWidth: "560px",
							margin: "0 auto 2.5rem",
							lineHeight: 1.7,
						}}
					>
						A travel app concept that replaces overwhelming search with
						a simple swipe-based experience — matching users to trips
						tailored to their style and budget.
					</p>

					{/* Meta bar */}
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							flexWrap: "wrap",
							gap: "2.5rem",
							fontSize: "0.85rem",
							color: C.gray,
						}}
					>
						{[
							["Role", "Lead UX Designer"],
							["Duration", "8 Weeks"],
							["Tools", "Figma, Miro, Maze"],
							["Team", "4 People"],
						].map(([lbl, value]) => (
							<div key={lbl} style={{ textAlign: "center" }}>
								<div style={{ fontWeight: 600, color: C.navy, marginBottom: "0.25rem" }}>
									{value}
								</div>
								<div>{lbl}</div>
							</div>
						))}
					</div>
				</section>

				{/* Hero image placeholder
				<ImagePlaceholder
					height="420px"
					label="Hero Mockup — App Overview"
					accent={C.coral}
				/> */}

				<Divider />

				{/* ── Problem ── */}
				<Section number="01" title="The Problem">
					<p style={bodyText}>
						Millennial travelers feel overwhelmed by the sheer number of
						options across fragmented platforms. Our research with 150+
						users revealed three core pain points:
					</p>
					<div style={{ ...grid3, marginTop: "2rem" }}>
						<StatCard stat="78%" label="feel overwhelmed by travel options" accent={C.coral} />
						<StatCard stat="65%" label="want authentic local experiences" accent={C.sage} />
						<StatCard stat="4-6" label="apps used per single trip" accent={C.coral} />
					</div>
					{/* <ImagePlaceholder
						height="300px"
						label="Affinity Map & Survey Insights"
						accent={C.sage}
						style={{ marginTop: "2rem" }}
					/> */}
				</Section>

				<Divider />

				{/* ── Process ── */}
				<Section number="02" title="Process">
					<p style={bodyText}>
						I followed a double-diamond approach — diverging to explore the
						problem space, then converging on a focused solution.
					</p>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
							gap: "1.5rem",
							marginTop: "2rem",
						}}
					>
						{[
							["Research", "User interviews, surveys, competitive audit of Airbnb, TripAdvisor & Kayak"],
							["Synthesize", "Affinity mapping, two personas, journey map highlighting key frustrations"],
							["Ideate", "Sketches, lo-fi wireframes, swipe-based interaction model"],
							["Test & Iterate", "3 rounds of usability testing with 24 participants via Maze"],
						].map(([title, desc], i) => (
							<div
								key={title}
								style={{
									background: C.white,
									borderRadius: "12px",
									padding: "1.5rem",
									border: `1px solid ${C.border}`,
									borderTop: `3px solid ${i % 2 === 0 ? C.coral : C.sage}`,
								}}
							>
								<h4 style={{ fontWeight: 600, color: C.navy, marginBottom: "0.5rem", fontSize: "1rem" }}>
									{title}
								</h4>
								<p style={{ fontSize: "0.9rem", color: "#666", lineHeight: 1.6 }}>
									{desc}
								</p>
							</div>
						))}
					</div>
					{/* <ImagePlaceholder
						height="260px"
						label="User Persona Cards"
						accent={C.coral}
						style={{ marginTop: "2rem" }}
					/> */}
				</Section>

				<Divider />

				{/* ── Solution ── */}
				<Section number="03" title="The Solution">
					<p style={bodyText}>
						Wanderlust distills trip discovery down to three simple
						interactions:
					</p>

					{/* Wireframe placeholders row */}
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
							gap: "1.5rem",
							marginTop: "2rem",
						}}
					>
						{[
							["Swipe to Match", "A card-based interface surfaces trips tailored to the user's style quiz — swipe right to save, left to skip."],
							["Local Discovery", "Curated guides from locals replace generic tourist lists, surfacing hidden gems by neighborhood."],
							["Budget Tracker", "Real-time spending breakdown keeps users confident and in control throughout their trip."],
						].map(([title, desc]) => (
							<div key={title}>
								{/* Phone wireframe placeholder */}
								<div
									style={{
										background: C.sand,
										borderRadius: "20px",
										height: "320px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										marginBottom: "1rem",
										border: `1px solid ${C.border}`,
										position: "relative",
										overflow: "hidden",
									}}
								>
									{/* Phone notch */}
									<div
										style={{
											position: "absolute",
											top: "12px",
											left: "50%",
											transform: "translateX(-50%)",
											width: "60px",
											height: "6px",
											borderRadius: "3px",
											background: "rgba(0,0,0,0.1)",
										}}
									/>
									<span style={{ color: C.gray, fontSize: "0.8rem", fontStyle: "italic" }}>
										{title} Screen
									</span>
								</div>
								<h4 style={{ fontWeight: 600, color: C.navy, marginBottom: "0.35rem", fontSize: "0.95rem" }}>
									{title}
								</h4>
								<p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.6 }}>
									{desc}
								</p>
							</div>
						))}
					</div>
				</Section>

				<Divider />

				{/* ── Style Guide ── */}
				<Section number="04" title="Style Guide">
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
							gap: "1.5rem",
						}}
					>
						{/* Colors */}
						<div style={{ ...card }}>
							<h4 style={cardTitle}>Colors</h4>
							<div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
								{[
									[C.coral, "Coral", "#E8634A"],
									[C.sage, "Sage", "#7A9E7E"],
									[C.navy, "Navy", "#2C3E50"],
									[C.sand, "Sand", "#F5E6D3"],
									["#F9F9F9", "Off-White", "#F9F9F9"],
								].map(([bg, name, hex]) => (
									<div key={name} style={{ textAlign: "center" }}>
										<div
											style={{
												width: "48px",
												height: "48px",
												borderRadius: "10px",
												background: bg,
												border: "1px solid rgba(0,0,0,0.08)",
												marginBottom: "0.35rem",
											}}
										/>
										<div style={{ fontSize: "0.7rem", fontWeight: 600, color: C.navy }}>{name}</div>
										<div style={{ fontSize: "0.65rem", color: C.gray }}>{hex}</div>
									</div>
								))}
							</div>
						</div>

						{/* Typography */}
						<div style={{ ...card }}>
							<h4 style={cardTitle}>Typography</h4>
							<div style={{ marginBottom: "1rem" }}>
								<div style={{ fontSize: "0.7rem", color: C.gray, marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "1px" }}>
									Headings
								</div>
								<div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: C.navy }}>
									Poppins Bold
								</div>
							</div>
							<div style={{ marginBottom: "1rem" }}>
								<div style={{ fontSize: "0.7rem", color: C.gray, marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "1px" }}>
									Body
								</div>
								<div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "1rem", color: "#555" }}>
									Inter Regular
								</div>
							</div>
							<div>
								<div style={{ fontSize: "0.7rem", color: C.gray, marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "1px" }}>
									Scale
								</div>
								<div style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.8 }}>
									32 / 24 / 18 / 16 / 14 / 12
								</div>
							</div>
						</div>

						{/* Spacing & Radius */}
						<div style={{ ...card }}>
							<h4 style={cardTitle}>Components</h4>
							<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-end" }}>
								<div style={{ textAlign: "center" }}>
									<div
										style={{
											width: "56px",
											height: "36px",
											borderRadius: "8px",
											background: C.coral,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											color: "#fff",
											fontSize: "0.7rem",
											fontWeight: 600,
										}}
									>
										CTA
									</div>
									<div style={{ fontSize: "0.65rem", color: C.gray, marginTop: "0.25rem" }}>8px radius</div>
								</div>
								<div style={{ textAlign: "center" }}>
									<div
										style={{
											width: "56px",
											height: "36px",
											borderRadius: "20px",
											background: C.sage,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											color: "#fff",
											fontSize: "0.7rem",
											fontWeight: 600,
										}}
									>
										Pill
									</div>
									<div style={{ fontSize: "0.65rem", color: C.gray, marginTop: "0.25rem" }}>20px radius</div>
								</div>
								<div style={{ textAlign: "center" }}>
									<div
										style={{
											width: "56px",
											height: "36px",
											borderRadius: "12px",
											background: C.white,
											border: `1px solid ${C.border}`,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											fontSize: "0.7rem",
											fontWeight: 600,
											color: C.navy,
										}}
									>
										Card
									</div>
									<div style={{ fontSize: "0.65rem", color: C.gray, marginTop: "0.25rem" }}>12px radius</div>
								</div>
							</div>
							<div style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#666", lineHeight: 1.6 }}>
								Spacing: 4px base grid · 8 / 16 / 24 / 32 / 48
							</div>
						</div>
					</div>
				</Section>

				<Divider />

				{/* ── Results ── */}
				<Section number="05" title="Results & Takeaways">
					<p style={bodyText}>
						Across 3 rounds of usability testing, the swipe-based model
						proved significantly faster and more engaging than traditional
						search interfaces.
					</p>
					<div style={{ ...grid3, marginTop: "2rem" }}>
						<StatCard stat="92%" label="task completion rate" accent={C.sage} />
						<StatCard stat="40%" label="faster trip planning vs. baseline" accent={C.coral} />
						<StatCard stat="4.6/5" label="average usability score" accent={C.sage} />
					</div>

					{/* <ImagePlaceholder
						height="360px"
						label="Final Hi-Fi Mockups"
						accent={C.coral}
						style={{ marginTop: "2rem" }}
					/> */}

					<div style={{ ...card, marginTop: "2rem" }}>
						<h4 style={cardTitle}>Key Learnings</h4>
						<ul
							style={{
								paddingLeft: "1.25rem",
								color: "#666",
								fontSize: "0.9rem",
								lineHeight: 1.8,
							}}
						>
							<li>Constraint breeds clarity — limiting choices reduced decision fatigue.</li>
							<li>Testing early with paper prototypes saved two weeks of rework.</li>
							<li>Budget visibility was the #1 post-test feature request even before we built it.</li>
						</ul>
					</div>
				</Section>
			</main>
		</div>
	);
};

/* ── Shared Styles ── */

const bodyText = {
	fontSize: "1.05rem",
	color: "#555",
	lineHeight: 1.75,
	maxWidth: "640px",
};

const label = {
	textTransform: "uppercase",
	letterSpacing: "3px",
	fontSize: "0.7rem",
	color: "#bbb",
};

const card = {
	background: C.white,
	borderRadius: "12px",
	padding: "1.5rem",
	border: `1px solid ${C.border}`,
};

const cardTitle = {
	fontWeight: 600,
	color: C.navy,
	marginBottom: "1rem",
	fontSize: "1rem",
};

const grid3 = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
	gap: "1.5rem",
};

/* ── Shared Components ── */

const Section = ({ number, title, children }) => (
	<section style={{ marginBottom: "3rem" }}>
		<p style={{ ...label, marginBottom: "0.5rem" }}>{number}</p>
		<h2
			style={{
				fontSize: "clamp(1.5rem, 3vw, 2rem)",
				fontWeight: 700,
				color: C.navy,
				marginBottom: "1.25rem",
			}}
		>
			{title}
		</h2>
		{children}
	</section>
);

const StatCard = ({ stat, label: text, accent }) => (
	<div
		style={{
			...card,
			textAlign: "center",
			borderTop: `3px solid ${accent}`,
		}}
	>
		<div style={{ fontSize: "2rem", fontWeight: 700, color: accent, marginBottom: "0.25rem" }}>
			{stat}
		</div>
		<div style={{ fontSize: "0.85rem", color: C.gray }}>{text}</div>
	</div>
);

const ImagePlaceholder = ({ height = "300px", label: text, accent, style = {} }) => (
	<div
		style={{
			background: `linear-gradient(135deg, ${accent}15, ${accent}08)`,
			borderRadius: "16px",
			height,
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			border: `2px dashed ${accent}40`,
			gap: "0.75rem",
			...style,
		}}
	>
		{/* Image icon */}
		<svg
			width="40"
			height="40"
			viewBox="0 0 24 24"
			fill="none"
			stroke={accent}
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			style={{ opacity: 0.5 }}
		>
			<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
			<circle cx="8.5" cy="8.5" r="1.5" />
			<polyline points="21 15 16 10 5 21" />
		</svg>
		<span style={{ color: accent, fontSize: "0.8rem", fontWeight: 500, opacity: 0.7 }}>
			{text}
		</span>
	</div>
);

const Divider = () => (
	<hr
		style={{
			border: "none",
			borderTop: `1px solid ${C.border}`,
			margin: "0 auto 2.5rem",
			maxWidth: "120px",
		}}
	/>
);

export default WanderlustCaseStudyPage;
