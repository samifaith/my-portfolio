import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PageLayout = ({
	title,
	description,
	children,
	backLink = "/",
	backText = "Back to Portfolio",
	isStoryPage = false,
	showModal = false,
	selectedProject = null,
	onCloseModal = () => {},
}) => {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header - only show for non-story pages */}
			{!isStoryPage && (
				<header className="bg-white shadow-sm p-6">
					<div className="max-w-6xl mx-auto flex items-center justify-between">
						<Link
							to={backLink}
							className="flex items-center space-x-2 text-gray-600"
						>
							<ArrowLeft className="w-5 h-5" />
							<span>{backText}</span>
						</Link>
						<h1
							className="text-3xl font-bold"
							style={{
								color: "#a2003b",
								fontFamily: "Impact, Poppins, sans-serif",
							}}
						>
							{title}
						</h1>
					</div>
				</header>
			)}

			{/* Content */}
			<main className={`max-w-6xl mx-auto p-6 ${isStoryPage ? "py-12" : ""}`}>
				{/* Back link for story pages */}
				{isStoryPage && (
					<Link
						to={backLink}
						className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8"
					>
						<ArrowLeft className="w-4 h-4" />
						<span>{backText}</span>
					</Link>
				)}

				{description && !isStoryPage && (
					<div className="mb-8">
						<p className="text-lg text-gray-700 leading-relaxed">
							{description}
						</p>
					</div>
				)}

				{/* Dynamic content passed as children */}
				{children}
			</main>

			{/* Modal for projects */}
			{showModal && selectedProject && !selectedProject.route && (
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
								<button onClick={onCloseModal} className="text-gray-400 ml-4">
									✕
								</button>
							</div>

							{selectedProject.image && (
								<img
									src={selectedProject.image}
									alt={selectedProject.title}
									className="w-full max-h-96 object-contain mb-4"
								/>
							)}
							{selectedProject.video && (
								<video
									src={selectedProject.video}
									className="w-full max-h-96 object-contain mb-4"
									controls
									playsInline
								/>
							)}
							<p className="text-gray-700">{selectedProject.description}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PageLayout;
