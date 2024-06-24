import React, { useState, useEffect, useCallback } from "react";
import RecipeCard from "./RecipeCard";
import Hero from "./Hero";
import CuisineButtons from "./CuisineButtons";
import Inspirational from "./Inspirational";
import RandRecipeCards from "./RandRecipeCards";
import { generateApiLink, getRecipes } from "./functions";

function Home() {
  // eslint-disable-next-line
  const [query, setQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("world");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const cuisineUrl = generateApiLink(
      "https://api.edamam.com/search",
      selectedCuisine
        ? { q: query, cuisineType: selectedCuisine }
        : { q: query }
    );

    console.log(`Fetching data from URL: ${cuisineUrl}`);
    try {
      await getRecipes(cuisineUrl, (data) => {
        console.log("Fetched recipes:", data);
        setFilteredRecipes(data);
      });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  }, [query, selectedCuisine]);

  useEffect(() => {
    fetchData();
  }, [fetchData, selectedCuisine]);

  const handleSetCuisineType = (cuisine) => {
    console.log(`Cuisine selected: ${cuisine}`);
    setSelectedCuisine(cuisine);
  };

  return (
    <div className="home">
      <div className="App">
        <Hero />
        <RandRecipeCards />
        <CuisineButtons setCuisineType={handleSetCuisineType} />
        <section className="cards-list">
          {loading && <p>Loading recipes...</p>}
          {filteredRecipes
            .filter((recipe) => {
              const cuisineTypes = recipe.recipe.cuisineType;
              return (
                Array.isArray(cuisineTypes) &&
                (selectedCuisine === null ||
                  selectedCuisine === "world" ||
                  cuisineTypes.includes(selectedCuisine))
              );
            })
            .map((filteredRecipe) => (
              <RecipeCard
                key={filteredRecipe.recipe.label}
                image={filteredRecipe.recipe.image}
                title={filteredRecipe.recipe.label}
                calories={filteredRecipe.recipe.calories}
                ingredients={filteredRecipe.recipe.ingredients}
                cuisineType={filteredRecipe.recipe.cuisineType}
                dietLabels={filteredRecipe.recipe.dietLabels}
                recipe={filteredRecipe}
                url={filteredRecipe.recipe.url}
              />
            ))}
        </section>
        <Inspirational />
      </div>
    </div>
  );
}

export default Home;
