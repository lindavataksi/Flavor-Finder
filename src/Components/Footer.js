import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left col-md-4 col-sm-6">
        <p className="about">
          <span> About the company</span> Discover culinary magic on our
          website! Explore a world of flavors with a landing page showcasing a
          random set of recipes or filter by cuisine. Embrace spontaneity with
          the randomizer tab, find recipes based on your ingredients in the
          search tab, and curate your favorites for easy access. Elevate your
          cooking experience - start your flavorful journey today!
        </p>
      </div>
      <div className="footer-center col-md-4 col-sm-6">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span> Contact Us</span>
          </p>
        </div>
        <div className="not-bold">
          <i></i>
          <p> Linda Vataksi</p>
        </div>
        <div className="not-bold">
          <i></i>
          <p> (917) 454 - 4339</p>
        </div>
        <div className="not-bold">
          <i></i>
          <p> lindavataksi3@gmail.com</p>
        </div>
      </div>
      <div className="footer-right col-md-4 col-sm-6">
        <div className="footer-logo">
          <img
            className="footer-img"
            src="https://cdn-icons-png.flaticon.com/256/1995/1995602.png"
            alt="Logo"
          />
          <span>FlavorFinder.</span>
        </div>
        <div class="menu-links">
          <CustomLink to="/">Home</CustomLink>|
          <CustomLink to="/Randomizer">Randomizer</CustomLink>|
          <CustomLink to="/RecipeSearch">RecipeSearch</CustomLink>|
          <CustomLink to="/About">About</CustomLink>
          {/* <CustomLink to="/About">About</CustomLink> */}
        </div>
      </div>
    </footer>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <div className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </div>
  );
}
