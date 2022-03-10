import {
    GET_AVAILABLEEXAMSDONE_REQUEST,
    GET_AVAILABLEEXAMSDONE_SUCCESS,
    GET_AVAILABLEEXAMSDONE_FAILURE,
  } from "../types/getAvailableExamsDoneTypes";
  
  const initialState = {
    loading: false,
    exams: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_AVAILABLEEXAMSDONE_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_AVAILABLEEXAMSDONE_SUCCESS:
        return {
          loading: false,
          exams: action.payload,
          error: "",
        };
      case GET_AVAILABLEEXAMSDONE_FAILURE:
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
  