import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";

const DesignPage = () => {
	const [selectedProject, setSelectedProject] = useState(null);

	const projects = [
		{
			id: "rowdy-poster",
			title: "ROWDY Type Poster",
			image: "./SD_TypePoster_ROWDY.png",
			description: "Typography exploration with bold, energetic design",
		},
		{
			id: "lombardia-poster",
			title: "LOMBARDIA Type Poster",
			image: "./SD_TypePoster_LOMBARDIA.png",
			description: "Elegant typography inspired by Italian design",
		},
		{
			id: "vote-poster",
			title: "Vote Poster",
			image: "./Vote_Poster.png",
			description: "Political awareness campaign design",
		},
	];

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
					<h1 className="text-3xl font-bold text-gray-800">DESIGN</h1>
				</div>
			</header>

			{/* Content */}
			<main className="max-w-6xl mx-auto p-6">
				<div className="mb-8">
					<p className="text-lg text-gray-700 leading-relaxed">
						I have always been an artist, I have just added to the art mediums
						I'm skillful with. From graphic design to 3D modeling, I love to
						create. I have a passion for beautiful and functional designs that
						resonate.
					</p>
				</div>

				{/* Project Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{projects.map((project) => (
						<div
							key={project.id}
							className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
							onClick={() => setSelectedProject(project)}
						>
							<img
								src={project.image}
								alt={project.title}
								className="w-full h-64 object-cover"
							/>
							<div className="p-4">
								<h3 className="font-semibold text-gray-800 mb-2">
									{project.title}
								</h3>
								<p className="text-sm text-gray-600">{project.description}</p>
							</div>
						</div>
					))}
				</div>
			</main>

			{/* Project Modal */}
			{selectedProject && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg max-w-4xl max-h-full overflow-auto">
						<div className="p-6">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-2xl font-bold text-gray-800">
									{selectedProject.title}
								</h2>
								<button
									onClick={() => setSelectedProject(null)}
									className="text-gray-400 hover:text-gray-600"
								>
									✕
								</button>
							</div>
							<img
								src={selectedProject.image}
								alt={selectedProject.title}
								className="w-full max-h-96 object-contain mb-4"
							/>
							<p className="text-gray-700">{selectedProject.description}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DesignPage;
