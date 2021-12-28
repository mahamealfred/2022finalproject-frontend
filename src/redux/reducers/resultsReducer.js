import { RESULTS_REQUEST, RESULTS_SUCCESS, RESULTS_FAILURE } from '../types/resultsTypes';

const initialState = {
    loading: false,
    results: [],
     error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case RESULTS_REQUEST:
            return {
                ...state, //spredding
                loading: true,
            };
        case RESULTS_SUCCESS:
            return {
                loading: false,
                results: action.payload,
                error: '',
            };
        case RESULTS_FAILURE:
            return {
                loading: false,
                results: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;