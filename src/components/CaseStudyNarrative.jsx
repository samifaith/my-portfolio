import narratives from "../constants/CaseStudyNarratives.json";

const evidence = {
 discovereats: {
  source: "https://discovereats.samoncanvas.com",
  caption: "The current DiscoverEats interface in dark mode. The selected West Africa origin connects the origin list, globe, and related story.",
  images: [["discovereats-dark-mode.jpg", "DiscoverEats dark-mode interface with West Africa selected in the origin list and globe, and its journey shown alongside.", 1180, 757]],
 },
 "adhd-calculator": {
  source: "https://attentiononadhd.com/cost-calculator/",
  caption: "Demonstration states from the current public calculator: the default 32.5% setting and a hypothetical 50% setting. Changing the input updates the displayed estimates, which aggregate 12 countries and are not individual or country-specific assessments. These illustrate the current public interface, not a measured outcome or an attribution of every current design detail.",
  images: [["adhd-default-state.jpg", "Current public ADHD calculator at its default 32.5% treatment setting, with aggregate estimates and disclaimer visible.", 1165, 1072], ["adhd-illustrative-50-percent.jpg", "Current public ADHD calculator at a hypothetical 50% treatment setting, with updated aggregate estimates and disclaimer visible.", 1165, 1072]],
 },
};

export const CaseStudyEvidence = ({ projectId }) => {
 const item = evidence[projectId];
 if (!item) return null;
 return <figure className="case-study-evidence">
  <div className="case-study-evidence-images">{item.images.map(([file, alt, width, height]) => <a key={file} href={`/case-studies/${file}`} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${alt} (opens in a new tab)`}><img src={`/case-studies/${file}`} alt={alt} width={width} height={height} loading="lazy" /></a>)}</div>
  <figcaption>{item.caption} <a href={item.source} target="_blank" rel="noopener noreferrer">Public source (opens in a new tab)</a> · Captured November 1, 2026. Select an image to view it full size.</figcaption>
 </figure>;
};

const CaseStudyNarrative = ({ projectId, onExplore }) => {
 const narrative = narratives[projectId];
 if (!narrative) return null;
 return <article className="discovereats-case-study">
  <p className="discovereats-case-study-thesis">{narrative.subtitle}</p>
  <p className="case-study-narrative-meta">{narrative.meta}</p>
  {onExplore && <button type="button" className="discovereats-case-study-link" onClick={onExplore}>Explore the globe</button>}
  <CaseStudyEvidence projectId={projectId} />
  {narrative.sections.map(([title, body]) => <section className="discovereats-case-study-section" key={title}><h2>{title}</h2><p>{body}</p></section>)}
 </article>;
};
export default CaseStudyNarrative;
