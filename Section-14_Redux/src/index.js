import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
// Midleware to allow passing funcitons that return actions to dispatcher instead of only actions. This is helpful with async 
import thunk from 'redux-thunk'; 

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

// Combining separate reducers. This combines all reducers's states into one state variable,
// however each reducer states becomes nested into the combined one, as if it was a property
// of that new state.
// E.g: state.ctr.counter / state.res.results
const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

const logger = store => {
    return next => {
        return action => {
            console.log('[Midleware] Dispatching ', action);
            const result = next(action);
            console.log('[Midleware] Next state ', store.getState());
            return result;
        }
    }
}

// Set up necessary to use Redux Dev tools on chrome (for debugging)
const componseEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, componseEnhancers(applyMiddleware(logger, thunk)));

// Provider is a helpr component that allows injecting the stores into the components 
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
