import { Button } from '@mui/material';
import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';
import "./questions.css"

const Questions = ({currentQuestion, setCurrentQuestion,correct_answer="better", options=["good","better","excellent","None"], Questions, score,setScore}) => {
    const [selected,setSelected]=useState(false);
    const [error, setError]=useState(false)
    
    const history=useHistory();
   
     const handleSelect =(i)=>{
         if(selected===i && selected===correct_answer)
         {
             return "select";
         }else if(selected==i && selected!==correct_answer){
             return "wrong";
         }
         else if(i===correct_answer){
             return "select";
         }
     };
     const handleCheck=()=>{

     }
     const handleNext=()=>{
         if(currentQuestion > 8){
           history.push('/assessement/assessments/result')
         }
         else if(selected){
             setCurrentQuestion(currentQuestion +1)
             setSelected();
         }
         else{
             setError("Please select an option first");
         }
     }
     const handleQuit=()=>{

     }
    
  return (
      <>
      <div className='question'>
          <h1>Question 1</h1>
          <div className='singleQuestion'>
               <h2>What is Photosynthesis?</h2>  {/*{Questions[currentQuestion].Question} */}
               <div className='options'>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {
                    options &&
                     options.map((i)=>
                        <Button 
                        onClick={()=>handleCheck(i)}
                        className={`singleOption ${selected && handleSelect(i)}`}
                        key={i}
                        disabled={selected}
                        >
                           {i}
                        </Button>
                    )
                }
               </div>
               <div className='controls'>
                      <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      style={{width :185}}
                      href="/"
                      onClick={handleQuit}
                      >
                          Quit
                      </Button>
                      <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{width :185}}
                       onClick={handleNext}
                      >
                          Next Question
                      </Button>
               </div>
          </div>
      </div>
      </>
  )
};

export default Questions;
