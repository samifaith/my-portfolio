import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	IconButton,
	Slider,
	Typography,
} from "@mui/material";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
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
		route: "/expertise/eat-like-child",
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
		route: "/expertise/home-cook",
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
		route: "/expertise/tea-with-sami",
	},
};

const formatTime = (seconds) => {
	if (!Number.isFinite(seconds) || seconds < 0) {
		return "0:00";
	}

	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60)
		.toString()
		.padStart(2, "0");

	return `${mins}:${secs}`;
};

const AudioStoryPlayer = ({ title, audioFile, coverImage }) => {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) {
			return undefined;
		}

		const onLoadedMetadata = () => {
			setDuration(audio.duration || 0);
		};

		const onTimeUpdate = () => {
			setCurrentTime(audio.currentTime || 0);
		};

		const onEnded = () => {
			setIsPlaying(false);
		};

		audio.addEventListener("loadedmetadata", onLoadedMetadata);
		audio.addEventListener("timeupdate", onTimeUpdate);
		audio.addEventListener("ended", onEnded);

		return () => {
			audio.removeEventListener("loadedmetadata", onLoadedMetadata);
			audio.removeEventListener("timeupdate", onTimeUpdate);
			audio.removeEventListener("ended", onEnded);
		};
	}, []);

	const handleTogglePlayback = async () => {
		const audio = audioRef.current;
		if (!audio) {
			return;
		}

		if (isPlaying) {
			audio.pause();
			setIsPlaying(false);
			return;
		}

		try {
			await audio.play();
			setIsPlaying(true);
		} catch (error) {
			console.error("Audio playback failed:", error);
		}
	};

	const handleSeek = (_event, nextValue) => {
		const audio = audioRef.current;
		if (!audio) {
			return;
		}

		audio.currentTime = nextValue;
		setCurrentTime(nextValue);
	};

	const handleSkip = (deltaSeconds) => {
		const audio = audioRef.current;
		if (!audio) {
			return;
		}

		const nextTime = Math.max(
			0,
			Math.min(audio.duration || 0, audio.currentTime + deltaSeconds),
		);
		audio.currentTime = nextTime;
		setCurrentTime(nextTime);
	};

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

				<Box
					sx={{ display: "flex", alignItems: "center", pl: 1, pr: 1, pb: 0.5 }}
				>
					<IconButton
						onClick={() => handleSkip(-10)}
						aria-label="Back 10 seconds"
					>
						<SkipBack className="w-5 h-5" />
					</IconButton>
					<IconButton
						onClick={handleTogglePlayback}
						aria-label={isPlaying ? "Pause episode" : "Play episode"}
						sx={{ mx: 0.5 }}
					>
						{isPlaying ? (
							<Pause className="w-7 h-7" />
						) : (
							<Play className="w-7 h-7" />
						)}
					</IconButton>
					<IconButton
						onClick={() => handleSkip(10)}
						aria-label="Forward 10 seconds"
					>
						<SkipForward className="w-5 h-5" />
					</IconButton>
					<Box sx={{ flexGrow: 1 }} />
					<Volume2 className="w-5 h-5 text-gray-500" aria-hidden="true" />
				</Box>

				<Box sx={{ px: 2, pb: 1.5 }}>
					<Slider
						value={currentTime}
						min={0}
						max={duration || 0}
						onChange={handleSeek}
						aria-label="Episode progress"
						sx={{ mb: 0.5 }}
					/>
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<Typography variant="caption" color="text.secondary">
							{formatTime(currentTime)}
						</Typography>
						<Typography variant="caption" color="text.secondary">
							{formatTime(duration)}
						</Typography>
					</Box>
				</Box>
			</Box>

			{coverImage && (
				<Box
					sx={{
						flexShrink: 0,
						width: { xs: "100%", sm: 280 },
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						p: 1.5,
						backgroundColor: "#f8fafc",
						borderLeft: { xs: "none", sm: "1px solid" },
						borderColor: "divider",
					}}
				>
					<CardMedia
						component="img"
						image={coverImage}
						alt={`${title} cover image`}
						sx={{
							width: "100%",
							height: "auto",
							maxHeight: { xs: 360, sm: 320 },
							objectFit: "contain",
							borderRadius: 1,
						}}
					/>
				</Box>
			)}

			<audio ref={audioRef} preload="metadata">
				<source src={audioFile} type="audio/mpeg" />
				<source src={audioFile} type="audio/mp3" />
				Your browser does not support the audio element.
			</audio>
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
				backLink="/expertise"
				backText="Back to Expertise"
				isStoryPage={true}
			>
				<article className="bg-white rounded-lg shadow-lg p-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						{story.title}
					</h1>
					<p className="text-gray-600 mb-8">{story.subtitle}</p>

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
