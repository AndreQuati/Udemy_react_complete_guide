import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
    
    /*Transforming the object received throug props into an array, 
     so we can loop through it and render each item. Steps:
      1 - Object.Keys: This is a native JS function. it loops through the object
          and returns an array of the Object "keys" - in this case, the attributes
          of the object ingredients. E.g.: ["salad", "bacon", "cheese", "meat"].
     2 - Object.map (chained): Using this to loop through all the "ingredient keys" in this 
          ingredients array (in this case the name of each ingredient).  
     2.1 - The spread operator is used to create new empty arrays* with the size of the
          specified ammount for each ingredient. E.g.: for {bacon: 1, cheese: 2}, it 
          will these two empty arrays - Array1 = [](length=1), Array2 = [ , ](length=2).
          It works because the key is the name of the property, so, if 
          ingredient.keys = "cheese", the line props.ingredients[ingredientKey] 
          means "access the value for the property "cheese" in the Obj props.ingredients, 
          similar to accessing a value of an array by its index (e.g. array[2]).
      3 - As soon as this new array is created, we map through it once again to now
         create a new <BurgerIngredient> object for each object in that array.
         E.g.: If cheese = 2, an empty array length 2 is create, so we loop through this
         empty array twice and for each time create a <BurgerIngredient> object.
         This <BurgerIngredient> has two properties:
         - key: The "index" of the element. In this case we create this key combining the
                name of the ingredient + the index of the looped array (e.g: salad1, meat1, meat2, etc.)
         - type: The name of the ingredient, so that the object BurgerIngredient knows what
                to return. E.g: "salad", "meat", etc. 
      4 - .reduce(function, initial_value) - JS Array method: Flattens the array. 
           The second parameter, after the function, is the initial value, in this case an empty array.
            It needs to be set in case no ingredient is received, since reduce will throw an error if 
            applied to an empty array. 
            NOTE: It's not necessary to flatten the array to render, it can render arrays nested at
            multiple levels. In this case, this step is necessary to make it easier to identify
            if transformedItems is empty. If we don't do this and pass as parameters ingredients
            with zero quantity, transformedItems will have empty arrays inside it, and if we try
            to check if it's empty we'd need to check all levels of nested arrays to find if
            any of the child arrays contain something. 
            E.g.: if ingredients = {salad: 0, meat: 0} then transformedItems = [[],[]] (length = 2).
                  After the .reduce, transformedItems = [] (length = 0); 
    */ 
    
    const transformedIngredients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            // Using the spread operator to create a new array
            return [...Array( props.ingredients[ingredientKey] )]
                // the arrayItem here is ignored
                .map( (arrayItem, itemIndex) => {
                    return <BurgerIngredient key={ingredientKey + itemIndex} type={ingredientKey} />;
                });
        })
        .reduce((newArray, element) => {
            return newArray.concat(element)});

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {/* transformedIngredients is an array that may contain other arrays inside it, but it's
                rendered correctly without having to manually loop through each item. This is done
                automatically, no matter how many nested arrays there are. */}
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;