import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import RouteMetadata from './RouteMetadata';
import { projectMetadata, routeMetadata } from './catalog.mjs';
afterEach(()=>{cleanup();document.head.querySelectorAll('[data-portfolio-seo]').forEach(node=>node.remove());});
function Harness(){const navigate=useNavigate();return <><RouteMetadata/><button onClick={()=>navigate('/expertise?project=discovereats&projectView=study&utm_source=test')}>Open</button><button onClick={()=>navigate(-1)}>Back</button><button onClick={()=>navigate(1)}>Forward</button></>;}
describe('client metadata synchronization',()=>{
 it('updates on modal navigation and browser history without duplicate tags',()=>{
  render(<MemoryRouter initialEntries={['/expertise']}><Harness/></MemoryRouter>);
  expect(document.title).toBe(routeMetadata['/expertise'].title);
  fireEvent.click(screen.getByText('Open'));expect(document.title).toBe(projectMetadata.discovereats.title);expect(document.querySelector('link[rel="canonical"]').href).toBe(projectMetadata.discovereats.canonical);
  fireEvent.click(screen.getByText('Back'));expect(document.title).toBe(routeMetadata['/expertise'].title);
  fireEvent.click(screen.getByText('Forward'));expect(document.title).toBe(projectMetadata.discovereats.title);expect(document.querySelectorAll('title')).toHaveLength(1);expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
 });
});
