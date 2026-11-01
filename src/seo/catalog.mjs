// Shared by browser metadata updates and build-time HTML generation.
// Only currently visible projects are listed. No publication dates or outcomes
// are inferred from builds, and view/tracking parameters do not create canonicals.
export const SITE_ORIGIN = "https://samoncanvas.com";
const authorImage = "/illustratedheadshot.webp";
const authorAlt = "Illustrated portrait of Sam DeCoteau, portfolio author";
const absolute = path => new URL(path, SITE_ORIGIN).href;
const metadata = (title, description, path, image = authorImage, imageAlt = authorAlt) => Object.freeze({
 title, description, canonical: absolute(path), image: absolute(image), imageAlt,
});
const project = (id, title, description, image, imageAlt) => metadata(
 `${title} | Sam DeCoteau`, description, `/expertise?project=${id}`, image, imageAlt,
);

const writingMetadata = Object.freeze({
 "eat-like-child": metadata(
  "Eat Like a Child — Personal Essay | Sam DeCoteau",
  "A personal essay and editorial design exploring immigrant identity, generational memory, and the food traditions we learn to miss.",
  "/expertise-archived/eat-like-child", "/writing/manger.webp", "Manger editorial cover for Eat Like a Child",
 ),
 "home-cook": metadata(
  "The Rise of the Home Cook — Arielle Faria | Sam DeCoteau",
  "A profile of home chef Arielle Faria, with writing and editorial design exploring cooking as craft, cultural identity, and inheritance.",
  "/expertise-archived/home-cook", "/writing/OuiChef.webp", "Oui, Chef! editorial cover featuring the Arielle Faria profile",
 ),
 "tea-with-sami": metadata(
  "Tea with Sami — Nashville Hot Chicken | Sam DeCoteau",
  "A fictional podcast episode, script, and cover artwork exploring Nashville Hot Chicken through food history and folklore.",
  "/expertise-archived/tea-with-sami", "/writing/revengehot.gif", "Tea with Sami cover artwork: Revenge Served, Nashville Hot Chicken",
 ),
});

export const projectMetadata = Object.freeze({
 discovereats: project(
  "discovereats", "DiscoverEats — Food History and Front-End Architecture",
  "An independent, desktop-first food-history experience connecting a globe, cultural stories, and sources through React, D3, and a reusable story model.",
  "/case-studies/discovereats-dark-mode.jpg", "DiscoverEats dark-mode interface with West Africa selected on the globe and origin list",
 ),
 codeswxtch: project(
  "codeswxtch", "CodeSwxtch — Career Intelligence and AI Workflows",
  "An independent AI-assisted career workspace exploring professional fit, evidence confidence, and application workflows. Scoring calibration remains ongoing.",
 ),
 "atlas-heor": project(
  "atlas-heor", "ATLAS — UX Engineering at AESARA",
  "Sam DeCoteau’s team contribution to ATLAS: front-end implementation, information architecture, data visualization, and reusable interface patterns at AESARA.",
 ),
 "adhd-calculator": project(
  "adhd-calculator", "ADHD Economic Impact Calculator — UX and UI",
  "UX and UI work at AESARA on an ADHD calculator presenting estimates aggregated across 12 countries, with input flows and clear results presentation.",
  "/case-studies/adhd-default-state.jpg", "Current public ADHD calculator at its illustrative default 32.5% treatment setting, with aggregate estimates and disclaimer",
 ),
 life2life: project(
  "life2life", "Life 2 Life — Travel Interface Concept",
  "A travel-agency web interface concept exploring how AI-curated experiences can feel personal, with front-end work and visual design by Sam DeCoteau.",
  "/design/SamDeCoteau_Vector.webp", "Life 2 Life travel interface concept shown in a vector-design presentation",
 ),
 rowdy: project(
  "rowdy", "ROWDY — Typography Poster",
  "A typography and poster study inspired by UK punk, exploring fractured grids, compressed type, and the Rowdy typeface.",
  "/design/SD_TypePoster_ROWDY.webp", "Pink, black, and white ROWDY typography poster",
 ),
 lombardia: project(
  "lombardia", "LOMBARDIA — Typography Poster",
  "A Saul Bass-inspired typography poster exploring reduction, geometric shapes, and cinematic composition with the Lombardia typeface.",
  "/design/SD_TypePoster_LOMBARDIA.webp", "Red, yellow, black, and white LOMBARDIA typography poster",
 ),
 "black-unicorn": project(
  "black-unicorn", "Black Unicorn — Brand Identity Concept",
  "A conceptual personal-brand identity celebrating an unconventional path, with illustration, wordmark, and poster design by Sam DeCoteau.",
  "/design/BlackUnicorn.webp", "Black Unicorn conceptual brand poster with a unicorn silhouette on pink",
 ),
 "diving-film": project(
  "diving-film", "Diving — Short Film",
  "A short film assembled from Sam DeCoteau’s personal dive footage in Cabo San Lucas, Mexico, with cinematography and editing in Premiere Pro.",
 ),
 // These modal presentations and archive pages use the same WritingPieces source.
 // Keep the established article URLs canonical rather than index duplicate copies.
 ...writingMetadata,
});

export const routeMetadata = Object.freeze({
 "/": metadata(
  "Sam DeCoteau | Technical Consultant + Design Engineer",
  "Sam DeCoteau is a technical consultant and design engineer focused on front-end architecture, design systems, accessibility, and data-rich digital experiences.",
  "/",
 ),
 "/expertise": metadata(
  "Selected Work — Design Engineering and Technical Practice | Sam DeCoteau",
  "Explore Sam DeCoteau’s selected work in front-end architecture, design systems, accessible interfaces, writing, and visual design.",
  "/expertise",
 ),
 "/expertise-archived": metadata(
  "Work Archive — Writing, Design and Development | Sam DeCoteau",
  "Browse Sam DeCoteau’s work archive, including writing, editorial design, development projects, and visual studies.",
  "/expertise-archived",
 ),
 "/expertise-archived/eat-like-child": writingMetadata["eat-like-child"],
 "/expertise-archived/home-cook": writingMetadata["home-cook"],
 "/expertise-archived/tea-with-sami": writingMetadata["tea-with-sami"],
 "/wanderlust-case-study": metadata(
  "Wanderlust — Travel UX Concept | Sam DeCoteau",
  "A collaborative travel-app UX concept exploring preference-based trip discovery, destination comparison, and visible budget constraints.",
  "/wanderlust-case-study",
 ),
});

export function getMetadata(pathname, search = "") {
 const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
 if (path === "/expertise" || path === "/expertise-prototype") {
  const id = new URLSearchParams(search).get("project");
  return Object.hasOwn(projectMetadata, id) ? projectMetadata[id] : routeMetadata["/expertise"];
 }
 if (path === "/writing") return routeMetadata["/expertise-archived"];
 if (path.startsWith("/writing/")) {
  const id = path.slice("/writing/".length);
  return Object.hasOwn(writingMetadata, id) ? writingMetadata[id] : null;
 }
 return Object.hasOwn(routeMetadata, path) ? routeMetadata[path] : null;
}
