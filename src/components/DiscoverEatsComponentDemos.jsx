import { useState } from "react";

const LIGHT_TOKENS = {
	"--de-bg": "#E4DCC2",
	"--de-surface": "#EAE4CB",
	"--de-surface-alt": "#DDD3B5",
	"--de-border": "rgba(31,26,18,0.20)",
	"--de-border-strong": "rgba(31,26,18,0.50)",
	"--de-border-inner": "rgba(31,26,18,0.10)",
	"--de-text": "#1F1A12",
	"--de-text-muted": "rgba(31,26,18,0.66)",
	"--de-text-faint": "rgba(31,26,18,0.42)",
	"--de-accent": "#3F5C3D",
	"--de-accent-warm": "#b93803",
	"--de-accent-soft": "rgba(63,92,61,0.12)",
};

const DARK_TOKENS = {
	"--de-bg": "#0E1E3A",
	"--de-surface": "#142849",
	"--de-surface-alt": "#1B3157",
	"--de-border": "rgba(237,227,210,0.18)",
	"--de-border-strong": "rgba(237,227,210,0.45)",
	"--de-border-inner": "rgba(237,227,210,0.10)",
	"--de-text": "#EDE3D2",
	"--de-text-muted": "rgba(237,227,210,0.62)",
	"--de-text-faint": "rgba(237,227,210,0.40)",
	"--de-accent": "#C9A961",
	"--de-accent-warm": "#E0C176",
	"--de-accent-soft": "rgba(201,169,97,0.14)",
};

const origins = [
	{
		id: "west-africa",
		num: "01",
		name: "West Africa",
		region: "Senegambia & Gold Coast",
		year: "Pre-1600s",
		role: "Foundational Foodways",
		color: "#9B3A1A",
		detail:
			"West African food traditions traveled with enslaved people across the Atlantic. Their knowledge of seasoning, frying, cultivation, and adapting ingredients became part of the foodways created throughout the American South.",
		ingredient: "Seasoning · Frying knowledge · Adaptation",
		source: "West African Food Traditions in Virginia Foodways · Lisa R. Shiflett",
		recipe: "Senegambian Palm Oil Fried Chicken",
	},
	{
		id: "american-south",
		num: "02",
		name: "American South",
		region: "Virginia & Carolina Coast",
		year: "1700s",
		role: "Cultural Creation",
		color: "#7A4A1E",
		detail:
			"Southern fried chicken developed through the knowledge and labor of African American cooks. They combined West African culinary traditions with ingredients and techniques encountered in the American South.",
		ingredient: "Seasoning · Cast iron · Regional adaptation",
		source: "Soul Food · Adrian Miller",
		recipe: "Southern Buttermilk Fried Chicken",
	},
	{
		id: "scotland",
		num: "03",
		name: "Scotland",
		region: "Isle of Skye & Britain",
		year: "1700s",
		role: "European Thread",
		color: "#4A5568",
		detail:
			"Eighteenth-century records show fried chicken circulating within British cooking. Scotland belongs in the story as one European thread, not as the single birthplace of Southern fried chicken.",
		ingredient: "Rendered fat · Batter · British cookery",
		source: "The Journal of a Tour to the Hebrides · James Boswell",
		recipe: null,
	},
	{
		id: "japan",
		num: "04",
		name: "Japan",
		region: "Oita Prefecture",
		year: "1920s",
		role: "Regional Evolution",
		color: "#1A5276",
		detail:
			"Oita developed its own regional fried-chicken traditions. Usa City is associated with Japanese karaage, while Beppu is known for toriten.",
		ingredient: "Soy · Ginger · Starch · Tempura batter",
		source: "Tori-Ten · Japan Ministry of Agriculture, Forestry and Fisheries",
		recipe: "Karaage (唐揚げ)",
	},
];

