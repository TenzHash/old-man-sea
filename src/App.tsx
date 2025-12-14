import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Analysis from "./Analysis";
import StoryMode from "./StoryMode"; // Import the new component

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/story" element={<StoryMode />} />
      </Routes>
    </BrowserRouter>
  );
}
