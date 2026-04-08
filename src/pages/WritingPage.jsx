import React from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import stories from "../constants/WritingPieces";
import ProjectCard from "../components/ProjectCard";
import PageLayout from "../components/PageLayout";
import { getModernImageSources } from "../utils/imageFormats";

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
		route: "/expertise-archived/eat-like-child",
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
		route: "/expertise-archived/home-cook",
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
		route: "/expertise-archived/tea-with-sami",
	},
};

const AudioStoryPlayer = ({ title, audioFile, coverImage }) => {
	const coverImageSources = coverImage
		? getModernImageSources(coverImage)
		: null;

	return (
		<Card
			className="mb-8"
			sx={{
				display: "flex",
				flexDirection: { xs: "column-reverse", sm: "row" },
				borderRadius: 2,
				border: "1px solid",
				borderColor: "divider",
				overflow: "hidden",
			}}
		>
			<Box sx={{ display: "flex", flexDirection: "column", flex: "1 1 auto" }}>
				<CardContent sx={{ pb: 1 }}>
					<Typography component="div" variant="overline" color="text.secondary">
						Podcast Episode
					</Typography>
					<Typography component="div" variant="h5">
						{title}
					</Typography>
					<Typography
						variant="subtitle1"
						color="text.secondary"
						component="div"
					>
						Tea with Sami Audio
					</Typography>
				</CardContent>

				<Box sx={{ px: 2, pb: 2 }}>
					<CardMedia
						component="audio"
						controls
						preload="metadata"
						src={audioFile}
						aria-label={`${title} audio player`}
						sx={{ width: "100%", display: "block" }}
					>
						<source src={audioFile} type="audio/mpeg" />
						<source src={audioFile} type="audio/mp3" />
						Your browser does not support the audio element.
					</CardMedia>
				</Box>
			</Box>

			{coverImageSources && (
				<Box
					sx={{
						flexShrink: 0,
						width: { xs: "100%", sm: 280 },
						maxWidth: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						p: 1.5,
						backgroundColor: "#f8fafc",
						borderLeft: { xs: "none", sm: "1px solid" },
						borderColor: "divider",
					}}
				>
					<picture
						style={{ display: "block", width: "100%", maxWidth: "100%" }}
					>
						{coverImageSources.avif && (
							<source srcSet={coverImageSources.avif} type="image/avif" />
						)}
						{coverImageSources.webp && (
							<source srcSet={coverImageSources.webp} type="image/webp" />
						)}
						<img
							src={coverImageSources.fallback}
							alt={`${title} cover image`}
							style={{
								display: "block",
								width: "100%",
								height: "auto",
								maxHeight: "min(40vh, 320px)",
								objectFit: "contain",
								borderRadius: "4px",
							}}
							loading="lazy"
							decoding="async"
						/>
					</picture>
				</Box>
			)}
		</Card>
	);
};

const WritingPage = () => {
	const { storyId } = useParams();

	// If storyId exists, show the specific story page
	if (storyId && stories && stories[storyId]) {
		const story = stories[storyId];
		return (
			<PageLayout
				title={story.title}
				backLink="/expertise-archived"
				backText="Back to Expertise"
				isStoryPage={true}
			>
				<article className="bg-white rounded-lg shadow-lg p-6">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						{story.title}
					</h1>
					<p className="text-gray-600 mb-6">{story.subtitle}</p>

					{story.audioFile && (
						<AudioStoryPlayer
							title={story.title}
							audioFile={story.audioFile}
							coverImage={
								story.showCoverOnArticle ? story.coverImage : undefined
							}
						/>
					)}

					{story.pdfFile && (
						<section className="mb-6" aria-label="Article PDF viewer">
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
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{Object.values(storiesData).map((storyData) => (
					<ProjectCard key={storyData.id} projectData={storyData} />
				))}
			</div>
		</PageLayout>
	);
};

export default WritingPage;
