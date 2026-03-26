import React from "react";
import { useParams } from "react-router-dom";
import stories from "../constants/WritingPieces";
import ProjectCard from "../components/ProjectCard";
import PageLayout from "../components/PageLayout";

const storiesData = {
	"eat-like-child": {
		id: "eat-like-child",
		title: "Eat Like a Child",
		category: "Personal Essay",
		tags: ["Culture", "Memoir", "Caribbean"],
		previewContent:
			"A nostalgic reflection on Caribbean culture, family traditions, and the complex relationship between immigrant identity and food.",
		type: "Memoir",
		theme: "Culture",
		route: "/writing/eat-like-child",
	},
	"home-cook": {
		id: "home-cook",
		title: "The Rise of the Home Cook",
		category: "Profile Feature",
		tags: ["Food", "Profile", "Cooking"],
		previewContent:
			"An intimate look at a home chef who transforms family recipes into culinary magic through intuition and ancestral wisdom.",
		type: "Profile",
		theme: "Food",
		route: "/writing/home-cook",
	},
	"tea-with-sami": {
		id: "tea-with-sami",
		title: "Tea with Sami",
		category: "Podcast Episode",
		tags: ["Audio", "Relationships", "Growth"],
		previewContent:
			"An intimate conversation exploring relationships, personal growth, and the stories we tell ourselves about justice and healing.",
		type: "Audio",
		theme: "Podcast",
		route: "/writing/tea-with-sami",
	},
};

const WritingPage = () => {
	const { storyId } = useParams();

	// If storyId exists, show the specific story page
	if (storyId && stories && stories[storyId]) {
		const story = stories[storyId];
		return (
			<PageLayout
				title={story.title}
				backLink="/writing"
				backText="Back to Writing"
				isStoryPage={true}
			>
				<article className="bg-white rounded-lg shadow-lg p-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						{story.title}
					</h1>
					<p className="text-gray-600 mb-8">{story.subtitle}</p>

					{/* Audio player for podcast episodes */}
					{story.audioFile && (
						<div className="mb-8 bg-gray-100 p-4 rounded-lg">
							<h3 className="text-lg font-semibold mb-3 flex items-center">
								🎧 Listen to Episode
							</h3>
							<audio
								controls
								className="w-full"
								onError={(e) => {
									console.error("Audio failed to load:", story.audioFile);
									console.error("Error details:", e);
								}}
								onLoadStart={() => console.log("Audio loading started")}
								onCanPlay={() => console.log("Audio ready to play")}
							>
								<source src={story.audioFile} type="audio/mpeg" />
								<source src={story.audioFile} type="audio/mp3" />
								Your browser does not support the audio element.
							</audio>
						</div>
					)}

					{story.pdfFile && (
						<section className="mb-8" aria-label="Article PDF viewer">
							<iframe
								src={`${story.pdfFile}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
								title={`${story.title} PDF viewer`}
								className="w-full h-[70vh] md:h-[85vh] rounded-lg border border-gray-200"
								loading="lazy"
							/>
						</section>
					)}

					<div className="prose prose-lg max-w-none whitespace-pre-line">
						{story.content}
					</div>
				</article>
			</PageLayout>
		);
	}

	// Otherwise show the writing overview page with cards
	return (
		<PageLayout
			title="WRITING"
			description="Crafting narratives that explore culture, identity, and the human experience through essays, profiles, and multimedia storytelling."
		>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{Object.values(storiesData).map((storyData) => (
					<ProjectCard key={storyData.id} projectData={storyData} />
				))}
			</div>
		</PageLayout>
	);
};

export default WritingPage;
