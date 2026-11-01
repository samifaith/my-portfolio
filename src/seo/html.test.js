import { describe, expect, it } from 'vitest';
import { applyMetadata, sitemapXml, projectIndexFallback } from './html.mjs';
import { routeMetadata, projectMetadata } from './catalog.mjs';
describe('server-readable metadata generation',()=>{
 it('includes canonical crawlable no-JavaScript project links without hidden work',()=>{
  const html=projectIndexFallback(projectMetadata);expect(html).toContain('href="/expertise?project=discovereats"');expect(html).toContain('href="/expertise-archived/home-cook"');expect(html).not.toMatch(/pocketplay|project=vote/);
 });
 it('replaces rather than duplicates tags and preserves scripts/body/security tags',()=>{
  const original='<html><head><title>Old</title><meta name="description" content="old"><meta property="og:title" content="old"><link rel="canonical" href="old"><meta name="robots" content="index,follow"><script type="application/ld+json">{"@type":"Person"}</script></head><body><div id="root"></div><script src="/assets/app.js"></script></body></html>';
  const meta=projectMetadata.discovereats;const html=applyMetadata(original,meta);const doc=new DOMParser().parseFromString(html,'text/html');
  expect(doc.title).toBe(meta.title);expect(doc.querySelectorAll('title')).toHaveLength(1);expect(doc.querySelectorAll('meta[name="description"]')).toHaveLength(1);expect(doc.querySelector('link[rel="canonical"]').href).toBe(meta.canonical);
  expect(doc.querySelector('meta[property="og:image"]').content).toBe(meta.image);expect(doc.querySelector('meta[name="twitter:card"]').content).toBe('summary_large_image');
  expect(html).toContain('<body><div id="root"></div><script src="/assets/app.js"></script></body>');expect(html).toContain('application/ld+json');expect(applyMetadata(html,meta).match(/<title/g)).toHaveLength(1);
 });
 it('escapes attribute and title text',()=>{
  const meta={...routeMetadata['/'],title:'A < B & "C"',description:'" onload="evil'};
  const doc=new DOMParser().parseFromString(applyMetadata('<head></head>',meta),'text/html');expect(doc.title).toBe(meta.title);expect(doc.querySelector('meta[name="description"]').content).toBe(meta.description);expect(doc.querySelector('[onload]')).toBeNull();
 });
 it('sitemaps only unique canonical URLs, retaining legitimate archived work',()=>{
  const xml=sitemapXml([...Object.values(routeMetadata),...Object.values(projectMetadata)]);const doc=new DOMParser().parseFromString(xml,'application/xml');const urls=[...doc.querySelectorAll('loc')].map(x=>x.textContent);
  expect(new Set(urls).size).toBe(urls.length);expect(xml).not.toMatch(/projectView|utm_|pocketplay|project=vote/);expect(xml).toContain('/expertise-archived/home-cook');expect(xml).toContain('/expertise?project=discovereats');expect(doc.querySelector('parsererror')).toBeNull();
 });
});
