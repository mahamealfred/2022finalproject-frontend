import {
    ADD_EXAMS_REQUEST,
    ADD_EXAMS_SUCCESS,
    ADD_EXAMS_FAILURE,
  } from "../types/addExamTypes";
  
  const initialState = {
    loading: false,
    exams: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_EXAMS_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case ADD_EXAMS_SUCCESS:
        return {
          loading: false,
          exams: action.payload,
          error: "",
        };
      case ADD_EXAMS_FAILURE:
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
  