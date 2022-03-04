import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import studentsReducer from "./studentsReducer";
import schoolsReducer from "./schoolsReducer";
import examsReducer from "./examsReducer";
import resultsReducer from "./resultsReducer";
import addSchoolReducer from "./addSchoolReducer";
import addStudentReducer from "./addStudentReducer";
import userLoginReducer from "./userLoginReducer";
import addExamReducer from "./addExamReducer";
import updateSchoolReducer from "./updateSchoolReducer";
import deleteSchoolReducer  from "./deleteSchoolReducer";
import addUserReducer from "./addUserReduser";
import deleteUserReducer from "./deleteUserReducer";
import deleteStudentReducer from "./deleteStudentReducer";
import updateStudentReducer from "./updateStudentReducer";
import deleteExamReducer from "./deleteExamReducer";
import updateExamReducer from "./updateExamReducer";
import questionReducer from "./questionReducer";
import deleteQuestionReducer from "./deleteQuestionReducer";
import updateQuestionReducer from "./updateQuestionReducer";
import districtsReducer from "./districtsReducer";
import getPrimaryStudentsReducer from "./getPrimaryStudentsReducer";
import studentLoginReducer from "./studentLoginReducer";
const allReducers = combineReducers({
  users: usersReducer,
  students: studentsReducer,
  schools: schoolsReducer,
  exams: examsReducer,
  results: resultsReducer,
  addSchool: addSchoolReducer,
  addStudent: addStudentReducer,
  userLogin: userLoginReducer,
  addExam: addExamReducer,
  updateSchool: updateSchoolReducer,
  deleteSchool: deleteSchoolReducer,
  addUser: addUserReducer,
  deleteUser: deleteUserReducer,
  deleteStudent: deleteStudentReducer,
  updateStudent: updateStudentReducer,
  deleteExam: deleteExamReducer,
  updateExam: updateExamReducer,
  questions: questionReducer,
  deleteQuestion: deleteQuestionReducer,
  updateQuestion: updateQuestionReducer,
  districts:districtsReducer,
  getPrimaryStudent: getPrimaryStudentsReducer,
  studentLogin: studentLoginReducer,
});

export default allReducers;
