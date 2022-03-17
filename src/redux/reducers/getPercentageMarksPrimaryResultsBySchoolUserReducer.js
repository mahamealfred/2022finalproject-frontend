import {
    GET_PERCENTAGEPRIMARYRESULTS_BYSCHOOLUSER_REQUEST,
    GET_PERCENTAGEPRIMARYRESULTS_BYSCHOOLUSER_SUCCESS,
    GET_PERCENTAGEPRIMARYRESULTS_BYSCHOOLUSER_FAILURE,
  } from "../types/getPercentageMarksPrimaryResultsBySchoolUserTypes";
  
  const initialState = {
    loading: false,
    results: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PERCENTAGEPRIMARYRESULTS_BYSCHOOLUSER_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_PERCENTAGEPRIMARYRESULTS_BYSCHOOLUSER_SUCCESS:
        return {
          loading: false,
          results: action.payload,
          error: "",
        };
      case GET_PERCENTAGEPRIMARYRESULTS_BYSCHOOLUSER_FAILURE:
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
  