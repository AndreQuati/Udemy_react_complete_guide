import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

// Global variables are used declared in capital letters
const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    // This only executes after component is rendered, so it's necessary to treat the
    // render method so it doesn't try to map a ingredients while it's null
    componentDidMount() {
        // Loading list of ingredients from database
        axios.get('https://udemy-burger-builder-86b9b.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({error: true});
            })
    }

    async updatePurchaseState() {
        const ingredients = { ...this.state.ingredients };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        await this.setState({ purchasable: sum > 0 });
    }

    async updateIngredientsState(type, quantity) {
        // Getting the ingredient count before the update
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + quantity;

        if (updatedCount < 0) {
            return;
        }

        // Creating a new array with the same values as the state, so when it's updated
        // the non changed values are kept
        const updatedIngrents = { ...this.state.ingredients };
        updatedIngrents[type] = updatedCount;

        //Updating total price
        const priceAddition = INGREDIENTS_PRICE[type] * quantity;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        await this.setState({ totalPrice: newPrice, ingredients: updatedIngrents });
        this.updatePurchaseState();
    }

    addIngredientHandler = (type) => {
        this.updateIngredientsState(type, +1);
    }

    removeIngredientHandler = (type) => {
        this.updateIngredientsState(type, -1);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max',
                address: {
                    street: 'testStreet',
                    zipCode: '124-2314',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };

        // The '.json' is necessary specifically for Firebase 
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });
    }

    render() {
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

        // If loaded, renders order summary
        let orderSummary = null;
        // If the list of ingredients is not loaded, display the spinner
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        // When ingredients are loaded, render componentes that use that object
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        }
        // If loading, renders the loading spinner
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);