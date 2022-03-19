import {
  ADD_RESULT_REQUEST,
  ADD_RESULT_SUCCESS,
  ADD_RESULT_FAILURE,
} from "../types/addResultTypes";

const initialState = {
  loading: false,
  results: [],
  error: "",
  success: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESULT_REQUEST:
      return {
        ...state, //spredding
        loading: true,
      };
    case ADD_RESULT_SUCCESS:
      return {
        loading: false,
        results: action.payload,
        error: "",
        success: true,
      };
    case ADD_RESULT_FAILURE:
      return {
        loading: false,
        results: [],
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
