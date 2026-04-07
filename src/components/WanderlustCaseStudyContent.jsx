const WanderlustCaseStudyContent = ({ caseStudy }) => {
	const C = caseStudy.theme;

	return (
		<article style={{ background: C.warm, borderRadius: "20px" }}>
			<section style={{ textAlign: "center", marginBottom: "2rem" }}>
				<p style={{ ...label(C), marginBottom: "1rem" }}>
					UX / UI Concept Project
				</p>
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
					{caseStudy.overview}
				</p>

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
					{caseStudy.meta.map((item) => (
						<div key={item.label} style={{ textAlign: "center" }}>
							<div
								style={{
									fontWeight: 600,
									color: C.navy,
									marginBottom: "0.25rem",
								}}
							>
								{item.value}
							</div>
							<div>{item.label}</div>
						</div>
					))}
				</div>
			</section>

			<Divider theme={C} />

			<Section number="01" title="The Problem" theme={C}>
				<p style={bodyText}>
					Millennial travelers feel overwhelmed by the sheer number of options
					across fragmented platforms. Our research with 150+ users revealed
					three core pain points:
				</p>
				<div style={{ ...grid3, marginTop: "2rem" }}>
					<StatCard
						stat="78%"
						label="feel overwhelmed by travel options"
						accent={C.coral}
						theme={C}
					/>
					<StatCard
						stat="65%"
						label="want authentic local experiences"
						accent={C.sage}
						theme={C}
					/>
					<StatCard
						stat="4-6"
						label="apps used per single trip"
						accent={C.coral}
						theme={C}
					/>
				</div>
			</Section>

			<Divider theme={C} />

			<Section number="02" title="Process" theme={C}>
				<p style={bodyText}>
					I followed a double-diamond approach — diverging to explore the
					problem space, then converging on a focused solution.
				</p>
				<div style={processGrid}>
					{caseStudy.process.map((step, index) => (
						<div
							key={step.title}
							style={{
								background: C.white,
								borderRadius: "12px",
								padding: "1.5rem",
								border: `1px solid ${C.border}`,
								borderTop: `3px solid ${index % 2 === 0 ? C.coral : C.sage}`,
							}}
						>
							<h4 style={cardHeading(C)}>{step.title}</h4>
							<p style={cardBody}>{step.description}</p>
						</div>
					))}
				</div>
			</Section>

			<Divider theme={C} />

			<Section number="03" title="The Solution" theme={C}>
				<p style={bodyText}>
					Wanderlust distills trip discovery down to three simple interactions:
				</p>
				<div style={solutionGrid}>
					{caseStudy.solutionCards.map((card) => (
						<div key={card.title}>
							<div style={phoneFrame(C)}>
								<div style={phoneNotch} />
								<span style={placeholderText}>Screen</span>
							</div>
							<h4 style={solutionHeading(C)}>{card.title}</h4>
							<p style={solutionText}>{card.description}</p>
						</div>
					))}
				</div>
			</Section>

			<Divider theme={C} />

			<Section number="04" title="Style Guide" theme={C}>
				<div style={styleGuideGrid}>
					<div style={card(C)}>
						<h4 style={cardTitle(C)}>Colors</h4>
						<div style={swatchRow}>
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
											...swatch(bg),
											border: "1px solid rgba(0,0,0,0.08)",
										}}
									/>
									<div style={swatchName(C)}>{name}</div>
									<div style={swatchHex(C)}>{hex}</div>
								</div>
							))}
						</div>
					</div>

					<div style={card(C)}>
						<h4 style={cardTitle(C)}>Typography</h4>
						<div style={{ marginBottom: "1rem" }}>
							<div style={microLabel(C)}>Headings</div>
							<div style={headline(C)}>Poppins Bold</div>
						</div>
						<div style={{ marginBottom: "1rem" }}>
							<div style={microLabel(C)}>Body</div>
							<div style={bodyCopy}>Inter Regular</div>
						</div>
						<div>
							<div style={microLabel(C)}>Scale</div>
							<div style={scaleCopy}>32 / 24 / 18 / 16 / 14 / 12</div>
						</div>
					</div>

					<div style={card(C)}>
						<h4 style={cardTitle(C)}>Components</h4>
						<div style={componentRow}>
							{[
								{ label: "CTA", bg: C.coral, radius: "8px" },
								{ label: "Pill", bg: C.sage, radius: "20px" },
								{
									label: "Card",
									bg: C.white,
									radius: "12px",
									border: `1px solid ${C.border}`,
									text: C.navy,
								},
							].map((item) => (
								<div key={item.label} style={{ textAlign: "center" }}>
									<div
										style={{
											width: "56px",
											height: "36px",
											borderRadius: item.radius,
											background: item.bg,
											border: item.border || "none",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											color: item.text || "#fff",
											fontSize: "0.7rem",
											fontWeight: 600,
										}}
									>
										{item.label}
									</div>
									<div style={radiusLabel(C)}>{item.radius}</div>
								</div>
							))}
						</div>
						<div style={spacingText}>
							Spacing: 4px base grid · 8 / 16 / 24 / 32 / 48
						</div>
					</div>
				</div>
			</Section>

			<Divider theme={C} />

			<Section number="05" title="Results & Takeaways" theme={C}>
				<p style={bodyText}>
					Across 3 rounds of usability testing, the swipe-based model proved
					significantly faster and more engaging than traditional search
					interfaces.
				</p>
				<div style={{ ...grid3, marginTop: "2rem" }}>
					<StatCard
						stat="92%"
						label="task completion rate"
						accent={C.sage}
						theme={C}
					/>
					<StatCard
						stat="40%"
						label="faster trip planning vs. baseline"
						accent={C.coral}
						theme={C}
					/>
					<StatCard
						stat="4.6/5"
						label="average usability score"
						accent={C.sage}
						theme={C}
					/>
				</div>

				<div style={{ ...card(C), marginTop: "2rem" }}>
					<h4 style={cardTitle(C)}>Key Learnings</h4>
					<ul style={takeawayList}>
						{caseStudy.outcomes.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</div>
			</Section>
		</article>
	);
};

