import {
    DELETE_QUESTION_REQUEST,
    DELETE_QUESTION_SUCCESS,
    DELETE_QUESTION_FAILURE,
  } from "../types/deleteQuestionTypes";
  
  const initialState = {
    loading: false,
    questions: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  DELETE_QUESTION_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case  DELETE_QUESTION_SUCCESS:
        return {
          loading: false,
          questions: action.payload,
          error: "",
        };
      case  DELETE_QUESTION_FAILURE:
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
  