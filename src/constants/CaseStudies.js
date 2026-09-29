const caseStudies = {
	career-canvas: {
		projectType: "ai-product",
		contentType: "career-canvas",
		theme: { coral: "#5C4F78", warm: "#ECE7D8" },
		subtitle: "Independent product · AI + career intelligence",
		overview:
			"An AI-assisted career workspace designed to separate real professional fit from keyword similarity.",
		meta: [
			{ label: "Status", value: "V1 complete · V2 in progress" },
			{ label: "Role", value: "Product designer + AI workflow builder" },
			{ label: "Platform", value: "Base44" },
		],
	},
	pocketplay: {
		projectType: "in-development",
		contentType: "pocketplay",
		theme: { coral: "#3B1235", warm: "#FFF3D3" },
		subtitle: "Independent product · UX + engineering",
		overview:
			"A collection of small, turn-based games designed to begin, continue, and end inside Apple Messages.",
		meta: [
			{ label: "Status", value: "In development · prelaunch" },
			{ label: "Role", value: "Product owner, UX designer + front-end engineer" },
			{ label: "Platform", value: "Apple Messages" },
		],
	},
	discovereats: {
		projectType: "proof-of-concept",
		contentType: "discovereats",
		theme: {
			coral: "#9B453D",
			warm: "#F5E6D3",
		},
		subtitle: "Independent Capstone · Product + Development",
		overview:
			"An interactive food-origin encyclopedia exploring how dishes begin, adapt, and intertwine across cultures.",
		meta: [
			{ label: "Completed", value: "May 2026" },
			{ label: "Role", value: "Product designer + front-end developer" },
			{ label: "Team", value: "Independent capstone" },
			{ label: "Scope", value: "1 dish · 7 locations · 4 routes" },
		],
		liveUrl: "https://discovereats.samoncanvas.com",
	},
	wanderlust: {
		projectType: "concept",
		ownershipLabel: "Concept project · Collaborative team",
		theme: {
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
		},
		subtitle: "UX / UI Concept Project",
		overview:
			"Travel app concept exploring faster, preference-based trip discovery while keeping budget constraints visible.",
		meta: [
			{ label: "Role", value: "Lead UX Designer" },
			{ label: "Duration", value: "8 Weeks" },
			{ label: "Tools", value: "Figma, Miro, Maze" },
			{ label: "Team", value: "4 People" },
		],
		highlights: [
			"Researched pain points across fragmented travel tools and translated findings into a focused product direction.",
			"Designed a swipe-first discovery flow intended to reduce decision fatigue and make destination comparison faster.",
			"Tested interaction patterns, identified points of confusion, and iterated on the flow based on usability feedback.",
		],
		solutionCards: [
			{
				title: "Swipe to Match",
				description:
					"Quiz-tailored trip cards use a familiar save-or-skip interaction to narrow destination options.",
			},
			{
				title: "Local Discovery",
				description: "Neighborhood guides surface locally informed places and experiences.",
			},
			{
				title: "Budget Tracker",
				description: "Visible spend feedback keeps budget context close to planning decisions.",
			},
		],
		process: [
			{
				title: "Research",
				description: "Interviews, surveys, and competitor review to identify planning friction.",
			},
			{
				title: "Synthesize",
				description: "Affinity mapping, personas, and journey mapping to organize recurring needs.",
			},
			{
				title: "Ideate",
				description: "Wireframes and interaction concepts for a card-based matching flow.",
			},
			{
				title: "Test & Iterate",
				description: "Usability rounds used to identify unclear interactions and refine the experience.",
			},
		],
		outcomes: [
			"Usability feedback informed refinements to destination discovery and interaction clarity.",
			"Budget information was brought into the planning flow instead of treated as a separate task.",
			"The concept established a reusable visual and interaction foundation for future features.",
		],
	},
};

export default caseStudies;
