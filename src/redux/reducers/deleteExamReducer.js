import {
    DELETE_EXAM_REQUEST,
    DELETE_EXAM_SUCCESS,
    DELETE_EXAM_FAILURE,
  } from "../types/deleteExamTypes";
  
  const initialState = {
    loading: false,
    exams: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_EXAM_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case DELETE_EXAM_SUCCESS:
        return {
          loading: false,
          exams: action.payload,
          error: "",
        };
      case DELETE_EXAM_FAILURE:
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
  