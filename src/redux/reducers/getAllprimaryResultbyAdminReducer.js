import {
    GET_PRIMARYRESULTBY_ADMIN_REQUEST,
    GET_PRIMARYRESULTBY_ADMIN_SUCCESS,
    GET_PRIMARYRESULTBY_ADMIN_FAILURE,
  } from "../types/getAllprimaryResultbyAdminTypes";
  
  const initialState = {
    loading: false,
    results: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PRIMARYRESULTBY_ADMIN_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_PRIMARYRESULTBY_ADMIN_SUCCESS:
        return {
          loading: false,
          results: action.payload,
          error: "",
        };
      case GET_PRIMARYRESULTBY_ADMIN_FAILURE:
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
  