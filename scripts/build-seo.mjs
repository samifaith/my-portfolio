import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { routeMetadata, projectMetadata, SITE_ORIGIN } from '../src/seo/catalog.mjs';
import { applyMetadata, sitemapXml, projectIndexFallback } from '../src/seo/html.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const template=await readFile(path.join(root,'dist/index.html'),'utf8');
const rewrites=[];
for (const [route,meta] of Object.entries(routeMetadata)) {
 const target=route === '/' ? '/index.html' : `/_seo${route}.html`;
 const output=path.join(root,'dist',target);
 if (route !== '/') rewrites.push(`${route} ${target} 200`);
 await mkdir(path.dirname(output),{recursive:true});
 const html=applyMetadata(template,meta);
 await writeFile(output,route === "/expertise" ? html.replace("</body>",`${projectIndexFallback(projectMetadata)}\n</body>`) : html);
}
await writeFile(path.join(root,'dist/_redirects'), '# Generated static HTML metadata rewrites; aliases and SPA fallback remain in netlify.toml.\n'+rewrites.join('\n')+'\n');
const entries=[...Object.values(routeMetadata),...Object.values(projectMetadata)];
for (const meta of entries) {
 const image=new URL(meta.image);
 if (image.origin!==SITE_ORIGIN) throw new Error(`Unexpected external SEO image: ${image}`);
 await access(path.join(root,'public',decodeURIComponent(image.pathname)));
}
await writeFile(path.join(root,'dist/sitemap.xml'),sitemapXml(entries));
console.log(`Generated initial HTML metadata for ${Object.keys(routeMetadata).length} routes and sitemap with ${new Set(entries.map(x=>x.canonical)).size} canonical URLs.`);
