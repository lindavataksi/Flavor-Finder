import React, { useState, useEffect } from "react";

const url = "https://www.themealdb.com/api/json/v1/1/random.php";

const Randomizer = () => {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFood = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setFood(data.meals);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  return (
    <>
      <div className="randomizer-top">
        <div>
          <p style={{ fontStyle: "italic", textAlign: "center" }}>
            Our Random Recipe Generator is the perfect solution for culinary
            inspiration blocks! Click the "Generate Meal" button to discover
            diverse and delicious recipes, eliminating the guesswork in meal
            planning.
          </p>
        </div>
        <div>
          <button onClick={() => fetchFood()} className="btn">
            Generate Meal
          </button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <section>
        {food.map((f) => (
          <MealCard key={f.idMeal} meal={f} />
        ))}
      </section>
    </>
  );
};

const MealCard = ({ meal }) => {
  const {
    idMeal,
    strMeal,
    strMealThumb,
    strCategory,
    strArea,
    strInstructions,
    strSource,
  } = meal;

  const ingredientCount = Array.from(
    { length: 20 },
    (_, index) => index + 1
  ).filter((index) => meal[`strIngredient${index}`]).length;

  return (
    <section className="column" key={idMeal}>
      <section className="randomizer-body">
        <div className="randomizer-card">
          <h2>{strMeal}</h2>
          <img
            className="randomizer-card-image"
            src={strMealThumb}
            alt={strMeal}
          />
          <div className="row">
            <img
              className="card--icon"
              src="https://cdn-icons-png.flaticon.com/512/2174/2174629.png"
              alt="food category icon"
            />
            <span className="bold">Category: </span>
            <span style={{ marginLeft: "8px" }}>{strCategory}</span>
            <h3 style={{ marginLeft: "8px", marginRight: "8px" }}> • </h3>
            <img
              className="card--icon"
              src="https://static.thenounproject.com/png/1213708-200.png"
              alt="ingredients icon"
            />
            <span>{ingredientCount} ingredients</span>
          </div>
          <div className="row">
            <img
              className="card--icon"
              src="https://cdn-icons-png.flaticon.com/512/44/44386.png"
              alt="world icon"
            />
            <span>{strArea}</span>
          </div>
          <button className="card-btn-rand">
            <a className="card-btn-link" href={strSource} target="_blank" rel="noopener noreferrer">
              Visit Source
            </a>
          </button>
        </div>
      </section>
      <section className="center">
        <div className="randomizer-row">
          <div className="randomizer-card-ingredients">
            <h1>Ingredients:</h1>
            <ul>
              {Array.from({ length: 20 }, (_, index) => index + 1).map(
                (index) =>
                  meal &&
                  meal[`strMeasure${index}`] &&
                  meal &&
                  meal[`strIngredient${index}`] && (
                    <li key={index}>
                      {meal[`strMeasure${index}`]}{" "}
                      {meal[`strIngredient${index}`]}
                    </li>
                  )
              )}
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="randomizer-card-instructions">
            <h3>Cooking Instructions</h3>
            <div></div>
            <p>{strInstructions}</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Randomizer;
