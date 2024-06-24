import React from "react"
import {Link, useMatch, useResolvedPath} from "react-router-dom"

export default function Navbar() {
    return (
        <nav>
            <img className="nav--logo" src="https://cdn-icons-png.flaticon.com/256/1995/1995602.png" alt="Logo" />
            <h1 className="nav--title">FlavorFinder.</h1>
            <div className="nav--options"> 
                <button><CustomLink to="/">Home</CustomLink></button>
                <button><CustomLink to="/Randomizer">Randomizer</CustomLink></button>
                <button><CustomLink to="/RecipeSearch">Recipe Search</CustomLink></button>
                {/* <button><CustomLink to="/Favorites">My Favorites</CustomLink></button> */}
                <button><CustomLink to="/About">About</CustomLink></button>
            </div>
        </nav>
    )
}

function CustomLink({to, children,   ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end:true})
    return(
        <div className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
            {children}
            </Link>
        </div>
    )
}
