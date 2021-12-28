import { ADD_SCHOOLS_REQUEST, ADD_SCHOOLS_SUCCESS, ADD_SCHOOLS_FAILURE } from '../types/addSchoolTypes';

const initialState = {
    loading: false,
    schools: [],
     error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SCHOOLS_REQUEST:
            return {
                ...state, //spredding
                loading: true,
            };
        case ADD_SCHOOLS_SUCCESS:
            return {
                loading: false,
                schools: action.payload,
                error: '',
            };
        case ADD_SCHOOLS_FAILURE:
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