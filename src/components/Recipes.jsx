/* eslint-disable react/prop-types */
import React from "react";

const Recipes = ({ data }) => {
  return (
    <div>
      {console.log(data)}
      {data.map((item) => (
        <div key={item.recipe_id}>
          <h3>{item.name}</h3>
          <img src={item.photo} alt={item.name} />
        </div>
      ))}
    </div>
  );
};

export default Recipes;
