import * as actionTypes from '../actions/actionTypes';

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {

    let newResult;

    switch ( action.type ) {
        case actionTypes.STORE_RESULT:
            // Concat returns a new array with the value of the original array + the concateneted value
            // Use concat to keep state immutable instead o push, since push adds the value to the same array.
            // Using date to create the id, since it's a unique value
            newResult = state.results.concat({id: new Date(), value: action.result});
            break;
        case actionTypes.DELETE_RESULT:
            // To have a copu of an array without an element, use .filter()
            // this will return an array with a copy of each element to which the condition is true.
            // In this case, it will not be true when the id of the result element is the same as the id of that result in the state.results array
            newResult = state.results.filter(result => result.id !== action.resultId);
            break;
        default:
            return state;
    }

    return {
        ...state,
        results: newResult
    }
};

export default reducer;