import {
  ADD_STUDENTS_REQUEST,
  ADD_STUDENTS_SUCCESS,
  ADD_STUDENTS_FAILURE,
} from "../types/addStudentTypes";

const initialState = {
  loading: false,
  students: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDENTS_REQUEST:
      return {
        ...state, //spredding
        loading: true,
      };
    case ADD_STUDENTS_SUCCESS:
      return {
        loading: false,
        students: action.payload,
        error: "",
      };
    case ADD_STUDENTS_FAILURE:
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
