import {
    GET_EXAMS_BYID_REQUEST,
    GET_EXAMS_BYID_SUCCESS,
    GET_EXAMS_BYID_FAILURE,
  } from "../types/getExamAndQuestionByIdTypes";
  
  const initialState = {
    loading: false,
    exams: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_EXAMS_BYID_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_EXAMS_BYID_SUCCESS:
        return {
          loading: false,
          exams: action.payload,
          error: "",
        };
      case GET_EXAMS_BYID_FAILURE:
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
  