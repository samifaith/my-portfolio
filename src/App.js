import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AnimatedHomePage from "./pages/AnimatedHomePage";
import ExpertisePage from "./pages/ExpertisePage";
import WritingPage from "./pages/WritingPage";
import WanderlustCaseStudy from "./constants/Wander";

const App = () => {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<AnimatedHomePage />} />
					<Route path="/expertise" element={<ExpertisePage />} />
					<Route path="/writing" element={<WritingPage />} />
					<Route path="/writing/:storyId" element={<WritingPage />} />
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
