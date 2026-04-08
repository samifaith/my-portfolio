import React, { Suspense, lazy } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useParams,
} from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";

const AnimatedHomePage = lazy(() => import("./pages/AnimatedHomePage"));
const ExpertisePage = lazy(() => import("./pages/ExpertisePage"));
const ExpertisePrototypePage = lazy(
	() => import("./pages/ExpertisePrototypePage"),
);
const WritingPage = lazy(() => import("./pages/WritingPage"));
const WanderlustCaseStudy = lazy(() => import("./development/Wander"));

const LegacyWritingStoryRedirect = () => {
	const { storyId } = useParams();
	return <Navigate to={`/expertise-archived/${storyId}`} replace />;
};

const App = () => {
	return (
		<Router>
			<div className="App">
				<Menu />
				<Suspense fallback={null}>
					<Routes>
						<Route path="/" element={<AnimatedHomePage />} />
						<Route path="/expertise" element={<ExpertisePrototypePage />} />
						<Route path="/expertise-archived" element={<ExpertisePage />} />
						<Route
							path="/expertise-prototype"
							element={<Navigate to="/expertise" replace />}
						/>
						<Route
							path="/expertise-archived/:storyId"
							element={<WritingPage />}
						/>
						<Route
							path="/writing"
							element={<Navigate to="/expertise-archived" replace />}
						/>
						<Route
							path="/writing/:storyId"
							element={<LegacyWritingStoryRedirect />}
						/>
						<Route
							path="/wanderlust-case-study"
							element={<WanderlustCaseStudy />}
						/>
					</Routes>
				</Suspense>
			</div>
		</Router>
	);
};

export default App;
