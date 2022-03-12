import {
    GET_ORDINARYLEVELEXAMS_REQUEST,
    GET_ORDINARYLEVELEXAMS_SUCCESS,
    GET_ORDINARYLEVELEXAMS_FAILURE,
  } from "../types/getOrdinaryLevelExamsTypes";
  
  const initialState = {
    loading: false,
    exams: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ORDINARYLEVELEXAMS_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_ORDINARYLEVELEXAMS_SUCCESS:
        return {
          loading: false,
          exams: action.payload,
          error: "",
        };
      case GET_ORDINARYLEVELEXAMS_FAILURE:
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
  