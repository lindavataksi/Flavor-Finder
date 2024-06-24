import React from "react";
import chef from "./chef.png";

export default function Inspirational() {
  return (
    <section className="inspirational--block">
      <div className="inspirational--blurb">
        <h1>
          {" "}
          Everyone can be a chef <br />
          in their own kitchen.{" "}
        </h1>
        <p>
          Unleash your inner chef with our collection of quick and delightful
          recipes, tailored for every home cook. From simple weeknight dinners
          to indulgent desserts, discover the joy of creating delicious meals
          right in your own kitchen.
        </p>
      </div>
      <div>
        <img className="inspirational--chef" alt="chef" src={chef} />
      </div>
    </section>
  );
}
