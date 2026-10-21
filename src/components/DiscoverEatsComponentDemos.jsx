import { useState } from "react";

const origins = [
	{
		id: "west-africa",
		index: "01",
		name: "West Africa",
		region: "Senegambia & Gold Coast",
		year: "Pre-1600s",
		role: "Foundational Foodways",
		color: "#B95A36",
		point: [31, 53],
		ingredients: ["Seasoning", "Frying knowledge", "Adaptation"],
		journey:
			"West African food traditions traveled with enslaved people across the Atlantic, carrying seasoning, frying, cultivation, and adaptation knowledge.",
		source: "West African Food Traditions in Virginia Foodways",
		recipe: "Senegambian Palm Oil Fried Chicken",
	},
	{
		id: "american-south",
		index: "02",
		name: "American South",
		region: "Virginia & Carolina Coast",
		year: "1700s",
		role: "Cultural Creation",
		color: "#C18A4D",
		point: [19, 43],
		ingredients: ["Seasoning", "Cast iron", "Regional adaptation"],
		journey:
			"African American cooks combined West African culinary knowledge with ingredients and techniques available in the American South.",
		source: "Soul Food · Adrian Miller",
		recipe: "Southern Buttermilk Fried Chicken",
	},
	{
		id: "japan",
		index: "03",
		name: "Japan",
		region: "Oita Prefecture",
		year: "1920s",
		role: "Regional Evolution",
		color: "#6A9BB5",
		point: [82, 42],
		ingredients: ["Soy", "Ginger", "Starch", "Tempura batter"],
		journey:
			"Oita developed regional fried-chicken traditions including karaage and toriten, adapting a familiar technique into something distinctly local.",
		source: "Japan Ministry of Agriculture, Forestry and Fisheries",
		recipe: "Karaage (唐揚げ)",
	},
	{
		id: "korea",
		index: "04",
		name: "Korea",
		region: "Seoul & Daegu",
		year: "1950s–70s",
		role: "Postwar Exchange & Innovation",
		color: "#A84D49",
		point: [78, 38],
		ingredients: ["Starch coating", "Gochujang", "Double fry"],
		journey:
			"Modern Korean fried chicken grew through postwar exchange and Korean reinvention, including lighter coatings, double frying, and sauces.",
		source: "Tasting the Forgotten War · Nicolyn Woodcock",
		recipe: "Yangnyeom Chicken (양념치킨)",
	},
];

const tabs = ["journey", "sources", "recipes"];

const MiniGlobe = ({ activeId, onSelect }) => (
	<div className="de-demo-globe" aria-label="Simplified synchronized origin map">
		<svg viewBox="0 0 100 100" role="img" aria-label="Origin nodes on a simplified globe">
			<circle cx="50" cy="50" r="39" className="de-demo-globe-sea" />
			<ellipse cx="50" cy="50" rx="31" ry="39" className="de-demo-graticule" />
			<ellipse cx="50" cy="50" rx="39" ry="18" className="de-demo-graticule" />
			<path d="M16 51 C33 43 37 58 54 49 S77 39 87 47" className="de-demo-route" />
			{origins.map((origin) => (
				<g
					key={origin.id}
					role="button"
					tabIndex="0"
					aria-label={`Select ${origin.name}`}
					onClick={() => onSelect(origin.id)}
					onKeyDown={(event) => {
						if (event.key === "Enter" || event.key === " ") {
							event.preventDefault();
							onSelect(origin.id);
						}
					}}
					className="de-demo-node"
				>
					<circle
						cx={origin.point[0]}
						cy={origin.point[1]}
						r={activeId === origin.id ? 4.2 : 2.8}
						fill={origin.color}
						className={activeId === origin.id ? "is-active" : ""}
					/>
					{activeId === origin.id && (
						<circle
							cx={origin.point[0]}
							cy={origin.point[1]}
							r="7"
							className="de-demo-node-ring"
						/>
					)}
				</g>
			))}
		</svg>
		<p>Origin selection is shared between geographic and written navigation.</p>
	</div>
);

