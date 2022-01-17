import {
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
  } from "../types/deleteUserTypes";
  
  const initialState = {
    loading: false,
    users: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  DELETE_USER_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case  DELETE_USER_SUCCESS:
        return {
          loading: false,
          users: action.payload,
          error: "",
        };
      case  DELETE_USER_FAILURE:
        return {
          loading: false,
          users: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  