import React, { useState } from "react";
import { Camera, Film, Music } from "lucide-react";
import PageLayout from "../components/PageLayout";
import ProjectCard from "../components/ProjectCard";

const MediaPage = () => {
	const [selectedMedia, setSelectedMedia] = useState(null);

	// Your actual media projects - replace with real data when ready
	const mediaItems = [
		// Add your real media projects here when you have them
		// Example structure:
		// {
		// 	id: "your-project-id",
		// 	title: "Your Project Title",
		// 	type: "Video", // or "Photography", "Audio", etc.
		// 	description: "Your project description",
		// 	backgroundIcon: Film,
		// 	accentIcon: Camera,
		// 	backgroundGradient: "from-purple-600 to-blue-600",
		// 	buttonText: "View Media",
		// 	route: "/media/your-project-id" // optional
		// },
	];

	return (
		<PageLayout
			title="MEDIA"
			description="Visual storytelling through various media forms. From photography and videography to motion graphics and audio content, I explore different ways to communicate ideas and capture moments that inspire."
			showModal={!!selectedMedia}
			selectedProject={selectedMedia}
			onCloseModal={() => setSelectedMedia(null)}
		>
			{mediaItems.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{mediaItems.map((item) => (
						<ProjectCard
							key={item.id}
							projectData={item}
							onProjectClick={setSelectedMedia}
						/>
					))}
				</div>
			) : (
				<div className="text-center py-12">
					<div className="bg-white rounded-lg shadow-lg p-8">
						<div className="flex justify-center space-x-4 mb-4">
							<Camera className="w-8 h-8 text-gray-400" />
							<Film className="w-8 h-8 text-gray-400" />
							<Music className="w-8 h-8 text-gray-400" />
						</div>
						<h3 className="text-xl font-semibold text-gray-700 mb-2">
							Media Projects Coming Soon
						</h3>
						<p className="text-gray-500">
							I'm currently working on exciting media projects that will be
							featured here.
						</p>
					</div>
				</div>
			)}
		</PageLayout>
	);
};

export default MediaPage;
