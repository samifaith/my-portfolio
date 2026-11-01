import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate, useLocation } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaQuery";
import { CONTACT_HREF } from "../constants/Contact";
import "./../App.css";

const LinkedInIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" /><path d="M8 10V16M8 8V8.5M12 16V13M12 13V10M12 13C12 10.5 16 10.5 16 13V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const focusableSelector = 'a[href], button:not([disabled]), select:not([disabled]), input:not([disabled]), [tabindex="0"]';

const Menu = () => {
 const [menuOpen, setMenuOpen] = useState(false);
 const desktop = useMediaQuery("(min-width: 769px)");
 const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
 const overlayRef = useRef(null);
 const openerRef = useRef(null);
 const desktopHomeRef = useRef(null);
 const wasOpenRef = useRef(false);
 const navigate = useNavigate();
 const location = useLocation();
 const active = menuOpen && !desktop;

 // Route changes and widening the viewport must not leave a hidden dialog open.
 useEffect(() => { setMenuOpen(false); }, [location.key, desktop]);
 useEffect(() => {
  if (!active) {
   if (wasOpenRef.current) (desktop ? desktopHomeRef.current : openerRef.current)?.focus();
   wasOpenRef.current = false;
   return undefined;
  }
  wasOpenRef.current = true;
  const overlay = overlayRef.current;
  const main = document.getElementById("main-content");
  const hadInert = main?.hasAttribute("inert");
  const oldOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  main?.setAttribute("inert", "");
  overlay?.querySelector("button")?.focus();
  const keydown = event => {
   if (event.key === "Escape") { event.preventDefault(); setMenuOpen(false); }
   if (event.key !== "Tab") return;
   const items = [...overlay.querySelectorAll(focusableSelector)].filter(el => !el.closest('[hidden], [inert]'));
   const first = items[0], last = items[items.length - 1];
   if (event.shiftKey && (document.activeElement === first || !overlay.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
   else if (!event.shiftKey && (document.activeElement === last || !overlay.contains(document.activeElement))) { event.preventDefault(); first?.focus(); }
  };
  document.addEventListener("keydown", keydown);
  return () => {
   document.removeEventListener("keydown", keydown);
   document.body.style.overflow = oldOverflow;
   if (!hadInert) main?.removeAttribute("inert");
  };
 }, [active, desktop]);
 useEffect(() => {
  const overlay = overlayRef.current;
  const nav = overlay?.querySelector("nav");
  gsap.killTweensOf([overlay, nav]);
  if (active) {
   if (reducedMotion) gsap.set([overlay, nav], { clearProps: "all" });
   else {
    gsap.fromTo(overlay, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 50% 50%)", duration: .5, ease: "power2.out" });
    gsap.fromTo(nav, { opacity: 0 }, { opacity: 1, duration: .3, delay: .15 });
   }
  }
  return () => gsap.killTweensOf([overlay, nav]);
 }, [active, reducedMotion]);
 const go = path => {
  setMenuOpen(false);
  if (path === "/" && location.pathname === "/") window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  else navigate(path);
 };
 return <>
  <nav className="desktop-nav" aria-label="Main navigation" aria-hidden={!desktop} inert={!desktop ? true : undefined}>
   <ul>
    <li className="desktop-menu-item"><button ref={desktopHomeRef} className="desktop-menu-link" onClick={() => go("/")}>HOME</button></li>
    <li className="desktop-menu-item"><button className="desktop-menu-link" onClick={() => go("/expertise")}>EXPERTISE</button></li>
    <li id="nav-filter-slot" className="desktop-menu-item nav-filter-slot" />
    <li className="desktop-menu-item desktop-menu-item--icons-start"><a href="https://www.linkedin.com/in/samdecoteau" target="_blank" rel="noopener noreferrer" className="linkedin-link" aria-label="LinkedIn Profile"><LinkedInIcon /></a></li>
    <li className="desktop-menu-item"><a href={CONTACT_HREF} className="desktop-menu-link direct-contact">Contact</a></li>
   </ul>
  </nav>
  <button ref={openerRef} type="button" className="menu-button" hidden={active || desktop} onClick={() => setMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={active} aria-controls="mobile-menu-overlay">
   <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><path d="M8 12H32M8 20H32M8 28H32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
  </button>
  <div ref={overlayRef} id="mobile-menu-overlay" className="menu-overlay" role="dialog" aria-label="Navigation" aria-modal={active ? true : undefined} aria-hidden={!active} inert={!active ? true : undefined} hidden={!active} onClick={event => { if (event.target === event.currentTarget) setMenuOpen(false); }}>
   <button type="button" className="menu-button menu-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu"><svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><path d="M10 10L30 30M30 10L10 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg></button>
   <nav aria-label="Mobile navigation"><ul>
    <li><button className="menu-item" onClick={() => go("/")}>HOME</button></li>
    <li><button className="menu-item" onClick={() => go("/expertise")}>EXPERTISE</button></li>
    <li id="mobile-filter-slot" className="mobile-filter-slot" onClick={event => event.stopPropagation()} />
    <li><a href={CONTACT_HREF} className="menu-item direct-contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
    <li><a href="https://www.linkedin.com/in/samdecoteau" target="_blank" rel="noopener noreferrer" className="menu-item linkedin-mobile" aria-label="LinkedIn Profile" onClick={() => setMenuOpen(false)}><LinkedInIcon /></a></li>
   </ul></nav>
  </div>
 </>;
};
export default Menu;
