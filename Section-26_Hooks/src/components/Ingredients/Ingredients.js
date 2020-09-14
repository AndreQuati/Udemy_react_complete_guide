import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {

  const [ingredients, setIngredients] = useState([]); 

  return (
    <div className="App">
      <IngredientForm />

      <section>
        <Search />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
