import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import "./Question.css";
import HomeTopbar from "../../homeTopbar/HomeTopbar";
import Header from "../../header/Header";
import Footer from "../../Footer/Footer";
import Questions from "../../Questions/Questions";
import { useDispatch,useSelector } from "react-redux";
import {getExamsAndQuestionByLevel} from "../../../redux/actions/getExamsAndQuestionByIdAction";

export default function Question({...rest}) {

  const getExamAndQuestionState=useSelector((state)=> state.getExamAndQuestionById);
  const dispatch=useDispatch();
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const [examId, setExamId] = useState('');
  const [exams,setExams]=useState([]);
  

  const [options, setOptions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [numberQuestions, setNumberQuestion]=useState(1);
  
  
  // useEffect(() => {
  //   setQuestions();
  //   setOptions(
  //     questions &&
  //       handleShuffle([
  //         questions[currentQuestion]?.correct_answer,
  //         ...questions[currentQuestion]?.incorrect_answer,
  //       ])
  //   );
  // }, [questions, currentQuestion]);
  useEffect( () => {
    async function fetchData(){
       await dispatch(getExamsAndQuestionByLevel(examId));
      
     }
    fetchData();
  }, []);
  console.log( getExamAndQuestionState.exams)

 

  
  

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <>
    <HomeTopbar/>
    <Header/>
    {
      getExamAndQuestionState.loading ?  "Loading" :   getExamAndQuestionState.exams.length>0    ?

      <div className="assessmentQuestion">
      <span className="subtitle">Welcome, Mahame Alfred</span>
      {/* {
        questions?
          <> */}
      <>
        <div className="assessmentInf">
          <div className="leftAssessementInf">
            <span>ASSESSMENT NAME: {  getExamAndQuestionState.exams[0].name}</span>
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
      <h1>"Questions"</h1>
    {
               getExamAndQuestionState.exams[0].questions.toString()
    }

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
    :"No Question found"
    }

   
    <Footer/>
    </>
  );
}
