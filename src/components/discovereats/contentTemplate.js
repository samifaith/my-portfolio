// Add a new food in 3 steps:
// 1) Duplicate the `new-food-starter` object inside `foods` and give it a unique `id`.
// 2) Fill `sections.dish`, `sections.origins`, and `sections.movements` with real content.
// 3) Set `settings.defaultFoodId` to your new id (or use `getFoodTemplate("your-id")`).

export const FOOD_CONTENT_TEMPLATE = {
	settings: {
		defaultFoodId: "fried-chicken",
		version: 1,
	},
	fields: {
		dish: [
			"name",
			"subtitle",
			"category",
			"tags",
			"description",
			"heroImage",
			"heroAlt",
			"pullQuote",
		],
		origin: [
			"id",
			"name",
			"region",
			"coords",
			"year",
			"role",
			"color",
			"dishImage",
			"detail",
			"ingredient",
			"manualSources",
			"recipe",
		],
		movement: ["from", "to", "label", "period", "synopsis"],
		source: ["type", "label", "url"],
	},
	foods: [
		{
			id: "fried-chicken",
			settings: {
				title: "Fried Chicken Origins",
			},
			sections: {
				dish: {
					name: "Fried Chicken",
					subtitle: "A Global Origin Story",
					category: "Technique · Culture · Migration",
					tags: [
						"poultry",
						"deep-fried",
						"comfort food",
						"soul food",
						"street food",
					],
					description:
						"Fried chicken is a broad global category of chicken pieces that are typically seasoned or marinated, coated (with flour, starch, crumbs, or batter), and cooked in hot oil until the exterior is crisp and the interior stays juicy, with regional variation in spice blends, fats, coatings, and sauces.",
					heroImage: null,
					heroAlt: "Golden fried chicken pieces on a wire rack",
					pullQuote:
						"Every bite carries a history most people have never been taught.",
				},
				origins: [
					{
						id: 1,
						name: "West Africa",
						region: "Senegambia & Gold Coast",
						coords: [-14.4, 14.5],
						year: "Pre-1600s",
						role: "Foundational Foodways",
						color: "#9B3A1A",
						dishImage:
							"https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop",
						detail:
							"West African food traditions traveled with enslaved people across the Atlantic. Their knowledge of seasoning, frying, cultivation, and adapting ingredients became part of the foodways created throughout the American South.",
						ingredient: "Seasoning · Frying knowledge · Adaptation",
						manualSources: [
							{
								type: "article",
								label: "West African Food Traditions in Virginia Foodways · Lisa R. Shiflett",
								url: "https://dc.etsu.edu/etd/925/",
							},
							{
								type: "article",
								label: "Food Culture in Sub-Saharan Africa · Fran Osseo-Asare",
								url: "https://doi.org/10.5040/9798400652486",
							},
							{
								type: "video",
								label: "High on the Hog · African American Cuisine Transformed America",
								url: "https://www.youtube.com/watch?v=7wsEdxt1Ico",
							},
						],
						recipe: {
							title: "Senegambian Palm Oil Fried Chicken",
							serves: "4",
							prepTime: "24 hrs",
							cookTime: "30 min",
							ingredients: [
								"1 whole chicken, jointed into 8 pieces",
								"½ cup red palm oil",
								"2 tsp ground suya spice (yaji)",
								"1 tbsp ground dried crayfish",
								"1 tsp ground ginger",
								"3 garlic cloves, minced",
								"1 tsp salt",
								"1 Scotch bonnet pepper, minced (optional)",
							],
							steps: [
								"Combine palm oil, suya spice, crayfish, ginger, garlic, and salt into a marinade. Add Scotch bonnet if using.",
								"Score chicken pieces deeply and coat thoroughly in the marinade. Cover and refrigerate for at least 12 hours — ideally overnight.",
								"Remove chicken from the refrigerator 30 minutes before frying. Heat palm oil in a heavy pot to 160°C (320°F).",
								"Fry chicken pieces in batches for 10–12 minutes, turning once, until cooked through. Do not crowd the pot.",
								"Raise heat to 185°C (365°F) and flash-fry each piece for 90 seconds to caramelize the spice crust.",
								"Drain on a wire rack. Serve with fried plantain, sliced tomatoes, and fermented locust bean sauce.",
							],
							citation: {
								label: "The Groundnut Cookbook — Duval Timothy et al.",
								url: "https://www.theguardian.com/books/2015/sep/09/groundnut-cookbook-duval-timothy-review",
							},
						},
					},
					{
						id: 2,
						name: "American South",
						region: "Virginia & Carolina Coast",
						coords: [-79.0, 35.5],
						year: "1700s",
						role: "Cultural Creation",
						color: "#7A4A1E",
						dishImage:
							"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&h=400&fit=crop",
						detail:
							"Southern fried chicken developed through the knowledge and labor of African American cooks. They combined West African culinary traditions with ingredients and techniques encountered in the American South, creating a dish connected to Black survival, enterprise, celebration, and identity.",
						ingredient: "Seasoning · Cast iron · Regional adaptation",
						manualSources: [
							{
								type: "article",
								label: "Soul Food · Adrian Miller",
								url: "https://uncpress.org/9781469632421/soul-food/",
							},
							{
								type: "article",
								label: "African American Culinary History and the Genesis of American Cuisine",
								url: "https://doi.org/10.1080/21619441.2021.1909403",
							},
							{
								type: "video",
								label: "Fried Chicken and Sweet Potato Pie · Edna Lewis Documentary",
								url: "https://www.youtube.com/watch?v=cl6JVMoMN44",
							},
						],
						recipe: {
							title: "Southern Buttermilk Fried Chicken",
							serves: "4–6",
							prepTime: "8 hrs",
							cookTime: "35 min",
							ingredients: [
								"1 whole chicken, cut into 8 pieces",
								"2 cups buttermilk",
								"1 tbsp hot sauce (Crystal or Tabasco)",
								"2 cups all-purpose flour",
								"1 tsp smoked paprika",
								"1 tsp garlic powder",
								"1 tsp onion powder",
								"½ tsp cayenne pepper",
								"Salt and cracked black pepper",
								"Lard or vegetable shortening for frying",
							],
							steps: [
								"Combine buttermilk and hot sauce. Submerge chicken pieces, cover, and refrigerate for at least 8 hours.",
								"Whisk flour with paprika, garlic powder, onion powder, cayenne, salt, and pepper in a wide shallow bowl.",
								"Remove chicken from buttermilk, let excess drip off, then dredge heavily in seasoned flour. Press firmly to adhere. Rest on a rack for 15 minutes.",
								"Heat 2–3 inches of lard in a cast iron skillet to 175°C (350°F). Use a thermometer — temperature control is essential.",
								"Fry dark meat for 13–14 minutes and white meat for 10–11 minutes, turning once halfway. Internal temperature must reach 74°C (165°F).",
								"Transfer to a wire rack — never paper towels — so the steam doesn't soften the crust. Rest 5 minutes before serving.",
							],
							citation: {
								label: "Edna Lewis, The Taste of Country Cooking (1976)",
								url: "https://www.smithsonianmag.com/arts-culture/edna-lewis-doyenne-of-southern-cooking-180951865/",
							},
						},
					},
					{
						id: 3,
						name: "Scotland",
						region: "Isle of Skye & Britain",
						coords: [-3.5, 56.5],
						year: "1700s",
						role: "European Thread",
						color: "#4A5568",
						dishImage:
							"https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=600&h=400&fit=crop",
						detail:
							"Eighteenth-century records show fried chicken circulating within British cooking. James Boswell also recorded being served fried chicken or something like it while visiting the Isle of Skye in 1773. Scotland belongs in the story as one European thread, not as the single birthplace of Southern fried chicken.",
						ingredient: "Rendered fat · Batter · British cookery",
						manualSources: [
							{
								type: "article",
								label: "The Journal of a Tour to the Hebrides · James Boswell",
								url: "https://www.gutenberg.org/ebooks/6018",
							},
							{
								type: "article",
								label: "The Art of Cookery Made Plain and Easy · Hannah Glasse",
								url: "https://library.si.edu/digital-library/book/artofcookerymad00glas",
							},
							{
								type: "video",
								label: "Fried Chicken in the 18th Century · Historical Reconstruction",
								url: "https://www.youtube.com/watch?v=q0pW0Xx5vAY",
							},
						],
						recipe: null,
					},
					{
						id: 4,
						name: "Japan",
						region: "Oita Prefecture",
						coords: [131.6, 33.2],
						year: "1920s",
						role: "Regional Evolution",
						color: "#1A5276",
						dishImage:
							"https://images.unsplash.com/photo-1634080266221-75d330e66825?w=600&h=400&fit=crop",
						detail:
							"Oita developed its own regional fried-chicken traditions. Usa City is associated with the birth of Japanese karaage, while Beppu is known for toriten, bite-sized chicken prepared with tempura-style batter. Both dishes show how a familiar technique became distinctly local.",
						ingredient: "Soy · Ginger · Starch · Tempura batter",
						manualSources: [
							{
								type: "article",
								label: "Tori-Ten · Japan Ministry of Agriculture, Forestry and Fisheries",
								url: "https://www.maff.go.jp/e/policies/market/k_ryouri/search_menu/4996/index.html",
							},
							{
								type: "article",
								label: "Tori-Meshi and the Oita Karaage Tradition · MAFF",
								url: "https://www.maff.go.jp/e/policies/market/k_ryouri/search_menu/5508/index.html",
							},
							{
								type: "video",
								label: "Oita Prefecture · A City of Karaage Shops",
								url: "https://www.youtube.com/watch?v=Uj5NOf2KdII",
							},
						],
						recipe: {
							title: "Karaage (唐揚げ)",
							serves: "3–4",
							prepTime: "30 min",
							cookTime: "15 min",
							ingredients: [
								"500g boneless chicken thighs, skin on",
								"3 tbsp soy sauce",
								"2 tbsp sake",
								"1 tbsp mirin",
								"1 tsp sesame oil",
								"2 garlic cloves, finely grated",
								"1 tsp fresh ginger, finely grated",
								"4–5 tbsp potato starch (katakuriko)",
								"Neutral oil for frying",
								"Lemon wedges and Kewpie mayonnaise to serve",
							],
							steps: [
								"Cut chicken into 4–5cm pieces. Combine soy sauce, sake, mirin, sesame oil, garlic, and ginger in a bowl.",
								"Add chicken and toss to coat thoroughly. Marinate for at least 20 minutes, up to 2 hours in the refrigerator.",
								"Drain excess marinade. Coat each piece in potato starch, pressing so the starch fully adheres.",
								"Heat oil to 160°C (320°F). Fry chicken in batches for 3–4 minutes until just cooked through. Remove and rest on a rack for 3 minutes — this is the first fry.",
								"Raise oil to 190°C (375°F). Return chicken and fry for 90 seconds until deeply golden and the exterior shatters when broken. This second fry is essential.",
								"Serve immediately with lemon wedges and Kewpie mayonnaise.",
							],
							citation: {
								label: "Just One Cookbook — Karaage Japanese Fried Chicken",
								url: "https://www.justonecookbook.com/karaage/",
							},
						},
					},
					{
						id: 5,
						name: "Korea",
						region: "Seoul & Daegu",
						coords: [126.9, 37.5],
						year: "1950s–70s",
						role: "Postwar Exchange & Innovation",
						color: "#7B241C",
						dishImage:
							"https://images.unsplash.com/photo-1605987944393-d37eda3519d8?w=600&h=400&fit=crop",
						detail:
							"Modern Korean fried chicken grew through postwar exchange and Korean reinvention. American-style fried chicken entered the country during the period surrounding the Korean War. As poultry and cooking oil became more available, Korean cooks transformed it through lighter coatings, double frying, and sauces such as soy garlic and yangnyeom.",
						ingredient: "Starch coating · Gochujang · Double fry",
						manualSources: [
							{
								type: "article",
								label: "Tasting the Forgotten War · Nicolyn Woodcock",
								url: "https://muse.jhu.edu/article/685883",
							},
							{
								type: "article",
								label: "Science and Philosophy of Korea Traditional Foods",
								url: "https://link.springer.com/article/10.1186/s42779-023-00194-3",
							},
							{
								type: "video",
								label: "CBS Sunday Morning · Korean Fried Chicken, The Other KFC",
								url: "https://www.youtube.com/watch?v=Lsupu9lgkZc",
							},
						],
						recipe: {
							title: "Yangnyeom Chicken (양념치킨)",
							serves: "4",
							prepTime: "15 min",
							cookTime: "25 min",
							ingredients: [
								"1 kg chicken wings or drumettes",
								"¾ cup rice flour",
								"¼ cup cornstarch",
								"1 tsp garlic powder",
								"Salt and white pepper",
								"Neutral oil for deep-frying",
								"For yangnyeom glaze: 3 tbsp gochujang, 2 tbsp honey, 1 tbsp soy sauce, 1 tbsp rice vinegar, 2 garlic cloves minced, 1 tsp sesame oil",
							],
							steps: [
								"Combine rice flour, cornstarch, garlic powder, salt, and white pepper. Coat chicken pieces and shake off any excess.",
								"Heat oil to 165°C (330°F). Fry chicken for 8–10 minutes until pale gold and just cooked through. Drain on a rack and rest 5 minutes.",
								"Raise oil to 190°C (375°F). Fry chicken a second time for 4–5 minutes until deeply golden and extremely crisp. The double-fry drives off moisture and is non-negotiable.",
								"Combine all glaze ingredients in a small saucepan over low heat. Simmer 3 minutes until slightly thickened.",
								"Transfer hot chicken immediately into the yangnyeom glaze and toss until every piece is coated.",
								"Garnish with sesame seeds and sliced scallions. Serve with pickled radish cubes and cold beer.",
							],
							citation: {
								label: "Maangchi — Yangnyeom Chicken",
								url: "https://www.maangchi.com/recipe/yangnyeom-tongdak",
							},
						},
					},
					{
						id: 6,
						name: "Austria",
						region: "Vienna",
						coords: [16.4, 48.2],
						year: "1800s",
						role: "Viennese Tradition",
						color: "#1E6B45",
						dishImage:
							"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&h=400&fit=crop",
						detail:
							"Vienna's Backhendl is breaded chicken fried until crisp. By the early nineteenth century, it had become a symbol of wealth among the Viennese aristocracy and bourgeoisie. After 1848, the dish became more accessible and entered kitchens beyond the upper classes.",
						ingredient: "Breadcrumbs · Frying fat · Lemon",
						manualSources: [
							{
								type: "article",
								label: "Backhendl · Official Vienna Guide",
								url: "https://www.wien.info/en/dine-drink/viennese-cuisine/recipes/meat-fish/fried-breaded-chicken-346446",
							},
							{
								type: "article",
								label: "Schnitzel, Schweinsbraten und Co. · Austrian Food and Identity",
								url: "https://doi.org/10.25365/thesis.61559",
							},
							{
								type: "video",
								label: "Austrian Fried Chicken · Chef Lukas Mraz",
								url: "https://www.youtube.com/watch?v=iHfAedhOR40",
							},
						],
						recipe: {
							title: "Wiener Backhendl",
							serves: "4",
							prepTime: "20 min",
							cookTime: "20 min",
							ingredients: [
								"1 whole chicken, jointed into 8 pieces",
								"½ cup all-purpose flour",
								"2 eggs, beaten with 1 tbsp water",
								"1½ cups fine dry breadcrumbs (Semmelbrösel)",
								"100g clarified butter (Butterschmalz) or neutral oil",
								"Salt and white pepper",
								"Lemon wedges and lingonberry jam to serve",
							],
							steps: [
								"Season chicken pieces generously with salt and white pepper.",
								"Set up a dredging station: flour in one dish, beaten egg in a second, breadcrumbs in a third.",
								"Coat each piece in flour, tap off excess, dip fully in egg, then press into breadcrumbs. The coating should be even and thorough but not clumped.",
								"Heat clarified butter in a wide, heavy pan to 165°C (330°F). The fat should be deep enough to nearly submerge the pieces.",
								"Fry skin-side down for 7–9 minutes until a deep gold. Turn once and fry 7 more minutes. The crust should be dry and rustling, not oily.",
								"Rest on a rack for 3 minutes. Serve with a squeeze of lemon and a spoonful of lingonberry jam alongside.",
							],
							citation: {
								label: "Plachutta Kochschule, Vienna — Backhendl",
								url: "https://www.plachutta.at",
							},
						},
					},
					{
						id: 7,
						name: "Nigeria",
						region: "Lagos",
						coords: [3.4, 6.5],
						year: "20th century–present",
						role: "Regional Adaptation",
						color: "#884A1A",
						dishImage:
							"https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop",
						detail:
							"In Lagos, fried chicken can take on the flavors of Nigerian street food through yaji, the spice mixture associated with suya. Suya originated in northern Nigeria and is strongly connected to Hausa culinary culture. Its movement into Lagos shows how regional traditions travel, adapt, and become part of a city's shared food culture.",
						ingredient: "Yaji · Groundnut · Dried pepper",
						manualSources: [
							{
								type: "article",
								label: "A Review of Street Grilled Meat, Suya, in Nigeria",
								url: "https://doi.org/10.36547/BE.2020.3.3.58-61",
							},
							{
								type: "article",
								label: "The Hausa of Nigeria · Frank A. Salamone",
								url: "https://doi.org/10.5771/9780761847250",
							},
							{
								type: "video",
								label: "Nigeria's Suya and Palm Wine Connection",
								url: "https://www.youtube.com/watch?v=pU2m_rHqqXg",
							},
						],
						recipe: {
							title: "Suya-Spiced Fried Chicken",
							serves: "4",
							prepTime: "4 hrs",
							cookTime: "25 min",
							ingredients: [
								"1 kg chicken pieces (thighs and drumsticks)",
								"3 tbsp ground suya spice (yaji)",
								"2 tbsp toasted groundnut powder",
								"1 tsp ground ginger",
								"1 tsp garlic powder",
								"1 Scotch bonnet pepper, seeds removed, minced",
								"2 tbsp vegetable oil (for marinade)",
								"Neutral oil for deep-frying",
								"Sliced red onion, tomato, and cucumber to serve",
							],
							steps: [
								"Combine suya spice, groundnut powder, ginger, garlic powder, Scotch bonnet, and oil into a thick paste.",
								"Score chicken pieces deeply. Rub paste into every crevice. Refrigerate for at least 4 hours — the longer the better.",
								"Remove chicken 30 minutes before frying. Heat oil in a deep pot to 170°C (340°F).",
								"Fry in batches for 10–12 minutes, turning occasionally, until deeply bronzed and cooked through.",
								"Raise heat to 185°C (365°F) and flash-fry for 2 minutes per side to caramelize the suya crust.",
								"Serve over a bed of sliced raw onion, tomato, and cucumber. Best eaten with cold zobo or a malt drink.",
							],
							citation: {
								label: "Dooney's Kitchen — Fried Chicken Nigerian Style",
								url: "https://www.dooneyskitchen.com",
							},
						},
					},
				],
				movements: [
					{
						from: 1,
						to: 2,
						label: "West Africa → American South",
						period: "1619–1700s",
						synopsis:
							"Through forced migration, West African culinary knowledge reached Virginia and the Carolinas. Enslaved cooks preserved and adapted seasoning, cultivation, and cooking practices under violent conditions, helping shape the foodways of the American South.",
					},
					{
						from: 3,
						to: 2,
						label: "Scotland → American South",
						period: "1700s",
						synopsis:
							"Scottish and broader British records document fried chicken and fat-frying practices in the eighteenth century. In the American South, these European precedents became one part of a larger culinary history shaped most decisively by African American cooks.",
					},
					{
						from: 1,
						to: 7,
						label: "West Africa → Nigeria",
						period: "Continuous",
						synopsis:
							"Regional trade and migration carried ingredients and food traditions across West Africa. In Nigeria, Hausa suya culture spread beyond the north and became part of the street-food landscape of cities such as Lagos, where its yaji seasoning continues to inspire new dishes.",
					},
					{
						from: 2,
						to: 5,
						label: "American South → Korea",
						period: "1950s–1960s",
						synopsis:
							"Postwar U.S. presence contributed to new culinary exchange in South Korea. As poultry and cooking oil became more available, Korean cooks developed a distinct fried-chicken culture through lighter coatings, double frying, delivery, and sauces such as yangnyeom.",
					},
				],
			},
		},
		{
			id: "new-food-starter",
			settings: {
				title: "New Food Starter",
			},
			sections: {
				dish: {
					name: "New Food",
					subtitle: "A Global Origin Story",
					category: "Technique · Culture · Migration",
					tags: ["food", "history", "migration"],
					description:
						"Replace this with a concise global definition of the food category.",
					heroImage: null,
					heroAlt: "Descriptive alt text for the hero image",
					pullQuote: "Replace with a key editorial quote.",
				},
				origins: [
					{
						id: 1,
						name: "Origin A",
						region: "Region A",
						coords: [0, 0],
						year: "Era",
						role: "Primary Origin",
						color: "#9B3A1A",
						dishImage: null,
						detail: "Replace with the origin narrative.",
						ingredient: "Ingredient A · Ingredient B",
						manualSources: [
							{
								type: "article",
								label: "Placeholder source",
								url: "#",
							},
						],
					},
					{
						id: 2,
						name: "Origin B",
						region: "Region B",
						coords: [10, 10],
						year: "Era",
						role: "Cultural Evolution",
						color: "#1A5276",
						dishImage: null,
						detail: "Replace with the second origin narrative.",
						ingredient: "Ingredient C · Ingredient D",
						manualSources: [
							{
								type: "video",
								label: "Placeholder video",
								url: "#",
							},
						],
					},
				],
				movements: [
					{
						from: 1,
						to: 2,
						label: "Origin A → Origin B",
						period: "Period",
						synopsis: "Replace with movement synopsis.",
					},
				],
			},
		},
	],
};

export function getFoodTemplate(
	foodId = FOOD_CONTENT_TEMPLATE.settings.defaultFoodId,
) {
	return (
		FOOD_CONTENT_TEMPLATE.foods.find((food) => food.id === foodId) ||
		FOOD_CONTENT_TEMPLATE.foods[0]
	);
}
