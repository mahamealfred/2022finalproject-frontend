import {
  STUDENTS_REQUEST,
  STUDENTS_SUCCESS,
  STUDENTS_FAILURE,
} from "../types/studentsTypes";

const initialState = {
  loading: false,
  students: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENTS_REQUEST:
      return {
        ...state, //spredding
        loading: true,
      };
    case STUDENTS_SUCCESS:
      return {
        loading: false,
        students: action.payload,
        error: "",
      };
    case STUDENTS_FAILURE:
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
