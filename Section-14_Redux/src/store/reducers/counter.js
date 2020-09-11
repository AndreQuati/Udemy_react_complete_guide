import * as actionTypes from '../actions/actionTypes';

const initialState = {
    counter: 0
}

const reducer = (state = initialState, action) => {

    let value = 0;

    switch ( action.type ) {
        case actionTypes.INCREMENT:
            value = 1;
            break;
        case actionTypes.DECREMENT:
            value = -1;
            break;
        case actionTypes.ADD:
            value = action.value;
            break;
        case actionTypes.SUBTRACT:
            value = action.value;
            break;
    }

    return { 
        counter: state.counter + value
    }
};

export default reducer;