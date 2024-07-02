import "./App.css";
import React from 'react';
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import RecipeSearch from "./Components/RecipeSearch";
import { Route, Routes } from "react-router-dom";
import Randomizer from "./Components/Randomizer";

export default function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Flavor-Finder" element={<Home />} />
          <Route path="/Randomizer" element={<Randomizer />} />
          <Route path="/RecipeSearch" element={<RecipeSearch />} />
        </Routes>
      </div>
    </div>
  );
}


