import {
    ADD_STUDENTS_BYSCHOOLUSER_REQUEST,
    ADD_STUDENTS_BYSCHOOLUSER_SUCCESS,
    ADD_STUDENTS_BYSCHOOLUSER_FAILURE,
  } from "../types/addStudentBySchoolUserTypes";
  
  const initialState = {
    loading: false,
    students: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_STUDENTS_BYSCHOOLUSER_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case ADD_STUDENTS_BYSCHOOLUSER_SUCCESS:
        return {
          loading: false,
          students: action.payload,
          error: "",
        };
      case ADD_STUDENTS_BYSCHOOLUSER_FAILURE:
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
  