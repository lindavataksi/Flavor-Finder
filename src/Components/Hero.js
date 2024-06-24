import React, { useState, useEffect } from "react";

const url = "https://www.themealdb.com/api/json/v1/1/random.php";

const Hero = () => {
  const [foods, setFoods] = useState([]);

  const fetchFood = async () => {
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
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  return (
    <div className="hero">
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          {foods.map((meal, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <a href={meal.strSource}>
                <h3 className="hero--text">{meal.strMeal}</h3>
                <img
                  className="hero--photo"
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                />
              </a>
            </div>
          ))}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleFade"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleFade"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Hero;
