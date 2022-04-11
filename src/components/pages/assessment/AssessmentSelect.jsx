import React from 'react'
import { Button, MenuItem, TextField } from '@mui/material';
import './AssessmentSelect.css';
import { useState ,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {getExamsByLevel} from '../../../redux/actions/getExamsByLevelAction';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import { useSelector, useDispatch } from "react-redux";
import HomeTopbar from '../../homeTopbar/HomeTopbar';
import Header from '../../header/Header';
import Footer from '../../Footer/Footer';
import { getExamsAndQuestionByLevel } from "../../../redux/actions/getExamsAndQuestionByIdAction";
import moment from "moment"
const AssessmentSelect= () =>{

  const getExamsByLevelState=useSelector((state)=>state.getExamsByLevel)
  const [error,setError]=useState(false);
  const getExamAndQuestionState = useSelector(
    (state) => state.getExamAndQuestionById
  );
  
  const dispatch = useDispatch();
  const history=useHistory();
  const [exams,setExams]=useState('');
  const [examId,setExamId]=useState('')

  const handleSubmit=()=>{
      setError(false)
       history.push(`/assessments/select/${exams}`)
  }
 
  
  const handlegetAssessment=async ()=>{
    const id=exams;
    console.log("assessment Id:",id);
    try {
    await dispatch(getExamsAndQuestionByLevel(id));
    console.log("Date",getExamAndQuestionState.exams[0].startDate) 
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect( () => {
    setExams("")
    handlegetAssessment();
    async function fetchData(){
    
        await dispatch(getExamsByLevel());  
     }
    fetchData();
  }, []);
  
  return (
    <>
    <HomeTopbar/>
    <Header/>
    <div className="content">
       <div className="settings">
         <span style={{ fontSize:30}}>Assessment Settings</span>
         <div className='settings_select'>
          { error && <ErrorMessage>Please Fill All The Fields</ErrorMessage>}
          {console.log("exam", getExamsByLevelState.exams)}
          { getExamsByLevelState.loading ? "loading.." : getExamsByLevelState.exams.length > 0 ?
            <TextField
            select
            label="Select Assessment"
            variant="outlined"
            style={{ marginBottom:30}}
            value={exams}
            onClick={()=>{
              handlegetAssessment(exams)
            }
            }
            onChange={(e)=>setExams(e.target.value)}
            >
              {
                getExamsByLevelState.exams.map((option)=>(
                    <MenuItem key={option.id} value={option.id}>
                    {option.name}
                   
                  </MenuItem>
                ))
              }
            
            </TextField> : "No Assessment Found"}
           
            <Button 
            variant="contained"
             color="primary" 
             size="large" 
             disabled={ exams ? false : true}
             onClick={
               ()=>handleSubmit()
              }
             style={{borderStartEndRadius:5}}>
              Start Assessment
            </Button>
         </div>
       </div>
       {
        !getExamAndQuestionState.exams[0]&& !exams? null:
        <span style={{ fontSize:20}}>This Assessments will be available till: 
        {moment(getExamAndQuestionState.exams[0].startDate).format("MMMM Do YYYY, h:mm:ss a")}</span>
        }
       <img
            src="../../Assets/images/reb.jpg"
            alt="Assessment Image"
            className="banner" 
          />
    </div>
    <Footer/>
    </>
  )
}
export default  AssessmentSelect