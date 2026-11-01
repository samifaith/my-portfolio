export const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export function metadataTags(meta) {
 const content = (name,value,property=false) => `<meta ${property?'property':'name'}="${name}" content="${escapeHtml(value)}" data-portfolio-seo>`;
 return [
  `<title data-portfolio-seo>${escapeHtml(meta.title)}</title>`,
  content('description',meta.description),
  `<link rel="canonical" href="${escapeHtml(meta.canonical)}" data-portfolio-seo>`,
  content('og:type','website',true), content('og:site_name','Sam DeCoteau',true),
  ...[['og:title',meta.title],['og:description',meta.description],['og:url',meta.canonical],['og:image',meta.image],['og:image:alt',meta.imageAlt]].map(([name,value])=>content(name,value,true)),
  content('twitter:card','summary_large_image'),
  ...[['twitter:title',meta.title],['twitter:description',meta.description],['twitter:image',meta.image],['twitter:image:alt',meta.imageAlt]].map(([name,value])=>content(name,value)),
 ].join('\n');
}
export function applyMetadata(html, meta) {
 if (!meta) return html;
 return html.replace(/<head\b([^>]*)>([\s\S]*?)<\/head>/i,(_,attributes,head)=>{
  const clean=head.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi,'')
   .replace(/<meta\b[^>]*(?:name|property)\s*=\s*["'](?:description|og:[^"']+|twitter:[^"']+)["'][^>]*>/gi,'')
   .replace(/<link\b[^>]*rel\s*=\s*["']canonical["'][^>]*>/gi,'');
  return `<head${attributes}>${clean}\n${metadataTags(meta)}\n</head>`;
 });
}
export function sitemapXml(entries) {
 const urls=[...new Set(entries.map(meta=>meta.canonical))].sort();
 return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url=>`  <url><loc>${escapeHtml(url)}</loc></url>`).join('\n')}\n</urlset>\n`;
}

// A small no-JavaScript index exposes real links in initial HTML without
// pretending the interactive project bodies have been server-rendered.
export function projectIndexFallback(projects) {
 const links=Object.values(projects).map(meta=>{
  const url=new URL(meta.canonical);
  return `<li><a href="${escapeHtml(url.pathname+url.search)}">${escapeHtml(meta.title.replace(/ \| Sam DeCoteau$/, ''))}</a></li>`;
 }).join('\n');
 return `<noscript><nav aria-label="Selected project links"><h2>Selected work</h2><p>Enable JavaScript to explore the interactive case studies.</p><ul>${links}</ul></nav></noscript>`;
}
