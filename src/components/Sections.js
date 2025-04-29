import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import "../App.css";
import Grid from "@mui/material/Grid2";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

const SectionTemplate = [
	{
		title: "DESIGN",
		content:
			"I have always been an artist, I have just added to the art mediums I'm skillful with. From graphic design to 3D modeling, I love to create. I have a passion for beautiful and functional designs that resonate.",
		boxKeys: [
			"./SD_TypePoster_ROWDY.png",
			"./SD_TypePoster_LOMBARDIA.png",
			"./Vote_Poster.png",
		],
	},
	{
		title: "DEVELOPMENT",
		content:
			"I fuse logic with artistry to craft immersive digital experiences. Whether building robust front-end applications or experimenting with new technologies, I see every line of code as a chance to bring fresh ideas to life.",
		boxKeys: ["./SamDeCoteau_Vector.png"],
	},
	{
		title: "WRITING",
		content:
			"I want to be Anthony Bourdain without the vices. I want to travel the world sharing the stories and culture of others. We are all the children of a Diaspora. Oftentimes, we have more similarities than differences, yet we focus less on the people and more on our perspectives. I want to write about food, culture, and the people I meet along the way.",
		boxKeys: [
			<Grid container>
				<h5>Eat Like a Child</h5>
				<p>
					“Again?!” I mumbled, as I replaced the lid on the pot of food my
					grandmother was cooking. She’d made her “signature” meal—stewed fish,
					lentils, rice, and a bit of watercress. While healthy and nourishing,
					it was also a meal on rotation seemingly every week. We weren’t rich,
					but to my young mind Dominoes was always an option if there was
					nothing else to eat. To my immigrant grandmother, you ate what was
					provided or you went hungry. Sighing in second-generation entitlement,
					I backed away from the stove, opting for cereal. Yes, I preferred the
					highly processed sugary grain I considered food to the home cooking my
					grandmother provided. Today, I’d give anything for that meal again.
					<br />
					As a child, I had a (somewhat) irrational fear of a fish bone getting
					stuck in my throat or rubbing my eyes and getting scotch bonnet pepper
					in my eye. My grandmother made bujol—salted cod with freshly baked
					coconut bread that was both amazing and dicey to my young mind. I’d
					had the experience of getting a small bone stuck in my throat and
					vowed never again. No matter how tasty, I’ll stick to the fish sticks.
					Again, my grandmother said eat it or go hungry.
					<br />
					Diaspora parents constantly have to go to war between tradition and
					modernity. How does one teach respect for culture? There are
					generations of kids who’ve been tormented for bringing “funky” food to
					school and subsequently not fitting in. What does “American” food
					taste like? I would argue it tastes like a conglomerate of recipes
					from immigrants. A hodgepodge of history confined to the local
					ingredients available to them. To “fit in” is to lose the roots of
					that culture. Instead of the cod, maybe just have a simple salmon with
					some lemon on it. My grandmother would say it wasn’t cost effective,
					and if it wasn’t broke…don’t fix it.
					<br />
					Today, I seek out that food and the stories that pair well with what’s
					being served. The nostalgia hits when curry burns in the pot. The
					sizzle of the chicken hitting hot oil in the pan. I hear the calypso
					playing on the radio in the kitchen as my eyes water from the spices
					in the air. My grandmother would hum along as she moved about the
					kitchen, singing the songs of her people. My mom has some of that, but
					she may go for frozen instead of fresh utilizing modern conveniences.
					Unlike my grandmother who would go to the market smelling the fresh
					produce looking for the choicest options. She would argue that there
					were no shortcuts to quality ingredients.
					<br />
					“What do you want for Christmas?” My mom asked this past December. I
					want my granny’s Sunday dinner with all the fixings. I want the stewed
					chicken, macaroni pie, callaloo, fried plantains, and coleslaw with a
					bit of watercress. I want to be hugged by my granny again. I want the
					culture of her people to permeate my being so my future kids don’t
					forget the importance of these stories and her food. I’ll take the
					fish bones, the hot pepper, and smelly stigmas. I was born in the US
					but thanks to my grandmother and her food, I am Trini to de bone.{" "}
				</p>
			</Grid>,
			<Grid container>
				<h5>The Rise of the Home Cook: Arielle Faria</h5>
				<p>
					"Who made the mac & cheese?" This is a common question in black
					households whenever this staple side dish is presented. A rite of
					passage, the holy grail of golden creamy noodles is only deemed worthy
					by a truly exceptional cook. Amongst chefs like Kevin Belton or Jamie
					Oliver is the resurgence of the home chef. Since the pandemic, shows
					like MasterChef or Great British Bake Off highlight the shift in food
					culture toward the popularity and skill of the at-home cook. Amongst
					these home chefs is Arielle Faria, whose mac & cheese passes that
					ultimate test. A well-crafted roux, at least three cheeses, an
					abundance of seasoning, and cavatappi pasta make for the most
					incredible mac & cheese. She credits her skills to intuition, witchy
					spells, and her ancestors' recipes handed down throughout the
					generations.  If Faria had been around in the 1600s, she would've been
					burned at the stake for the food she conjures in the kitchen. Casting
					spells over her cauldron—ok, pots and pans—she blends together a list
					of tried and true recipes to create nostalgic and innovative dishes.
					"They call me the kitchen witch," she smirks. How else do you explain
					how good her food is? As a child, Faria's innate curiosity came from
					the often-uttered refrain, "Get out of my kitchen!" What wondrous
					things are happening that I can't be a part of? These once inane items
					miraculously turned into a multi-course feast for the family. Seeing
					the budding seed of passion, her great-grandmother Christine Reid
					invited Faira into her inner sanctum to explore. Edible, inedible, it
					didn't matter; Ms. Reid happily tried each creation as if it were
					manna from heaven, even if all it was was marmalade on crackers. The
					joy of receiving praise for her cooking established a lasting love for
					creating meals. <br />
					That early encouragement turned into her first meal for her family— a
					junior chicken a l'orange paired with roasted carrots at only 10 years
					old. "And you know, everything was cooked properly. I didn't kill
					anybody. So I was like… I like this. Everyone said it was great." This
					praise and validation is exactly what she looks for when she cooks
					today. Nothing warms her more than the utter silence, the only noise
					being the scrape of utensils on dishware. "I will sit there and watch
					people eat my food."  <br />
					Faria grows pensive, thinking about Sesame Street recently being
					canceled and PBS losing funding due to the changing priorities of the
					new administration. "I didn't actually learn from my grandmothers. I
					learned from watching television and then just trying." For home
					chefs, it's essential to find joy in the cooking process. Faria finds
					warmth in the silence, appreciating the moment as they enjoy her
					dishes. Like many aspiring cooks, she learned from cooking shows on
					PBS—think Julia Child and Lydia Bastianich—that inspired her to bring
					these recipes into her kitchen—the heart of cooking lies in
					understanding recipes as tools. PBS held cooking shows by Julia Childs
					and Lydia Bostianitch, inspiring Faria to strike out and make these
					same dishes at home. "If you follow a recipe and it doesn't come out
					right, it's one of two things: you missed something, or it's a bad
					recipe." Her go-to source was Cook's Illustrated. It is literally
					known for being America's Test Kitchen. <br />
					Recipes are the basis of cooking. How can these chefs communicate and
					translate their stories in ways the audience can take home? From
					there, Faria transforms these recipes into creations from her
					perspective. With roots in the Caribbean and Southern cuisine, Italian
					food isn't just Italian; it now includes nontraditional ingredients
					like chili peppers. She remembers innovative takes like Ming Tsai's
					ossobuco, which blends his Chinese culture with traditional Italian
					cuisine. "I had never experienced that kind of combination of
					flavors." It opened Arielle's eyes to thinking outside the box and
					evolving into an artist in the kitchen—reminding us that cooking is a
					canvas for culinary creativity. 
					<br />
					Food tastes better with love, which is not just a saying to
					Arielle--it's real. She cares about the quality of her ingredients,
					her mise en place, and the size of the onions, celery, and carrots, as
					the smells waft up when they hit the hot oil. "I didn't have much, so
					I made do with what was available and took the time to treat those
					ingredients right. [You] have to care about the product. You're not
					just going through the motions. You are trying to achieve an explosion
					of flavor, a reaction, something! You have to care…" Remember the
					essence of Anton Ego from Ratatouille: it's not just about liking
					food; it's about loving it. If a dish doesn't excite you, why serve
					it? Take pride in your craft, whether it's your grandmother's kitchen
					or a Michelin-starred restaurant. <br />
					Ultimately, cooking is about sharing joy and creating memorable
					moments. As a home chef, focus on the quality of your ingredients and
					pay attention to the details—how you chop your vegetables and the
					scents that blossom when you cook them. Whether you're whipping up a
					casual family dinner or trying something new, take pride in knowing
					you're carrying on a tradition that brings happiness to those around
					you. It's an honor to witness others enjoy what you've created—embrace
					the honor of being a home chef.
				</p>
			</Grid>,
			<Grid container direction="column">
				<h5>Tea with Sami: Revenge Served HOT!</h5>
				<audio src="./ServedHot.mp4" controls />
				<p></p>
			</Grid>,
		],
	},
	{
		title: "PHOTOGRAPHY",
		content:
			"I've always loved intimate weddings. I get to spend time with each subject understanding who they are and what's important to them. The impact of a shared emotion or laughter caught in motion. I want the picture to capture the story being told.",
		boxKeys: ["./diving.MP4"],
	},
	{
		title: "About",
		content:
			"I’m a multidisciplinary creative and developer exploring the intersection of design, technology, and culture. Currently finishing my degree at Johnson & Wales University, I’ve built a foundation in everything from food systems and storytelling to software development and user experience design. With hands-on experience in front-end coding, digital media, and branding, I bring a mix of technical fluency and creative vision to every project. Whether I’m crafting sleek user interfaces or designing visuals with soul, I’m driven by curiosity, purpose, and a belief in the power of thoughtful work. Rooted in intention, fueled by innovation, and always shaping what’s next. Let's connect! I am always looking for new opportunities and collaborations. Whether you want to work together or just chat, feel free to reach out.",
		justifyContent: "flex-start",
		boxKeys: ["./Resume_DeCoteau_Sam_2025.png"],
		download: true,
	},
];