const Section = ({ number, title, theme, children }) => (
	<section style={{ marginBottom: "3rem" }}>
		<p style={{ ...label(theme), marginBottom: "0.5rem" }}>{number}</p>
		<h2
			style={{
				fontSize: "clamp(1.5rem, 3vw, 2rem)",
				fontWeight: 700,
				color: theme.navy,
				marginBottom: "1.25rem",
			}}
		>
			{title}
		</h2>
		{children}
	</section>
);

const StatCard = ({ stat, label: text, accent, theme }) => (
	<div
		style={{
			...card(theme),
			textAlign: "center",
			borderTop: `3px solid ${accent}`,
		}}
	>
		<div
			style={{
				fontSize: "2rem",
				fontWeight: 700,
				color: accent,
				marginBottom: "0.25rem",
			}}
		>
			{stat}
		</div>
		<div style={{ fontSize: "0.85rem", color: theme.gray }}>{text}</div>
	</div>
);

const Divider = ({ theme }) => (
	<hr
		style={{
			border: "none",
			borderTop: `1px solid ${theme.border}`,
			margin: "0 auto 2.5rem",
			maxWidth: "120px",
		}}
	/>
);

const bodyText = {
	fontSize: "1.05rem",
	color: "#555",
	lineHeight: 1.75,
	maxWidth: "640px",
};

const card = (theme) => ({
	background: theme.white,
	borderRadius: "12px",
	padding: "1.5rem",
	border: `1px solid ${theme.border}`,
});

const cardTitle = (theme) => ({
	fontWeight: 600,
	color: theme.navy,
	marginBottom: "1rem",
	fontSize: "1rem",
});

const grid3 = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
	gap: "1.5rem",
};

const processGrid = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
	gap: "1.5rem",
	marginTop: "2rem",
};

const solutionGrid = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
	gap: "1.5rem",
	marginTop: "2rem",
};

const styleGuideGrid = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
	gap: "1.5rem",
};

const label = (theme) => ({
	textTransform: "uppercase",
	letterSpacing: "3px",
	fontSize: "0.7rem",
	color: theme.gray,
});

const microLabel = (theme) => ({
	fontSize: "0.7rem",
	color: theme.gray,
	marginBottom: "0.25rem",
	textTransform: "uppercase",
	letterSpacing: "1px",
});

const headline = (theme) => ({
	fontFamily: "'Poppins', sans-serif",
	fontWeight: 700,
	fontSize: "1.5rem",
	color: theme.navy,
});

const bodyCopy = {
	fontFamily: "'Inter', sans-serif",
	fontWeight: 400,
	fontSize: "1rem",
	color: "#555",
};

const scaleCopy = {
	fontSize: "0.85rem",
	color: "#666",
	lineHeight: 1.8,
};

const spacingText = {
	marginTop: "1rem",
	fontSize: "0.8rem",
	color: "#666",
	lineHeight: 1.6,
};

const takeawayList = {
	paddingLeft: "1.25rem",
	color: "#666",
	fontSize: "0.9rem",
	lineHeight: 1.8,
};

const swatch = (bg) => ({
	width: "48px",
	height: "48px",
	borderRadius: "10px",
	background: bg,
	marginBottom: "0.35rem",
});

const swatchName = (theme) => ({
	fontSize: "0.7rem",
	fontWeight: 600,
	color: theme.navy,
});

const swatchHex = (theme) => ({
	fontSize: "0.65rem",
	color: theme.gray,
});

const cardHeading = (theme) => ({
	fontWeight: 600,
	color: theme.navy,
	marginBottom: "0.5rem",
	fontSize: "1rem",
});

const cardBody = {
	fontSize: "0.9rem",
	color: "#666",
	lineHeight: 1.6,
};

const phoneFrame = (theme) => ({
	background: theme.sand,
	borderRadius: "20px",
	height: "320px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	marginBottom: "1rem",
	border: `1px solid ${theme.border}`,
	position: "relative",
	overflow: "hidden",
});

const phoneNotch = {
	position: "absolute",
	top: "12px",
	left: "50%",
	transform: "translateX(-50%)",
	width: "60px",
	height: "6px",
	borderRadius: "3px",
	background: "rgba(0,0,0,0.1)",
};

const placeholderText = {
	color: "#888",
	fontSize: "0.8rem",
	fontStyle: "italic",
};

const solutionHeading = (theme) => ({
	fontWeight: 600,
	color: theme.navy,
	marginBottom: "0.35rem",
	fontSize: "0.95rem",
});

const solutionText = {
	fontSize: "0.85rem",
	color: "#666",
	lineHeight: 1.6,
};

const swatchRow = { display: "flex", gap: "0.75rem", flexWrap: "wrap" };
const componentRow = {
	display: "flex",
	gap: "1rem",
	flexWrap: "wrap",
	alignItems: "flex-end",
};
const radiusLabel = (theme) => ({
	fontSize: "0.65rem",
	color: theme.gray,
	marginTop: "0.25rem",
});

export default WanderlustCaseStudyContent;