const ExactSidebarDemo = ({ activeId, setActiveId }) => (
	<div className="de-live-sidebar">
		<div className="de-live-sidebar-issue">
			<span>Origins</span>
			<span>Est. MMXXV</span>
		</div>

		<div className="de-live-sidebar-dish">
			<div className="de-live-sidebar-eyebrow">A Global Origin Story</div>
			<div className="de-live-sidebar-title">Fried Chicken</div>
			<div className="de-live-sidebar-category">Technique · Culture · Migration</div>
		</div>

		<div className="de-live-sidebar-description">
			Fried chicken is a broad global category shaped by regional variation in spice
			blends, fats, coatings, sauces, and the people who carried those techniques.
		</div>

		<div className="de-live-sidebar-quote">
			“Every bite carries a history most people have never been taught.”
		</div>

		<div className="de-live-list-header">
			<span>Origins, Indexed</span>
			<span>07</span>
		</div>

		<div className="de-live-origin-rows">
			{origins.map((origin) => {
				const active = origin.id === activeId;
				return (
					<button
						type="button"
						key={origin.id}
						className={`de-live-origin-row ${active ? "is-active" : ""}`}
						style={{ "--origin-color": origin.color }}
						onClick={() => setActiveId(origin.id)}
						aria-pressed={active}
					>
						<span className="de-live-origin-num">{origin.num}</span>
						<span className="de-live-origin-body">
							<span className="de-live-origin-name">{origin.name}</span>
							<span className="de-live-origin-role">{origin.role}</span>
						</span>
						<span className="de-live-origin-year">{origin.year}</span>
					</button>
				);
			})}
		</div>

		<div className="de-live-movement-legend">
			<div>Movement Routes</div>
			<div className="de-live-legend-row">
				<svg width="34" height="10" aria-hidden="true">
					<line x1="0" y1="5" x2="24" y2="5" stroke="var(--de-accent-warm)" strokeWidth="1.4" strokeDasharray="4 3" opacity="0.65" />
					<polygon points="23,2 32,5 23,8" fill="var(--de-accent-warm)" opacity="0.65" />
				</svg>
				<span>Technique migration</span>
			</div>
			<p>Hover labeled nodes for stories. Hover dashed routes for movement.</p>
		</div>
	</div>
);