const BoxContent = ({ src, alt, download }) => {
	if (React.isValidElement(src)) {
		return src;
	}
	if (typeof src !== "string") return null;

	if (
		[".mp4", ".webm", ".ogg"].some((ext) => src.toLowerCase().endsWith(ext))
	) {
		return <video src={src} controls autoPlay loop muted type="video/mp4" />;
	}

	return download ? (
		<a href={src} download>
			<img src={src} alt={alt || "Box content"} />
		</a>
	) : (
		<img src={src} alt={alt || "Box content"} />
	);
};

const Sections = () => {
	useEffect(() => {
		const sections = gsap.utils.toArray(".section");
		sections.forEach((section) => {
			const headerWrapper = section.querySelector(".section-header-wrapper");
			const content = section.querySelector(".section-content");

			// Combine pinning and scaling/opacity animation for the header
			if (headerWrapper) {
				gsap
					.timeline({
						scrollTrigger: {
							trigger: section,
							start: "top top",
							end: "bottom top",
							scrub: true,
							pin: headerWrapper,
							pinSpacing: false,
							markers: false,
						},
					})
					.fromTo(
						headerWrapper,
						{ scale: 0.5, opacity: 0 },
						{ scale: 1, opacity: 1, ease: "power2.out" }
					);
			}

			// Animate the section content from the fixed head element's center
			if (content) {
				const headEl = document.querySelector(".head");
				let offsetX = 0,
					offsetY = 0;
				if (headEl) {
					const headRect = headEl.getBoundingClientRect();
					const contentRect = content.getBoundingClientRect();
					const headCenterX =
						headRect.left + headRect.width / 2 + window.scrollX;
					const headCenterY =
						headRect.top + headRect.height / 2 + window.scrollY;
					const contentCenterX =
						contentRect.left + contentRect.width / 2 + window.scrollX;
					const contentCenterY =
						contentRect.top + contentRect.height / 2 + window.scrollY;
					offsetX = headCenterX - contentCenterX;
					offsetY = headCenterY - contentCenterY;
				}
				gsap.fromTo(
					content,
					{
						scale: 0.1,
						opacity: 0,
						x: offsetX,
						y: offsetY,
						transformOrigin: "50% 50%",
					},
					{
						scale: 1,
						opacity: 1,
						x: 0,
						y: 0,
						ease: "power2.out",
						duration: 1,
						scrollTrigger: {
							trigger: section,
							start: "top center",
							end: "bottom center",
							scrub: true,
							markers: false,
						},
					}
				);
			}
		});
	}, []);

	return (
		<Grid container className="sections-container section-content">
			{SectionTemplate.map((section, index) => (
				<Grid container key={index} id={section.title} className="section">
					<Grid container className="section-header-wrapper">
						<h4>{section.title}</h4>
					</Grid>
					<Grid
						container
						justifyContent="center"
						spacing={2}
						className="section-content"
					>
						<Grid container justifyContent="center">
							<Grid size={5} alignContent="flex-end">
								<p>{section.content}</p>
							</Grid>
							<Grid size="auto" ml={-4}>
								<div className="box-frame" />
							</Grid>
						</Grid>
						{section.boxKeys && (
							<Grid container justifyContent="center">
								{section.boxKeys.map((key, index) => (
									<Grid className="work-box" key={index}>
										<BoxContent src={key} alt={`Box ${index + 1}`} />
									</Grid>
								))}
							</Grid>
						)}
					</Grid>
				</Grid>
			))}
		</Grid>
	);
};

export default Sections;
