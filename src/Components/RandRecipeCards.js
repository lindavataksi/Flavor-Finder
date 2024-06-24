import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

const url = "https://www.themealdb.com/api/json/v1/1/random.php";

const RandRecipeCards = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFood = async () => {
    setLoading(true);
    setError(null); // Reset the error
    try {
      const responses = await Promise.all(
        Array.from({ length: 8 }).map(() => fetch(url))
      );
      const data = await Promise.all(
        responses.map((response) => response.json())
      );
      const meals = data.map((item) => item.meals[0]);

      setFoods(meals);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div>
      <div>
        <p className="text-font">
          Simple and tasty recipes
          <span>
            <button onClick={() => fetchFood()} className="refresh-btn">
              <img
                src="https://icons.veryicon.com/png/o/miscellaneous/ios-apple-icon/ios-refresh-9.png"
                alt="refresh"
              />
            </button>
          </span>
        </p>
      </div>
      <p className="website-blurb">
            Explore a world of flavors with just a click – uncover new recipes
            that will tantalize your taste buds and elevate your cooking game.
          </p>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        <section className="cards-lists">
          {foods.map((meal) => {
            if (!meal) return null;

            // Extract ingredients for the current meal
            const ingredients = Array.from(
              { length: 20 },
              (_, index) => meal[`strIngredient${index + 1}`]
            ).filter(Boolean);
            return (
              <RecipeCard
                key={meal.idMeal}
                image={meal.strMealThumb}
                title={meal.strMeal}
                calories={getRandomNumber(500, 1500)}
                ingredients={ingredients}
                cuisineType={[meal.strArea]}
                dietLabels={[meal.strCategory]}
                url={meal.strSource}
                recipe={meal}
              />
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default RandRecipeCards;
