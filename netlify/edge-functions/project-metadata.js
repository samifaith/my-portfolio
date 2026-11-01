import { getMetadata } from '../../src/seo/catalog.mjs';
import { applyMetadata } from '../../src/seo/html.mjs';

// Query variants cannot be fully enumerated with exact-match redirect rules.
// Transform only expertise HTML, never assets or private/user data.
export default async function projectMetadata(request, context) {
 const url=new URL(request.url);
 if (request.method !== 'GET' || !url.searchParams.has('project')) return;
 const response=await context.next();
 if (response.status!==200 || !response.headers.get('content-type')?.includes('text/html')) return response;
 const html=applyMetadata(await response.text(),getMetadata(url.pathname,url.search));
 const headers=new Headers(response.headers);
 headers.delete('content-length'); headers.delete('content-encoding'); headers.delete('etag');
 // Do not reuse generic origin validators for transformed query-dependent bytes.
 headers.set('cache-control','no-store');
 return new Response(html,{status:response.status,statusText:response.statusText,headers});
}
export const config={path:['/expertise','/expertise/'],onError:'bypass'};
