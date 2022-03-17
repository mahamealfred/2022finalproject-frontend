import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import "./Question.css";
import HomeTopbar from "../../homeTopbar/HomeTopbar";
import Header from "../../header/Header";
import Footer from "../../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getExamsAndQuestionByLevel } from "../../../redux/actions/getExamsAndQuestionByIdAction";
import Questions from "../../Questions/Questions";
import { Button } from "@mui/material";

export default function Question({ ...rest }) {
  const getExamAndQuestionState = useSelector(
    (state) => state.getExamAndQuestionById
  );
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [remainingTime, setRemainingTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [examId, setExamId] = useState("");

  const studentData = JSON.parse(localStorage.getItem("student-data"));
  // get fullname
  console.log(studentData);
  const fullname = studentData ? studentData.fullName : "Dear, Student";

  const clock = (hr, mm, ss) => {
    var interval = setInterval(function () {
      if (hr == 0 && mm == 0 && ss == 0) clearInterval(interval);
      ss--;
      if (ss == 0) {
        ss = 59;
        mm--;
        if (mm == 0) {
          mm = 59;
          hr--;
        }
      }

      if (hr.toString().length < 2) hr = "0" + hr;
      if (mm.toString().length < 2) mm = "0" + mm;
      if (ss.toString().length < 2) ss = "0" + ss;
      setRemainingTime(hr + " : " + mm + " : " + ss);
    }, 1000);
  };

  useEffect(() => {
    async function fetchData() {
      await dispatch(getExamsAndQuestionByLevel(examId));
    }

    clock(1, 1, 10);
    fetchData();
  }, []);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  const handleScore = (value, correct_answer, index) => {
    // incase the index already exists in the score array update the value
    if (answers[index]) {
      answers[index] = { value, correct_answer, index };
    }
    // else add the index and value to the score array
    else {
      answers[index] = { value, correct_answer, index };
    }
  };

  const handleSubmit = async () => {
    // set loading to true
    setIsLoading(true);
    // loop through answers and calculate the final score
    let final = 0;
    await answers.forEach((answer) => {
      console.log(answer, answer.value === answer.correct_answer);
      if (answer.value === answer.correct_answer) {
        console.log(final++);
        setScore(final);
      }
    });
    // set a percentage of the score
    const percentage =
      (final / getExamAndQuestionState.exams[0].questions.length) * 100;
    console.log(getExamAndQuestionState.exams[0].questions.length);
    setPercentage(Math.round(percentage));

    // set loading to false
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <>
      <HomeTopbar />
      <Header />
      {getExamAndQuestionState.loading ? (
        "Loading"
      ) : getExamAndQuestionState.exams.length > 0 ? (
        <div className="assessmentQuestion">
          <span className="subtitle">Welcome, {fullname}</span>
          {/* {
        questions?
          <> */}
          <>
            <div className="assessmentInf">
              <div className="leftAssessementInf">
                <span>
                  ASSESSMENT NAME: {getExamAndQuestionState.exams[0].name}
                </span>
                <div className="discription">
                  <span> Assessement Description :{getExamAndQuestionState.exams[0].subject}</span>
                </div>
              </div>
              <div className="rightAssessmentInfo">
                <div className="time">
                  <span> Remaining Time: {remainingTime}</span>
                </div>
                <span>
                  {" "}
                  Question: {answers.length}/
                  {getExamAndQuestionState.exams[0].questions.length || 0}{" "}
                  questions
                </span>
              </div>
            </div>
          </>
          {isSubmitted && !isLoading ? (
            <div className="assessmentResult">
              <div className="result">
                <span>You have completed this test.</span>
                <br />
                <span>
                  You have scored {score} out of{" "}
                  {getExamAndQuestionState.exams[0].questions.length || 0}
                </span>
                <br />
                <span>Your score is {percentage}%</span>
              </div>
            </div>
          ) : (
            <>
              <h1>Questions</h1>
              {getExamAndQuestionState.exams[0].questions.map(
                (question, index) => {
                  return (
                    <Questions
                      question={question}
                      index={index}
                      setScore={handleScore}
                      score={score}
                    />
                  );
                }
              )}
              <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={
                  answers.length <
                  getExamAndQuestionState.exams[0].questions.length
                }
                style={{ width: 185 }}
                onClick={() => handleSubmit()}
              >
                End And Submit
              </Button>
            </>
          )}
        </div>
      ) : (
        "No Question found"
      )}

      <Footer />
    </>
  );
}
