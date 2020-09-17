import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  // Using destructuring to save the onLoadIngredients function from props in a new variable
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();

  // This useEffect will only execute when enteredFilter OR onLoadIngredients change
  useEffect(() => {
    // Waiting 500 miliseconds before executing sending the request to the server.
    const timer = setTimeout(() => {
      // Checking if the value in the enteredFilter state is the same as the current value in the input element.
      // If it is, than the user has stopped writing for 500ms and we may assume he have completed inputing the search term.
      // Only then, we send the request. This is to avoid sending requests to the server every time the user input a new letter.
      // Since the enteredFilter is inside the timeout, it will have the value of 500ms before this callback was executed, may not
      // be the current value of the field - if the user input somthing during these 500ms. 
      // useRef().current.value, allow us to check the current value of an object, since the current prop is updated every time the value changes.s 
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
        fetch('https://udemy-react-hooks-update-829dd.firebaseio.com/ingredients.json' + query)
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
            onLoadIngredients(loadedIngredients);
          });
      }
    }, 500);

    // This return is executed after useEffect is executed, before the next time it runs. So, in this case, whenever the user
    // type something in the input element, this function will be called since inputRef is listed as a dependency for it.
    // This return will clear the current timer, otherwise for each keystroke, a new timer will be set.
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
