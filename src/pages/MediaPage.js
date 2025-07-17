import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Camera, Film, Music } from "lucide-react";

const MediaPage = () => {
	const [selectedMedia, setSelectedMedia] = useState(null);

	const mediaItems = [
		{
			id: "video-portfolio",
			title: "Design Process Documentary",
			type: "Video",
			thumbnail: "/api/placeholder/400/250",
			duration: "3:45",
			description:
				"A behind-the-scenes look at my creative process, from initial concept to final design.",
			file: "/videos/design-process.mp4",
		},
		{
			id: "photo-series",
			title: "Urban Architecture Series",
			type: "Photography",
			thumbnail: "/api/placeholder/400/250",
			description:
				"A collection of architectural photography exploring modern urban design.",
			gallery: [
				"/images/architecture-1.jpg",
				"/images/architecture-2.jpg",
				"/images/architecture-3.jpg",
				"/images/architecture-4.jpg",
			],
		},
		{
			id: "motion-graphics",
			title: "Brand Animation Reel",
			type: "Motion Graphics",
			thumbnail: "/api/placeholder/400/250",
			duration: "2:15",
			description:
				"A compilation of brand animations and motion graphics projects.",
			file: "/videos/motion-reel.mp4",
		},
		{
			id: "audio-project",
			title: "Podcast: Design Conversations",
			type: "Audio",
			thumbnail: "/api/placeholder/400/250",
			duration: "15:30",
			description:
				"Interview-style podcast discussing design trends and creative inspiration.",
			file: "/audio/podcast-episode-1.mp3",
		},
		{
			id: "time-lapse",
			title: "Illustration Time-lapse",
			type: "Video",
			thumbnail: "/api/placeholder/400/250",
			duration: "1:20",
			description:
				"Watch a complex illustration come to life in this sped-up process video.",
			file: "/videos/illustration-timelapse.mp4",
		},
		{
			id: "street-photography",
			title: "Street Life Collection",
			type: "Photography",
			thumbnail: "/api/placeholder/400/250",
			description:
				"Candid moments captured on the streets, showcasing human connection and urban energy.",
			gallery: [
				"/images/street-1.jpg",
				"/images/street-2.jpg",
				"/images/street-3.jpg",
			],
		},
	];

	const getIcon = (type) => {
		switch (type) {
			case "Video":
			case "Motion Graphics":
				return <Film className="w-5 h-5" />;
			case "Photography":
				return <Camera className="w-5 h-5" />;
			case "Audio":
				return <Music className="w-5 h-5" />;
			default:
				return <Play className="w-5 h-5" />;
		}
	};

	const getTypeColor = (type) => {
		switch (type) {
			case "Video":
			case "Motion Graphics":
				return "text-red-600 bg-red-50";
			case "Photography":
				return "text-blue-600 bg-blue-50";
			case "Audio":
				return "text-purple-600 bg-purple-50";
			default:
				return "text-gray-600 bg-gray-50";
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm p-6">
				<div className="max-w-6xl mx-auto flex items-center justify-between">
					<Link
						to="/"
						className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
					>
						<ArrowLeft className="w-5 h-5" />
						<span>Back to Portfolio</span>
					</Link>
					<h1 className="text-3xl font-bold text-gray-800">MEDIA</h1>
				</div>
			</header>

			{/* Content */}
			<main className="max-w-6xl mx-auto p-6">
				<div className="mb-8">
					<p className="text-lg text-gray-700 leading-relaxed">
						Visual storytelling through various media forms. From photography
						and videography to motion graphics and audio content, I explore
						different ways to communicate ideas and capture moments that
						inspire.
					</p>
				</div>

				{/* Media Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{mediaItems.map((item) => (
						<div
							key={item.id}
							className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
							onClick={() => setSelectedMedia(item)}
						>
							<div className="relative">
								<img
									src={item.thumbnail}
									alt={item.title}
									className="w-full h-48 object-cover"
								/>
								<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
									<div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-3">
										{getIcon(item.type)}
									</div>
								</div>
								{item.duration && (
									<div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
										{item.duration}
									</div>
								)}
							</div>

							<div className="p-4">
								<div className="flex items-center space-x-2 mb-2">
									{getIcon(item.type)}
									<span
										className={`text-sm font-medium px-2 py-1 rounded ${getTypeColor(
											item.type
										)}`}
									>
										{item.type}
									</span>
								</div>
								<h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
								<p className="text-sm text-gray-600 line-clamp-2">
									{item.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</main>

			{/* Media Modal */}
			{selectedMedia && (
				<div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg max-w-5xl max-h-full overflow-auto">
						<div className="p-6">
							<div className="flex justify-between items-start mb-4">
								<div>
									<div className="flex items-center space-x-2 mb-2">
										{getIcon(selectedMedia.type)}
										<span
											className={`text-sm font-medium px-2 py-1 rounded ${getTypeColor(
												selectedMedia.type
											)}`}
										>
											{selectedMedia.type}
										</span>
									</div>
									<h2 className="text-2xl font-bold text-gray-800">
										{selectedMedia.title}
									</h2>
								</div>
								<button
									onClick={() => setSelectedMedia(null)}
									className="text-gray-400 hover:text-gray-600"
								>
									✕
								</button>
							</div>

							{/* Media Content */}
							<div className="mb-4">
								{selectedMedia.type === "Photography" &&
								selectedMedia.gallery ? (
									<div className="grid grid-cols-2 gap-4">
										{selectedMedia.gallery.map((image, index) => (
											<img
												key={index}
												src={image}
												alt={`${selectedMedia.title} ${index + 1}`}
												className="w-full h-64 object-cover rounded"
											/>
										))}
									</div>
								) : selectedMedia.type === "Video" ||
								  selectedMedia.type === "Motion Graphics" ? (
									<video
										controls
										className="w-full max-h-96 rounded"
										poster={selectedMedia.thumbnail}
									>
										<source src={selectedMedia.file} type="video/mp4" />
										Your browser does not support the video tag.
									</video>
								) : selectedMedia.type === "Audio" ? (
									<div className="bg-gray-100 p-8 rounded text-center">
										<Music className="w-12 h-12 mx-auto mb-4 text-gray-400" />
										<audio controls className="w-full">
											<source src={selectedMedia.file} type="audio/mpeg" />
											Your browser does not support the audio element.
										</audio>
									</div>
								) : (
									<img
										src={selectedMedia.thumbnail}
										alt={selectedMedia.title}
										className="w-full max-h-96 object-contain rounded"
									/>
								)}
							</div>

							<p className="text-gray-700 leading-relaxed">
								{selectedMedia.description}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MediaPage;
