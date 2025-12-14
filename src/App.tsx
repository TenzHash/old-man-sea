import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Analysis from "./Analysis";
import StoryMode from "./StoryMode";

export default function App() {
  return (
    // BrowserRouter removed from here
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="/story" element={<StoryMode />} />
    </Routes>
  );
}
