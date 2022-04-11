import {
    GET_STUDENT_BYSCHOOLID_REQUEST,
    GET_STUDENT_BYSCHOOLID_SUCCESS,
    GET_STUDENT_BYSCHOOLID_FAILURE,
  } from "../types/getStudentsBySchoolIdTypes";
  
  const initialState = {
    loading: false,
    students: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_STUDENT_BYSCHOOLID_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_STUDENT_BYSCHOOLID_SUCCESS:
        return {
          loading: false,
          students: action.payload,
          error: "",
        };
      case GET_STUDENT_BYSCHOOLID_FAILURE:
        return {
          loading: false,
          student: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  