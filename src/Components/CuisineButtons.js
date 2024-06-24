import React from "react";

const CuisineButtons = ({ setCuisineType }) => {
  return (
    <div>
      <p className="text-font">Try food across the globe!</p>
      <p className="website-blurb">
        Click the button to discover recipes from around the world, each
        offering a taste of diverse regional cuisines.
      </p>
      <div className="cuisineType--buttons">
        <button
          onClick={() => {
            setCuisineType("american");
          }}
        >
          <img
            src="https://em-content.zobj.net/source/apple/118/flag-for-united-states_1f1fa-1f1f8.png"
            alt="American"
          />
        </button>
        <button
          onClick={() => {
            setCuisineType("chinese");
          }}
        >
          <img
            src="https://em-content.zobj.net/source/apple/114/flag-for-china_1f1e8-1f1f3.png"
            alt="Chinese"
          />
        </button>
        <button
          onClick={() => {
            setCuisineType("french");
          }}
        >
          <img
            src="https://em-content.zobj.net/source/apple/114/flag-for-france_1f1eb-1f1f7.png"
            alt="French"
          />
        </button>
        <button
          onClick={() => {
            setCuisineType("greek");
          }}
        >
          <img
            src="https://em-content.zobj.net/source/apple/76/flag-for-greece_1f1ec-1f1f7.png"
            alt="Greek"
          />
        </button>
        <button
          onClick={() => {
            setCuisineType("indian");
          }}
        >
          <img
            src="https://em-content.zobj.net/source/apple/118/flag-for-india_1f1ee-1f1f3.png"
            alt="Indian"
          />
        </button>
        <button
          onClick={() => {
            setCuisineType("italian");
          }}
        >
          <img
            src="https://em-content.zobj.net/source/apple/48/flag-for-italy_1f1ee-1f1f9.png"
            alt="Italian"
          />
        </button>
        <button
          onClick={() => {
            setCuisineType("japanese");
          }}
        >
          <img
            src="https://em-content.zobj.net/source/apple/129/flag-for-japan_1f1ef-1f1f5.png"
            alt="Japanese"
          />
        </button>
        <button
          onClick={() => {
            setCuisineType("korean");
          }}
        >
          <img
            src="https://flagpedia.net/data/flags/emoji/facebook/256x256/kr.png"
            alt="Korean"
          />
        </button>
        <button
          onClick={() => {
            setCuisineType("mexican");
          }}
        >
          <img
            src="https://em-content.zobj.net/source/apple/114/flag-for-mexico_1f1f2-1f1fd.png"
            alt="Mexican"
          />
        </button>
        <button
          onClick={() => {
            setCuisineType("world");
          }}
        >
          <img
            src="https://em-content.zobj.net/source/apple/81/earth-globe-americas_1f30e.png"
            alt="Other"
          />
        </button>
      </div>
    </div>
  );
};

export default CuisineButtons;
