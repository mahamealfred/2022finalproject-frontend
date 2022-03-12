import {
    GET_ORDINARYRESULTS_BYSCHOOLUSER_REQUEST,
    GET_ORDINARYRESULTS_BYSCHOOLUSER_SUCCESS,
    GET_ORDINARYRESULTS_BYSCHOOLUSER_FAILURE,
  } from "../types/getOrdinaryLevelResultBySchoolUserTypes";
  
  const initialState = {
    loading: false,
    results: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ORDINARYRESULTS_BYSCHOOLUSER_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_ORDINARYRESULTS_BYSCHOOLUSER_SUCCESS:
        return {
          loading: false,
          results: action.payload,
          error: "",
        };
      case GET_ORDINARYRESULTS_BYSCHOOLUSER_FAILURE:
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
  