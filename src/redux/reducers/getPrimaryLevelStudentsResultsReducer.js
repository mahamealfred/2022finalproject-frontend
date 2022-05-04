import {
    GET_PRIMARYLEVEL_RESULTS_REQUEST,
    GET_PRIMARYLEVEL_RESULTS_SUCCESS,
    GET_PRIMARYLEVEL_RESULTS_FAILURE,
  } from "../types/getPrimaryLevelStudentsResultsTypes";
  
  const initialState = {
    loading: false,
    results: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PRIMARYLEVEL_RESULTS_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_PRIMARYLEVEL_RESULTS_SUCCESS:
        return {
          loading: false,
          results: action.payload,
          error: "",
        };
      case GET_PRIMARYLEVEL_RESULTS_FAILURE:
        return {
          loading: false,
          results: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  