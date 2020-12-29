import React from "react";
import style from "./recipe.module.css";

//Used to render the data retrieved from the API that was stored in data.hits then passed as props to this child Recipe.js
//The first div is for styling and holding all elements, a title for the recipe, followed by the ingredients retrieved from props,
//followed by a calorie count and an image of the food are all rendered using passed props
const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    <div className={style.recipe}>
      <h1>{title}</h1>
      <ol>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <p>{calories}</p>
      <img className={style.image} src={image} alt="" />
    </div>
  );
};

export default Recipe;
