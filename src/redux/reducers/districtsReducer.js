import {
    DISTRICTS_REQUEST,
    DISTRICTS_SUCCESS,
    DISTRICTS_FAILURE,
  } from "../types/districtsTypes";
  
  const initialState = {
    loading: false,
    districts: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case DISTRICTS_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case DISTRICTS_SUCCESS:
        return {
          loading: false,
          districts: action.payload,
          error: "",
        };
      case DISTRICTS_FAILURE:
        return {
          loading: false,
          districts: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  