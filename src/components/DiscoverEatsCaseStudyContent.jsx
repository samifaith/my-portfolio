const projectDetails = [
	["Completed", "May 2026"],
	["Role", "Product designer and front-end developer"],
	["Team", "Independent capstone project"],
	["Scope", "One dish, seven locations, four routes"],
	["Technology", "React, D3, GSAP, TopoJSON, Vite, and Sass"],
];

const scope = [
	"Seven cultural locations",
	"Four movement routes",
	"An interactive globe",
	"A synchronized origin list",
	"Historical context and sources",
	"Regional recipes and videos",
	"Responsive layouts",
	"Keyboard navigation",
	"Reduced-motion support",
	"A reusable food-story model",
];

const role = [
	"Product strategy",
	"Cultural and historical research",
	"Information architecture",
	"Content modeling",
	"Wireframing",
	"Interaction design",
	"Visual design",
	"Front-end development",
	"Data visualization",
	"Accessibility",
	"Responsive behavior",
	"Performance and deployment",
];

const architectureFlow = [
	"Content template",
	"Runtime story model",
	"React experience state",
	"D3 geography",
	"GSAP interaction",
];

const architectureDecisions = [
	{
		title: "Explicit story model",
		decision:
			"Normalize dish, origin, and movement data once instead of letting components depend on global singleton content.",
		impact:
			"New food stories can load at runtime without rebuilding the core interface.",
	},
	{
		title: "Local atlas asset",
		decision:
			"Bundle the world atlas with the application instead of fetching geography from a public CDN at runtime.",
		impact:
			"The globe no longer depends on an external network service to render.",
	},
	{
		title: "Clear rendering responsibilities",
		decision:
			"React owns experience state, D3 owns geographic rendering, and GSAP owns motion and focus transitions.",
		impact:
			"Each layer has a clearer responsibility and is easier to reason about independently.",
	},
	{
		title: "URL-addressable stories",
		decision:
			"Resolve the active food story from a query parameter and build the runtime model from that identifier.",
		impact:
			"Individual stories can be linked directly while sharing the same application shell.",
	},
];

const accessibilityEvidence = [
	"Keyboard-accessible origin interactions",
	"Visible focus treatment",
	"Skip navigation to the globe",
	"Reduced-motion handling in both React and globe animation logic",
	"Dialog semantics for onboarding",
	"ARIA state for interactive controls",
];

const Section = ({ title, children }) => (
	<section className="discovereats-case-study-section">
		<h2>{title}</h2>
		{children}
	</section>
);

