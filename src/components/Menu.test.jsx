import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import Menu from "./Menu";
vi.mock("gsap", () => ({gsap: {set: vi.fn(), fromTo: vi.fn(), killTweensOf: vi.fn()}}));
let queries;
const media = query => queries[query] ??= {matches: false, listeners: new Set(), addEventListener(_, cb) {this.listeners.add(cb)}, removeEventListener(_, cb) {this.listeners.delete(cb)}};
const change = (query, matches) => act(() => {const m = media(query); m.matches = matches; m.listeners.forEach(cb => cb());});
const Harness = () => {const navigate = useNavigate(); return <><Menu /><main id="main-content"><button onClick={() => navigate('/expertise?case=discovereats')}>External route change</button></main></>;};
const setup = () => render(<MemoryRouter><Harness /></MemoryRouter>);
beforeEach(() => {queries={};vi.stubGlobal('matchMedia',vi.fn(media));vi.clearAllMocks();document.body.style.overflow='';});
afterEach(() => {cleanup();vi.unstubAllGlobals();});

describe('mobile navigation', () => {
 it('keeps closed overlay hidden and inert without accessible duplicate links', () => {
  const {container}=setup(); const overlay=container.querySelector('#mobile-menu-overlay');
  expect(overlay).toHaveAttribute('hidden');expect(overlay).toHaveAttribute('inert');expect(overlay).toHaveAttribute('aria-hidden','true');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();expect(screen.queryByRole('link',{name:'Contact'})).not.toBeInTheDocument();
 });
 it('focuses, traps, closes and restores focus across repeated sessions', () => {
  setup();const opener=screen.getByRole('button',{name:'Open navigation menu'});
  for(let i=0;i<3;i++) {
   fireEvent.click(opener);const dialog=screen.getByRole('dialog');const close=within(dialog).getByRole('button',{name:'Close navigation menu'});const last=within(dialog).getByRole('link',{name:'LinkedIn Profile'});
   expect(close).toHaveFocus();expect(document.getElementById('main-content')).toHaveAttribute('inert');expect(document.body.style.overflow).toBe('hidden');
   fireEvent.keyDown(document,{key:'Tab',shiftKey:true});expect(last).toHaveFocus();fireEvent.keyDown(document,{key:'Tab'});expect(close).toHaveFocus();
   fireEvent.keyDown(document,{key:'Escape'});expect(opener).toHaveFocus();expect(screen.queryByRole('dialog')).not.toBeInTheDocument();expect(document.getElementById('main-content')).not.toHaveAttribute('inert');expect(document.body.style.overflow).toBe('');
  }
 });
 it('offers a verified direct email and closes when navigation changes', () => {
  setup();fireEvent.click(screen.getByRole('button',{name:'Open navigation menu'}));
  expect(screen.getByRole('link',{name:'Contact'})).toHaveAttribute('href','mailto:sfdecoteau@gmail.com');
  fireEvent.click(screen.getByRole('button',{name:'EXPERTISE'}));expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:'Open navigation menu'}));fireEvent.click(screen.getByText('External route change'));expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
 });
 it('closes safely on desktop resize with only desktop contact exposed', () => {
  setup();fireEvent.click(screen.getByRole('button',{name:'Open navigation menu'}));change('(min-width: 769px)',true);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();expect(screen.getAllByRole('link',{name:'Contact'})).toHaveLength(1);expect(screen.getByRole('button',{name:'HOME'})).toHaveFocus();
 });
 it('does not tween the menu for reduced motion, including changes while open', () => {
  media('(prefers-reduced-motion: reduce)').matches=true;setup();fireEvent.click(screen.getByRole('button',{name:'Open navigation menu'}));expect(gsap.fromTo).not.toHaveBeenCalled();
  change('(prefers-reduced-motion: reduce)',false);expect(gsap.fromTo).toHaveBeenCalled();gsap.fromTo.mockClear();change('(prefers-reduced-motion: reduce)',true);expect(gsap.fromTo).not.toHaveBeenCalled();expect(gsap.killTweensOf).toHaveBeenCalled();
 });
 it('preserves preexisting inert and scroll lock on cleanup', () => {
  const {unmount}=setup();document.getElementById('main-content').setAttribute('inert','');document.body.style.overflow='clip';fireEvent.click(screen.getByRole('button',{name:'Open navigation menu'}));fireEvent.keyDown(document,{key:'Escape'});expect(document.getElementById('main-content')).toHaveAttribute('inert');expect(document.body.style.overflow).toBe('clip');unmount();
 });
});
