import * as actionTypes from './actionTypes';

export const deleteResult = (id) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultId: id
    };
};

// Simulating an async case with the STORE RESULT action

export const storeResult = (result) => {
    return dispatch => {
        // Using setTimeout to simulate an async call
        setTimeout(() => {
            dispatch(saveResult(result))
        }, 2000);
    }
};

const saveResult = (res) => {
    return {
        type: actionTypes.STORE_RESULT,
        result: res
    };
}