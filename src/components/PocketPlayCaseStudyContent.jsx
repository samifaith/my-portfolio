const Section = ({ title, children }) => (
	<section className="discovereats-case-study-section">
		<h2>{title}</h2>
		{children}
	</section>
);

const PocketPlayCaseStudyContent = () => (
	<article className="discovereats-case-study pocketplay-case-study">
		<p className="discovereats-case-study-thesis">
			A game between friends should feel like part of the conversation.
		</p>
		<dl className="discovereats-case-study-meta">
			<div><dt>Status</dt><dd>In development</dd></div>
			<div><dt>Role</dt><dd>Product owner, UX designer, front-end engineer</dd></div>
			<div><dt>Platform</dt><dd>Apple Messages</dd></div>
			<div><dt>Focus</dt><dd>Game flows, shared UI, and turn recovery</dd></div>
		</dl>

		<Section title="The opportunity">
			<p>
				I wanted to make it easier to start a game with someone you already talk
				to. That means the invitation, each turn, and the rematch need to make
				sense inside Messages, even when players leave and come back later.
			</p>
		</Section>

		<Section title="The experience">
			<p>
				The core journey stays in Apple Messages: open PocketPlay, choose a game,
				configure it, take a turn, send it, then resume from your friend's message.
				The result and rematch stay in that conversation too.
			</p>
			<p>
				The collection includes familiar grid games and different forms of play,
				including Categories, Decode, and Mole Reflex. Each has its own rules,
				but a shared launcher, stage, and action area keep the experience
				familiar in a small space.
			</p>
		</Section>

		<Section title="What I designed and built">
			<ul>
				<li>A game shell with a consistent title, stage, and action area.</li>
				<li>Clear states for invitations, turns, waiting, reveals, results, and rematches.</li>
				<li>Interaction rules that let forms scroll without interrupting live play or gestures.</li>
				<li>Recovery for a move committed to the game but not yet sent in Messages.</li>
				<li>Shared visual tokens that let each game feel distinct without losing the PocketPlay identity.</li>
			</ul>
		</Section>

		<Section title="A key design decision">
			<p>
				A move saved by the game is not automatically a move delivered to a friend.
				That gap matters. If someone leaves before sending, PocketPlay keeps the
				pending update and brings them back to it before the next round. Both
				players need a clear account of what happened and whose turn is next.
			</p>
		</Section>

		<Section title="Where it stands">
			<p>
				PocketPlay is in prelaunch testing. I'm refining the Messages experience
				and checking game behavior across two devices, especially what happens
				when a player leaves, returns, or has a move waiting to be sent.
			</p>
		</Section>
	</article>
);

export default PocketPlayCaseStudyContent;