const DiscoverEatsCaseStudyContent = ({ caseStudy }) => (
	<article className="discovereats-case-study">
		<p className="discovereats-case-study-thesis">
			DiscoverEats approaches food as evidence that cultures have always shaped one
			another.
		</p>

		<div className="discovereats-case-study-links">
			<a
				className="discovereats-case-study-link"
				href={caseStudy.liveUrl}
				target="_blank"
				rel="noreferrer"
			>
				View the live application
			</a>
			<a
				className="discovereats-case-study-link discovereats-case-study-link--secondary"
				href="https://github.com/samifaith/capstone26"
				target="_blank"
				rel="noreferrer"
			>
				View source
			</a>
		</div>

		<dl className="discovereats-case-study-meta">
			{projectDetails.map(([label, value]) => (
				<div key={label}>
					<dt>{label}</dt>
					<dd>{value}</dd>
				</div>
			))}
		</dl>

		<Section title="Purpose">
			<p>
				The foods we know and love carry the knowledge, movement, survival, and
				adaptation of people across cultures. These dishes could not exist in their
				current forms without the people who shaped, carried, and adapted them along
				the way.
			</p>
			<p>
				I wanted to highlight these relationships, showing how much of our history
				has been created together.
			</p>
		</Section>

		<Section title="The Problem">
			<p>
				Trade, colonization, enslavement, immigration, and access to ingredients
				shaped what people could cook and how traditions survived. Communities
				preserved what they could, used what was available, and made something new.
				Through this, food becomes connected to home, family, memory, and identity.
			</p>
			<p>
				DiscoverEats seeks to showcase these cultural journeys and the delicious
				foods along the way.
			</p>
		</Section>

		<Section title="The Goal">
			<p>
				Like a game of telephone, food changes as it moves between people and
				places. Unlike the game, those changes are shaped by real conditions,
				including migration, access, conflict, and survival.
			</p>
			<p>
				By May 2026, my goal was to design, build, and deploy a responsive
				application showing how one familiar dish was shaped across seven cultural
				locations.
			</p>
			<p>
				The experience needed to connect cultural research with interactive
				geography, make the relationships understandable, and provide further
				research for those wanting to look deeper.
			</p>
			<p>
				It also needed a reusable content structure so the idea could eventually
				extend beyond one dish without rebuilding the entire interface.
			</p>
		</Section>

		<Section title="Fried chicken?">
			<p>Fried chicken captures the essence of this project.</p>
			<p>
				It is familiar, culturally significant, and connected to several
				communities. Its history cannot be explained through one country or one
				tradition. Every version carries something from the people who came before.
			</p>
			<p>
				Also, who doesn’t love fried chicken? Start with something people already
				know, then reveal how much history sits beneath it.
			</p>
		</Section>

		<Section title="The Scope">
			<p>
				The original idea was an interactive food encyclopedia. Trying to complete
				multiple food histories would have spread the research and design too thin
				given my time constraints. I chose to build one complete story instead.
			</p>
			<p>The proof of concept included:</p>
			<ul>{scope.map((item) => <li key={item}>{item}</li>)}</ul>
			<p>
				A future version could include user accounts, community submissions,
				recommendations, and a larger library of dishes.
			</p>
		</Section>

		<Section title="My Role">
			<p>I owned this project from beginning to end.</p>
			<p>That included:</p>
			<ul>{role.map((item) => <li key={item}>{item}</li>)}</ul>
			<p>
				Because I worked independently, the research, design, and development could
				not be treated as separate phases. The history affected the structure. The
				structure affected the interface. The interface affected how the history
				would be understood.
			</p>
		</Section>

		<Section title="Origin → Path → Plate">
			<p>I structured each food story around three parts:</p>
			<p><strong>Origin</strong> introduces a place, ingredient, technique, or tradition.</p>
			<p><strong>Path</strong> follows how it moved and what historical forces shaped that movement.</p>
			<p><strong>Plate</strong> shows what those influences became after people adapted them to a different place, moment, or need.</p>
			<p>This gave the idea a clear rhythm while building the framework.</p>
		</Section>

		<Section title="The Design">
			<p>
				I wanted the experience to feel like opening a physical map. Annotated, a
				little worn, and easy to decipher.
			</p>
			<p>
				Migration can mean opportunity, but it can also mean enslavement, war, or
				survival. The visual design needed to invite people in without softening the
				history.
			</p>
		</Section>

		<Section title="The Geography">
			<p>
				The globe became the center of the experience, with interwoven routes
				highlighting the culinary journey.
			</p>
			<p>
				Users can rotate the globe, select a location, and see each place’s
				contribution to the dish.
			</p>
			<p>
				The globe and origin list are connected. Selecting a location in one area
				updates the other, so the user always has a visual and written way to
				understand where they are. The accompanying stories explain why that
				movement happened and what changed along the way.
			</p>
		</Section>

		<Section title="The History">
			<p>
				Each location includes its own research and media so people can examine the
				story beyond the interface.
			</p>
			<p>
				The sources include academic research, institutional resources, historical
				records, and documentary material.
			</p>
		</Section>

		<Section title="The Platform">
			<p>DiscoverEats was created with React, D3, GSAP, TopoJSON, Vite, and Sass.</p>
			<p>
				React manages the active story, selected location, source panels, recipes,
				and synchronized navigation.
			</p>
			<p>
				D3 renders the globe and geographic information. GSAP handles the movement
				and focus transitions between locations. TopoJSON keeps the world map compact
				enough to bundle with the application.
			</p>
			<p>
				I also separated the food content from the interface. Each story has its own
				locations, coordinates, routes, context, sources, and recipes through a
				reusable data model.
			</p>
			<p>
				A new dish can be added without rebuilding the main experience. Individual
				stories can also be loaded through URL parameters.
			</p>
		</Section>

		<Section title="Architecture">
			<p>
				The first version was shaped around one story. As the concept matured, direct
				imports from singleton content modules became a constraint. I moved the
				experience toward an explicit runtime story model with clearer domain
				boundaries.
			</p>
			<div className="discovereats-architecture-flow" aria-label="DiscoverEats front-end architecture flow">
				{architectureFlow.map((item, index) => (
					<div className="discovereats-architecture-node" key={item}>
						<span>{item}</span>
						{index < architectureFlow.length - 1 && (
							<span className="discovereats-architecture-arrow" aria-hidden="true">→</span>
						)}
					</div>
				))}
			</div>
			<div className="discovereats-decision-grid">
				{architectureDecisions.map((item) => (
					<article className="discovereats-decision-card" key={item.title}>
						<h3>{item.title}</h3>
						<p><strong>Decision:</strong> {item.decision}</p>
						<p><strong>Impact:</strong> {item.impact}</p>
					</article>
				))}
			</div>
			<p>
				I documented the story-model and local-atlas decision as an architecture
				decision record, including the tradeoffs and next steps instead of treating
				the implementation as self-explanatory.
			</p>
		</Section>

		<Section title="Accessibility and Reliability">
			<p>
				Accessibility is implemented as interaction behavior, not only visual
				styling. The current experience includes:
			</p>
			<ul>
				{accessibilityEvidence.map((item) => <li key={item}>{item}</li>)}
			</ul>
			<p>
				The world atlas is bundled locally instead of depending on a runtime CDN.
				Failed atlas loads are not cached as permanent empty data, and the app has an
				error boundary for runtime failures.
			</p>
			<p>
				The architecture record also identifies a real remaining gap: automated
				regression tests around the story-model and query-parameter path still need
				to be added. I prefer showing that boundary explicitly rather than implying
				the project has validation it does not yet have.
			</p>
		</Section>

		<Section title="What I Built">
			<p>
				By the end of the capstone, I had built and deployed a working proof of
				concept around one story.
			</p>
			<p>
				The final experience connected seven locations through four movement routes.
				It included the interactive globe, synchronized navigation, regional stories,
				sources, recipes, accessibility support, and the reusable content model.
			</p>
			<p>
				What I completed was the system itself: a researched, designed, and coded
				example of how food history could be explored through movement instead of
				ownership.
			</p>
		</Section>

		<Section title="My Reflection">
			<p>
				I wanted the project to be engaging, but not seen through rose-colored
				glasses. Trade and migration shaped food, but so did colonization,
				enslavement, limited access, and the need to survive.
			</p>
			<p>
				It also made me think differently about scope. I did not need to build an
				entire encyclopedia to prove the idea. I needed one complete story and a
				system strong enough to hold another.
			</p>
			<p>
				That became the clearest lesson from DiscoverEats. The project needed to do
				more than explain where food came from. It needed to show that none of us
				arrived at the table alone.
			</p>
		</Section>

		<div className="discovereats-case-study-links">
			<a
				className="discovereats-case-study-link"
				href={caseStudy.liveUrl}
				target="_blank"
				rel="noopener noreferrer"
			>
				View the live application
			</a>
			<a
				className="discovereats-case-study-link discovereats-case-study-link--secondary"
				href="https://github.com/samifaith/capstone26"
				target="_blank"
				rel="noopener noreferrer"
			>
				View source
			</a>
		</div>
	</article>
);

export default DiscoverEatsCaseStudyContent;
