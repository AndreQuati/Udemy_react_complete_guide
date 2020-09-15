import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {

  const [userIngredients, setUserIngredients] = useState([]); 

  // useEffect is called every time the componets renders, AFTER it renders - Similar to ComponentDidUpdate
  // adding an [] as second param, makes useEffect run only once - Similar to ComponentDidMount. Dependencies can be set in that param to define if
  // useEffect will run again or not
  useEffect(() => {
    fetch('https://udemy-react-hooks-update-829dd.firebaseio.com/ingredients.json')
      .then(response => response.json())
      .then(responseData => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          });
        } 
        setUserIngredients(loadedIngredients);
      });
  }, []);

  const addIngredientHandler = ingredient => {
    // fetch() is a js native function for HTTP Requests. By defatul, fecth sends a get method.
    fetch('https://udemy-react-hooks-update-829dd.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient), // JSON.Stringfy is also JS native
      header: {'Content-type': 'application/json'}
    })
    .then(response => {
      // returning the body of the response. Returns a promise, so neds another '.then'
      return response.json();
    })
    .then(responseData => {
      // Firebase automatically generates id. That was returned in the response body on a prop
      // called 'name'
      setUserIngredients(prevIngredients => [
        ...prevIngredients, 
        {id: responseData.name, ...ingredient}]); 
    })
    
  };

  const removeIngredientHandler = function(id) {
    // Apparently filtering the original state directly wouldn't be a problem, since .filter
    //doesn't change the original array, but returns a new one modified instead 
    setUserIngredients(prevIngredients => prevIngredients.filter(ig => ig.id !== id));
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
