import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Compass, ExternalLink } from "lucide-react";

const DevelopmentPage = () => {
	const [selectedProject, setSelectedProject] = useState(null);
	const navigate = useNavigate();

	const projects = [
		{
			id: "wanderlust",
			title: "Wanderlust",
			type: "UX/UI Case Study",
			description:
				"A comprehensive travel planning app designed to simplify trip organization and enhance user experience through intuitive design.",
			role: "UX/UI Designer",
			duration: "8 weeks",
			route: "/wanderlust-case-study",
		},
		{
			id: "vector-work",
			title: "Vector Illustration",
			type: "Digital Art",
			image: "./SamDeCoteau_Vector.png",
			description: "Custom vector illustrations and digital artwork",
		},
	];

	const handleProjectClick = (project) => {
		if (project.route) {
			navigate(project.route);
		} else {
			setSelectedProject(project);
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
					<h1 className="text-3xl font-bold text-gray-800">DEVELOPMENT</h1>
				</div>
			</header>

			{/* Content */}
			<main className="max-w-6xl mx-auto p-6">
				<div className="mb-8">
					<p className="text-lg text-gray-700 leading-relaxed">
						I fuse logic with artistry to craft immersive digital experiences.
						Whether building robust front-end applications or experimenting with
						new technologies, I see every line of code as a chance to bring
						fresh ideas to life.
					</p>
				</div>

				{/* Project Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{projects.map((project) => (
						<div
							key={project.id}
							className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
							onClick={() => handleProjectClick(project)}
						>
							{project.id === "wanderlust" ? (
								// Orange gradient rectangle for Wanderlust
								<div className="bg-gradient-to-br from-orange-400 to-red-500 p-8 text-white relative overflow-hidden">
									{/* Background pattern */}
									<div className="absolute inset-0 opacity-10">
										<div className="absolute top-4 right-4">
											<Compass className="w-16 h-16" />
										</div>
										<div className="absolute bottom-4 left-4">
											<Compass className="w-12 h-12" />
										</div>
										<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
											<Compass className="w-20 h-20" />
										</div>
									</div>

									{/* Main content */}
									<div className="relative z-10">
										<div className="flex items-center space-x-3 mb-4">
											<div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
												<Compass className="w-6 h-6 text-white" />
											</div>
											<div>
												<h3 className="text-2xl font-bold text-white">
													Wanderlust
												</h3>
												<p className="text-white text-opacity-90">
													{project.type}
												</p>
											</div>
										</div>

										<p className="text-white text-opacity-90 mb-6 leading-relaxed">
											{project.description}
										</p>

										<div className="grid grid-cols-2 gap-4">
											<div className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
												<h5 className="font-medium text-white text-sm">Role</h5>
												<p className="text-xs text-white text-opacity-90">
													{project.role}
												</p>
											</div>
											<div className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
												<h5 className="font-medium text-white text-sm">
													Duration
												</h5>
												<p className="text-xs text-white text-opacity-90">
													{project.duration}
												</p>
											</div>
										</div>

										{/* Hover indicator */}
										<div className="absolute top-4 right-4 opacity-75">
											<ExternalLink className="w-5 h-5 text-white" />
										</div>
									</div>
								</div>
							) : (
								// Regular image display for other projects
								<>
									<img
										src={project.image}
										alt={project.title}
										className="w-full h-64 object-cover"
									/>
									<div className="p-4">
										<h3 className="font-semibold text-gray-800 mb-2">
											{project.title}
										</h3>
										<p className="text-sm text-gray-600">
											{project.description}
										</p>
									</div>
								</>
							)}
						</div>
					))}
				</div>
			</main>

			{/* Project Modal for non-routed projects */}
			{selectedProject && !selectedProject.route && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg max-w-4xl max-h-full overflow-auto">
						<div className="p-8">
							<div className="flex justify-between items-start mb-6">
								<div className="flex-1">
									<h2 className="text-3xl font-bold text-gray-800 mb-2">
										{selectedProject.title}
									</h2>
									<p className="text-gray-600">{selectedProject.type}</p>
								</div>
								<button
									onClick={() => setSelectedProject(null)}
									className="text-gray-400 hover:text-gray-600 ml-4"
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

export default DevelopmentPage;
