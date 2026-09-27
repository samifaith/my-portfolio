const Section = ({ title, children }) => (
	<section className="discovereats-case-study-section">
		<h2>{title}</h2>
		{children}
	</section>
);

const PocketPlayCaseStudyContent = () => (
	<article className="discovereats-case-study pocketplay-case-study">
		<p className="discovereats-case-study-thesis">
			A little game can be a good reason to keep talking.
		</p>

		<Section title="The opportunity">
			<p>
				Playing with a friend should feel as natural as sending them a message.
				PocketPlay is my answer to the friction between picking a game, inviting
				someone, taking turns, and finding your way back after the conversation
				moves on.
			</p>
		</Section>

		<Section title="The experience">
			<p>
				The core journey stays in Apple Messages: open PocketPlay, choose a game,
				configure it, take a turn, send it, then resume from your friend's message.
				The same conversation carries the result and the rematch.
			</p>
			<p>
				The collection includes familiar grid games and different forms of play,
				including Categories, Decode, and Mole Reflex. Each has its own rules,
				but the launcher, game stage, and bottom action area give them a shared
				shape in a compact screen.
			</p>
		</Section>

		<Section title="What I designed and built">
			<ul>
				<li>A mobile-first game shell with a consistent title, stage, and action dock.</li>
				<li>Clear states for invitations, turns, waiting, reveals, results, and rematches.</li>
				<li>Game-specific interaction rules so forms can scroll while live reflex play and gestures stay stable.</li>
				<li>Recovery for a move committed to the game but not yet sent in Messages.</li>
				<li>Shared visual tokens that let each game feel distinct without losing the PocketPlay identity.</li>
			</ul>
		</Section>

		<Section title="A key design decision">
			<p>
				A move saved by the game is not automatically a move delivered to a friend.
				I treat that gap as part of the user flow. If someone leaves before sending,
				PocketPlay preserves the pending update and guides them back to send it
				before advancing the round. The UI needs to show what happened without
				making either player guess whose turn it is.
			</p>
		</Section>

		<Section title="Where it stands">
			<p>
				PocketPlay is an active prelaunch product. The Apple Messages experience,
				gameplay, and lifecycle behavior are being refined through builds and
				two-device testing. This study documents the decisions and working system,
				with gameplay visuals and measured outcomes to follow after validation.
			</p>
		</Section>
	</article>
);

export default PocketPlayCaseStudyContent;
