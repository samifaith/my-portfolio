import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { gsap } from "gsap";
import { HomePageComponent } from "./AnimatedHomePage";
vi.mock('gsap',()=>({gsap:{registerPlugin:vi.fn(),set:vi.fn(),fromTo:vi.fn(),killTweensOf:vi.fn()}}));
vi.mock('gsap/ScrollTrigger',()=>({ScrollTrigger:{config:vi.fn(),refresh:vi.fn()}}));
vi.mock('../components/DrawLetters',()=>({default:()=>null}));
vi.mock('../components/ScrollIndicator',()=>({default:()=>null}));
vi.mock('../components/VerticalTimeline',()=>({default:()=>null}));
vi.mock('../components/MadeByMeHand',()=>({default:()=>null}));
beforeEach(()=>{sessionStorage.clear();vi.clearAllMocks();vi.stubGlobal('matchMedia',()=>({matches:true,addEventListener:vi.fn(),removeEventListener:vi.fn()}));});
afterEach(()=>{cleanup();vi.unstubAllGlobals();});
describe('homepage direct actions and reduced motion',()=>{
 it('exposes selected work and email actions without waiting for typing',()=>{
  const raf=vi.spyOn(window,'requestAnimationFrame');
  const {container}=render(<MemoryRouter><HomePageComponent /></MemoryRouter>);
  expect(screen.getByRole('link',{name:'View selected work'})).toHaveAttribute('href','/expertise');
  expect(screen.getByRole('link',{name:'Let’s talk'})).toHaveAttribute('href','mailto:sfdecoteau@gmail.com');
  expect(container.querySelector('.intro-paragraph--visible')).toHaveTextContent('I bring design, storytelling, and systems thinking');
  expect(container.querySelector('.typing-cursor')).toBeNull();expect(raf).not.toHaveBeenCalled();expect(gsap.fromTo).not.toHaveBeenCalled();raf.mockRestore();
 });
});
