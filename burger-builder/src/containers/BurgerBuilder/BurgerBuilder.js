import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'; 

// Global variables are used declared in capital letters
const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    async updatePurchaseState () {
        const ingredients = {...this.state.ingredients};
        console.log(this.state.ingredients);
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
               return sum + el;
            }, 0);
        await this.setState({purchasable: sum > 0});
        console.log(this.state.purchasable);
    }

    async updateIngredientsState (type, quantity) {
        // Getting the ingredient count before the update
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + quantity;

        if(updatedCount < 0){
            return;
        }
        
        // Creating a new array with the same values as the state, so when it's updated
        // the non changed values are kept
        const updatedIngrents = {...this.state.ingredients};
        updatedIngrents[type] = updatedCount;
        
        //Updating total price
        const priceAddition = INGREDIENTS_PRICE[type] * quantity;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        await this.setState({totalPrice: newPrice, ingredients: updatedIngrents});
        console.log(this.state.ingredients);
        this.updatePurchaseState();
    }

    addIngredientHandler = (type) => {
        this.updateIngredientsState(type, +1);
    }
    
    removeIngredientHandler = (type) => {
        this.updateIngredientsState(type, -1);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }

    render () {
        // Copying the ingredients obj into a new obj using the spread operator
        const disabledInfo = {
            ...this.state.ingredients
        };
        // Loops through the disabledInfo obj. The key is each parameter (salad, bacon, etc.)
        for (let key in disabledInfo) {
            // Compares if the value for that parameter is <= 0 and returns true/false
            // E.g.: disabledInfo(salad) == 0 ? True : False
            // Then, sets the value to that property as the returned boolean. E.g: {Salad : false, ...} 
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;