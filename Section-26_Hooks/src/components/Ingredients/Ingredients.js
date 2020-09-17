import React, { useState, useReducer, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

// Reducers are highly recommended when the state can be used differently in many situations, since
// the behavior for each can be defined here. Also, when a state depend on others.
const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Error in ingredientReducer');
  }
}

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { ...currentHttpState, loading: true };
    case 'RESPONSE':
      return { ...currentHttpState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return { ...currentHttpState, error: null };
    default:
      throw new Error('Error in the httpReducer');
  }
}

function Ingredients() {
  // The first arg is the reducer, the second is the inital state. In this case, empty.
  const [userIngredients, dispatchIngredients] = useReducer(ingredientReducer, []);
  // const [userIngredients, setUserIngredients] = useState([]); 
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  // useEffect is called every time the componets renders, AFTER it renders - Similar to ComponentDidUpdate
  // adding an [] as second param, makes useEffect run only once - Similar to ComponentDidMount. Dependencies can be set in that param to define if
  // useEffect will run again or not
  // -- Ingredients are being fetched on the search component
  // useEffect(() => {
  //   fetch('https://udemy-react-hooks-update-829dd.firebaseio.com/ingredients.json')
  //     .then(response => response.json())
  //     .then(responseData => {
  //       const loadedIngredients = [];
  //       for (const key in responseData) {
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount
  //         });
  //       } 
  //       setUserIngredients(loadedIngredients);
  //     });
  // }, []);

  // Since this function is in the scope of this component, it is destructed/recreated at every component
  // render lifecycle. Since this funciton is used as props to condition the search component rendering, this cannot
  // change constantly or it'll cause the search to get into an infinit loop. 
  // useCallback makes that this function is cached and NOT recreated with the component, but instead, when the component
  // is re-created, the same old function is utilized, unless the condition in the second parameter is met for condition re-creation 
  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    // setUserIngredients(filteredIngredients);
    dispatchIngredients({type: 'SET', ingredients: filteredIngredients});
  }, []);

  const addIngredientHandler = ingredient => {
    dispatchHttp({type: 'SEND'});
    // fetch() is a js native function for HTTP Requests. By defatul, fecth sends a get method.
    fetch('https://udemy-react-hooks-update-829dd.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient), // JSON.Stringfy is also JS native
      header: {'Content-type': 'application/json'}
    })
    .then(response => {
      dispatchHttp({type: 'RESPONSE'});
      // setIsLoading(false);
      // returning the body of the response. Returns a promise, so neds another '.then'
      return response.json();
    })
    .then(responseData => {
      // Firebase automatically generates id. That was returned in the response body on a prop
      // called 'name'
      // setUserIngredients(prevIngredients => [
      //   ...prevIngredients, 
      //   {id: responseData.name, ...ingredient}]); 
      dispatchIngredients({
        type: 'ADD',
        ingredient: {id: responseData.name, ...ingredient}
      });
    })
    
  };

  const removeIngredientHandler = function(id) {
    dispatchHttp({type: 'SEND'});
    fetch(`https://udemy-react-hooks-update-829dd.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    })
    .then(response => {
      dispatchHttp({type: 'RESPONSE'});
      // Apparently filtering the original state directly wouldn't be a problem, since .filter
      //doesn't change the original array, but returns a new one modified instead 
      // setUserIngredients(prevIngredients => prevIngredients.filter(ig => ig.id !== id));
      dispatchIngredients({type: 'DELETE', id: id});
    })
    .catch(error => {
      dispatchHttp({type: 'ERROR', errorMessage: error.message});
    });
  }

  const clearError = () => {
    // Note: React batches state changes of a lifecycle, so it only re-renders the component once with all 
    // state changes, instead of re-rendering for each setState function.
    // E.g.: In this case, it execute setError, when it's done executes setIsLoading (synchrounously, one after the other),
    // but only re-render the component once for both state changes. 
    // setError(null);
    // setIsLoading(false);
    dispatchHttp({type: 'CLEAR'});
  }

  return (
    <div className="App">
      {/* If there's any error, show the error modal */}
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
