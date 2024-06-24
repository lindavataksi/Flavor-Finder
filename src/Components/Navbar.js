import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <section className="navigation">
    <nav className="navbar navbar-expand-lg navbar-light bg- #e3f2fd;">
    <img className="nav--logo" src="https://cdn-icons-png.flaticon.com/256/1995/1995602.png" alt="Logo" />
      <Link className="navbar-brand" to="/">
        FlavorFinder.
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse ${showMenu ? "show" : ""}`}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/Randomizer">Randomizer</CustomLink>
          <CustomLink to="/RecipeSearch">Recipe Search</CustomLink>
          <CustomLink to="/About">About</CustomLink>
        </ul>
      </div>
    </nav>
    </section>
  );
}

function CustomLink({ to, children }) {
  return (
    <li className="nav-item">
      <Link className="nav-link" to={to}>
        {children}
      </Link>
    </li>
  );
}

