import {
    UPDATE_EXAM_REQUEST,
    UPDATE_EXAM_SUCCESS,
    UPDATE_EXAM_FAILURE,
  } from "../types/updateExamTypes";
  
  const initialState = {
    loading: false,
    exams: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_EXAM_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case UPDATE_EXAM_SUCCESS:
        return {
          loading: false,
          exams: action.payload,
          error: "",
        };
      case UPDATE_EXAM_FAILURE:
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
  