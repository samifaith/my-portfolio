import React, { useState } from "react";
import {
	ChevronLeft,
	ChevronRight,
	Users,
	Target,
	Lightbulb,
	Smartphone,
	Palette,
	BarChart3,
	CheckCircle,
	ArrowLeft,
	ArrowRight,
	Star,
	Heart,
	MapPin,
	DollarSign,
	User,
	Calendar,
	Search,
	Filter,
	Plus,
	Bell,
	Compass,
	X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const WanderlustCaseStudy = () => {
	const navigate = useNavigate();
	const [currentSection, setCurrentSection] = useState(0);

	const sections = [
		"Overview",
		"Research",
		"User Personas",
		"Competitive Analysis",
		"User Journey",
		"Wireframes",
		"Design System",
		"Key Features",
		"Usability Testing",
		"Final Designs",
		"Results",
	];

	const colors = {
		primary: "#A0522D",
		secondary: "#FF8C42",
		neutral: "#F0EEE6",
		sage: "#87A96B",
		gray: "#6B7280",
	};

	const PersonaCard = ({
		name,
		age,
		role,
		income,
		image,
		goals,
		frustrations,
		quote,
	}) => (
		<div className="bg-white rounded-2xl p-6 shadow-lg max-w-md">
			<div className="flex items-center mb-4">
				<div className="w-16 h-16 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
					<User className="w-8 h-8 text-gray-600" />
				</div>
				<div>
					<h3 className="text-xl font-bold text-gray-800">
						{name}, {age}
					</h3>
					<p className="text-gray-600">{role}</p>
					<p className="text-sm text-gray-500">{income}</p>
				</div>
			</div>
			<div className="bg-gray-50 rounded-lg p-4 mb-4">
				<p className="text-sm italic text-gray-700">"{quote}"</p>
			</div>
			<div className="mb-4">
				<h4 className="font-semibold text-gray-800 mb-2">Goals</h4>
				<ul className="text-sm text-gray-600 space-y-1">
					{goals.map((goal, idx) => (
						<li key={idx} className="flex items-start">
							<CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
							{goal}
						</li>
					))}
				</ul>
			</div>
			<div>
				<h4 className="font-semibold text-gray-800 mb-2">Frustrations</h4>
				<ul className="text-sm text-gray-600 space-y-1">
					{frustrations.map((frustration, idx) => (
						<li key={idx} className="flex items-start">
							<X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
							{frustration}
						</li>
					))}
				</ul>
			</div>
		</div>
	);

	const WireframePhone = ({ title, children }) => (
		<div
			className="bg-white rounded-2xl p-4 shadow-lg"
			style={{ width: "200px", height: "400px" }}
		>
			<div className="text-center mb-4">
				<h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
			</div>
			<div className="border-2 border-gray-300 rounded-xl h-80 p-2">
				{children}
			</div>
		</div>
	);

	const FeatureCard = ({ icon: Icon, title, problem, solution, metrics }) => (
		<div className="bg-white rounded-2xl p-6 shadow-lg">
			<div className="flex items-center mb-4">
				<div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
					<Icon className="w-6 h-6 text-orange-600" />
				</div>
				<h3 className="text-xl font-bold text-gray-800">{title}</h3>
			</div>
			<div className="mb-4">
				<h4 className="font-semibold text-red-600 mb-2">Problem</h4>
				<p className="text-gray-600 text-sm">{problem}</p>
			</div>
			<div className="mb-4">
				<h4 className="font-semibold text-green-600 mb-2">Solution</h4>
				<p className="text-gray-600 text-sm">{solution}</p>
			</div>
			<div className="bg-gray-50 rounded-lg p-3">
				<h4 className="font-semibold text-gray-800 mb-2">Key Metrics</h4>
				<p className="text-sm text-gray-600">{metrics}</p>
			</div>
		</div>
	);

	const renderOverview = () => (
		<div className="space-y-8">
			<div className="text-center">
				<div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
					<Compass className="w-10 h-10 text-white" />
				</div>
				<h1 className="text-4xl font-bold text-gray-800 mb-4">Wanderlust</h1>
				<p className="text-xl text-gray-600 mb-8">
					AI-Powered Travel Matching for Millennials
				</p>
			</div>

			<div className="grid md:grid-cols-2 gap-8">
				<div className="bg-white rounded-2xl p-6 shadow-lg">
					<Target className="w-8 h-8 text-orange-500 mb-4" />
					<h3 className="text-xl font-bold text-gray-800 mb-3">
						The Challenge
					</h3>
					<p className="text-gray-600">
						Modern travelers are overwhelmed by endless options and generic
						recommendations. They crave authentic experiences but lack
						personalized discovery tools.
					</p>
				</div>

				<div className="bg-white rounded-2xl p-6 shadow-lg">
					<Lightbulb className="w-8 h-8 text-orange-500 mb-4" />
					<h3 className="text-xl font-bold text-gray-800 mb-3">The Solution</h3>
					<p className="text-gray-600">
						A "Tinder for travel" that uses AI matching to connect users with
						personalized trips and authentic local experiences.
					</p>
				</div>
			</div>

			<div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8">
				<h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
					Project Details
				</h3>
				<div className="grid md:grid-cols-4 gap-6">
					<div className="text-center">
						<div className="text-2xl font-bold text-orange-600">8 weeks</div>
						<div className="text-sm text-gray-600">Duration</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-orange-600">4 people</div>
						<div className="text-sm text-gray-600">Team Size</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-orange-600">150+</div>
						<div className="text-sm text-gray-600">Users Surveyed</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-orange-600">Lead UX</div>
						<div className="text-sm text-gray-600">My Role</div>
					</div>
				</div>
			</div>
		</div>
	);

	const renderResearch = () => (
		<div className="space-y-8">
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-gray-800 mb-4">
					Research & Discovery
				</h2>
				<p className="text-gray-600">
					Understanding millennial travel behavior and pain points
				</p>
			</div>

			<div className="grid md:grid-cols-2 gap-8">
				<div className="bg-white rounded-2xl p-6 shadow-lg">
					<h3 className="text-xl font-bold text-gray-800 mb-4">
						Research Methods
					</h3>
					<div className="space-y-3">
						<div className="flex items-center">
							<Users className="w-5 h-5 text-orange-500 mr-3" />
							<span className="text-gray-700">12 in-depth interviews</span>
						</div>
						<div className="flex items-center">
							<BarChart3 className="w-5 h-5 text-orange-500 mr-3" />
							<span className="text-gray-700">150-person survey</span>
						</div>
						<div className="flex items-center">
							<Target className="w-5 h-5 text-orange-500 mr-3" />
							<span className="text-gray-700">8 competitor analysis</span>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-2xl p-6 shadow-lg">
					<h3 className="text-xl font-bold text-gray-800 mb-4">Key Insights</h3>
					<div className="space-y-4">
						<div className="border-l-4 border-orange-500 pl-4">
							<div className="text-2xl font-bold text-orange-600">78%</div>
							<div className="text-sm text-gray-600">
								Feel overwhelmed by travel options
							</div>
						</div>
						<div className="border-l-4 border-orange-500 pl-4">
							<div className="text-2xl font-bold text-orange-600">65%</div>
							<div className="text-sm text-gray-600">
								Want authentic local experiences
							</div>
						</div>
						<div className="border-l-4 border-orange-500 pl-4">
							<div className="text-2xl font-bold text-orange-600">82%</div>
							<div className="text-sm text-gray-600">
								Stress about overspending
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
				<h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
					User Behaviors
				</h3>
				<div className="grid md:grid-cols-2 gap-6">
					<div className="space-y-4">
						<div className="bg-white rounded-lg p-4">
							<div className="text-lg font-semibold text-gray-800">
								3-5 hours
							</div>
							<div className="text-sm text-gray-600">
								Researching one destination
							</div>
						</div>
						<div className="bg-white rounded-lg p-4">
							<div className="text-lg font-semibold text-gray-800">
								4-6 apps
							</div>
							<div className="text-sm text-gray-600">
								Used per trip planning
							</div>
						</div>
					</div>
					<div className="space-y-4">
						<div className="bg-white rounded-lg p-4">
							<div className="text-lg font-semibold text-gray-800">
								Social Media
							</div>
							<div className="text-sm text-gray-600">
								Primary inspiration source
							</div>
						</div>
						<div className="bg-white rounded-lg p-4">
							<div className="text-lg font-semibold text-gray-800">
								Peer Reviews
							</div>
							<div className="text-sm text-gray-600">
								Preferred over expert advice
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const renderPersonas = () => (
		<div className="space-y-8">
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-gray-800 mb-4">User Personas</h2>
				<p className="text-gray-600">
					Based on research with 150+ millennial travelers
				</p>
			</div>

			<div className="grid md:grid-cols-2 gap-8">
				<PersonaCard
					name="Sarah"
					age="28"
					role="Marketing Manager"
					income="$65K/year"
					goals={[
						"Discover authentic local experiences",
						"Stay within budget while traveling",
						"Share Instagram-worthy moments",
						"Travel with like-minded people",
					]}
					frustrations={[
						"Too many options to choose from",
						"Generic tourist recommendations",
						"Overspending on trips",
						"Difficulty finding travel companions",
					]}
					quote="I want to travel like a local, not a tourist"
				/>

				<PersonaCard
					name="Mike"
					age="32"
					role="Software Developer"
					income="$85K/year"
					goals={[
						"Immersive cultural experiences",
						"Efficient trip planning",
						"Off-the-beaten-path destinations",
						"Solo travel safety",
					]}
					frustrations={[
						"Outdated travel information",
						"Lack of personalization",
						"Time-consuming research",
						"Generic recommendations",
					]}
					quote="I need an app that actually understands what I'm looking for"
				/>
			</div>

			<div className="bg-white rounded-2xl p-6 shadow-lg">
				<h3 className="text-xl font-bold text-gray-800 mb-4">
					Persona Insights
				</h3>
				<div className="grid md:grid-cols-3 gap-6">
					<div className="text-center">
						<div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<Heart className="w-8 h-8 text-orange-600" />
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">
							Value Authenticity
						</h4>
						<p className="text-sm text-gray-600">
							Prefer local experiences over tourist attractions
						</p>
					</div>
					<div className="text-center">
						<div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<Smartphone className="w-8 h-8 text-orange-600" />
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">Mobile-First</h4>
						<p className="text-sm text-gray-600">
							Research and book primarily on mobile devices
						</p>
					</div>
					<div className="text-center">
						<div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<Users className="w-8 h-8 text-orange-600" />
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">
							Social Influence
						</h4>
						<p className="text-sm text-gray-600">
							Heavily influenced by peer recommendations
						</p>
					</div>
				</div>
			</div>
		</div>
	);

	const renderCompetitive = () => (
		<div className="space-y-8">
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-gray-800 mb-4">
					Competitive Analysis
				</h2>
				<p className="text-gray-600">
					Understanding the current market landscape
				</p>
			</div>

			<div className="grid md:grid-cols-3 gap-6">
				<div className="bg-white rounded-2xl p-6 shadow-lg">
					<div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
						<div className="text-red-600 font-bold">A</div>
					</div>
					<h3 className="text-xl font-bold text-gray-800 mb-3">Airbnb</h3>
					<div className="mb-4">
						<h4 className="font-semibold text-green-600 mb-2">Strengths</h4>
						<ul className="text-sm text-gray-600 space-y-1">
							<li>• Strong local presence</li>
							<li>• Trusted platform</li>
							<li>• Great user experience</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold text-red-600 mb-2">Weaknesses</h4>
						<ul className="text-sm text-gray-600 space-y-1">
							<li>• Limited trip planning</li>
							<li>• No personalization</li>
							<li>• Accommodation-focused</li>
						</ul>
					</div>
				</div>

				<div className="bg-white rounded-2xl p-6 shadow-lg">
					<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
						<div className="text-green-600 font-bold">T</div>
					</div>
					<h3 className="text-xl font-bold text-gray-800 mb-3">TripAdvisor</h3>
					<div className="mb-4">
						<h4 className="font-semibold text-green-600 mb-2">Strengths</h4>
						<ul className="text-sm text-gray-600 space-y-1">
							<li>• Extensive reviews</li>
							<li>• Comprehensive coverage</li>
							<li>• Established brand</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold text-red-600 mb-2">Weaknesses</h4>
						<ul className="text-sm text-gray-600 space-y-1">
							<li>• Outdated UX</li>
							<li>• Tourist-focused</li>
							<li>• Information overload</li>
						</ul>
					</div>
				</div>

				<div className="bg-white rounded-2xl p-6 shadow-lg">
					<div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
						<div className="text-orange-600 font-bold">K</div>
					</div>
					<h3 className="text-xl font-bold text-gray-800 mb-3">Kayak</h3>
					<div className="mb-4">
						<h4 className="font-semibold text-green-600 mb-2">Strengths</h4>
						<ul className="text-sm text-gray-600 space-y-1">
							<li>• Price comparison</li>
							<li>• Booking integration</li>
							<li>• Flight focus</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold text-red-600 mb-2">Weaknesses</h4>
						<ul className="text-sm text-gray-600 space-y-1">
							<li>• No personalization</li>
							<li>• Generic recommendations</li>
							<li>• Poor mobile UX</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
				<h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
					Market Opportunity
				</h3>
				<div className="grid md:grid-cols-2 gap-8">
					<div className="space-y-4">
						<div className="bg-white rounded-lg p-4">
							<div className="text-3xl font-bold text-purple-600">$6.2B</div>
							<div className="text-sm text-gray-600">
								Travel app market size
							</div>
						</div>
						<div className="bg-white rounded-lg p-4">
							<div className="text-3xl font-bold text-purple-600">73%</div>
							<div className="text-sm text-gray-600">
								Millennials prioritize experiences
							</div>
						</div>
					</div>
					<div className="bg-white rounded-lg p-6">
						<h4 className="font-semibold text-gray-800 mb-3">Gap Identified</h4>
						<p className="text-gray-600 text-sm">
							No existing app combines AI-powered personalization with authentic
							local discovery and integrated budget management.
						</p>
					</div>
				</div>
			</div>
		</div>
	);

	const renderUserJourney = () => (
		<div className="space-y-8">
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-gray-800 mb-4">
					User Journey Map
				</h2>
				<p className="text-gray-600">
					Sarah's experience planning a trip to Japan
				</p>
			</div>

			<div className="bg-white rounded-2xl p-8 shadow-lg">
				<div className="grid grid-cols-5 gap-4">
					<div className="text-center">
						<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<Search className="w-8 h-8 text-blue-600" />
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">Discovery</h4>
						<p className="text-sm text-gray-600">
							Sees Japan post on Instagram
						</p>
						<div className="mt-2 text-xs text-gray-500">😊 Excited</div>
					</div>

					<div className="text-center">
						<div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<Target className="w-8 h-8 text-yellow-600" />
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">Research</h4>
						<p className="text-sm text-gray-600">Overwhelmed by options</p>
						<div className="mt-2 text-xs text-gray-500">😰 Frustrated</div>
					</div>

					<div className="text-center">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<Heart className="w-8 h-8 text-green-600" />
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">Matching</h4>
						<p className="text-sm text-gray-600">AI suggests perfect trip</p>
						<div className="mt-2 text-xs text-gray-500">😍 Delighted</div>
					</div>

					<div className="text-center">
						<div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<DollarSign className="w-8 h-8 text-purple-600" />
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">Planning</h4>
						<p className="text-sm text-gray-600">Books with budget tracking</p>
						<div className="mt-2 text-xs text-gray-500">😌 Confident</div>
					</div>

					<div className="text-center">
						<div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<MapPin className="w-8 h-8 text-orange-600" />
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">Experience</h4>
						<p className="text-sm text-gray-600">Discovers local gems</p>
						<div className="mt-2 text-xs text-gray-500">🤩 Amazed</div>
					</div>
				</div>

				<div className="mt-8 border-t pt-6">
					<h4 className="font-semibold text-gray-800 mb-4">
						Pain Points & Solutions
					</h4>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="space-y-3">
							<div className="bg-red-50 rounded-lg p-3">
								<div className="font-medium text-red-800">Pain Point</div>
								<div className="text-sm text-red-600">
									Overwhelmed by endless options
								</div>
							</div>
							<div className="bg-green-50 rounded-lg p-3">
								<div className="font-medium text-green-800">Solution</div>
								<div className="text-sm text-green-600">
									AI-powered personalized matching
								</div>
							</div>
						</div>
						<div className="space-y-3">
							<div className="bg-red-50 rounded-lg p-3">
								<div className="font-medium text-red-800">Pain Point</div>
								<div className="text-sm text-red-600">
									Generic tourist recommendations
								</div>
							</div>
							<div className="bg-green-50 rounded-lg p-3">
								<div className="font-medium text-green-800">Solution</div>
								<div className="text-sm text-green-600">
									Curated local experiences
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const renderWireframes = () => (
		<div className="space-y-8">
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-gray-800 mb-4">
					Wireframes & Prototypes
				</h2>
				<p className="text-gray-600">
					From low-fidelity concepts to interactive prototypes
				</p>
			</div>

			<div className="grid md:grid-cols-4 gap-6">
				<WireframePhone title="AI Survey">
					<div className="space-y-4">
						<div className="h-4 bg-gray-200 rounded"></div>
						<div className="h-2 bg-gray-200 rounded w-3/4"></div>
						<div className="space-y-2">
							<div className="h-8 bg-gray-200 rounded"></div>
							<div className="h-8 bg-gray-200 rounded"></div>
							<div className="h-8 bg-gray-200 rounded"></div>
						</div>
						<div className="h-10 bg-orange-200 rounded"></div>
					</div>
				</WireframePhone>

				<WireframePhone title="Swipe Interface">
					<div className="space-y-4">
						<div className="h-32 bg-gray-200 rounded"></div>
						<div className="h-4 bg-gray-200 rounded w-3/4"></div>
						<div className="h-3 bg-gray-200 rounded w-1/2"></div>
						<div className="flex justify-center space-x-4 mt-8">
							<div className="w-8 h-8 bg-gray-200 rounded-full"></div>
							<div className="w-8 h-8 bg-orange-200 rounded-full"></div>
						</div>
					</div>
				</WireframePhone>

				<WireframePhone title="Local Discovery">
					<div className="space-y-3">
						<div className="h-8 bg-gray-200 rounded"></div>
						<div className="space-y-2">
							<div className="h-12 bg-gray-200 rounded"></div>
							<div className="h-12 bg-gray-200 rounded"></div>
							<div className="h-12 bg-gray-200 rounded"></div>
							<div className="h-12 bg-gray-200 rounded"></div>
						</div>
					</div>
				</WireframePhone>

				<WireframePhone title="Budget Tracking">
					<div className="space-y-4">
						<div className="h-6 bg-gray-200 rounded"></div>
						<div className="space-y-2">
							<div className="h-4 bg-gray-200 rounded"></div>
							<div className="h-2 bg-orange-200 rounded"></div>
							<div className="h-4 bg-gray-200 rounded"></div>
							<div className="h-2 bg-orange-200 rounded"></div>
						</div>
						<div className="h-16 bg-gray-200 rounded"></div>
					</div>
				</WireframePhone>
			</div>

			<div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
				<h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
					Design Process
				</h3>
				<div className="grid md:grid-cols-4 gap-6">
					<div className="text-center">
						<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<div className="text-blue-600 font-bold">1</div>
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">Sketching</h4>
						<p className="text-sm text-gray-600">
							Rapid ideation and concept exploration
						</p>
					</div>
					<div className="text-center">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<div className="text-green-600 font-bold">2</div>
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">Wireframing</h4>
						<p className="text-sm text-gray-600">
							Low-fidelity structure and layout
						</p>
					</div>
					<div className="text-center">
						<div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<div className="text-purple-600 font-bold">3</div>
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">Prototyping</h4>
						<p className="text-sm text-gray-600">
							Interactive high-fidelity mockups
						</p>
					</div>
					<div className="text-center">
						<div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<div className="text-orange-600 font-bold">4</div>
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">Testing</h4>
						<p className="text-sm text-gray-600">
							User validation and iteration
						</p>
					</div>
				</div>
			</div>
		</div>
	);

	const renderDesignSystem = () => (
		<div className="space-y-8">
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-gray-800 mb-4">Design System</h2>
				<p className="text-gray-600">
					Consistent visual language for the Wanderlust brand
				</p>
			</div>

			<div className="grid md:grid-cols-2 gap-8">
				<div className="bg-white rounded-2xl p-6 shadow-lg">
					<h3 className="text-xl font-bold text-gray-800 mb-4">
						Color Palette
					</h3>
					<div className="grid grid-cols-2 gap-4">
						<div className="text-center">
							<div
								className="w-20 h-20 rounded-lg mx-auto mb-2"
								style={{ backgroundColor: "#A0522D" }}
							></div>
							<div className="text-sm font-medium text-gray-800">Primary</div>
							<div className="text-xs text-gray-600">#A0522D</div>
						</div>
						<div className="text-center">
							<div
								className="w-20 h-20 rounded-lg mx-auto mb-2"
								style={{ backgroundColor: "#FF8C42" }}
							></div>
							<div className="text-sm font-medium text-gray-800">Secondary</div>
							<div className="text-xs text-gray-600">#FF8C42</div>
						</div>
						<div className="text-center">
							<div
								className="w-20 h-20 rounded-lg mx-auto mb-2"
								style={{ backgroundColor: "#F0EEE6" }}
							></div>
							<div className="text-sm font-medium text-gray-800">Neutral</div>
							<div className="text-xs text-gray-600">#F0EEE6</div>
						</div>
						<div className="text-center">
							<div
								className="w-20 h-20 rounded-lg mx-auto mb-2"
								style={{ backgroundColor: "#87A96B" }}
							></div>
							<div className="text-sm font-medium text-gray-800">Accent</div>
							<div className="text-xs text-gray-600">#87A96B</div>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-2xl p-6 shadow-lg">
					<h3 className="text-xl font-bold text-gray-800 mb-4">Typography</h3>
					<div className="space-y-4">
						<div>
							<div className="text-2xl font-bold text-gray-800">
								SF Pro Display
							</div>
							<div className="text-sm text-gray-600">
								Primary font for headings
							</div>
						</div>
						<div>
							<div className="text-base text-gray-800">SF Pro Text</div>
							<div className="text-sm text-gray-600">
								Body text and UI elements
							</div>
						</div>
						<div>
							<div className="text-lg italic text-gray-800">Custom Script</div>
							<div className="text-sm text-gray-600">
								Brand moments and accents
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-2xl p-6 shadow-lg">
				<h3 className="text-xl font-bold text-gray-800 mb-6">
					Component Library
				</h3>
				<div className="grid md:grid-cols-3 gap-6">
					<div className="space-y-4">
						<h4 className="font-semibold text-gray-800">Buttons</h4>
						<div className="space-y-2">
							<button className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium">
								Primary Button
							</button>
							<button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium">
								Secondary Button
							</button>
							<button className="w-full bg-orange-100 text-orange-700 py-3 rounded-lg font-medium">
								Tertiary Button
							</button>
						</div>
					</div>

					<div className="space-y-4">
						<h4 className="font-semibold text-gray-800">Cards</h4>
						<div className="bg-gray-50 rounded-xl p-4">
							<div className="h-24 bg-gray-200 rounded-lg mb-3"></div>
							<div className="h-4 bg-gray-200 rounded mb-2"></div>
							<div className="h-3 bg-gray-200 rounded w-3/4"></div>
						</div>
					</div>

					<div className="space-y-4">
						<h4 className="font-semibold text-gray-800">Inputs</h4>
						<div className="space-y-2">
							<input
								type="text"
								placeholder="Search destinations..."
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
							/>
							<input
								type="text"
								placeholder="Budget range..."
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const renderFeatures = () => (
		<div className="space-y-8">
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-gray-800 mb-4">Key Features</h2>
				<p className="text-gray-600">
					Solving core user problems with innovative solutions
				</p>
			</div>

			<div className="grid md:grid-cols-2 gap-8">
				<FeatureCard
					icon={Target}
					title="AI-Powered Matching"
					problem="Users are overwhelmed by endless travel options and struggle to find trips that match their preferences"
					solution="Intelligent survey system that learns user preferences and suggests compatible trips with 94% accuracy"
					metrics="92% of users found swipe mechanism intuitive, 88% felt AI matching was accurate"
				/>

				<FeatureCard
					icon={MapPin}
					title="Local Discovery"
					problem="Travelers want authentic local experiences but get generic tourist recommendations"
					solution="Curated recommendations from local residents, focusing on hidden gems and authentic experiences"
					metrics="85% preferred local recommendations over tourist guides, 78% booked local experiences"
				/>

				<FeatureCard
					icon={DollarSign}
					title="Budget Management"
					problem="82% of users stress about overspending during trips and lack proper budget tracking"
					solution="Real-time budget tracking with category breakdowns, spending alerts, and payment plan options"
					metrics="80% stayed within planned budget, 75% used payment plan feature"
				/>

				<FeatureCard
					icon={Users}
					title="Solo & Group Matching"
					problem="45% want solo travel options but feel unsafe, others struggle to find compatible travel companions"
					solution="Smart matching for both solo travelers and groups based on interests, budget, and travel style"
					metrics="60% of solo travelers felt more confident, 70% of group matches resulted in bookings"
				/>
			</div>
		</div>
	);

	const renderTesting = () => (
		<div className="space-y-8">
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-gray-800 mb-4">
					Usability Testing
				</h2>
				<p className="text-gray-600">
					Validating design decisions with real users
				</p>
			</div>

			<div className="grid md:grid-cols-2 gap-8">
				<div className="bg-white rounded-2xl p-6 shadow-lg">
					<h3 className="text-xl font-bold text-gray-800 mb-4">
						Testing Methods
					</h3>
					<div className="space-y-4">
						<div className="flex items-center">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
								<Users className="w-6 h-6 text-blue-600" />
							</div>
							<div>
								<div className="font-semibold text-gray-800">
									12 Moderated Sessions
								</div>
								<div className="text-sm text-gray-600">
									Remote usability testing
								</div>
							</div>
						</div>
						<div className="flex items-center">
							<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
								<Smartphone className="w-6 h-6 text-green-600" />
							</div>
							<div>
								<div className="font-semibold text-gray-800">
									25 Unmoderated Tests
								</div>
								<div className="text-sm text-gray-600">
									Prototype interaction testing
								</div>
							</div>
						</div>
						<div className="flex items-center">
							<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
								<BarChart3 className="w-6 h-6 text-purple-600" />
							</div>
							<div>
								<div className="font-semibold text-gray-800">A/B Testing</div>
								<div className="text-sm text-gray-600">
									Key interactions and flows
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-2xl p-6 shadow-lg">
					<h3 className="text-xl font-bold text-gray-800 mb-4">Key Findings</h3>
					<div className="space-y-4">
						<div className="bg-green-50 rounded-lg p-4">
							<div className="font-semibold text-green-800">
								Positive Feedback
							</div>
							<ul className="text-sm text-green-700 mt-2 space-y-1">
								<li>• 92% found swipe mechanism intuitive</li>
								<li>• 88% appreciated local recommendations</li>
								<li>• 90% liked visual design and colors</li>
								<li>• 85% felt AI matching was accurate</li>
							</ul>
						</div>
						<div className="bg-red-50 rounded-lg p-4">
							<div className="font-semibold text-red-800">
								Areas for Improvement
							</div>
							<ul className="text-sm text-red-700 mt-2 space-y-1">
								<li>• Survey felt too long (10 → 3 questions)</li>
								<li>• Budget tracking needed more categories</li>
								<li>• Onboarding unclear on value proposition</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8">
				<h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
					Iterations Made
				</h3>
				<div className="grid md:grid-cols-2 gap-8">
					<div className="space-y-4">
						<div className="bg-white rounded-lg p-4">
							<div className="flex items-center mb-2">
								<div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
									<div className="text-red-600 font-bold">1</div>
								</div>
								<div className="font-semibold text-gray-800">
									Simplified AI Survey
								</div>
							</div>
							<p className="text-sm text-gray-600">
								Reduced from 10 to 3 questions, improved flow and progress
								indicators
							</p>
						</div>
						<div className="bg-white rounded-lg p-4">
							<div className="flex items-center mb-2">
								<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
									<div className="text-blue-600 font-bold">2</div>
								</div>
								<div className="font-semibold text-gray-800">
									Enhanced Discovery
								</div>
							</div>
							<p className="text-sm text-gray-600">
								Added filtering, search, and improved recommendation algorithm
							</p>
						</div>
					</div>
					<div className="space-y-4">
						<div className="bg-white rounded-lg p-4">
							<div className="flex items-center mb-2">
								<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
									<div className="text-green-600 font-bold">3</div>
								</div>
								<div className="font-semibold text-gray-800">
									Improved Onboarding
								</div>
							</div>
							<p className="text-sm text-gray-600">
								Clearer value proposition and benefit communication
							</p>
						</div>
						<div className="bg-white rounded-lg p-4">
							<div className="flex items-center mb-2">
								<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
									<div className="text-purple-600 font-bold">4</div>
								</div>
								<div className="font-semibold text-gray-800">
									Refined Budget UI
								</div>
							</div>
							<p className="text-sm text-gray-600">
								Better visual hierarchy and granular expense controls
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const renderFinalDesigns = () => (
		<div className="space-y-8">
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-gray-800 mb-4">Final Designs</h2>
				<p className="text-gray-600">
					High-fidelity mockups of the Wanderlust app
				</p>
			</div>

			<div className="grid md:grid-cols-3 gap-8">
				{/* Mock iPhone frames with app screenshots */}
				<div className="bg-gray-900 rounded-3xl p-2 shadow-2xl">
					<div
						className="bg-white rounded-2xl overflow-hidden"
						style={{ aspectRatio: "9/19.5" }}
					>
						<div className="bg-white p-4">
							<div className="flex justify-between items-center mb-4">
								<div className="flex items-center space-x-2">
									<div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
										<Compass className="w-5 h-5 text-white" />
									</div>
									<h1 className="text-lg font-bold text-gray-800">
										Wanderlust
									</h1>
								</div>
								<Bell className="w-5 h-5 text-gray-600" />
							</div>
							<div className="text-center mb-6">
								<h2 className="text-xl font-bold text-gray-800 mb-2">
									AI Travel Survey
								</h2>
								<p className="text-gray-600 text-sm">
									Help us find your perfect adventure
								</p>
							</div>
							<div className="space-y-4">
								<div className="bg-gray-50 rounded-xl p-4">
									<p className="font-medium text-gray-800 mb-3">
										What's your ideal travel style?
									</p>
									<div className="space-y-2">
										<button className="w-full text-left p-3 bg-orange-50 border border-orange-200 rounded-lg">
											Solo exploration
										</button>
										<button className="w-full text-left p-3 border border-gray-200 rounded-lg">
											Small group adventure
										</button>
										<button className="w-full text-left p-3 border border-gray-200 rounded-lg">
											Cultural immersion
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-gray-900 rounded-3xl p-2 shadow-2xl">
					<div
						className="bg-white rounded-2xl overflow-hidden"
						style={{ aspectRatio: "9/19.5" }}
					>
						<div className="bg-white p-4">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-bold text-gray-800">Discover</h2>
								<button className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
									Take Survey
								</button>
							</div>
							<div className="relative mb-6">
								<div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
									<div className="bg-white rounded-xl p-4 shadow-lg w-full max-w-xs">
										<div className="h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg mb-3"></div>
										<div className="mb-2">
											<h3 className="font-bold text-gray-800">Kyoto, Japan</h3>
											<p className="text-sm text-gray-600">
												Cultural Immersion
											</p>
										</div>
										<div className="flex justify-between text-sm">
											<span className="text-orange-500 font-medium">
												$1,200
											</span>
											<span className="text-gray-500">5 days</span>
										</div>
									</div>
								</div>
							</div>
							<div className="flex justify-center space-x-8">
								<div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
									<X className="w-6 h-6 text-gray-400" />
								</div>
								<div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
									<Heart className="w-6 h-6 text-white" />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-gray-900 rounded-3xl p-2 shadow-2xl">
					<div
						className="bg-white rounded-2xl overflow-hidden"
						style={{ aspectRatio: "9/19.5" }}
					>
						<div className="bg-white p-4">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-bold text-gray-800">Local Gems</h2>
								<Filter className="w-5 h-5 text-gray-600" />
							</div>
							<div className="relative mb-4">
								<Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
								<input
									type="text"
									placeholder="Search hidden gems..."
									className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm"
								/>
							</div>
							<div className="space-y-3">
								<div className="bg-gray-50 rounded-lg p-3">
									<div className="flex justify-between items-start mb-2">
										<div>
											<h3 className="font-medium text-gray-800 text-sm">
												Nishiki Market
											</h3>
											<p className="text-xs text-gray-500">Local Food • $</p>
										</div>
										<div className="flex items-center">
											<Star className="w-3 h-3 text-yellow-400 fill-current" />
											<span className="text-xs ml-1">4.8</span>
										</div>
									</div>
									<p className="text-xs text-gray-600 mb-2">
										Hidden gem for authentic street food
									</p>
									<button className="w-full bg-orange-500 text-white py-2 rounded-lg text-xs">
										Book Now
									</button>
								</div>
								<div className="bg-gray-50 rounded-lg p-3">
									<div className="flex justify-between items-start mb-2">
										<div>
											<h3 className="font-medium text-gray-800 text-sm">
												Philosopher's Path
											</h3>
											<p className="text-xs text-gray-500">Nature • Free</p>
										</div>
										<div className="flex items-center">
											<Star className="w-3 h-3 text-yellow-400 fill-current" />
											<span className="text-xs ml-1">4.9</span>
										</div>
									</div>
									<p className="text-xs text-gray-600 mb-2">
										Peaceful trail away from crowds
									</p>
									<button className="w-full bg-orange-500 text-white py-2 rounded-lg text-xs">
										Book Now
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
				<h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
					Design Principles
				</h3>
				<div className="grid md:grid-cols-3 gap-6">
					<div className="text-center">
						<div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<Heart className="w-8 h-8 text-orange-600" />
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">Intuitive</h4>
						<p className="text-sm text-gray-600">
							Familiar patterns and clear navigation make the app easy to use
						</p>
					</div>
					<div className="text-center">
						<div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<Palette className="w-8 h-8 text-orange-600" />
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">Approachable</h4>
						<p className="text-sm text-gray-600">
							Warm colors and friendly tone create a welcoming experience
						</p>
					</div>
					<div className="text-center">
						<div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<Target className="w-8 h-8 text-orange-600" />
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">Purposeful</h4>
						<p className="text-sm text-gray-600">
							Every element serves a clear purpose in the user journey
						</p>
					</div>
				</div>
			</div>
		</div>
	);

	const renderResults = () => (
		<div className="space-y-8">
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-gray-800 mb-4">
					Results & Impact
				</h2>
				<p className="text-gray-600">
					Measuring success through user engagement and business metrics
				</p>
			</div>

			<div className="grid md:grid-cols-2 gap-8">
				<div className="bg-white rounded-2xl p-6 shadow-lg">
					<h3 className="text-xl font-bold text-gray-800 mb-4">User Metrics</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-gray-600">Daily Active Users</span>
							<span className="text-2xl font-bold text-green-600">70%</span>
						</div>
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div
								className="bg-green-500 h-2 rounded-full"
								style={{ width: "70%" }}
							></div>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-gray-600">Match Success Rate</span>
							<span className="text-2xl font-bold text-blue-600">65%</span>
						</div>
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div
								className="bg-blue-500 h-2 rounded-full"
								style={{ width: "65%" }}
							></div>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-gray-600">Survey Completion</span>
							<span className="text-2xl font-bold text-purple-600">85%</span>
						</div>
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div
								className="bg-purple-500 h-2 rounded-full"
								style={{ width: "85%" }}
							></div>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-2xl p-6 shadow-lg">
					<h3 className="text-xl font-bold text-gray-800 mb-4">
						Business Impact
					</h3>
					<div className="space-y-4">
						<div className="bg-green-50 rounded-lg p-4">
							<div className="text-2xl font-bold text-green-600">$50</div>
							<div className="text-sm text-gray-600">Average booking value</div>
						</div>
						<div className="bg-blue-50 rounded-lg p-4">
							<div className="text-2xl font-bold text-blue-600">2,000+</div>
							<div className="text-sm text-gray-600">Waitlist signups</div>
						</div>
						<div className="bg-purple-50 rounded-lg p-4">
							<div className="text-2xl font-bold text-purple-600">25+</div>
							<div className="text-sm text-gray-600">Partner businesses</div>
						</div>
						<div className="bg-orange-50 rounded-lg p-4">
							<div className="text-2xl font-bold text-orange-600">4.5★</div>
							<div className="text-sm text-gray-600">App store rating</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
				<h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
					Key Learnings
				</h3>
				<div className="grid md:grid-cols-2 gap-8">
					<div className="space-y-4">
						<div className="bg-white rounded-lg p-4">
							<h4 className="font-semibold text-gray-800 mb-2">
								Design Insights
							</h4>
							<ul className="text-sm text-gray-600 space-y-1">
								<li>• Familiar patterns accelerate adoption</li>
								<li>• Visual hierarchy improves comprehension</li>
								<li>• Micro-interactions enhance perceived quality</li>
								<li>• Early accessibility prevents redesigns</li>
							</ul>
						</div>
						<div className="bg-white rounded-lg p-4">
							<h4 className="font-semibold text-gray-800 mb-2">
								Process Improvements
							</h4>
							<ul className="text-sm text-gray-600 space-y-1">
								<li>• Early user testing saves development time</li>
								<li>• Regular design reviews prevent scope creep</li>
								<li>• Component-first design ensures consistency</li>
								<li>• Data-driven decisions guide prioritization</li>
							</ul>
						</div>
					</div>
					<div className="bg-white rounded-lg p-6">
						<h4 className="font-semibold text-gray-800 mb-4">Future Roadmap</h4>
						<div className="space-y-3">
							<div className="flex items-center">
								<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
									<CheckCircle className="w-4 h-4 text-green-600" />
								</div>
								<span className="text-sm text-gray-700">Core app launch</span>
							</div>
							<div className="flex items-center">
								<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
									<div className="w-2 h-2 bg-blue-600 rounded-full"></div>
								</div>
								<span className="text-sm text-gray-700">
									Group trip planning
								</span>
							</div>
							<div className="flex items-center">
								<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
									<div className="w-2 h-2 bg-purple-600 rounded-full"></div>
								</div>
								<span className="text-sm text-gray-700">
									AR location experiences
								</span>
							</div>
							<div className="flex items-center">
								<div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
									<div className="w-2 h-2 bg-orange-600 rounded-full"></div>
								</div>
								<span className="text-sm text-gray-700">
									International expansion
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-2xl p-8 shadow-lg">
				<div className="text-center">
					<h3 className="text-2xl font-bold text-gray-800 mb-4">
						Project Success
					</h3>
					<p className="text-gray-600 mb-6">
						Wanderlust successfully addresses millennial travel pain points
						through innovative AI matching and authentic local discovery
					</p>
					<div className="flex justify-center">
						<div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
							<CheckCircle className="w-10 h-10 text-white" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const renderCurrentSection = () => {
		switch (currentSection) {
			case 0:
				return renderOverview();
			case 1:
				return renderResearch();
			case 2:
				return renderPersonas();
			case 3:
				return renderCompetitive();
			case 4:
				return renderUserJourney();
			case 5:
				return renderWireframes();
			case 6:
				return renderDesignSystem();
			case 7:
				return renderFeatures();
			case 8:
				return renderTesting();
			case 9:
				return renderFinalDesigns();
			case 10:
				return renderResults();
			default:
				return renderOverview();
		}
	};

	return (
		<div className="min-h-screen bg-white">
			{/* Header with back button */}
			<header className="bg-white shadow-sm p-6 sticky top-0 z-10">
				<div className="max-w-6xl mx-auto flex items-center justify-between">
					<button
						onClick={() => navigate(-1)}
						className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
					>
						<ArrowLeft className="w-5 h-5" />
						<span>Back</span>
					</button>
					<h1 className="text-2xl font-bold text-gray-800">
						Wanderlust Case Study
					</h1>
					<div></div> {/* Spacer for center alignment */}
				</div>
			</header>

			{/* Navigation */}
			<div className="bg-white shadow-sm sticky top-0 z-40">
				<div className="max-w-6xl mx-auto px-4 py-4">
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
								<Compass className="w-6 h-6 text-white" />
							</div>
							<div>
								<h1 className="text-xl font-bold text-gray-800">
									Wanderlust Case Study
								</h1>
								<p className="text-sm text-gray-600">UX/UI Design Portfolio</p>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<button
								onClick={() =>
									setCurrentSection(Math.max(0, currentSection - 1))
								}
								disabled={currentSection === 0}
								className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<ChevronLeft className="w-5 h-5 text-gray-600" />
							</button>
							<span className="text-sm text-gray-600">
								{currentSection + 1} / {sections.length}
							</span>
							<button
								onClick={() =>
									setCurrentSection(
										Math.min(sections.length - 1, currentSection + 1)
									)
								}
								disabled={currentSection === sections.length - 1}
								className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<ChevronRight className="w-5 h-5 text-gray-600" />
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Section Navigation */}
			<div className="bg-white border-b border-gray-200">
				<div className="max-w-6xl mx-auto px-4">
					<div className="flex space-x-1 overflow-x-auto">
						{sections.map((section, index) => (
							<button
								key={index}
								onClick={() => setCurrentSection(index)}
								className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
									currentSection === index
										? "text-orange-600 border-b-2 border-orange-600"
										: "text-gray-600 hover:text-gray-800"
								}`}
							>
								{section}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-6xl mx-auto px-4 py-8">
				{renderCurrentSection()}
			</div>

			{/* Footer */}
			<div className="bg-white border-t border-gray-200 mt-16">
				<div className="max-w-6xl mx-auto px-4 py-8">
					<div className="text-center">
						<div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
							<Compass className="w-8 h-8 text-white" />
						</div>
						<h3 className="text-xl font-bold text-gray-800 mb-2">
							Wanderlust Case Study
						</h3>
						<p className="text-gray-600 mb-4">
							Thank you for reviewing my work!
						</p>
						{/* <div className="flex justify-center space-x-4">
							<button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
								View Live Prototype
							</button>
							<button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
								Download PDF
							</button>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default WanderlustCaseStudy;
