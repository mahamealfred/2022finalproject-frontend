import React from 'react'
import { Button } from "@mui/material";
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./questions.css";

const QuestionWithTrueAnswer= ({ question, index, score, setScore }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = (i, correct_answer) => {
    console.log("here", i);
  };

  const handleChange = (i, correct_answer) => {
    if(i===correct_answer)
    setSelected(true);
    // console.log("value", value);
    // console.log("correct_answer", correct_answer);
    // setScore(value, correct_answer, index);
  };
  useEffect(()=>{
handleChange()
  },[])

  return (
    <>
      <div className="question">
        <div>
          <h5>{`${index + 1} - ${question.question}`}</h5>{" "}
          {/*{Questions[currentQuestion].Question} */}
          {console.log(score)}
          <div className="options">
            <ol type="A">
              {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
              <span class="correctanswer">Correct: {question.correct_answer}</span>
              {question.incorrect_answer &&
                question.incorrect_answer.map((i) => (
                  <li>
                    
                    <input
                      type="radio"
                      name={`option-${index + 1}`}
                     alue={i}
                    
                      // onChange={(e) => handleChange(e, question.correct_answer)}

                    />{" "}
                    <label>{i}</label>
                   
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionWithTrueAnswer;
