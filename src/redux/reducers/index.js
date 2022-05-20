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
import getExamsByLevelReducer from './getExamsByLevelReducer';
import getExamAndQuetionByIdReducer from './getExamsAndQuestionByIdReducer';
import addStudentBySchoolUserReducer from './addStudentBySchoolUserReducer';
import getAllStudentsBySchoolUserReducer from './getAllStudentsBySchoolUserReducer';
import getSpecificStudentNumberInSchoolReducer from './getSpecificStudentNumberInSchoolReducer';
import getPrimaryResultsBySchoolUserReducer from './getPrimaryResultsBySchoolUserReducer';
import getAvailableExamsDoneReducer from './getAvailableExamsDoneReducer';
import getOrdinaryLevelExamsReducer from './getOrdinaryLevelExamsReducer';
import getOrdinaryLevelResultBySchoolUserReducer from './getOrdinaryLevelResultBySchoolUserReducer';
import getPercentageMarksPrimaryResultsBySchoolUserReducer from './getPercentageMarksPrimaryResultsBySchoolUserReducer';
import addQuestionReducer from "./addQuestionReducer";
import addDistrictReducer from "./addDistrictsReducer";
import getQuestionByExamIdReducer from "./getQuestionByExamIdReducer";
import addResultReducer from "./addResultReducer";
import getAllStudentNumbersReducer from "./getAllStudentsNumbersReducer";
import getStudentsBySchoolIdReducer from './getStudentsBySchoolIdReducer';
import studentSignupReducer from "./studentSingupReducer";
import searchSchoolReducer from "./searchSchoolReducer";
import primaryLeveStudentResultsReducer from "./getPrimaryLevelStudentsResultsReducer";
import getStudentNumberByDistictUserReducer from "./getStudentNumberByDistrictUserReducer";
import getAllSchoolsByDistrictUserReducer from "./getAllSchoolsDistrictUserReducer";
import getAllprimaryResultbyAdminReducer from "./getAllprimaryResultbyAdminReducer";
import getAllOrdinaryResultbyAdminReducer from "./getAllOrdinaryResultbyAdminReducer";
const allReducers = combineReducers({
  users: usersReducer,
  students: studentsReducer,
  studentSingup:studentSignupReducer,
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
  getExamsByLevel: getExamsByLevelReducer,
  getExamAndQuestionById: getExamAndQuetionByIdReducer,
  addStudentBySchoolUser: addStudentBySchoolUserReducer,
  getAllStudentsBySchoolUser:getAllStudentsBySchoolUserReducer,
  getSpecificStudentNumberInSchool:getSpecificStudentNumberInSchoolReducer,
  getPrimaryResultsBySchoolUser: getPrimaryResultsBySchoolUserReducer,
  getAvailablePrimaryExamsDone: getAvailableExamsDoneReducer,
  getOrdinaryLevelExams:getOrdinaryLevelExamsReducer,
  getOrdinaryLevelResultBySchoolUser: getOrdinaryLevelResultBySchoolUserReducer,
  getPercentageMarksPrimaryResultsBySchoolUser: getPercentageMarksPrimaryResultsBySchoolUserReducer,
  addDistrict: addDistrictReducer,
  addQuestion:addQuestionReducer,
  getQuestionByExamId: getQuestionByExamIdReducer,
  addResult:addResultReducer,
  getAllStudentNumbers: getAllStudentNumbersReducer,
  getStudentBySchoolId: getStudentsBySchoolIdReducer,
  searchSchool:searchSchoolReducer,
  getPrimaryLevelStudentsResults:primaryLeveStudentResultsReducer,
  getStudentNumberByDistictUser:getStudentNumberByDistictUserReducer,
  getAllSchoolsByDistrictUser: getAllSchoolsByDistrictUserReducer,
  getAllprimaryResultbyAdmin: getAllprimaryResultbyAdminReducer,
  getAllOrdinaryResultbyAdmin: getAllOrdinaryResultbyAdminReducer,
});

export default allReducers;
