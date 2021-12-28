import { EXAMS_REQUEST, EXAMS_SUCCESS, EXAMS_FAILURE } from '../types/examsTypes';

const initialState = {
    loading: false,
    exams: [],
     error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case EXAMS_REQUEST:
            return {
                ...state, //spredding
                loading: true,
            };
        case EXAMS_SUCCESS:
            return {
                loading: false,
                exams: action.payload,
                error: '',
            };
        case EXAMS_FAILURE:
            return {
                loading: false,
                exams: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;