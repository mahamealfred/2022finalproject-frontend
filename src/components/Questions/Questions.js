import React from 'react'
import { Button } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./questions.css";

const Questions = ({ question, index, score, setScore }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = (i, correct_answer) => {
    console.log("here", i);
  };

  const handleChange = (e, correct_answer) => {
    const value = e.currentTarget.value;
    setSelected(value);
    console.log("value", value);
    console.log("correct_answer", correct_answer);
    setScore(value, correct_answer, index);
  };

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
              {question.incorrect_answer &&
                question.incorrect_answer.map((i) => (
                  <li>
                    <input
                      type="radio"
                      name={`option-${index + 1}`}
                      value={i}
                      onChange={(e) => handleChange(e, question.correct_answer)}
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

export default Questions;