const ExactDetailDemo = ({ origin }) => {
	const [activeTab, setActiveTab] = useState("journey");
	const tabs = ["journey", "sources", "recipes"];

	return (
		<div className="de-live-detail">
			<div className="de-live-detail-header">
				<div className="de-live-role-badge">
					<span style={{ background: origin.color, boxShadow: `0 0 10px ${origin.color}` }} />
					{origin.role}
				</div>
				<h3>{origin.name}</h3>
				<div className="de-live-location">
					<span>{origin.region}</span>
					<span>·</span>
					<span>{origin.year}</span>
				</div>
				<div className="de-live-coords">14.50°N · 14.40°W</div>
			</div>

			<div className="de-live-tabs" role="tablist" aria-label="Origin details">
				{tabs.map((tab) => (
					<button
						type="button"
						role="tab"
						key={tab}
						aria-selected={activeTab === tab}
						tabIndex={activeTab === tab ? 0 : -1}
						className={activeTab === tab ? "is-active" : ""}
						onClick={() => setActiveTab(tab)}
						onKeyDown={(event) => {
							const i = tabs.indexOf(tab);
							if (event.key === "ArrowRight") {
								event.preventDefault();
								setActiveTab(tabs[(i + 1) % tabs.length]);
							}
							if (event.key === "ArrowLeft") {
								event.preventDefault();
								setActiveTab(tabs[(i - 1 + tabs.length) % tabs.length]);
							}
						}}
					>
						{tab === "journey" ? "Journey (1)" : tab === "sources" ? "Sources (3+)" : "Recipes"}
					</button>
				))}
			</div>

			<div className="de-live-detail-content" role="tabpanel">
				{activeTab === "journey" && (
					<div className="de-live-story-section">
						<div className="de-live-movement-card" style={{ borderLeftColor: origin.color }}>
							<div className="de-live-movement-card-head">
								<span>Originated here</span>
								<span>1619–1700s</span>
							</div>
							<div className="de-live-route-box">
								<span className="de-live-route-dot" style={{ background: origin.color }} />
								<strong>{origin.name}</strong>
								<svg width="30" height="8" aria-hidden="true">
									<line x1="0" y1="4" x2="20" y2="4" stroke="var(--de-accent-warm)" strokeWidth="1.4" strokeDasharray="3 2" opacity="0.75" />
									<polygon points="20,1 28,4 20,7" fill="var(--de-accent-warm)" opacity="0.75" />
								</svg>
								<span className="de-live-route-dot" style={{ background: "#7A4A1E" }} />
								<strong>American South</strong>
							</div>
							<p>Knowledge, technique, and adaptation moved with people and changed under new conditions.</p>
						</div>

						<div className="de-live-divider" />
						<div className="de-live-section-title">Story</div>
						<blockquote>{origin.detail}</blockquote>
						<div className="de-live-divider" />
						<div className="de-live-section-title">Signature Ingredients</div>
						<div className="de-live-ingredient-tags">
							{origin.ingredient.split(" · ").map((item) => (
								<span key={item} style={{ "--ingredient-color": origin.color }}>{item}</span>
							))}
						</div>
					</div>
				)}

				{activeTab === "sources" && (
					<div className="de-live-source-card">
						<div className="de-live-section-title">Documented sources</div>
						<strong>{origin.source}</strong>
						<p>Sources stay attached to the origin they support.</p>
					</div>
				)}

				{activeTab === "recipes" && (
					<div className="de-live-recipe-card" style={{ "--recipe-origin-color": origin.color }}>
						<div className="de-live-recipe-head">
							<span className="de-live-recipe-dot" />
							<span>{origin.region}</span>
							<span>{origin.year}</span>
						</div>
						<div className="de-live-recipe-title">
							{origin.recipe || origin.name}
						</div>
						{origin.recipe ? (
							<>
								<div className="de-live-recipe-meta">Serves 4 · Prep 24 hrs · Cook 30 min</div>
								<div className="de-live-section-title">Ingredients</div>
								<div className="de-live-ingredient-tags">
									<span>Chicken</span><span>Seasoning</span><span>Oil</span>
								</div>
								<div className="de-live-section-title">Method</div>
								<ol>
									<li>Marinate and season.</li>
									<li>Fry in batches until cooked through.</li>
									<li>Finish at higher heat for a crisp crust.</li>
								</ol>
							</>
						) : (
							<p className="de-live-recipe-null">Recipe documentation coming soon.</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

const DiscoverEatsComponentDemos = () => {
	const [activeId, setActiveId] = useState(origins[0].id);
	const [dark, setDark] = useState(false);
	const origin = origins.find((item) => item.id === activeId) || origins[0];

	return (
		<div className="de-live-demo-wrap" style={dark ? DARK_TOKENS : LIGHT_TOKENS}>
			<div className="de-live-demo-topline">
				<div>
					<span>Extracted from the live interface</span>
					<strong>Reusable DiscoverEats primitives</strong>
				</div>
				<button type="button" onClick={() => setDark((value) => !value)}>
					{dark ? "Light" : "Dark"} theme
				</button>
			</div>

			<div className="de-live-demo-grid">
				<div className="de-live-demo-frame">
					<div className="de-live-demo-label">
						<span>01</span>
						<div>
							<strong>FoodOriginSidebar</strong>
							<small>Exact proportions, typography, row behavior, and theme tokens</small>
						</div>
					</div>
					<div className="de-live-component-stage de-live-component-stage--sidebar">
						<ExactSidebarDemo activeId={activeId} setActiveId={setActiveId} />
					</div>
				</div>

				<div className="de-live-demo-frame">
					<div className="de-live-demo-label">
						<span>02</span>
						<div>
							<strong>FoodOriginDetailPanel</strong>
							<small>Journey, Sources, and Recipes using the live tab treatment</small>
						</div>
					</div>
					<div className="de-live-component-stage de-live-component-stage--detail">
						<ExactDetailDemo key={origin.id} origin={origin} />
					</div>
				</div>
			</div>

			<div className="de-live-system-line">
				<span>Shared selected-origin state</span>
				<code>FoodOriginSidebar ↔ FoodOriginDetailPanel</code>
			</div>
		</div>
	);
};

export default DiscoverEatsComponentDemos;
