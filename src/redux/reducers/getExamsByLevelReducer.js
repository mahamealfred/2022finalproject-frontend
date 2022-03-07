import {
    GET_EXAMS_BYLEVEL_REQUEST,
    GET_EXAMS_BYLEVEL_SUCCESS,
    GET_EXAMS_BYLEVEL_FAILURE,
  } from "../types/getExamsByLevelTypes";
  
  const initialState = {
    loading: false,
    exams: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_EXAMS_BYLEVEL_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_EXAMS_BYLEVEL_SUCCESS:
        return {
          loading: false,
          exams: action.payload,
          error: "",
        };
      case GET_EXAMS_BYLEVEL_FAILURE:
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
  