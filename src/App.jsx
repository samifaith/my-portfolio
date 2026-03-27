import React, { Suspense, lazy } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useParams,
} from "react-router-dom";
import "./App.css";

const AnimatedHomePage = lazy(() => import("./pages/AnimatedHomePage"));
const ExpertisePage = lazy(() => import("./pages/ExpertisePage"));
const WritingPage = lazy(() => import("./pages/WritingPage"));
const WanderlustCaseStudy = lazy(() => import("./development/Wander"));

const LegacyWritingStoryRedirect = () => {
	const { storyId } = useParams();
	return <Navigate to={`/expertise/${storyId}`} replace />;
};

const App = () => {
	return (
		<Router>
			<div className="App">
				<Suspense fallback={null}>
					<Routes>
						<Route path="/" element={<AnimatedHomePage />} />
						<Route path="/expertise" element={<ExpertisePage />} />
						<Route path="/expertise/:storyId" element={<WritingPage />} />
						<Route
							path="/writing"
							element={<Navigate to="/expertise" replace />}
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
