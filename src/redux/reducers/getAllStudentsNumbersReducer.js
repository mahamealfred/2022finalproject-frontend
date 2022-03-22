import {
    GET_STUDENTSNUMBERS_REQUEST,
    GET_STUDENTSNUMBERS_SUCCESS,
    GET_STUDENTSNUMBERS_FAILURE,
  } from "../types/getAllStudentNumbersTypes";
  
  const initialState = {
    loading: false,
    students: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_STUDENTSNUMBERS_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_STUDENTSNUMBERS_SUCCESS:
        return {
          loading: false,
          students: action.payload,
          error: "",
        };
      case GET_STUDENTSNUMBERS_FAILURE:
        return {
          loading: false,
          students: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  