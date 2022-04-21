import {
    STUDENTS_SINGUP_REQUEST,
    STUDENTS_SINGUP_SUCCESS,
    STUDENTS_SINGUP_FAILURE,
  } from "../types/studentSingupTypes";
  
  const initialState = {
    loading: false,
    data: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case  STUDENTS_SINGUP_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case  STUDENTS_SINGUP_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      case  STUDENTS_SINGUP_FAILURE:
        return {
          loading: false,
          data: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  