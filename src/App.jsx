import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useParams,
} from "react-router-dom";
import "./App.css";
import AnimatedHomePage from "./pages/AnimatedHomePage";
import ExpertisePage from "./pages/ExpertisePage";
import WritingPage from "./pages/WritingPage";
import WanderlustCaseStudy from "./development/Wander";

const LegacyWritingStoryRedirect = () => {
	const { storyId } = useParams();
	return <Navigate to={`/expertise/${storyId}`} replace />;
};

const App = () => {
	return (
		<Router>
			<div className="App">
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
			</div>
		</Router>
	);
};

export default App;
