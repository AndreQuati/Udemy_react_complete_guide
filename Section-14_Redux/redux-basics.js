const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
}

// Reducer
// The = in the 'state' param sets the default value in case no value is set to it. In this
// case, the default value is initialState's value
const rootReducer = (state = initialState, action) => {
    if(action.type === 'INC_COUNTER') {
        return {
            ...state,
            counter: state.counter + 1
        };
    }
    if(action.type === 'ADD_COUNTER') {
        return {
            ... state,
            counter: state.counter + action.value
        };
    }
    return state;
}

// Store
const store = createStore(rootReducer);

// Subscription
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});

// Dispatching Action
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
// console.log(store.getState());

