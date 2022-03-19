import {
    ADD_QUESTION_REQUEST,
    ADD_QUESTION_SUCCESS,
    ADD_QUESTION_FAILURE,
  } from "../types/addQuestionTypes";
  
  const initialState = {
    loading: false,
    questions: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_QUESTION_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case ADD_QUESTION_SUCCESS:
        return {
          loading: false,
          questions: action.payload,
          error: "",
        };
      case ADD_QUESTION_FAILURE:
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
  