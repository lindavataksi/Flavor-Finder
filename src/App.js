import './App.css';
// import React, { useState, useEffect } from 'react';
import Home from "./Components/Home"
import Navbar from "./Components/Navbar"
import RecipeSearch from "./Components/RecipeSearch"
// import Favorites from "./Components/Favorites"
import About from "./Components/About"
import { Route, Routes} from "react-router-dom"
import Randomizer from "./Components/Randomizer"

export default function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Randomizer" element={<Randomizer />} />
          <Route path="/RecipeSearch" element={<RecipeSearch />} />
          {/* <Route path="/Favorites" element={<Favorites />} /> */}
          <Route path="/About" element={<About />} />
        </Routes>
      </div>
    </div>
  )
}