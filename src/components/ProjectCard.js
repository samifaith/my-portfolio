import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const ProjectCard = ({ projectData, onProjectClick }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		if (projectData.route) {
			navigate(projectData.route);
		} else if (onProjectClick) {
			onProjectClick(projectData);
		}
	};

	const gradientOptions = [
		"from-purple-600 to-blue-600",
		"from-green-600 to-teal-600",
		"from-orange-600 to-red-600",
		"from-blue-600 to-indigo-600",
		"from-pink-600 to-purple-600",
		"from-yellow-600 to-orange-600",
		"from-indigo-600 to-purple-600",
		"from-teal-600 to-green-600",
		"from-red-600 to-pink-600",
		"from-amber-600 to-yellow-600",
	];

	// If project has an image, use the simple image card
	if (projectData.image) {
		return (
			<div
				className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer h-full flex flex-col"
				onClick={handleClick}
			>
				<div className="h-[25rem] w-full overflow-hidden">
					<img
						src={projectData.image}
						alt={projectData.title}
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="p-4 flex-1">
					<h3 className="font-semibold text-gray-800 mb-2">
						{projectData.title}
					</h3>
					<p className="text-sm text-gray-600">{projectData.description}</p>
				</div>
			</div>
		);
	}

	// Default gradient card template
	const BackgroundIcon = projectData.backgroundIcon;
	const AccentIcon = projectData.accentIcon;

	const gradient =
		projectData.backgroundGradient ||
		gradientOptions[Math.floor(Math.random() * gradientOptions.length)];

	return (
		<div
			className={`bg-gradient-to-br ${gradient} p-6 text-white relative overflow-hidden rounded-lg cursor-pointer h-full flex flex-col`}
			onClick={handleClick}
		>
			{/* Background pattern */}
			{BackgroundIcon && AccentIcon && (
				<div className="absolute inset-0 opacity-10 pointer-events-none">
					<div className="absolute top-4 right-4">
						<BackgroundIcon className="w-16 h-16" />
					</div>
					<div className="absolute bottom-4 left-4">
						<AccentIcon className="w-12 h-12" />
					</div>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
						<BackgroundIcon className="w-20 h-20" />
					</div>
				</div>
			)}

			{/* Main content */}
			<div className="relative z-10 flex-1 flex flex-col">
				<div className="flex items-start space-x-3 mb-4">
					{AccentIcon && (
						<div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
							<AccentIcon className="w-6 h-6 text-white" />
						</div>
					)}
					<div className="flex-1">
						<h3 className="text-xl font-bold text-white mb-1">
							{projectData.title}
						</h3>
						<p className="text-white text-opacity-90 text-sm">
							{projectData.type || projectData.category}
						</p>
					</div>
				</div>

				<p className="text-white text-opacity-90 mb-4 leading-relaxed flex-1">
					{projectData.description || projectData.previewContent}
				</p>

				{/* Optional sections at bottom */}
				<div className="space-y-3">
					{projectData.role && projectData.duration && (
						<div className="grid grid-cols-2 gap-3">
							<div className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
								<h5 className="font-medium text-white text-xs">Role</h5>
								<p className="text-xs text-white text-opacity-90">
									{projectData.role}
								</p>
							</div>
							<div className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
								<h5 className="font-medium text-white text-xs">Duration</h5>
								<p className="text-xs text-white text-opacity-90">
									{projectData.duration}
								</p>
							</div>
						</div>
					)}

					{projectData.type && projectData.theme && (
						<div className="grid grid-cols-2 gap-3">
							<div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
								<h5 className="font-medium text-white text-xs">Type</h5>
								<p className="text-xs text-white text-opacity-90">
									{projectData.type}
								</p>
							</div>
							<div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
								<h5 className="font-medium text-white text-xs">Theme</h5>
								<p className="text-xs text-white text-opacity-90">
									{projectData.theme}
								</p>
							</div>
						</div>
					)}
				</div>

				{/* Hover indicator */}
				<div className="absolute top-4 right-4 opacity-75 pointer-events-none">
					<ExternalLink className="w-5 h-5 text-white" />
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
