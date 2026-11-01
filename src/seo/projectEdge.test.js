// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';
import handler,{config} from '../../netlify/edge-functions/project-metadata.js';
const context=()=>({next:vi.fn(async()=>new Response('<html><head><title>Base</title></head><body><div id="root"></div></body></html>',{headers:{'content-type':'text/html','etag':'old','content-length':'100'}}))});
describe('expertise initial HTML edge transform',()=>{
 it.each(['?project=discovereats','?utm_source=friend&project=discovereats&projectView=study','?project=discovereats&other=anything'])('returns project metadata for query variants %s',async query=>{
  const ctx=context();const res=await handler(new Request('https://preview.netlify.app/expertise'+query),ctx);const html=await res.text();expect(html).toContain('DiscoverEats');expect(html).toContain('href="https://samoncanvas.com/expertise?project=discovereats"');expect(html).not.toContain('utm_source');expect(html).toContain('<body><div id="root"></div></body>');expect(res.headers.get('etag')).toBeNull();expect(res.headers.get('cache-control')).toBe('no-store');
 });
 it('uses expertise metadata for hidden IDs without exposing them',async()=>{const res=await handler(new Request('https://preview.netlify.app/expertise?project=pocketplay'),context());expect(await res.text()).not.toContain('PocketPlay');});
 it('bypasses non-project requests and is narrowly routed',async()=>{const ctx=context();expect(await handler(new Request('https://preview.netlify.app/expertise'),ctx)).toBeUndefined();expect(ctx.next).not.toHaveBeenCalled();expect(config.path).toEqual(['/expertise','/expertise/']);expect(config.onError).toBe('bypass');});
});
