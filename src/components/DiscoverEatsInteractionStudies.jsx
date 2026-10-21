import { useMemo, useState } from "react";
import { geoOrthographic, geoPath, geoGraticule10, geoInterpolate, geoDistance } from "d3-geo";
import { getFoodTemplate } from "./discovereats/contentTemplate";
import "./DiscoverEatsInteractionStudies.css";

const story = getFoodTemplate("fried-chicken").sections;
const ORIGINS = story.origins;
const ROUTES = story.movements;
const TABS = ["Journey", "Sources", "Recipes"];
const WIDTH = 520, HEIGHT = 390;

export default function DiscoverEatsInteractionStudies() {
  const [selectedId, setSelectedId] = useState(ORIGINS[0].id);
  const [tab, setTab] = useState("Journey");
  const [showRoutes, setShowRoutes] = useState(true);
  const [rotation, setRotation] = useState([-15, -15, 0]);
  const [dragStart, setDragStart] = useState(null);
  const selected = ORIGINS.find(origin => origin.id === selectedId) || ORIGINS[0];
  const projection = useMemo(() => geoOrthographic().translate([WIDTH/2, HEIGHT/2]).scale(177).rotate(rotation).clipAngle(90), [rotation]);
  const globePath = useMemo(() => geoPath(projection), [projection]);
  const selectOrigin = (origin) => {
    setSelectedId(origin.id);
    setTab("Journey");
    setRotation([-origin.coords[0], -origin.coords[1], 0]);
  };
  const move = event => {
    if (!dragStart) return;
    const dx = event.clientX - dragStart.x, dy = event.clientY - dragStart.y;
    setRotation([dragStart.rotation[0] + dx * .32, Math.max(-85, Math.min(85, dragStart.rotation[1] - dy * .32)), 0]);
  };
  return (
    <section className="de-studies" aria-labelledby="de-studies-heading">
      <p className="de-studies__eyebrow">Interaction studies · DiscoverEats</p>
      <h2 id="de-studies-heading">Designed to be explored</h2>
      <p>Explore real origin coordinates, movement routes, research, and recipes from the DiscoverEats content model. This is a smaller interactive component, not the complete application.</p>
      <div className="de-studies__layout">
        <div className="de-studies__map">
          <div className="de-studies__toolbar"><strong>01 / Geographic exploration</strong><label><input type="checkbox" checked={showRoutes} onChange={event => setShowRoutes(event.target.checked)} /> Show routes</label></div>
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Interactive orthographic globe showing the selected origin and movement routes. Use the origin buttons to select locations."
            onPointerDown={event => {event.currentTarget.setPointerCapture(event.pointerId);setDragStart({x:event.clientX,y:event.clientY,rotation});}}
            onPointerMove={move} onPointerUp={()=>setDragStart(null)} onPointerCancel={()=>setDragStart(null)}
            style={{touchAction:"pan-y",cursor:dragStart?"grabbing":"grab"}}>
            <path d={globePath({type:"Sphere"}) || ""} fill="#d2c8a6" stroke="#7a6230" strokeWidth="1.2"/>
            <path d={globePath(geoGraticule10()) || ""} fill="none" stroke="#7a6230" strokeWidth=".45" opacity=".65"/>
            {showRoutes && ROUTES.map((route,index)=>{
              const from=ORIGINS.find(o=>o.id===route.from),to=ORIGINS.find(o=>o.id===route.to);
              if(!from||!to)return null;
              const interpolate=geoInterpolate(from.coords,to.coords);
              const points=Array.from({length:33},(_,i)=>interpolate(i/32));
              return <path key={index} d={globePath({type:"LineString",coordinates:points})||""} fill="none" stroke="#b93803" strokeWidth="2" strokeDasharray="4 3"/>;
            })}
            {ORIGINS.map(origin=>{
              const point=projection(origin.coords);
              if(!point)return null;
              const center=[-rotation[0],-rotation[1]];
              if(geoDistance(center,origin.coords)>Math.PI/2)return null;
              return <circle key={origin.id} cx={point[0]} cy={point[1]} r={selectedId===origin.id?7:4.5} fill={origin.color||"#3f5c3d"} stroke="#fff6e5" strokeWidth="2"/>;
            })}
          </svg>
          <p className="de-studies__note">Drag to rotate. Select an origin to center it. Geographic projection uses D3 and original DiscoverEats coordinates; country outlines are omitted in this focused demo.</p>
        </div>
        <div className="de-studies__sidebar">
          <strong>02 / Synchronized origin selection</strong>
          <div className="de-studies__origins" role="group" aria-label="Choose an origin">
            {ORIGINS.map((origin,index)=><button key={origin.id} type="button" aria-pressed={selectedId===origin.id} onClick={()=>selectOrigin(origin)}><span>{String(index+1).padStart(2,"0")}</span><span>{origin.name}</span></button>)}
          </div>
          <strong>03 / Story detail states</strong>
          <h3>{selected.name}</h3><p>{selected.role} · {selected.year}</p>
          <div className="de-studies__tabs" role="group" aria-label="Explore origin information">{TABS.map(value=><button type="button" key={value} aria-pressed={tab===value} onClick={()=>setTab(value)}>{value}</button>)}</div>
          <div className="de-studies__detail" aria-live="polite">
            {tab==="Journey"?<p>{selected.detail}</p>:tab==="Sources"?<ul>{(selected.manualSources||[]).slice(0,3).map((source,index)=><li key={index}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul>:selected.recipe?<div><strong>{selected.recipe.title}</strong><p>{selected.recipe.prepTime} prep · {selected.recipe.cookTime} cook</p><ul>{(selected.recipe.ingredients||[]).slice(0,4).map((item,index)=><li key={index}>{item}</li>)}</ul></div>:<p>No recipe available for this origin.</p>}
          </div>
        </div>
      </div>
      <p className="de-studies__note">Source: DiscoverEats original food-story model. The complete application includes country geometry, animation, richer media, and additional interactions.</p>
    </section>
  );
}
