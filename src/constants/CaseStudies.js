const caseStudies = {
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
