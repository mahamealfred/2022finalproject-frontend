import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import "./assessmentQuestion.css";
import Questions from "../../../Questions/Questions";

export default function AssessmentQuestion() {
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [numberQuestions, setNumberQuestion]=useState(1);

  const fetchQuestions = async (category = "Books", difficulty = "Medium") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

  };

  useEffect(() => {
    setQuestions();
    setOptions(
      questions &&
        handleShuffle([
          questions[currentQuestion]?.correct_answer,
          ...questions[currentQuestion]?.incorrect_answer,
        ])
    );
  }, [questions, currentQuestion]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="assessmentQuestion">
      <span className="subtitle">Welcome, Mahame Alfred</span>
      {/* {
        questions?
          <> */}
      <>
        <div className="assessmentInf">
          <div className="leftAssessementInf">
            <span> Assessement Name</span>
            <div className="discription">
              <span> Assessement Description</span>
            </div>
          </div>
          <div className="rightAssessmentInfo">
            <div className="time">
              <span> Time left: 1h 30min</span>
            </div>
            <span> Question: {numberQuestions}/10 questions</span>
          </div>
        </div>
      </>
      <Questions
      currentQuestion={currentQuestion}
      setCurrentQuestion={setCurrentQuestion}
      questions={questions}
      options={options}
      //correct_answer={questions[currentQuestion]?.correct_answer}
      score={score}
      setScore={setScore}
      setNumberQuestion={numberQuestions}

       />

      {/* </>
        :
        <>
        </>
           <CircularProgress style={{margin:100}}
           size={100}
          thickness={1}
           />
        
      } */}
    </div>
  );
}
