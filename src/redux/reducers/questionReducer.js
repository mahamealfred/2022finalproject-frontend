import {
    QUESTIONS_REQUEST,
    QUESTIONS_SUCCESS,
    QUESTIONS_FAILURE,
  } from "../types/questionsTypes";
  
  const initialState = {
    loading: false,
    questions: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case QUESTIONS_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case QUESTIONS_SUCCESS:
        return {
          loading: false,
          questions: action.payload,
          error: "",
        };
      case QUESTIONS_FAILURE:
        return {
          loading: false,
          questions: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  