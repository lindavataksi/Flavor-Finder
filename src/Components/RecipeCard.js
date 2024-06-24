import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard(props) {
  return (
    <div className="card">
      <div className="card--stats">
        {props.recipe && props.title && (
          <React.Fragment>
            <img className="card--image" src={props.image} alt="recipe" />
            <p className="card--label">{props.title}</p>
            <div className="row">
              <img
                className="card--icon"
                src="https://static.thenounproject.com/png/1166850-200.png"
                alt="calorie icon"
              />
              <span>
                {new Intl.NumberFormat().format(props.calories.toFixed(0))} cal
              </span>
              <img
                className="card--icon"
                src="https://static.thenounproject.com/png/1213708-200.png"
                alt="ingredients icon"
              />
              <span>{props.ingredients.length} ingredients</span>
            </div>
            <div className="row">
              <img
                className="card--icon"
                src="https://cdn-icons-png.flaticon.com/512/44/44386.png"
                alt="world icon"
              />
              <span>
                {props.cuisineType.map((cuisineType, index) => (
                  <span key={index}>
                    {index > 0 && ", "}
                    {cuisineType}
                  </span>
                ))}
              </span>
            </div>

            <div className="diet--labels">
              {props.dietLabels.map((dietLabel, index) => (
                <div key={index} className="diet--label">
                  <p>{dietLabel}</p>
                </div>
              ))}
            </div>
            <button className="card-btn">
              <Link to={props.url} className="card-btn-link">
                Go to Recipe
              </Link>
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
