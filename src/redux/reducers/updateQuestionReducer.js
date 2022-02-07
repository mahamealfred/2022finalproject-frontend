import {
    UPDATE_QUESTION_REQUEST,
    UPDATE_QUESTION_SUCCESS,
    UPDATE_QUESTION_FAILURE,
  } from "../types/updateQuestionTypes";
  
  const initialState = {
    loading: false,
    questions: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  UPDATE_QUESTION_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case   UPDATE_QUESTION_SUCCESS:
        return {
          loading: false,
          questions: action.payload,
          error: "",
        };
      case   UPDATE_QUESTION_FAILURE:
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
  