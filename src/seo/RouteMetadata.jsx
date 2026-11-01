import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getMetadata } from "./catalog.mjs";
import { metadataTags } from "./html.mjs";

// Initial HTML metadata is produced at build/edge time. This keeps it in sync
// during client-side navigation, including opening/closing a project modal.
export default function RouteMetadata() {
 const {pathname,search}=useLocation();
 useEffect(()=>{
  const meta=getMetadata(pathname,search);
  if (!meta) return;
  document.head.querySelectorAll('title, meta[name="description"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"]').forEach(node=>node.remove());
  const template=document.createElement('template');
  template.innerHTML=metadataTags(meta);
  document.head.append(template.content);
 },[pathname,search]);
 return null;
}
