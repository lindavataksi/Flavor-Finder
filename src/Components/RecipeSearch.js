import React from "react";
import Axios from "axios";
import { YOUR_APP_ID, YOUR_APP_KEY } from "./APIKeys.js";
import RecipeCard from "./RecipeCard.js";

function Form() {
  const [query, setQuery] = React.useState("");
  const [recipes, setRecipes] = React.useState([]);

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;

  const getRecipeInfo = async () => {
    try {
      const result = await Axios.get(url);
      console.log("SEARCH", result.data);
      setRecipes(result.data.hits);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipeInfo();
  };

  React.useEffect(() => {
    // Check if recipes is not an empty array
    if (Array.isArray(recipes) && recipes.length > 0) {
      console.log("Recipes have been updated:", recipes);
    }
  }, [recipes]);

  React.useEffect(() => {
    // Set the default cuisine to 'world' and fetch recipes
    setQuery("apple");
  }, []);

  return (
    <div className="app">
      <h1 onClick={getRecipeInfo}>Recipe Search🍔</h1>
      <form onSubmit={onSubmit}>
        <input
          className="app__input"
          type="text"
          placeholder="enter ing"
          autoComplete="Off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
      <div className="recipe-search-cards">
        <section className="cards-list-search">
          {recipes &&
            recipes.map((recipe) => {
              return (
                <RecipeCard
                  key={recipe.recipe.label}
                  image={recipe.recipe.image}
                  title={recipe.recipe.label}
                  calories={recipe.recipe.calories}
                  ingredients={recipe.recipe.ingredients}
                  cuisineType={recipe.recipe.cuisineType}
                  dietLabels={recipe.recipe.dietLabels}
                  recipe={recipe}
                  url={recipe.recipe.url}
                />
              );
            })}
        </section>
      </div>
    </div>
  );
}

export default Form;
