import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {

  // state variables always have two properties: [0] - Array with attributes's snapshot (title, amount), 
  // [1] - dispatch function that allows updating the state. 
  // With that, we can use array destructuring to create variables for 0 and 1
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount]  = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({title: enteredTitle, amount: enteredAmount});
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text" id="title"
              value={enteredTitle}
              onChange={event => { 
                setEnteredTitle(event.target.value);
              }}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number" id="amount"
              value={enteredAmount}
              onChange={event => {
                setEnteredAmount(event.target.value);
              }}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {/* Will only show loading if props.loading = true */}
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
