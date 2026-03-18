import React from "react";
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

	if (projectData.video) {
		return (
			<div
				className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex flex-col"
				onClick={handleClick}
			>
				<div className="w-full overflow-hidden bg-black">
					<video
						src={projectData.video}
						className="block w-full h-auto"
						muted
						loop
						playsInline
						autoPlay
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

	// If project has an image, use the simple image card
	if (projectData.image) {
		return (
			<div
				className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex flex-col"
				onClick={handleClick}
			>
				<div className="w-full overflow-hidden">
					<img
						src={projectData.image}
						alt={projectData.title}
						className="block w-full h-auto"
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

	// Transparent glass card template
	const BackgroundIcon = projectData.backgroundIcon;
	const AccentIcon = projectData.accentIcon;

	return (
		<div
			className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 p-6 text-gray-800 relative overflow-hidden rounded-lg cursor-pointer flex flex-col shadow-lg"
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
						<div className="w-12 h-12 bg-gray-100 bg-opacity-60 rounded-full flex items-center justify-center flex-shrink-0">
							<AccentIcon className="w-6 h-6 text-gray-700" />
						</div>
					)}
					<div className="flex-1">
						<h3 className="text-xl font-bold text-gray-800 mb-1">
							{projectData.title}
						</h3>
						<p className="text-gray-600 text-sm">
							{projectData.type || projectData.category}
						</p>
					</div>
				</div>

				<p className="text-gray-700 mb-4 leading-relaxed flex-1">
					{projectData.description || projectData.previewContent}
				</p>

				{/* Optional sections at bottom */}
				<div className="space-y-3">
					{projectData.role && projectData.duration && (
						<div className="grid grid-cols-2 gap-3">
							<div className="bg-gray-100 bg-opacity-60 rounded-lg p-3 backdrop-blur-sm">
								<h5 className="font-medium text-gray-800 text-xs">Role</h5>
								<p className="text-xs text-gray-600">{projectData.role}</p>
							</div>
							<div className="bg-gray-100 bg-opacity-60 rounded-lg p-3 backdrop-blur-sm">
								<h5 className="font-medium text-gray-800 text-xs">Duration</h5>
								<p className="text-xs text-gray-600">{projectData.duration}</p>
							</div>
						</div>
					)}

					{projectData.type && projectData.theme && (
						<div className="grid grid-cols-2 gap-3">
							<div className="bg-gray-100 bg-opacity-60 backdrop-blur-sm rounded-lg p-3">
								<h5 className="font-medium text-gray-800 text-xs">Type</h5>
								<p className="text-xs text-gray-600">{projectData.type}</p>
							</div>
							<div className="bg-gray-100 bg-opacity-60 backdrop-blur-sm rounded-lg p-3">
								<h5 className="font-medium text-gray-800 text-xs">Theme</h5>
								<p className="text-xs text-gray-600">{projectData.theme}</p>
							</div>
						</div>
					)}
				</div>

				{/* Hover indicator */}
				<div className="absolute top-4 right-4 opacity-75 pointer-events-none">
					<ExternalLink className="w-5 h-5 text-gray-600" />
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
