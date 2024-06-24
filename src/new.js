import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { YOUR_APP_ID, YOUR_APP_KEY } from "./Components/APIKeys";
import RecipeCard from './Components/RecipeSearch';
import Hero from './Components/Hero';
import CuisineButtons from './Components/CuisineButtons';
import Inspirational from './Components/Inspirational';

function App() {
  // const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  // Load favorites from local storage on component mount
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    // Save favorites to local storage whenever it changes
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Function to generate API link based on parameters
  const generateApiLink = (base, queryParams) => {
    const timestamp = new Date().getTime();
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    return `${base}?${queryString}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&timestamp=${timestamp}`;
  };

  const getRecipes = React.useCallback(async (url, setState) => {
    try {
      const response = await Axios.get(url);
      const recipesWithFavorites = response.data.hits.map((recipe) => ({
        ...recipe,
        isFavorite: favorites.some((fav) => fav.id === recipe.recipe.uri),
      }));
      setState(recipesWithFavorites);
      setRecipes(recipesWithFavorites);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }, [favorites]);

  useEffect(() => {
    const fetchData = async () => {
      const randomUrl = generateApiLink('https://api.edamam.com/search', { q: 'baste', from: 0, to: 10 });
  
      const cuisineUrl = generateApiLink(
        'https://api.edamam.com/search',
        selectedCuisine ? { q: selectedCuisine } : {}
      );
  
      try {
        await getRecipes(randomUrl, setRandomRecipes);
        // Introduce a delay before making the next request
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Adjust the delay as needed
        await getRecipes(cuisineUrl, setFilteredRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
  
    fetchData();
  }, [selectedCuisine, getRecipes]);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const randomUrl = generateApiLink('https://api.edamam.com/search', { q: 'baste', from: 0, to: 10 });

  //     const cuisineUrl = generateApiLink(
  //       'https://api.edamam.com/search',
  //       selectedCuisine ? { q: query, cuisineType: selectedCuisine } : { q: query }
  //     );

  //     try {
  //       await getRecipes(randomUrl, setRandomRecipes);
  //       // Introduce a delay before making the next request
  //       await new Promise((resolve) => setTimeout(resolve, 5000)); // Adjust the delay as needed
  //       await getRecipes(cuisineUrl, setFilteredRecipes);
  //     } catch (error) {
  //       console.error('Error fetching recipes:', error);
  //     }
  //   };

  //   fetchData();
  // }, [query, selectedCuisine, getRecipes]);

  const setCuisineType = (cuisines) => {
    setSelectedCuisine(cuisines);
  };

  useEffect(() => {
    // Set the default cuisine to 'world' and fetch recipes
    setSelectedCuisine('world');
  }, []);

  const toggleFavorite = (clickedRecipe) => {
    const recipeId = clickedRecipe.recipe.uri;
  
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === recipeId);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== recipeId);
      } else {
        return [...prevFavorites, { id: recipeId }];
      }
    });
  
    setRandomRecipes((prevRandomRecipes) =>
      toggleFavoriteStatus(prevRandomRecipes, recipeId)
    );
  
    setFilteredRecipes((prevFilteredRecipes) =>
      toggleFavoriteStatus(prevFilteredRecipes, recipeId)
    );
  };
  
  // Reusable function to toggle favorite status
  const toggleFavoriteStatus = (recipes, recipeId) => {
    return recipes.map((recipe) => {
      if (recipe.recipe.uri === recipeId) {
        return {
          ...recipe,
          isFavorite: !recipe.isFavorite,
        };
      }
      return recipe;
    });
  };
  
  return (
    <div >
      <div className="App">
        <Hero />
        <section className="cards-list">
        {console.log("set:", setCuisineType)} 
          {Array.isArray(randomRecipes) && randomRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.recipe.label}
              image={recipe.recipe.image}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              ingredients={recipe.recipe.ingredients}
              cuisineType={recipe.recipe.cuisineType}
              dietLabels={recipe.recipe.dietLabels}
              recipe={recipe}
              isFilled={recipe.isFavorite}
              handleClick={() => toggleFavorite(recipe)}
            />
          ))}
        {console.log("randomRecipes:", randomRecipes)} {/* Add this line */}
        </section>

      <CuisineButtons setCuisineType={setCuisineType} />

      <section className="cards-list">
        {filteredRecipes
          .filter(recipe => {
          const cuisineTypes = recipe.recipe.cuisineType;
            return (
            Array.isArray(cuisineTypes) &&
              (selectedCuisine === null || cuisineTypes.includes(selectedCuisine))
            );
          })
          .map(filteredRecipe => (
            <RecipeCard
              key={filteredRecipe.recipe.label}
              image={filteredRecipe.recipe.image}
              title={filteredRecipe.recipe.label}
              calories={filteredRecipe.recipe.calories}
              ingredients={filteredRecipe.recipe.ingredients}
              cuisineType={filteredRecipe.recipe.cuisineType}
              dietLabels={filteredRecipe.recipe.dietLabels}
              recipe={filteredRecipe}
              isFilled={filteredRecipe.isFavorite}
              handleClick={() => toggleFavorite(filteredRecipe)}
            />
          ))}
          {console.log("filtered ecipes:", filteredRecipes)} {/* Add this line */}
        </section>
        
        <Inspirational />

        <section className="cards-list">
  {Array.isArray(randomRecipes.concat(filteredRecipes)) &&
    randomRecipes
      .concat(filteredRecipes)
      .filter((recipe) => recipe.isFavorite) // Only show favorite recipes
      .map((recipe) => (
        <RecipeCard
          key={recipe.recipe.label}
          image={recipe.recipe.image}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          ingredients={recipe.recipe.ingredients}
          cuisineType={recipe.recipe.cuisineType}
          dietLabels={recipe.recipe.dietLabels}
          recipe={recipe}
          isFilled={recipe.isFavorite}
          handleClick={() => toggleFavorite(recipe)}
        />
      ))}
</section>


        {/* <Form
          value={query.value} 
          set= {(e) => setQuery(e.target.value)}
          onSubmit = {onSubmitButton}
        /> */}
      <section className="cards-list">
        {recipes.map(recipe => {
            return <RecipeCard 
              key={recipe.recipe.label}
              image={recipe.recipe.image}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              ingredients={recipe.recipe.ingredients}
              cuisineType={recipe.recipe.cuisineType}
              recipe={recipe}
            /> 
          })}
      </section>
      </div>
    </div>
  );
}

export default App;