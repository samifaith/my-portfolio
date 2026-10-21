import { useState } from "react";
import "./DiscoverEatsInteractionStudies.css";

const ORIGINS = [
  { id: "west-africa", name: "West Africa", role: "Technique and culinary knowledge", year: "Historical roots", color: "#3f5c3d", x: 26, y: 50, description: "Explore the traditions and knowledge carried across communities and generations." },
  { id: "scotland", name: "Scotland", role: "European frying traditions", year: "Historical roots", color: "#b93803", x: 49, y: 29, description: "See how different cooking traditions intersected and evolved." },
  { id: "american-south", name: "American South", role: "Adaptation and cultural exchange", year: "Later development", color: "#7a6230", x: 18, y: 41, description: "Trace how migration and adaptation shaped regional food cultures." },
];
const ROUTES = [{ from: 0, to: 2 }, { from: 1, to: 2 }];
const TABS = ["Journey", "Sources", "Recipes"];

export default function DiscoverEatsInteractionStudies() {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState("Journey");
  const [showRoutes, setShowRoutes] = useState(true);
  const active = ORIGINS[selected];

  return (
    <section className="de-studies" aria-labelledby="de-studies-heading">
      <p className="de-studies__eyebrow">Interaction studies · DiscoverEats</p>
      <h2 id="de-studies-heading">Designed to be explored</h2>
      <p>Try the linked selection states, movement routes, and content navigation. This lightweight study demonstrates the interaction architecture without loading a second application.</p>
      <div className="de-studies__layout">
        <div className="de-studies__map">
          <div className="de-studies__toolbar"><strong>01 / Geographic selection</strong><label><input type="checkbox" checked={showRoutes} onChange={e => setShowRoutes(e.target.checked)} /> Show routes</label></div>
          <svg viewBox="0 0 100 75" role="img" aria-label="Schematic geographic origin connections. Use the origin buttons below to select a location.">
            <ellipse cx="50" cy="37.5" rx="42" ry="32" fill="#d2c8a6" stroke="#7a6230" strokeWidth=".5" />
            <ellipse cx="50" cy="37.5" rx="25" ry="32" fill="none" stroke="#7a6230" strokeWidth=".25" opacity=".4" />
            <path d="M8 37.5 H92 M50 5.5 V69.5" stroke="#7a6230" strokeWidth=".25" strokeDasharray="1 2" opacity=".5" />
            {showRoutes && ROUTES.map(({from,to}) => <line key={from} x1={ORIGINS[from].x} y1={ORIGINS[from].y} x2={ORIGINS[to].x} y2={ORIGINS[to].y} stroke="#b93803" strokeWidth=".7" strokeDasharray="1.5 1.5" />)}
            {ORIGINS.map((origin,index) => <circle key={origin.id} cx={origin.x} cy={origin.y} r={selected===index?2.6:1.7} fill={origin.color} stroke="#fff6e5" strokeWidth=".7" />)}
          </svg>
          <p className="de-studies__note">Schematic interaction model, not the original D3 globe or a geographic map.</p>
        </div>
        <div className="de-studies__sidebar">
          <strong>02 / Origin selection</strong>
          <div className="de-studies__origins" role="group" aria-label="Choose an origin">
            {ORIGINS.map((origin,index) => <button key={origin.id} type="button" aria-pressed={selected===index} onClick={() => {setSelected(index);setTab("Journey");}}><span>{String(index+1).padStart(2,"0")}</span><span>{origin.name}</span></button>)}
          </div>
          <strong>03 / Detail states</strong>
          <h3>{active.name}</h3>
          <p>{active.role}</p>
          <div className="de-studies__tabs" role="group" aria-label="Explore origin information">{TABS.map(value=><button type="button" key={value} aria-pressed={tab===value} onClick={()=>setTab(value)}>{value}</button>)}</div>
          <div className="de-studies__detail" aria-live="polite">{tab==="Journey"?active.description:tab==="Sources"?"The full application links each origin to supporting historical sources.":"The full application connects each origin to recipes and regional adaptations."}</div>
        </div>
      </div>
      <p className="de-studies__note">This is an isolated interaction study using representative content. The production application contains the actual D3/GSAP globe, complete source material, and full geographic dataset.</p>
    </section>
  );
}
