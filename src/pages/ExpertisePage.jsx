import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ChevronUp } from "lucide-react";
import { getModernImageSources } from "../utils/imageFormats";
import ProjectCaseStudyModal from "../components/ProjectCaseStudyModal";
import FeaturedProjects from "../components/FeaturedProjects";
import "../styles/ExpertisePrototype.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const TRANSITION_TIMINGS = {
	layerDuration: 1.2,
	nextLayerOffset: 0.08,
	layerHideDelay: 1.21,
	tintDuration: 0.9,
	scrub: 0.55,
	snapDelay: 0.08,
	snapMinDuration: 0.2,
	snapMaxDuration: 0.5,
};

const SECTION_PRIORITY = {
	discovereats: 0,
	"atlas-heor": 1,
	"adhd-calculator": 2,
	life2life: 3,
};

const ExpertisePage = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [selectedProject, setSelectedProject] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isReturnToTopVisible, setIsReturnToTopVisible] = useState(false);
	const [isAboveProtoPage, setIsAboveProtoPage] = useState(true);
	const [topOffset, setTopOffset] = useState("0px");
	const [navFilterSlot, setNavFilterSlot] = useState(null);
	const [mobileFilterSlot, setMobileFilterSlot] = useState(null);
	const sectionRefs = useRef([]);
	const pageRef = useRef(null);
	const featuredRef = useRef(null);
	const jumpRef = useRef(null);
	const rightColumnRef = useRef(null);
	const imageStackRef = useRef(null);
	const layerWrapRefs = useRef([]);
	const refreshRafRef = useRef(null);

	const requestScrollTriggerRefresh = useCallback(() => {
		if (typeof window === "undefined") {
			return;
		}

		if (refreshRafRef.current) {
			cancelAnimationFrame(refreshRafRef.current);
		}

		refreshRafRef.current = requestAnimationFrame(() => {
			ScrollTrigger.refresh();
			refreshRafRef.current = null;
		});
	}, []);

	const baseSections = useMemo(
		() => [
			{
				id: "eat-like-child",
				title: "Eat Like a Child",
				description:
					"A personal essay on cultural identity through food â€” the immigrant experience of rejecting what you later grieve.",
				image: "/writing/manger.webp",
				label: "Writing",
				route: "/expertise-archived/eat-like-child",
				bg: "#e7ddd2",
				tools: ["Illustrator", "Photoshop", "InDesign"],
				study: {
					purpose:
						"Explore the intersection of immigrant identity, generational memory, and food â€” told through the lens of a child who didn't know what she had until it was gone.",
					role: "Writer and art director. Crafted the personal essay and designed the full editorial layout in Illustrator, Photoshop, and InDesign.",
					direction:
						"Warm, tactile typography built to evoke memory. The layout takes its time the way a good meal does â€” nothing rushed, nothing wasted.",
				},
			},
			{
				id: "home-cook",
				title: "The Rise of the Home Cook",
				description:
					"A profile of Arielle Faria â€” a home chef whose story illuminates the cultural shift toward cooking as craft, identity, and inheritance.",
				image: "/writing/OuiChef.webp",
				label: "Writing",
				route: "/expertise-archived/home-cook",
				bg: "#e5e6d7",
				tools: ["Photoshop"],
				study: {
					purpose:
						"Profile Arielle Faria and use her story to explore what food culture means in the age of the home cook â€” from PBS cooking shows to kitchen witchcraft.",
					role: "Writer and editorial designer. Conducted the interview, wrote the feature, and designed the print spread for Oui Chef magazine.",
					direction:
						"Editorial restraint with warmth. Let the story carry the weight â€” clean hierarchy, honest photography, type that guides without imposing.",
				},
			},
			{
				id: "tea-with-sami",
				title: "Tea with Sami",
				description:
					"A fictional podcast episode exploring the origin story of Nashville Hot Chicken, connecting food history to culture and folklore.",
				image: "/writing/revengehot.gif",
				label: "Writing",
				route: "/expertise-archived/tea-with-sami",
				bg: "#d8dde7",
				tools: ["Audacity", "Photoshop"],
				study: {
					purpose:
						"Create a fictional podcast episode that connects food history to culture and folklore â€” part of a larger series on the stories behind what we eat.",
					role: "Writer, audio producer, and cover artist. Scripted and recorded the episode; designed cover art in Photoshop.",
					direction:
						"The cover needed to feel like a guilty pleasure â€” bold, irreverent, impossible to ignore. Saturated reds and smoky darks to match the heat of the subject.",
				},
			},
			{
				id: "discovereats",
				title: "Discover Eats",
				description:
					"An independently designed and built food-origin encyclopedia exploring the stories, techniques, and cultural significance behind the dishes we love.",
				image: "/discovereatssh.png",
				label: "Development",
				route: "https://discovereats.samoncanvas.com",
				featured: true,
				bg: "#f5e6d3",
				tools: [
					"React",
						"GSAP",
					"MUI",
					"Claude AI",
					"Figma",
					"Lighthouse",
					"D3",
					"ThreeJS",
				],
				study: {
					purpose:
						"Build an interactive encyclopedia that celebrates food origins â€” making culinary history accessible and engaging for food enthusiasts.",
					role: "Independent product designer and developer. Conceptualized, designed, and built the platform end to end.",
					direction:
						"Food is storytelling, so the site had to feel like a cookbook someone's actually used â€” annotated, a little worn, easy to fall into for an hour when you only meant to look up one thing.",
				},
			},
			{
				id: "life2life",
				title: "Life 2 Life Travel Agency | Web Interface",
				description:
					"A homepage concept for a travel agency specializing in AI-cultivated travel experiences.",
				image: "/design/SamDeCoteau_Vector.avif",
				label: "Development",
				route: "/expertise",
				bg: "#d8e4d9",
				tools: ["React", "CSS", "Vite"],
				study: {
					purpose:
						"Concept a homepage for an AI-curated travel agency â€” exploring how to make algorithmic curation feel personal and aspirational rather than algorithmic.",
					role: "Front-end developer. Built the full interface in React with modern CSS layout and interaction design.",
					direction:
						"Sky-meets-horizon color language. The hard part was making algorithmic curation feel like a recommendation from the friend who's been everywhere, not output from a system that guessed.",
				},
			},
			{
				id: "atlas-heor",
				title: "ATLAS HEOR Platform",
				description:
					"The challenge was mimicking complex real-world processes while keeping the data understandable. At AESARA, I contributed to UX, front-end development, data visualization, information architecture, and reusable interface systems.",
				label: "AESARA Â· UX + FRONT-END",
				route: "https://www.arysana.com/atlas-platform",
				bg: "#dce5de",
				tools: ["UX/UI", "Data Visualization", "Design Systems", "Life Sciences"],
				visual: {
					type: "enterprise",
					eyebrow: "AESARA Inc. Â· Selected Contribution",
					metrics: ["HEOR", "B2B SaaS", "UX + Front-End"],
				},
				study: {
					purpose:
						"ATLAS is an AESARA-owned enterprise platform for health economics and outcomes research teams. This entry reflects work I contributed while employed at AESARA, not ownership of the product.",
					role: "As part of the AESARA product and engineering team, I contributed UX and front-end work across information architecture, interaction patterns, data visualization, and reusable interface patterns.",
					direction:
						"The work required translating dense HEOR workflows and layered stakeholder needs into interfaces that were clear, consistent, and trustworthy within an iterative product environment.",
				},
			},
			{
				id: "adhd-calculator",
				title: "ADHD6öæöÖ–2–×7B6Æ7VÆF÷""À –FW67&—F–öã  ’$â–çFW&7F—fR6÷7B6Æ7VÆF÷"F†BG&ç6ÆFW2D„BV6öæöÖ–2FF–çFòW'6öæÆ—¦VBÂ6÷VçG'’ÖÆWfVÂ&W7VÇG2âBU4$Â’ÆVBF†RU‚õT’Â–æ6ÇVF–ær–çWBfÆ÷w2Â&W7öç6—fR&V†f–÷"ÂæB&W7VÇG2&W6VçFF–öââ"À –Æ&VÃ¢$U4$+rU‚õT’"À —&÷WFS¢&‡GG3¢òöGFVçF–öæöæF†Bæ6öÒö6÷7BÖ6Æ7VÆF÷"ò"À –&s¢"6SvS&Cr"À —FööÇ3¢²%U‚õT’"Â$†VÇF‚V6öæöÖ–72"Â%&W7öç6—fRFW6–vâ"Â%†&Ö%ÒÀ —f—7VÃ¢° —G—S¢&VçFW'&—6R"À –W–V'&÷s¢$U4$–æ2â+r6VÆV7FVB6öçG&–'WF–öâ"À –ÖWG&–73¢²$6Æ7VÆF÷""Â$†VÇF†6&R"Â%U‚õT’%ÒÀ —ÒÀ —7GVG“¢° —W'÷6S  ’%F†—26Æ–VçBÖf6–ær6Æ7VÆF÷"v2FVÆ—fW&VBF‡&÷Vv‚U4$Fò†VÇ†VÇF†6&R7F¶V†öÆFW'2W‡Æ÷&RF†RV6öæöÖ–2'W&FVâöbD„BâF†—2VçG'’&VfÆV7G2×’6öçG&–'WF–öâ2'BöbF†RU4$FVÒâ"À —&öÆS¢$’ÆVBF†RU‚õT’f÷"F†R6Æ7VÆF÷"W‡W&–Væ6RÂ–æ6ÇVF–ær–çWBfÆ÷w2Â&W7VÇG2&W6VçFF–öâÂæB&W7öç6—fR&V†f–÷"â"À –F—&V7F–öã  •F†RW‡W&–Væ6R†BFòv÷&²f÷"V÷ÆRv—F‚f'––ærÆWfVÇ2öb7V&¦V7BÖÖGFW"¶æ÷vÆVFvRv†–ÆR7F––ær6ÆV"Â7&VF–&ÆRÂæBV7’Fòæf–vFRâ"À —ÒÀ —ÒÀ —° ––C¢'&÷vG’"À —F—FÆS¢%$õtE’G—R÷7FW""À –FW67&—F–öã  ’%G—R7GVG’–ç7—&VB'’F†RT²Væ²66VæRöbF†RÆFRs2WF–Æ—¦–ærF†RG—Vf6R&÷vG’'’&Væ¦Ö–â'W76Râ"À ––ÖvS¢"öFW6–vâõ4EõG—U÷7FW%õ$õtE’æf–b"À –Æ&VÃ¢$FW6–vâ"À —&÷WFS¢"öW‡W'F—6R"À –&s¢"6S&SfCR"À —FööÇ3¢²$–ÆÇW7G&F÷"%ÒÀ —7GVG“¢° —W'÷6S  ’$G—öw&†–27GVG’6†ææVÆ–ærF†Rf—7VÂVæW&w’öbT²Væ²(	BW6–ær&÷vG’'’&Væ¦Ö–â'W76R2F†RfW76VÂf÷"6öçG&öÆÆVB6†÷2â"À —&öÆS¢$FW6–væW"æB'BF—&V7F÷"â6öæ6WBæBgVÆÂW†V7WF–öâ–â–ÆÇW7G&F÷"â"À –F—&V7F–öã  ’%FVç6–öâv—F†–â7G'V7GW&RâVæ²'&ö¶R'VÆW2'’¶æ÷v–ærF†VÒ(	B6òF†RÆ–÷WBföÆÆ÷w27G&–7Bw&–B—BF†VâFVÆ–&W&FVÇ’g&7GW&W2â6ö×&W76VBG—RÂ&rVFvW2Â6öæg&öçFF–öæÂ66ÆRâ"À —ÒÀ —ÒÀ —° ––C¢&ÆöÖ&&F–"À —F—FÆS¢$ÄôÔ$$D”G—R÷7FW""À –FW67&—F–öã  ’$×’F¶Röâ6VÂ&72Ö–ç7—&VBG—R÷7FW"W6–ærF†RG—Vf6RÆöÖ&&F–'’ÇV6–æòW&öæF’â"À ––ÖvS¢"öFW6–vâõ4EõG—U÷7FW%ôÄôÔ$$D”æf–b"À –Æ&VÃ¢$FW6–vâ"À —&÷WFS¢"öW‡W'F—6R"À –&s¢"6CVS&V"À —FööÇ3¢²$–ÆÇW7G&F÷"%ÒÀ —7GVG“¢° —W'÷6S  ’$G&–'WFRFòF†Rf—7VÂw&ÖÖ"öb6VÂ&72(	BW‡Æ÷&–ær&VGV7F–öâÂ6†RÂæB6–æVÖF–26ö×÷6—F–öâF‡&÷Vv‚F†RG—Vf6RÆöÖ&&F–'’ÇV6–æòW&öæF’â"À —&öÆS¢$FW6–væW"â6öæ6WBæBW†V7WF–öâ–â–ÆÇW7G&F÷"â"À –F—&V7F–öã  ’$ÆW72Fò6’Ö÷&Râ&726öæFVç6VBVçF—&Ræ'&F—fW2–çFò6–ævÆRvW7GW&RâF†RG&—f–ærVW7F–öã¢v†B—2F†RÖ–æ–×VÒæVVFVBFò6öÖ×Væ–6FRÖ†–×VÒ–×7Cò"À —ÒÀ —ÒÀ —° ––C¢'f÷FR"À —F—FÆS¢$ÆG’Æ–&W'G’6—2Fòf÷FR"À –FW67&—F–öã  ’$÷7FW"Væ6÷W&v–ærf÷FW"'F–6—F–öâÂ–ç7—&VB'’F†RuvR6âFò—Br&÷6–RF†R&—fWFW"÷7FW"(	B&Vg&ÖVBF‡&÷Vv‚ÆG’Æ–&W'G’â"À ––ÖvS¢"öFW6–vâõf÷FUõ÷7FW"æf–b"À –Æ&VÃ¢$FW6–vâ"À —&÷WFS¢"öW‡W'F—6R"À –&s¢"6S–FFC2"À —FööÇ3¢²$–ÆÇW7G&F÷"%ÒÀ —7GVG“¢° —W'÷6S  ’$÷7FW"Væ6÷W&v–ær6—f–2'F–6—F–öâ(	B&VÖ—†–ærF†R–6öæöw&‡’öbuvR6âFò—BrF‡&÷Vv‚F†RÆVç2öbÆG’Æ–&W'G’ÂÖ¶–ærW&vVæ7’fVVÂ&÷F‚F–ÖVÆW72æB–ÖÖVF–FRâ"À —&öÆS¢$FW6–væW"æB–ÆÇW7G&F÷"âf—'7B6W&–÷W2fV7F÷"–ÆÇW7G&F–öâv÷&³²'V–ÇBVçF—&VÇ’–â–ÆÇW7G&F÷"â"À –F—&V7F–öã  ’$fÖ–Æ–"f÷&ÒÂg&W6‚W&vVæ7’âÆWfW&vR&V6övæ—F–öâFòÆ÷vW"F†R&'&–W"(	BÖ¶R6öÖWF†–ærV÷ÆRfVVÂ&Vf÷&RF†W’F†–æ²&÷WB—Bâ"À —ÒÀ —ÒÀ —° ––C¢&&Æ6²×Væ–6÷&â"À —F—FÆS¢$&Æ6²Væ–6÷&â"À –FW67&—F–öã  ’$6öæ6WGVÂ'&æF–æræB÷7FW"FW6–vâf÷"W'6öæÂ'&æB6VÆV'&F–ærF†RVæ6öçfVçF–öæÂ7&VF—fRF‚â"À ––ÖvS¢"öFW6–vâô&Æ6µVæ–6÷&âæf–b"À –Æ&VÃ¢$FW6–vâ"À —&÷WFS¢"öW‡W'F—6R"À –&s¢"6FFC–V"À —FööÇ3¢²$–ÆÇW7G&F÷""Â%†÷F÷6†÷%ÒÀ —7GVG“¢° —W'÷6S  ’$6öæ6WGVÂ'&æB–FVçF—G’f÷"F†÷6Rv†òFöâwBf—BF†RÖöÆBÂFöâwBvçBFòÂæB†fRÖFRF†BF†V—"7WW'÷vW"â"À —&öÆS¢$'&æB7G&FVv—7BÂFW6–væW"Â–ÆÇW7G&F÷"âFWfVÆ÷VBF†RgVÆÂf—7VÂ–FVçF—G“¢v÷&FÖ&²Â÷7FW"7—7FVÒÂæBFW6–vâÆæwVvRâ"À –F—&V7F–öã  ’$F&¶æW72æB—&–FW66Væ6R–âWVÂÖV7W&RâF†RÆWGFRÖ÷fW2g&öÒFVW&Æ6²F‡&÷Vv‚VÆV7G&–2f–öÆWB(	B÷vW"Â×—7FW'’ÂæBV–WB&VgW6ÂFò&R÷&F–æ'’â"À —ÒÀ —ÒÀ —° ––C¢&F—f–ærÖf–ÆÒ"À —F—FÆS¢$F—f–ær"À –FW67&—F–öã  ’$6†÷'Bf–ÆÒ6ö×–ÆVBg&öÒW'6öæÂF—fRfö÷FvR–â6&ò6âÇV62ÂÖW†–6ò(	B6GW&–ærv†B—BfVVÇ2Æ–¶RFò&RVæFW'vFW"â"À —f–FVó¢"÷†÷Föw&‡’öF—f–æräÕB"À –Æ&VÃ¢$ÖVF–"À —&÷WFS¢"öW‡W'F—6R"À –&s¢"6C–SSR"À —FööÇ3¢²%&VÖ–W&R&ò%ÒÀ —7GVG“¢° —W'÷6S  ’$6GW&RæBVF—BW'6öæÂfö÷FvRg&öÒ67V&F—f–ærG&—–â6&ò6âÇV62(	B7&VF–ær6†÷'Bf–ÆÒF†B6öÖ×Væ–6FW2F†RF—6÷&–VçF–ær6ÆÒöb&V–ærVæFW'vFW"â"À —&öÆS¢$6–æVÖFöw&†W"æBVF—F÷"â6†÷Böâvõ&ó²76VÖ&ÆVBÂ6öÆ÷"Öw&FVBÂæB6VB–â&VÖ–W&R&òâ"À –F—&V7F–öã  ’$ÆWBF†Rö6VâFòF†RFÆ¶–ærâF†RVF—BföÆÆ÷w2F†R&‡—F†ÒöbF†RvFW"(	BVæ‡W'&–VBÂVæ7GVFVB'’7VFFVâ6öÆ÷"æBÖ÷fVÖVçBâæòæ'&F–öââæò×W6–2F†Bf–v‡G2F†Rfö÷FvRâ"À —ÒÀ —ÒÀ •ÒÀ •µÒÀ ’“°  –6öç7B6V7F–öç2ÒW6TÖVÖò€ ’‚’Óà •²ââæ&6U6V7F–öç5Òç6÷'B‚†ÆVgE6V7F–öâÂ&–v‡E6V7F–öâ’Óâ° –6öç7BÆVgE&–÷&—G’Ò4T5D”ôåõ$”õ$•E•¶ÆVgE6V7F–öâæ–EÒóò° –6öç7B&–v‡E&–÷&—G’Ò4T5D”ôåõ$”õ$•E•·&–v‡E6V7F–öâæ–EÒóò° —&WGW&âÆVgE&–÷&—G’Ò&–v‡E&–÷&—G“° —Ò’À •¶&6U6V7F–öç5ÒÀ ’“°  —W6TVffV7B‚‚’Óâ° —G'’° ––b€ —G—Vöbv–æF÷rÓÒ'VæFVf–æVB"b` —v–æF÷ræÖF6„ÖVF–‚"†Ö–â×v–GFƒ¢#W‚’"’æÖF6†W0 ’’° —&WGW&âVæFVf–æVC° —Ð  –6öç7B6öçFVçE6V7F–öç2Ò6V7F–öå&Vg2æ7W'&Vç@ ’ç6Æ–6RƒÂ6V7F–öç2æÆVæwF‚ ’æf–ÇFW"„&ööÆVâ“°  ––b‚6öçFVçE6V7F–öç2æÆVæwF‚’° —&WGW&âVæFVf–æVC° —Ð  –6öç7Bö'6W'fW"ÒæWr–çFW'6V7F–öäö'6W'fW"€ ’†VçG&–W2’Óâ° —G'’° –6öç7Bf—6–&ÆTVçG&–W2ÒVçG&–W0 ’æf–ÇFW"‚†VçG'’’ÓâVçG'’æ—4–çFW'6V7F–ær ’ç6÷'B‚†Â"’Óâ"æ–çFW'6V7F–öå&F–òÒæ–çFW'6V7F–öå&F–ò“°  ––b‚f—6–&ÆTVçG&–W2æÆVæwF‚’° —&WGW&ã° —Ð  –6öç7BF÷VçG'’Òf—6–&ÆTVçG&–W5³Ó° –6öç7BæW‡D–æFW‚Ò6öçFVçE6V7F–öç2æf–æD–æFW‚€ ’‡6V7F–öâ’Óâ6V7F–öâÓÓÒF÷VçG'’çF&vWBÀ ’“°  ––b†æW‡D–æFW‚ãÒ’° —6WD7F—fT–æFW‚†æW‡D–æFW‚“° —Ð —Ò6F6‚†W'"’° –6öç6öÆRæW'&÷"‚$–çFW'6V7F–öäö'6W'fW"6ÆÆ&6²W'&÷#¢"ÂW'"“° —Ð —ÒÀ —° —&ö÷C¢çVÆÂÀ —&ö÷DÖ&v–ã¢"Ó#BR‚Ó#BR‚"À —F‡&W6†öÆC¢³ã#RÂãRÂãsUÒÀ —ÒÀ ’“°  –6öçFVçE6V7F–öç2æf÷$V6‚‚‡6V7F–öâ’Óâö'6W'fW"æö'6W'fR‡6V7F–öâ’“°  —&WGW&â‚’Óâ° –ö'6W'fW"æF—66öææV7B‚“° —Ó° —Ò6F6‚†W'"’° –6öç6öÆRæW'&÷"‚$–çFW'6V7F–öäö'6W'fW"6WGWW'&÷#¢"ÂW'"“° —&WGW&âVæFVf–æVC° —Ð —ÒÂ·6V7F–öç5Ò“°  —W6TÆ–÷WDVffV7B‚‚’Óâ° —G'’° ––b‡G—Vöbv–æF÷rÓÓÒ'VæFVf–æVB"’° —&WGW&âVæFVf–æVC° —Ð  –6öç7B&VGV6VDÖ÷F–öåVW'’Òv–æF÷ræÖF6„ÖVF–€ ’"‡&VfW'2×&VGV6VBÖÖ÷F–öã¢&VGV6R’"À ’“°  ––b‡&VGV6VDÖ÷F–öåVW'’æÖF6†W2’° —&WGW&âVæFVf–æVC° —Ð  –6öç7BÖÒÒw6æÖF6„ÖVF–‚“°  –ÖÒæFB‚"†Ö–â×v–GFƒ¢#W‚’"Â‚’Óâ° —G'’° –6öç7BvTVÆVÖVçBÒvU&Vbæ7W'&VçC° –6öç7B&–v‡D6öÇVÖäVÆVÖVçBÒ&–v‡D6öÇVÖå&Vbæ7W'&VçC° –6öç7B–åF&vWDVÆVÖVçBÒ–ÖvU7F6µ&Vbæ7W'&VçC° –6öç7BÆ–W%w&W'2ÒÆ–W%w&&Vg2æ7W'&VçBæf–ÇFW"„&ööÆVâ“°  ––b€ ’vTVÆVÖVçBÇÀ ’&–v‡D6öÇVÖäVÆVÖVçBÇÀ ’–åF&vWDVÆVÖVçBÇÀ –Æ–W%w&W'2æÆVæwF‚Â  ’’° —&WGW&âVæFVf–æVC° —Ð  –6öç7B7G‚Òw6æ6öçFW‡B‚‚’Óâ° —G'’° –6öç7BvWDçVÖW&–4775f"Ò‡fÇVR’Óâ° –6öç7B'6VBÒçVÖ&W"ç'6TfÆöB‡fÇVRÇÂ#"“° —&WGW&âçVÖ&W"æ—4f–æ—FR‡'6VB’ò'6VB¢° —Ó°  –6öç7BvWE6V7F–öå6æö–çG2Ò‚’Óâ° –6öç7B6V7F–öäVÆVÖVçG2Ò6V7F–öå&Vg2æ7W'&Vç@ ’ç6Æ–6RƒÂ6V7F–öç2æÆVæwF‚ ’æf–ÇFW"„&ööÆVâ“°  ––b‚6V7F–öäVÆVÖVçG2æÆVæwF‚ÇÂvTVÆVÖVçB’° —&WGW&â³ÂÓ° —Ð  –6öç7B6ö×WFVE7G–ÆW2Òv–æF÷rævWD6ö×WFVE7G–ÆR‡vTVÆVÖVçB“° –6öç7BvUF÷öfg6WBÐ –vWDçVÖW&–4775f"€ –6ö×WFVE7G–ÆW2ævWE&÷W'G•fÇVR‚"Ò×&÷Fò×F÷Ööfg6WB"’À ’’° –vWDçVÖW&–4775f"€ –6ö×WFVE7G–ÆW2ævWE&÷W'G•fÇVR‚"Ò×&÷FòÖ§V×Ö†V–v‡B"’À ’“°  –6öç7BÖ…67&öÆÂÒÖF‚æÖ‚€ “À —vTVÆVÖVçBç67&öÆÄ†V–v‡BÒv–æF÷ræ–ææW$†V–v‡BÀ ’“°  –6öç7Bö–çG2Ò6V7F–öäVÆVÖVçG2æÖ‚‡6V7F–öäVÆVÖVçB’Óâ° –6öç7B6V7F–öåF÷67&öÆÂÐ —6V7F–öäVÆVÖVçBæöfg6WEF÷Ð —vTVÆVÖVçBæöfg6WEF÷Ð —vUF÷öfg6WC° —&WGW&âw6çWF–Ç2æ6Æ×ƒÂÂ6V7F–öåF÷67&öÆÂòÖ…67&öÆÂ“° —Ò“°  ––b‚ö–çG2æÆVæwF‚’° —&WGW&â³ÂÓ° —Ð  —ö–çG5³ÒÒ° —ö–çG5·ö–çG2æÆVæwF‚ÒÒÒ°  —&WGW&âö–çG3° —Ó°  –6öç7BvWDæV&W7E6V7F–öä–æFW‚Ò‡&öw&W72’Óâ° –6öç7B6æö–çG2ÒvWE6V7F–öå6æö–çG2‚“° –ÆWBæV&W7D–æFW‚Ò° –ÆWBÖ–äF—7Fæ6RÒçVÖ&W"åõ4•D•dUô”äd”ä•E“°  —6æö–çG2æf÷$V6‚‚‡6æö–çBÂ–æFW‚’Óâ° –6öç7BF—7Fæ6RÒÖF‚æ'2‡&öw&W72Ò6æö–çB“° ––b†F—7Fæ6RÂÖ–äF—7Fæ6R’° –Ö–äF—7Fæ6RÒF—7Fæ6S° –æV&W7D–æFW‚Ò–æFWƒ° —Ð —Ò“°  —&WGW&âæV&W7D–æFWƒ° —Ó°  –w6ç6WB†Æ–W%w&W'2Â° —v–ÆÄ6†ævS¢&6Æ—×F‚Â÷6—G’ÂG&ç6f÷&Ò"À —Ò“°  ––b‡–åF&vWDVÆVÖVçB’° –w6ç6WB‡–åF&vWDVÆVÖVçBÂ° ’"Ò×&÷Fò×7F6²×F–çB#¢6V7F–öç5¶7F—fT–æFW…Óòæ&rÀ —Ò“° —Ð  –Æ–W%w&W'2æf÷$V6‚‚†Æ–W%w&W"Â–æFW‚’Óâ° —G'’° –w6ç6WB†Æ–W%w&W"Â° —¤–æFWƒ¢6V7F–öç2æÆVæwF‚Ò–æFW‚À –WFôÇ†¢–æFW‚ÓÓÒò¢À –6Æ—Fƒ¢&–ç6WBƒRRRR’"À —Ò“° —Ò6F6‚†W'"’° –6öç6öÆRæW'&÷"†f–ÆVBFò6WBÆ–W"G¶–æFW‡Ó¦ÂW'"“° —Ð —Ò“°  –ÆWB7F—fTÆ–W$–æFW‚Ò°  –6öç7B6†÷tÆ–W"Ò†æW‡D–æFW‚ÂF—&V7F–öâÒÂæ–ÖFRÒG'VR’Óâ° ––b‚Æ–W%w&W'5¶æW‡D–æFW…Ò’° —&WGW&ã° —Ð  –w6çFò‡–åF&vWDVÆVÖVçBÂ° –WFôÇ†¢À –GW&F–öã¢æ–ÖFRòE$å4•D”ôåõD”Ô”äu2çF–çDGW&F–öâ¢ãR¢À –V6S¢'÷vW#"æ÷WB"À –÷fW'w&—FS¢G'VRÀ —Ò“°  –6öç7B&Wf–÷W4Æ–W"ÒÆ–W%w&W'5¶7F—fTÆ–W$–æFW…Ó° –6öç7BæW‡DÆ–W"ÒÆ–W%w&W'5¶æW‡D–æFW…Ó° –6öç7B&WfVÄg&öÒÐ –F—&V7F–öâãÒ  “ò&–ç6WBƒRRRR’  “¢&–ç6WBƒRRRR’#°  –w6æ¶–ÆÅGvVVç4öb†Æ–W%w&W'2“°  –Æ–W%w&W'2æf÷$V6‚‚†Æ–W%w&W"Â–æFW‚’Óâ° –w6ç6WB†Æ–W%w&W"Â° —¤–æFWƒ  ––æFW‚ÓÓÒæW‡D–æFW€ “ò6V7F–öç2æÆVæwF‚² “¢6V7F–öç2æÆVæwF‚Ò–æFW‚À —Ò“° —Ò“°  ––b‚æ–ÖFRÇÂæW‡D–æFW‚ÓÓÒ7F—fTÆ–W$–æFW‚’° –w6ç6WB†Æ–W%w&W'2Â° –WFôÇ†¢†–æFW‚’Óâ†–æFW‚ÓÓÒæW‡D–æFW‚ò¢’À –6Æ—Fƒ¢&–ç6WBƒRRRR’"À —Ò“° –7F—fTÆ–W$–æFW‚ÒæW‡D–æFWƒ° —&WGW&ã° —Ð  –w6ç6WB†Æ–W%w&W'2Â° –WFôÇ†¢†–æFW‚’Óà ––æFW‚ÓÓÒ7F—fTÆ–W$–æFW‚ÇÂ–æFW‚ÓÓÒæW‡D–æFW‚ò¢À –6Æ—Fƒ¢&–ç6WBƒRRRR’"À —Ò“°  –w6ç6WB†æW‡DÆ–W"Â° –6Æ—Fƒ¢&WfVÄg&öÒÀ —Ò“°  –w6çFò†æW‡DÆ–W"Â° –6Æ—Fƒ¢&–ç6WBƒRRRR’"À –GW&F–öã¢E$å4•D”ôåõD”Ô”äu2æÆ–W$GW&F–öâÀ –V6S¢'÷vW#"æ–ä÷WB"À –÷fW'w&—FS¢G'VRÀ –öä6ö×ÆWFS¢‚’Óâ° –w6ç6WB†Æ–W%w&W'2Â° –WFôÇ†¢†–æFW‚’Óâ†–æFW‚ÓÓÒæW‡D–æFW‚ò¢’À –6Æ—Fƒ¢&–ç6WBƒRRRR’"À —Ò“° —ÒÀ —Ò“°  ––b‡&Wf–÷W4Æ–W"bb&Wf–÷W4Æ–W"ÓÒæW‡DÆ–W"’° –w6çFò‡&Wf–÷W4Æ–W"Â° –WFôÇ†¢À –GW&F–öã¢E$å4•D”ôåõD”Ô”äu2æÆ–W$GW&F–öâ¢ãcRÀ –V6S¢'÷vW#"æ÷WB"À –÷fW'w&—FS¢G'VRÀ —Ò“° —Ð  –7F—fTÆ–W$–æFW‚ÒæW‡D–æFWƒ° —Ó°  —6†÷tÆ–W"ƒÂÂfÇ6R“°  •67&öÆÅG&–vvW"æ7&VFR‡° —G&–vvW#¢vTVÆVÖVçBÀ —7F'C¢'F÷F÷"À –VæC¢&&÷GFöÒ&÷GFöÒ"À —–ã¢–åF&vWDVÆVÖVçBÀ —6æ¢° —6æFó¢‡&öw&W72’Óâ° –6öç7B6æö–çG2ÒvWE6V7F–öå6æö–çG2‚“° –ÆWBæV&W7Eö–çBÒ6æö–çG5³Òóò° –ÆWBÖ–äF—7Fæ6RÒçVÖ&W"åõ4•D•dUô”äd”ä•E“°  —6æö–çG2æf÷$V6‚‚‡6æö–çB’Óâ° –6öç7BF—7Fæ6RÒÖF‚æ'2‡&öw&W72Ò6æö–çB“° ––b†F—7Fæ6RÂÖ–äF—7Fæ6R’° –Ö–äF—7Fæ6RÒF—7Fæ6S° –æV&W7Eö–çBÒ6æö–çC° —Ð —Ò“°  —&WGW&âæV&W7Eö–çC° —ÒÀ –FVÆ“¢E$å4•D”ôåõD”Ô”äu2ç6æFVÆ’À –GW&F–öã¢° –Ö–ã¢E$å4•D”ôåõD”Ô”äu2ç6æÖ–äGW&F–öâÀ –Öƒ¢E$å4•D”ôåõD”Ô”äu2ç6æÖ„GW&F–öâÀ —ÒÀ –V6S¢'÷vW#"æ–ä÷WB"À ––æW'F–¢fÇ6RÀ —ÒÀ –çF–6—FU–ã¢À ––çfÆ–FFTöå&Vg&W6ƒ¢G'VRÀ –f7E67&öÆÄVæC¢fÇ6RÀ —Ò“°  —6V7F–öå&Vg2æ7W'&Vç@ ’ç6Æ–6RƒÂ6V7F–öç2æÆVæwF‚ ’æf÷$V6‚‚‡6V7F–öäVÆVÖVçBÂ–æFW‚’Óâ° —G'’° ––b‚6V7F–öäVÆVÖVçB’° —&WGW&ã° —Ð  •67&öÆÅG&–vvW"æ7&VFR‡° —G&–vvW#¢6V7F–öäVÆVÖVçBÀ —7F'C¢'F÷6VçFW""À –VæC¢&&÷GFöÒ6VçFW""À –öäVçFW#¢‚’Óâ° —6†÷tÆ–W"†–æFW‚Â“° —6WD7F—fT–æFW‚‚‡&Wb’Óà —&WbÓÓÒ–æFW‚ò&Wb¢–æFW‚À ’“° —ÒÀ –öäVçFW$&6³¢‚’Óâ° —6†÷tÆ–W"†–æFW‚ÂÓ“° —6WD7F—fT–æFW‚‚‡&Wb’Óà —&WbÓÓÒ–æFW‚ò&Wb¢–æFW‚À ’“° —ÒÀ —Ò“° —Ò6F6‚†W'"’° –6öç6öÆRæW'&÷"€ –f–ÆVBFò7&VFR6V7F–öâG&–vvW"G¶–æFW‡Ó¦À –W'"À ’“° —Ð —Ò“°  —Ò6F6‚†W'"’° –6öç6öÆRæW'&÷"‚$u46öçFW‡B7&VF–öâW'&÷#¢"ÂW'"“° —Ð —ÒÂvTVÆVÖVçB“°  —&WGW&â‚’Óâ° —G'’° –7G‚ç&WfW'B‚“° —Ò6F6‚†W'"’° –6öç6öÆRæW'&÷"‚$u46öçFW‡B6ÆVçWW'&÷#¢"ÂW'"“° —Ð —Ó° —Ò6F6‚†W'"’° –6öç6öÆRæW'&÷"‚$u4ÖF6„ÖVF–6ÆÆ&6²W'&÷#¢"ÂW'"“° —&WGW&âVæFVf–æVC° —Ð —Ò“°  —&WGW&â‚’Óâ° —G'’° –ÖÒç&WfW'B‚“° —Ò6F6‚†W'"’° –6öç6öÆRæW'&÷"‚$u4ÖF6„ÖVF–6ÆVçWW'&÷#¢"ÂW'"“° —Ð —Ó° —Ò6F6‚†W'"’° –6öç6öÆRæW'&÷"‚'W6TÆ–÷WDVffV7BW'&÷#¢"ÂW'"“° —&WGW&âVæFVf–æVC° —Ð —ÒÂ·6V7F–öç5Ò“°  –6öç7B7F—fU6V7F–öâÒ6V7F–öç5¶7F—fT–æFW…ÒÇÂ6V7F–öç5³Ó°  —W6TVffV7B‚‚’Óâ° —G'’° –6öç7BvTVÆVÖVçBÒvU&Vbæ7W'&VçC° –6öç7B&ö÷DVÆVÖVçBÒFö7VÖVçBæFö7VÖVçDVÆVÖVçC°  ––b‚vTVÆVÖVçBÇÂ7F—fU6V7F–öãòæ&r’° —&WGW&âVæFVf–æVC° —Ð  –6öç7B–åF&vWDVÆVÖVçBÒ–ÖvU7F6µ&Vbæ7W'&VçC°  –6öç7B&VfW'5&VGV6VDÖ÷F–öâÒv–æF÷ræÖF6„ÖVF–€ ’"‡&VfW'2×&VGV6VBÖÖ÷F–öã¢&VGV6R’"À ’’æÖF6†W3° –6öç7BF–çEf'2Ò° ’"Ò×6—FRÖæb×F–çB#¢7F—fU6V7F–öâæ&rÀ ’"Ò×&÷Fò×vR×F–çB#¢7F—fU6V7F–öâæ&rÀ —Ó°  ––b‡&VfW'5&VGV6VDÖ÷F–öâ’° ”ö&¦V7BæVçG&–W2‡F–çEf'2’æf÷$V6‚‚…·&÷W'G’ÂfÇVUÒ’Óâ° —&ö÷DVÆVÖVçBç7G–ÆRç6WE&÷W'G’‡&÷W'G’ÂfÇVR“° —vTVÆVÖVçBç7G–ÆRç6WE&÷W'G’‡&÷W'G’ÂfÇVR“° —Ò“° —vTVÆVÖVçBç7G–ÆRæ&6¶w&÷VæD6öÆ÷"Ò7F—fU6V7F–öâæ&s° —&WGW&âVæFVf–æVC° —Ð  –w6çFò‡&ö÷DVÆVÖVçBÂ° ’"Ò×6—FRÖæb×F–çB#¢7F—fU6V7F–öâæ&rÀ –GW&F–öã¢E$å4•D”ôåõD”Ô”äu2çF–çDGW&F–öâÀ –V6S¢'÷vW#"æ÷WB"À –÷fW'w&—FS¢&WFò"À —Ò“°  –w6çFò‡vTVÆVÖVçBÂ° ’"Ò×&÷Fò×vR×F–çB#¢7F—fU6V7F–öâæ&rÀ –&6¶w&÷VæD6öÆ÷#¢7F—fU6V7F–öâæ&rÀ –GW&F–öã¢E$å4•D”ôåõD”Ô”äu2çF–çDGW&F–öâÀ –V6S¢'÷vW#"æ÷WB"À –÷fW'w&—FS¢&WFò"À —Ò“°  ––b‡–åF&vWDVÆVÖVçB’° –w6çFò‡–åF&vWDVÆVÖVçBÂ° ’"Ò×&÷Fò×7F6²×F–çB#¢7F—fU6V7F–öâæ&rÀ –GW&F–öã¢E$å4•D”ôåõD”Ô”äu2çF–çDGW&F–öâÀ –V6S¢'÷vW#"æ÷WB"À –÷fW'w&—FS¢&WFò"À —Ò“° —Ð  —&WGW&â‚’Óâ° —G'’° –w6æ¶–ÆÅGvVVç4öb‡vTVÆVÖVçB“° –w6æ¶–ÆÅGvVVç4öb‡&ö÷DVÆVÖVçB“° ––b‡–åF&vWDVÆVÖVçB’° –w6æ¶–ÆÅGvVVç4öb‡–åF&vWDVÆVÖVçB“° —Ð —&ö÷DVÆVÖVçBç7G–ÆRç&VÖ÷fU&÷W'G’‚"Ò×6—FRÖæb×F–çB"“° —vTVÆVÖVçBç7G–ÆRç&VÖ÷fU&÷W'G’‚"Ò×&÷Fò×vR×F–çB"“° ––b‡–åF&vWDVÆVÖVçB’° —–åF&vWDVÆVÖVçBç7G–ÆRç&VÖ÷fU&÷W'G’‚"Ò×&÷Fò×7F6²×F–çB"“° —Ð —Ò6F6‚†W'"’° –6öç6öÆRæW'&÷"‚$f–ÆVBFò6ÆVçW&6¶w&÷VæB6öÆ÷"GvVVã¢"ÂW'"“° —Ð —Ó° —Ò6F6‚†W'"’° –6öç6öÆRæW'&÷"‚$&6¶w&÷VæB6öÆ÷"G&ç6—F–öâW'&÷#¢"ÂW'"“° —&WGW&âVæFVf–æVC° —Ð —ÒÂ¶7F—fU6V7F–öåÒ“°  —W6TVffV7B‚‚’Óâ° –6öç7BvTVÆVÖVçBÒvU&Vbæ7W'&VçC° –6öç7B§V×VÆVÖVçBÒ§V×&Vbæ7W'&VçC°  ––b‚vTVÆVÖVçBÇÂ§V×VÆVÖVçB’° —&WGW&âVæFVf–æVC° —Ð  –6öç7BWFFT§V×†V–v‡BÒ‚’Óâ° –6öç7B§V×†V–v‡BÒÖF‚æ6V–Â†§V×VÆVÖVçBævWD&÷VæF–æt6Æ–VçE&V7B‚’æ†V–v‡B“° —vTVÆVÖVçBç7G–ÆRç6WE&÷W'G’‚"Ò×&÷FòÖ§V×Ö†V–v‡B"ÂG¶§V×†V–v‡G×†“° —&WVW7E67&öÆÅG&–vvW%&Vg&W6‚‚“° —Ó°  —WFFT§V×†V–v‡B‚“°  –6öç7B&W6—¦Tö'6W'fW"ÒæWr&W6—¦Tö'6W'fW"‡WFFT§V×†V–v‡B“° —&W6—¦Tö'6W'fW"æö'6W'fR†§V×VÆVÖVçB“°  —v–æF÷ræFDWfVçDÆ—7FVæW"‚'&W6—¦R"ÂWFFT§V×†V–v‡B“°  —&WGW&â‚’Óâ° —&W6—¦Tö'6W'fW"æF—66öææV7B‚“° —v–æF÷rç&VÖ÷fTWfVçDÆ—7FVæW"‚'&W6—¦R"ÂWFFT§V×†V–v‡B“° —vTVÆVÖVçBç7G–ÆRç&VÖ÷fU&÷W'G’‚"Ò×&÷FòÖ§V×Ö†V–v‡B"“° —Ó° —ÒÂ¶—4ÖöFÄ÷VâÂ&WVW7E67&öÆÅG&–vvW%&Vg&W6…Ò“°  —W6TVffV7B‚‚’Óâ° –6öç7B6Æ÷BÒFö7VÖVçBævWDVÆVÖVçD'”–B‚&æbÖf–ÇFW"×6Æ÷B"“° —6WDædf–ÇFW%6Æ÷B‡6Æ÷B“° –6öç7BÖö&–ÆU6Æ÷BÒFö7VÖVçBævWDVÆVÖVçD'”–B‚&Öö&–ÆRÖf–ÇFW"×6Æ÷B"“° —6WDÖö&–ÆTf–ÇFW%6Æ÷B†Öö&–ÆU6Æ÷B“° —&WGW&â‚’Óâ° —6WDædf–ÇFW%6Æ÷B†çVÆÂ“° —6WDÖö&–ÆTf–ÇFW%6Æ÷B†çVÆÂ“° —Ó° —ÒÂµÒ“°  –6öç7B§V×f–ÇFW'2ÒW6TÖVÖò€ ’‚’Óâ²ââææWr6WB‡6V7F–öç2æÖ‚‡6V7F–öâ’Óâ6V7F–öâæÆ&VÂ’•ÒÀ •·6V7F–öç5ÒÀ ’“°  —W6TVffV7B‚‚’Óâ° –6öç7BWFFUF÷öfg6WBÒ‚’Óâ° –6öç7BæbÒFö7VÖVçBçVW'•6VÆV7F÷"‚"æFW6·F÷Öæb"“° –6öç7Bæe7G–ÆW2Òæbòv–æF÷rævWD6ö×WFVE7G–ÆR†æb’¢çVÆÃ° –6öç7B—4FW6·F÷æef—6–&ÆRÐ –æbb` –æe7G–ÆW2b` –æe7G–ÆW2æF—7Æ’ÓÒ&æöæR"b` –æbæöfg6WD†V–v‡Bâ°  —6WEF÷öfg6WB†—4FW6·F÷æef—6–&ÆRòG¶æbæöfg6WD†V–v‡G×†¢#‚"“° —&WVW7E67&öÆÅG&–vvW%&Vg&W6‚‚“° —Ó°  —WFFUF÷öfg6WB‚“° —v–æF÷ræFDWfVçDÆ—7FVæW"‚'&W6—¦R"ÂWFFUF÷öfg6WB“°  —&WGW&â‚’Óâ° —v–æF÷rç&VÖ÷fTWfVçDÆ—7FVæW"‚'&W6—¦R"ÂWFFUF÷öfg6WB“° —Ó° —ÒÂ·&WVW7E67&öÆÅG&–vvW%&Vg&W6…Ò“°  —W6TVffV7B‚‚’Óâ° —&WGW&â‚’Óâ° ––b‡&Vg&W6…&e&Vbæ7W'&VçB’° –6æ6VÄæ–ÖF–öäg&ÖR‡&Vg&W6…&e&Vbæ7W'&VçB“° —Ð —Ó° —ÒÂµÒ“°  —W6TVffV7B‚‚’Óâ° ––b†Fö7VÖVçBç&VG•7FFRÓÓÒ&6ö×ÆWFR"’° —&WVW7E67&öÆÅG&–vvW%&Vg&W6‚‚“° —&WGW&âVæFVf–æVC° —Ð —v–æF÷ræFDWfVçDÆ—7FVæW"‚&ÆöB"Â&WVW7E67&öÆÅG&–vvW%&Vg&W6‚“° —&WGW&â‚’Óâ° —v–æF÷rç&VÖ÷fTWfVçDÆ—7FVæW"‚&ÆöB"Â&WVW7E67&öÆÅG&–vvW%&Vg&W6‚“° —Ó° —ÒÂ·&WVW7E67&öÆÅG&–vvW%&Vg&W6…Ò“°  –6öç7B†æFÆT§V×FòÒ†Æ&VÂ’Óâ° ––b†Æ&VÂÓÓÒ$fVGW&VB"’° –6öç7BfVGW&VD–æFW‚Ò6V7F–öç2æf–æD–æFW‚‚‡6V7F–öâ’Óâ6V7F–öâæfVGW&VB“° ––b†fVGW&VD–æFW‚ãÒ’° —6V7F–öå&Vg2æ7W'&VçE¶fVGW&VD–æFW…Óòç67&öÆÄ–çFõf–Wr‡° –&V†f–÷#¢'6Öö÷F‚"À –&Æö6³¢'7F'B"À —Ò“° —Ð —&WGW&ã° —Ð –6öç7BF&vWD–æFW‚Ò6V7F–öç2æf–æD–æFW‚€ ’‡6V7F–öâ’Óâ6V7F–öâæÆ&VÂÓÓÒÆ&VÂÀ ’“° ––b‡F&vWD–æFW‚Â’° —&WGW&ã° —Ð —6V7F–öå&Vg2æ7W'&VçE·F&vWD–æFW…Óòç67&öÆÄ–çFõf–Wr‡° –&V†f–÷#¢'6Öö÷F‚"À –&Æö6³¢'7F'B"À —Ò“° —Ó°  —W6TVffV7B‚‚’Óâ° –6öç7BWFFUf—6–&–Æ—G’Ò‚’Óâ° –6öç7BfVGW&VDVÆVÖVçBÒfVGW&VE&Vbæ7W'&VçC°  ––b‚fVGW&VDVÆVÖVçBÇÂ—4ÖöFÄ÷Vâ’° —6WD—5&WGW&åFõF÷f—6–&ÆR†fÇ6R“° —&WGW&ã° —Ð  –6öç7BfVGW&VD&÷GFöÒÐ –fVGW&VDVÆVÖVçBæöfg6WEF÷²fVGW&VDVÆVÖVçBæöfg6WD†V–v‡C° —6WD—5&WGW&åFõF÷f—6–&ÆR‡v–æF÷rç67&öÆÅ’ãÒfVGW&VD&÷GFöÒÒ#B“° —Ó°  —WFFUf—6–&–Æ—G’‚“° —v–æF÷ræFDWfVçDÆ—7FVæW"‚'67&öÆÂ"ÂWFFUf—6–&–Æ—G’Â²76—fS¢G'VRÒ“° —v–æF÷ræFDWfVçDÆ—7FVæW"‚'&W6—¦R"ÂWFFUf—6–&–Æ—G’“°  —&WGW&â‚’Óâ° —v–æF÷rç&VÖ÷fTWfVçDÆ—7FVæW"‚'67&öÆÂ"ÂWFFUf—6–&–Æ—G’“° —v–æF÷rç&VÖ÷fTWfVçDÆ—7FVæW"‚'&W6—¦R"ÂWFFUf—6–&–Æ—G’“° —Ó° —ÒÂ¶—4ÖöFÄ÷VåÒ“°  —W6TVffV7B‚‚’Óâ° –6öç7BWFFU÷6—F–öâÒ‚’Óâ° –6öç7BvTVÆVÖVçBÒvU&Vbæ7W'&VçC° ––b‚vTVÆVÖVçB’&WGW&ã° —6WD—4&÷fU&÷FõvR‡v–æF÷rç67&öÆÅ’ÂvTVÆVÖVçBæöfg6WEF÷ÒS“° —Ó° —WFFU÷6—F–öâ‚“° —v–æF÷ræFDWfVçDÆ—7FVæW"‚'67&öÆÂ"ÂWFFU÷6—F–öâÂ²76—fS¢G'VRÒ“° —&WGW&â‚’Óâv–æF÷rç&VÖ÷fTWfVçDÆ—7FVæW"‚'67&öÆÂ"ÂWFFU÷6—F–öâ“° —ÒÂµÒ“°  –6öç7B†æFÆU&WGW&åFõF÷Ò‚’Óâ° —v–æF÷rç67&öÆÅFò‡²F÷¢Â&V†f–÷#¢'6Öö÷F‚"Ò“° —Ó°  –6öç7B†æFÆT÷Vå&ö¦V7DÖöFÂÒ†—FVÒ’Óâ° —6WE6VÆV7FVE&ö¦V7B†—FVÒ“° —6WD—4ÖöFÄ÷Vâ‡G'VR“° —Ó°  –6öç7B†æFÆT6Æ÷6U&ö¦V7DÖöFÂÒ‚’Óâ° —6WD—4ÖöFÄ÷Vâ†fÇ6R“° —Ó°  –6öç7B†æFÆTgFW%&ö¦V7DÖöFÄ6Æ÷6RÒW6T6ÆÆ&6²‚‚’Óâ° —6WE6VÆV7FVE&ö¦V7B†çVÆÂ“° —ÒÂµÒ“°  –6öç7B6VÆV7FVD–æFW‚ÒW6TÖVÖò€ ’‚’Óâ6V7F–öç2æf–æD–æFW‚‚‡2’Óâ2æ–BÓÓÒ6VÆV7FVE&ö¦V7Còæ–B’À •·6V7F–öç2Â6VÆV7FVE&ö¦V7EÒÀ ’“°  –6öç7B†æFÆTæf–vFTÖöFÂÒW6T6ÆÆ&6²€ ’†F—&V7F–öâ’Óâ° –6öç7BæW‡D–æFW‚Ò6VÆV7FVD–æFW‚²F—&V7F–öã° ––b†æW‡D–æFW‚ãÒbbæW‡D–æFW‚Â6V7F–öç2æÆVæwF‚’° —6WE6VÆV7FVE&ö¦V7B‡6V7F–öç5¶æW‡D–æFW…Ò“° —Ð —ÒÀ •·6V7F–öç2Â6VÆV7FVD–æFW…ÒÀ ’“°  –6öç7B†æFÆU&ö¦V7E&–Ö'”7F–öâÒ†—FVÒ’Óâ° ––b†—FVÒç&÷WFRbb—FVÒç&÷WFRç7F'G5v—F‚‚&‡GG"’’° —v–æF÷ræ÷Vâ†—FVÒç&÷WFRÂ%ö&Ææ²"Â&æö÷VæW"Ææ÷&VfW'&W""“° —&WGW&ã° —Ð –†æFÆT÷Vå&ö¦V7DÖöFÂ†—FVÒ“° —Ó°  –6öç7B&VæFW%&ö¦V7DÖVF–Ò€ –—FVÒÀ –ÇEFW‡BÀ —²–7GW&T6Æ74æÖRÂ–Öt6Æ74æÖRÒÒ·ÒÀ ’’Óâ° ––b†—FVÒçf—7VÃòçG—RÓÓÒ&VçFW'&—6R"’° —&WGW&â€ “ÆF—` –6Æ74æÖS×¶G¶–Öt6Æ74æÖRÇÂ"'Ò&÷FòÖVçFW'&—6RÖÖVF–çG&–Ò‚—Ð —&öÆSÒ&–Ör  –&–ÖÆ&VÃ×¶ÇEFW‡GÐ “à “ÆF—b6Æ74æÖSÒ'&÷FòÖVçFW'&—6RÖÖVF–Ö–ææW"#à “Ç6Æ74æÖSÒ'&÷FòÖVçFW'&—6RÖÖVF–ÖW–V'&÷r#à —¶—FVÒçf—7VÂæW–V'&÷wÐ “Â÷à “Æƒ3ç¶—FVÒçF—FÆWÓÂöƒ3à “Çç¶—FVÒç7GVG“òçW'÷6RÇÂ—FVÒæFW67&—F–öçÓÂ÷à “ÆF—b6Æ74æÖSÒ'&÷FòÖVçFW'&—6RÖÖVF–ÖÖWG&–72#à —¶—FVÒçf—7VÂæÖWG&–73òæÖ‚†ÖWG&–2’Óâ€ “Ç7â¶W“×¶ÖWG&–7Óç¶ÖWG&–7ÓÂ÷7ãà ’’—Ð “ÂöF—cà “ÂöF—cà “ÂöF—cà ’“° —Ð  ––b†—FVÒçf–FVò’° —&WGW&â€ “Çf–FVð —7&3×¶—FVÒçf–FV÷Ð –6Æ74æÖS×¶–Öt6Æ74æÖWÐ –×WFV@ –Æö÷  –WFõÆ —Æ—4–æÆ–æP –&–ÖÆ&VÃ×¶ÇEFW‡GÐ ’óà ’“° —Ð  –6öç7B–ÖvUF‚Ò—FVÒæ–ÖvS°  ––b‚–ÖvUF‚’° —&WGW&âçVÆÃ° —Ð  –6öç7B–ÖvU6÷W&6W2ÒvWDÖöFW&ä–ÖvU6÷W&6W2†–ÖvUF‚“°  ––b‚–ÖvU6÷W&6W2’° —&WGW&âçVÆÃ° —Ð  —&WGW&â€ “Ç–7GW&R6Æ74æÖS×·–7GW&T6Æ74æÖWÓà —¶–ÖvU6÷W&6W2æf–bbb€ “Ç6÷W&6R7&56WC×¶–ÖvU6÷W&6W2æf–gÒG—SÒ&–ÖvRöf–b"óà ’—Ð —¶–ÖvU6÷W&6W2çvV'bb€ “Ç6÷W&6R7&56WC×¶–ÖvU6÷W&6W2çvV'ÒG—SÒ&–ÖvR÷vV'"óà ’—Ð “Æ–Öp —7&3×¶–ÖvU6÷W&6W2æfÆÆ&6·Ð –ÇC×¶ÇEFW‡GÐ –6Æ74æÖS×¶–Öt6Æ74æÖWÐ –ÆöF–æsÒ&Æ§’  –FV6öF–æsÒ&7–æ2  ’óà “Â÷–7GW&Sà ’“° —Ó°  –6öç7Bf–ÇFW$'WGFöç2Ò²$fVGW&VB"Âââæ§V×f–ÇFW'5ÒæÖ‚†f–ÇFW$Æ&VÂ’Óâ€ “Æ'WGFöà –¶W“×¶f–ÇFW$Æ&VÇÐ —G—SÒ&'WGFöâ  –6Æ74æÖS×¶&÷FòÖ§V×Ö'FâG° –f–ÇFW$Æ&VÂÓÓÒ$fVGW&VB  “ò—4&÷fU&÷FõvP “ò&—2Ö7F—fR  “¢"  “¢7F—fU6V7F–öâæÆ&VÂÓÓÒf–ÇFW$Æ&VÀ “ò&—2Ö7F—fR  “¢"  —ÖÐ –öä6Æ–6³×²‚’Óâ†æFÆT§V×Fò†f–ÇFW$Æ&VÂ—Ð “à —¶f–ÇFW$Æ&VÇÐ “Âö'WGFöãà ’’“°  –6öç7BÖö&–ÆTf–ÇFW$'WGFöç2Ò²$fVGW&VB"Âââæ§V×f–ÇFW'5ÒæÖ€ ’†f–ÇFW$Æ&VÂ’Óâ€ “Æ'WGFöà –¶W“×¶f–ÇFW$Æ&VÇÐ —G—SÒ&'WGFöâ  –6Æ74æÖS×¶Öö&–ÆRÖf–ÇFW"Ö'FâG° –f–ÇFW$Æ&VÂÓÓÒ$fVGW&VB  “ò—4&÷fU&÷FõvP “ò&—2Ö7F—fR  “¢"  “¢7F—fU6V7F–öâæÆ&VÂÓÓÒf–ÇFW$Æ&VÀ “ò&—2Ö7F—fR  “¢"  —ÖÐ –öä6Æ–6³×²‚’Óâ° –†æFÆT§V×Fò†f–ÇFW$Æ&VÂ“° –Fö7VÖVçBævWDVÆVÖVçD'”–B‚&Öö&–ÆRÖÖVçRÖ÷fW&Æ’"“òæ6Æ–6²‚“° —×Ð “à —¶f–ÇFW$Æ&VÇÐ “Âö'WGFöãà ’’À ’“°  —&WGW&â€ “Ãà —¶ædf–ÇFW%6Æ÷Bb` –7&VFU÷'FÂ€ “ÆF—b6Æ74æÖSÒ'&÷FòÖ§V×Ö6öçG&öÇ2#ç¶f–ÇFW$'WGFöç7ÓÂöF—câÀ –ædf–ÇFW%6Æ÷BÀ ’—Ð —¶Öö&–ÆTf–ÇFW%6Æ÷Bb` –7&VFU÷'FÂ€ “ÆF—b6Æ74æÖSÒ&Öö&–ÆRÖf–ÇFW"Öw&÷W#à “Ç6Æ74æÖSÒ&Öö&–ÆRÖf–ÇFW"ÖÆ&VÂ#ä§V×FóÂ÷à “ÆF—b6Æ74æÖSÒ&Öö&–ÆRÖf–ÇFW"Ö'Fç2#ç¶Öö&–ÆTf–ÇFW$'WGFöç7ÓÂöF—cà “ÂöF—câÀ –Öö&–ÆTf–ÇFW%6Æ÷BÀ ’—Ð “ÆF—b6Æ74æÖSÒ'&÷FòÖ§V××w&#à “Ç6V7F–öà —&Vc×¶§V×&VgÐ –6Æ74æÖSÒ'&÷FòÖ§V×  –&–ÖÆ&VÃÒ$§V×Fò6V7F–öâ  “à “Ç6Æ74æÖSÒ'&÷FòÖ§V×ÖÆ&VÂ#ä§V×FóÂ÷à “ÆF—b6Æ74æÖSÒ'&÷FòÖ§V×Ö6öçG&öÇ2#ç¶f–ÇFW$'WGFöç7ÓÂöF—cà “Â÷6V7F–öãà “ÂöF—cà “ÆF—b&Vc×¶fVGW&VE&VgÓà “ÄfVGW&VE&ö¦V7G2óà “ÂöF—cà “ÆF—` —&Vc×·vU&VgÐ –6Æ74æÖSÒ'&÷Fò×vR  —7G–ÆS×·° ’"Ò×&÷Fò×F÷Ööfg6WB#¢F÷öfg6WBÀ ’"Ò×&÷Fò×vR×F–çB#¢6V7F–öç5³Òæ&rÀ –&6¶w&÷VæD6öÆ÷#¢6V7F–öç5³Òæ&rÀ —×Ð “à “ÆÖ–â6Æ74æÖSÒ'&÷Fò×6†VÆÂ#à “Ç6V7F–öâ6Æ74æÖSÒ'&÷FòÖÆVgB#à —·6V7F–öç2æÖ‚†—FVÒÂ–æFW‚’Óâ€ “Æ'F–6ÆP –6Æ74æÖSÒ'&÷Fò×6V7F–öâ  –¶W“×¶—FVÒæ–GÐ —&Vc×²†VÂ’Óâ° —6V7F–öå&Vg2æ7W'&VçE¶–æFW…ÒÒVÃ° —×Ð “à “ÆF—b6Æ74æÖSÒ'&÷FòÖ6÷’#à “Ç6Æ74æÖSÒ'&÷FòÖÆ&VÂ#ç¶—FVÒæÆ&VÇÓÂ÷à “Æƒ#ç¶—FVÒçF—FÆWÓÂöƒ#à “Çç¶—FVÒæFW67&—F–öçÓÂ÷à —¶—FVÒçFööÇ2bb—FVÒçFööÇ2æÆVæwF‚âbb€ “ÆF—b6Æ74æÖSÒ'&÷Fò×FööÂÖÆ—7B#à —¶—FVÒçFööÇ2æÖ‚‡FööÂ’Óâ€ “Ç7â¶W“×·FööÇÒ6Æ74æÖSÒ'&÷Fò×FööÂ×Fr#à —·FööÇÐ “Â÷7ãà ’’—Ð “ÂöF—cà ’—Ð “Æ'WGFöà —G—SÒ&'WGFöâ  –6Æ74æÖSÒ'&÷FòÖ7F  –öä6Æ–6³×²‚’Óâ° –†æFÆU&ö¦V7E&–Ö'”7F–öâ†—FVÒ“° —×Ð “à ”ÆV&âÖ÷&P “Âö'WGFöãà “ÂöF—cà “ÆF—b6Æ74æÖSÒ'&÷FòÖÖö&–ÆRÖÖVF–#à —·&VæFW%&ö¦V7DÖVF–†—FVÒÂ—FVÒçF—FÆRÂ° ––Öt6Æ74æÖS¢'&÷FòÖÖö&–ÆRÖÖVF–Ö—FVÒ"À —Ò—Ð “ÂöF—cà “Âö'F–6ÆSà ’’—Ð “Â÷6V7F–öãà  “Ç6V7F–öâ&Vc×·&–v‡D6öÇVÖå&VgÒ6Æ74æÖSÒ'&÷Fò×&–v‡B#à “ÆF—` —&Vc×¶–ÖvU7F6µ&VgÐ –6Æ74æÖSÒ'&÷FòÖ–ÖvR×7F6²  —7G–ÆS×·²"Ò×&÷Fò×7F6²×F–çB#¢6V7F–öç5³Òæ&r×Ð “à —·6V7F–öç2æÖ‚†—FVÒÂ–æFW‚’Óâ€ “ÆF—` –6Æ74æÖSÒ'&÷FòÖÆ–W"×w&  –¶W“×¶—FVÒæ–GÐ —7G–ÆS×·²&6¶w&÷VæD6öÆ÷#¢—FVÒæ&r×Ð —&Vc×²†VÂ’Óâ° –Æ–W%w&&Vg2æ7W'&VçE¶–æFW…ÒÒVÃ° —×Ð “à “Æ'WGFöà —G—SÒ&'WGFöâ  –6Æ74æÖSÒ'&÷FòÖÆ–W"ÖÆ–æ²  –öä6Æ–6³×²‚’Óâ° –†æFÆU&ö¦V7E&–Ö'”7F–öâ†—FVÒ“° —×Ð –&–ÖÆ&VÃ×¶ÆV&âÖ÷&R&÷WBG¶—FVÒçF—FÆWÖÐ —F$–æFWƒ×¶–æFW‚ÓÓÒ7F—fT–æFW‚ò¢ÓÐ –F—6&ÆVC×¶–æFW‚ÓÒ7F—fT–æFW‡Ð “à —·&VæFW%&ö¦V7DÖVF–†—FVÒÂ—FVÒçF—FÆRÂ° —–7GW&T6Æ74æÖS¢'&÷FòÖÆ–W"×–7GW&R"À ––Öt6Æ74æÖS¢'&÷FòÖÆ–W""À —Ò—Ð “Âö'WGFöãà “ÂöF—cà ’’—Ð “ÂöF—cà “Â÷6V7F–öãà “ÂöÖ–ãà  —¶—5&WGW&åFõF÷f—6–&ÆRbb€ “Æ'WGFöà —G—SÒ&'WGFöâ  –6Æ74æÖSÒ'&÷Fò×&WGW&â×Fò×F÷—2×f—6–&ÆR  –öä6Æ–6³×¶†æFÆU&WGW&åFõF÷Ð –&–ÖÆ&VÃÒ%&WGW&âFòF÷  “à “Ä6†Wg&öåW6Æ74æÖSÒ'&÷Fò×&WGW&â×Fò×F÷Ö–6öâ"óà •&WGW&âFòF÷  “Âö'WGFöãà ’—Ð “ÂöF—cà —·6VÆV7FVE&ö¦V7Bbb€ “Å&ö¦V7D66U7GVG”ÖöFÀ —&ö¦V7C×·6VÆV7FVE&ö¦V7GÐ –—4÷Vã×¶—4ÖöFÄ÷VçÐ –öä6Æ÷6S×¶†æFÆT6Æ÷6U&ö¦V7DÖöFÇÐ –öägFW$6Æ÷6S×¶†æFÆTgFW%&ö¦V7DÖöFÄ6Æ÷6WÐ –öå&Wc×²‚’Óâ†æFÆTæf–vFTÖöFÂ‚Ó—Ð –öäæW‡C×²‚’Óâ†æFÆTæf–vFTÖöFÂƒ—Ð –†5&Wc×·6VÆV7FVD–æFW‚âÐ –†4æW‡C×·6VÆV7FVD–æFW‚âÓbb6VÆV7FVD–æFW‚Â6V7F–öç2æÆVæwF‚ÒÐ ’óà ’—Ð “Âóà ’“°§Ó° ¦W‡÷'BFVfVÇBW‡W'F—6UvS° 