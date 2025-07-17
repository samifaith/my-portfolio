import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ExternalLink, Calendar } from "lucide-react";

const WritingPage = () => {
	const [selectedPiece, setSelectedPiece] = useState(null);

	const writingPieces = [
		{
			id: "travel-blog",
			title: "Adventures in Digital Nomadism",
			type: "Blog Post",
			date: "2024-03-15",
			excerpt:
				"Exploring the intersection of technology and travel through the lens of a designer...",
			content:
				"Full blog post content would go here. This would be the complete article about digital nomadism and how technology enables remote creative work.",
			tags: ["Travel", "Technology", "Lifestyle"],
		},
		{
			id: "design-philosophy",
			title: "The Art of Minimalist Design",
			type: "Article",
			date: "2024-02-20",
			excerpt:
				"Why less is more in modern digital design and how to achieve maximum impact with minimal elements...",
			content:
				"Full article content about minimalist design principles and their application in modern web and app design.",
			tags: ["Design", "Philosophy", "Minimalism"],
		},
		{
			id: "tech-review",
			title: "Creative Tools for the Modern Designer",
			type: "Review",
			date: "2024-01-10",
			excerpt:
				"A comprehensive review of the latest design tools and software that are revolutionizing creative workflows...",
			content:
				"Detailed review of various design tools, their pros and cons, and recommendations for different use cases.",
			tags: ["Technology", "Tools", "Review"],
		},
		{
			id: "case-study-writing",
			title: "Documenting Design Process",
			type: "Guide",
			date: "2023-12-05",
			excerpt:
				"Best practices for creating compelling case studies that showcase your design thinking and process...",
			content:
				"A comprehensive guide on how to document and present design work effectively.",
			tags: ["Design", "Documentation", "Process"],
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
					<h1 className="text-3xl font-bold text-gray-800">WRITING</h1>
				</div>
			</header>

			{/* Content */}
			<main className="max-w-6xl mx-auto p-6">
				<div className="mb-8">
					<p className="text-lg text-gray-700 leading-relaxed">
						Writing has always been a passion of mine, from creative
						storytelling to technical documentation. I believe that clear
						communication is just as important as good design, and I love
						exploring ideas through words as much as visuals.
					</p>
				</div>

				{/* Writing Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{writingPieces.map((piece) => (
						<div
							key={piece.id}
							className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
							onClick={() => setSelectedPiece(piece)}
						>
							<div className="p-6">
								<div className="flex items-center space-x-2 mb-3">
									<BookOpen className="w-5 h-5 text-yellow-500" />
									<span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
										{piece.type}
									</span>
								</div>

								<h3 className="font-bold text-gray-800 mb-2 text-lg">
									{piece.title}
								</h3>

								<div className="flex items-center space-x-2 mb-3 text-sm text-gray-500">
									<Calendar className="w-4 h-4" />
									<span>{new Date(piece.date).toLocaleDateString()}</span>
								</div>

								<p className="text-gray-600 text-sm mb-4 line-clamp-3">
									{piece.excerpt}
								</p>

								<div className="flex flex-wrap gap-2">
									{piece.tags.map((tag) => (
										<span
											key={tag}
											className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</main>

			{/* Writing Modal */}
			{selectedPiece && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg max-w-4xl max-h-full overflow-auto">
						<div className="p-8">
							<div className="flex justify-between items-start mb-6">
								<div className="flex-1">
									<div className="flex items-center space-x-2 mb-2">
										<BookOpen className="w-5 h-5 text-yellow-500" />
										<span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
											{selectedPiece.type}
										</span>
									</div>
									<h2 className="text-3xl font-bold text-gray-800 mb-2">
										{selectedPiece.title}
									</h2>
									<div className="flex items-center space-x-2 text-gray-500">
										<Calendar className="w-4 h-4" />
										<span>
											{new Date(selectedPiece.date).toLocaleDateString()}
										</span>
									</div>
								</div>
								<button
									onClick={() => setSelectedPiece(null)}
									className="text-gray-400 hover:text-gray-600 ml-4"
								>
									✕
								</button>
							</div>

							<div className="prose max-w-none">
								<p className="text-lg text-gray-700 leading-relaxed mb-6">
									{selectedPiece.excerpt}
								</p>
								<div className="text-gray-700 leading-relaxed whitespace-pre-line">
									{selectedPiece.content}
								</div>
							</div>

							<div className="flex flex-wrap gap-2 mt-6 pt-6 border-t">
								{selectedPiece.tags.map((tag) => (
									<span
										key={tag}
										className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default WritingPage;
