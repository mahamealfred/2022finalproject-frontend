import { SCHOOLS_REQUEST, SCHOOLS_SUCCESS, SCHOOLS_FAILURE } from '../types/schoolsTypes';

const initialState = {
    loading: false,
    schools: [],
     error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SCHOOLS_REQUEST:
            return {
                ...state, //spredding
                loading: true,
            };
        case SCHOOLS_SUCCESS:
            return {
                loading: false,
                schools: action.payload,
                error: '',
            };
        case SCHOOLS_FAILURE:
            return {
                loading: false,
                schools: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;