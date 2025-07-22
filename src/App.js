import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AnimatedHomePage from "./pages/AnimatedHomePage";
import DesignPage from "./pages/DesignPage";
import DevelopmentPage from "./pages/DevelopmentPage";
import WritingPage from "./pages/WritingPage";
import MediaPage from "./pages/MediaPage";
import WanderlustCaseStudy from "./constants/Wander";

const App = () => {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<AnimatedHomePage />} />
					<Route path="/design" element={<DesignPage />} />
					<Route path="/development" element={<DevelopmentPage />} />
					<Route path="/writing" element={<WritingPage />} />
					<Route path="/writing/:storyId" element={<WritingPage />} />
					<Route path="/media" element={<MediaPage />} />
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
