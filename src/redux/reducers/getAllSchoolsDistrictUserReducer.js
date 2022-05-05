import {
    GET_SCHOOLS_BYDISTRICTUSER_REQUEST,
    GET_SCHOOLS_BYDISTRICTUSER_SUCCESS,
    GET_SCHOOLS_BYDISTRICTUSER_FAILURE,
  } from "../types/getAllSchoolsByDistrictUserTypes";
  
  const initialState = {
    loading: false,
    schools: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SCHOOLS_BYDISTRICTUSER_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_SCHOOLS_BYDISTRICTUSER_SUCCESS:
        return {
          loading: false,
          schools: action.payload,
          error: "",
        };
      case GET_SCHOOLS_BYDISTRICTUSER_FAILURE:
        return {
          loading: false,
          schools: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  