const OriginIndexDemo = ({ activeId, onSelect }) => (
	<div className="de-demo-origin-list" aria-label="Origins index">
		<div className="de-demo-list-heading">
			<span>Origins, Indexed</span>
			<span>04</span>
		</div>
		{origins.map((origin) => {
			const active = origin.id === activeId;
			return (
				<button
					type="button"
					key={origin.id}
					className={`de-demo-origin-row ${active ? "is-active" : ""}`}
					style={{ "--origin-color": origin.color }}
					onClick={() => onSelect(origin.id)}
					aria-pressed={active}
				>
					<span className="de-demo-origin-num">{origin.index}</span>
					<span className="de-demo-origin-copy">
						<strong>{origin.name}</strong>
						<small>{origin.role}</small>
					</span>
					<span className="de-demo-origin-year">{origin.year}</span>
				</button>
			);
		})}
	</div>
);

const DetailPanelDemo = ({ origin }) => {
	const [activeTab, setActiveTab] = useState("journey");

	const moveTab = (event, tab) => {
		const index = tabs.indexOf(tab);
		if (event.key === "ArrowRight") {
			event.preventDefault();
			setActiveTab(tabs[(index + 1) % tabs.length]);
		}
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			setActiveTab(tabs[(index - 1 + tabs.length) % tabs.length]);
		}
	};

	return (
		<div className="de-demo-detail" style={{ "--origin-color": origin.color }}>
			<div className="de-demo-detail-kicker">
				<span className="de-demo-detail-dot" />
				{origin.role}
			</div>
			<h3>{origin.name}</h3>
			<p className="de-demo-detail-meta">{origin.region} · {origin.year}</p>

			<div className="de-demo-tabs" role="tablist" aria-label="Origin details demo">
				{tabs.map((tab) => (
					<button
						type="button"
						role="tab"
						key={tab}
						aria-selected={activeTab === tab}
						tabIndex={activeTab === tab ? 0 : -1}
						className={activeTab === tab ? "is-active" : ""}
						onClick={() => setActiveTab(tab)}
						onKeyDown={(event) => moveTab(event, tab)}
					>
						{tab === "journey" ? "Journey" : tab === "sources" ? "Sources" : "Recipes"}
					</button>
				))}
			</div>

			<div className="de-demo-tab-panel" role="tabpanel">
				{activeTab === "journey" && (
					<>
						<p>{origin.journey}</p>
						<div className="de-demo-ingredient-list">
							{origin.ingredients.map((ingredient) => (
								<span key={ingredient}>{ingredient}</span>
							))}
						</div>
					</>
				)}
				{activeTab === "sources" && (
					<div className="de-demo-source">
						<span>Documented source</span>
						<strong>{origin.source}</strong>
						<small>Sources stay attached to the location they support.</small>
					</div>
				)}
				{activeTab === "recipes" && (
					<div className="de-demo-recipe">
						<span>{origin.region}</span>
						<strong>{origin.recipe}</strong>
						<small>Recipe data uses the same origin object as history and sources.</small>
					</div>
				)}
			</div>
		</div>
	);
};

const DiscoverEatsComponentDemos = () => {
	const [activeId, setActiveId] = useState(origins[0].id);
	const activeOrigin = origins.find((origin) => origin.id === activeId) || origins[0];

	return (
		<div className="de-component-demos">
			<div className="de-component-demo-intro">
				<span>Selected interface primitives</span>
				<p>
					I separated navigation, geographic focus, and detail content so each
					part could evolve independently while sharing the same selected-origin state.
				</p>
			</div>

			<div className="de-demo-card">
				<div className="de-demo-card-label">
					<span>01</span>
					<div>
						<strong>Origin index + geographic focus</strong>
						<small>Shared state · keyboard selectable · synchronized feedback</small>
					</div>
				</div>
				<div className="de-demo-sync-layout">
					<OriginIndexDemo activeId={activeId} onSelect={setActiveId} />
					<MiniGlobe activeId={activeId} onSelect={setActiveId} />
				</div>
			</div>

			<div className="de-demo-card">
				<div className="de-demo-card-label">
					<span>02</span>
					<div>
						<strong>Origin detail panel</strong>
						<small>One identity · three content modes · arrow-key tab navigation</small>
					</div>
				</div>
				<DetailPanelDemo key={activeOrigin.id} origin={activeOrigin} />
			</div>

			<div className="de-demo-system-note">
				<span>Underneath both demos</span>
				<code>food → origins[] → movements[] → sources[] → recipe</code>
				<p>
					The content model is separate from the interface, so a new dish can use the
					same navigation, globe, detail, source, and recipe primitives.
				</p>
			</div>
		</div>
	);
};

export default DiscoverEatsComponentDemos;
