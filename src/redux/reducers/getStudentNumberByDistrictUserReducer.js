import {
    STUDENTS_NUMBER_BYDISTRICTUSER_REQUEST,
    STUDENTS_NUMBER_BYDISTRICTUSER_SUCCESS,
    STUDENTS_NUMBER_BYDISTRICTUSER_FAILURE,
  } from "../types/getStudentNumberByDistrictUserTypes";
  
  const initialState = {
    loading: false,
    students: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case STUDENTS_NUMBER_BYDISTRICTUSER_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case STUDENTS_NUMBER_BYDISTRICTUSER_SUCCESS:
        return {
          loading: false,
          students: action.payload,
          error: "",
        };
      case STUDENTS_NUMBER_BYDISTRICTUSER_FAILURE:
        return {
          loading: false,
          students: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  