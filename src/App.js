import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  //The information required to perform an API get request
  const APP_ID = "5c361605";
  const APP_KEY = "d8e58375c101af2b54d749a139a00780";

  //Creates a state for an array of recipes, a state for searching for recipes, and a state for getting a query
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  //A function that uses the getRecipes function upon a query action
  useEffect(() => {
    getRecipes();
  }, [query]);

  //using async/await, the function will only execute beyond the await lines after the data is fetched. Response is determined
  //by the data retrieved based on the query number, app id, and app key
  //After this, data will set based on the response of the fetch, then set the recipes state array to the hits of received data
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  //
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  //Sets the query state to the value within the input of the form, then resets the value of the search state
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  //Encloses all JSX elements within an overarching div
  //Creates a form that on submit, will use getSearch to set the query to the input search bar. Upon query udating,
  //Use effect will run getRecipes that will return data.hits
  //Creates a button to submit at the bottom of the form.
  //A child div of the first div named "recipes" then passes 5 props to the Recipe element from data.hits
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
