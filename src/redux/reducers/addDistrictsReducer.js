import {
    ADD_DISTRICT_REQUEST,
    ADD_DISTRICT_SUCCESS,
    ADD_DISTRICT_FAILURE,
  } from "../types/addDistrictTypes";
  
  const initialState = {
    loading: false,
    districts: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_DISTRICT_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case ADD_DISTRICT_SUCCESS:
        return {
          loading: false,
          districts: action.payload,
          error: "",
        };
      case ADD_DISTRICT_FAILURE:
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
  