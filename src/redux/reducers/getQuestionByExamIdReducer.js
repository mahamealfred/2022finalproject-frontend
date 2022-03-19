import {
    GET_QUESTION_BYID_REQUEST,
    GET_QUESTION_BYID_SUCCESS,
    GET_QUESTION_BYID_FAILURE,
  } from "../types/getQuestionByExamIdTypes";
  
  const initialState = {
    loading: false,
    questions: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_QUESTION_BYID_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_QUESTION_BYID_SUCCESS:
        return {
          loading: false,
          questions: action.payload,
          error: "",
        };
      case GET_QUESTION_BYID_FAILURE:
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
  