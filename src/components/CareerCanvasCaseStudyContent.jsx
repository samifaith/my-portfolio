const projectDetails = [
	["Status", "V1 complete · V2 in progress"],
	["Role", "Product designer + AI workflow builder"],
	["Platform", "Base44"],
	["Focus", "Career intelligence + trustworthy AI"],
];

const capabilities = [
	"Role discovery",
	"Fit scoring",
	"Experience-level calibration",
	"Location and work-style weighting",
	"Company grouping",
	"Saved application pipeline",
	"Resume and cover-letter context",
	"AI-assisted review with Grover",
];

const nextSignals = [
	"Work-life balance",
	"Inclusion and DEI",
	"Parental support",
	"Flexibility",
	"Management culture",
	"Evidence confidence",
];

const Section = ({ title, children }) => (
	<section className="discovereats-case-study-section">
		<h2>{title}</h2>
		{children}
	</section>
);

const CareerCanvasCaseStudyContent = () => (
	<article className="discovereats-case-study career-canvas-case-study">
		<p className="discovereats-case-study-thesis">
			A job can match your keywords and still be completely wrong for your career.
		</p>

		<dl className="discovereats-case-study-meta">
			{projectDetails.map(([label, value]) => (
				<div key={label}>
					<dt>{label}</dt>
					<dd>{value}</dd>
				</div>
			))}
		</dl>

		<Section title="The problem">
			<p>
				Most job search products optimize for volume. They are good at finding roles
				that share words with a resume, but less reliable at answering the question
				that actually matters: is this work a good fit for this person?
			</p>
			<p>
				I wanted to build a system that treated job searching more like product
				matching, where experience, discipline, seniority, location, compensation,
				work style, and career direction all change the answer.
			</p>
		</Section>

		<Section title="What I built">
			<p>
				Career Canvas is an AI-assisted job discovery and application workspace built
				in Base44. It brings sourcing, fit evaluation, saved roles, application
				materials, and career context into one system.
			</p>
			<ul>
				{capabilities.map((item) => <li key={item}>{item}</li>)}
			</ul>
		</Section>

		<Section title="The scoring problem">
			<p>
				The hardest part was not generating a score. It was making sure the score
				meant something.
			</p>
			<p>
				During testing, a Design Engineer role scored in the 90s because its language
				overlapped with my design and engineering background. The actual work was
				PCB design, manufacturing, and hardware engineering. The keywords were
				adjacent. The profession was not.
			</p>
			<p>
				That failure changed the model. Instead of treating skills as a flat list,
				the system now has to reason through role family, discipline, experience
				scope, seniority, and requirements before a high score can mean strong fit.
			</p>
		</Section>

		<Section title="Fit is more than capability">
			<p>
				A technically possible role is not automatically a useful recommendation.
				The product also considers location, workplace expectations, compensation,
				and whether a role is aligned with the kind of work someone actually wants
				to keep doing.
			</p>
			<p>
				This created an important product distinction between capability and fit.
				A stretch role can be interesting without being presented as a near-perfect
				match.
			</p>
		</Section>

		<Section title="Grover">
			<p>
				I built an AI assistant called Grover into the workflow. Grover can use the
				saved professional profile, job context, application state, resumes, and
				cover letters to help evaluate questionable matches and prepare stronger
				application materials.
			</p>
			<p>
				The guardrail is simple: profile evidence remains the source of truth. The
				assistant can interpret what is there, but it should not invent experience
				to make a candidate look more qualified.
			</p>
		</Section>

		<Section title="Designing for uncertainty">
			<p>
				One of the clearest lessons from the project was that confidence and score
				should not be the same thing.
			</p>
			<p>
				Missing salary data is not a bad salary. An unclear workplace policy is not
				automatically onsite. Sparse requirements should not produce the same
				certainty as a detailed posting.
			</p>
			<p>
				The interface is evolving to distinguish the strength of a match from the
				quality of the evidence behind it.
			</p>
		</Section>

		<Section title="Next: CodeSwxtch">
			<p>
				The second iteration expands Career Canvas into CodeSwxtch, with company
				culture intelligence alongside role fit.
			</p>
			<p>
				Instead of treating employer branding as evidence, the system will compare
				official policies with employee-reported experiences from multiple sources.
				Culture dimensions will stay separate so a company can be strong in one area
				and weak in another.
			</p>
			<ul>
				{nextSignals.map((item) => <li key={item}>{item}</li>)}
			</ul>
			<p>
				A planned Promises vs. Reality layer will compare what companies publish
				with what employees consistently report, while keeping confidence visible
				when evidence is thin, old, or contradictory.
			</p>
		</Section>

		<Section title="What I learned">
			<p>
				The most interesting AI product problems were not about generating more
				content. They were about deciding what the model should know, what it should
				be allowed to infer, how conflicting evidence should be handled, and when
				the interface should simply admit that it does not know yet.
			</p>
		</Section>
	</article>
);

export default CareerCanvasCaseStudyContent;
