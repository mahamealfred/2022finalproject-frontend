import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import studentsReducer from "./studentsReducer";
import schoolsReducer from "./schoolsReducer";
import examsReducer from "./examsReducer";
import resultsReducer from "./resultsReducer";
import addSchoolReducer from "./addSchoolReducer";
import addStudentReducer from "./addStudentReducer";
import userLoginReducer from "./userLoginReducer";

const allReducers = combineReducers({
  users: usersReducer,
  students: studentsReducer,
  schools: schoolsReducer,
  exams: examsReducer,
  results: resultsReducer,
  addSchool: addSchoolReducer,
  addStudent: addStudentReducer,
  userLogin: userLoginReducer,
});

export default allReducers;
