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

const AssessmentSelect= () =>{

  const getExamsByLevelState=useSelector((state)=>state.getExamsByLevel)
  const [error,setError]=useState(false);
  
  const dispatch = useDispatch();
  const history=useHistory();
  const [exams,setExams]=useState('');
  
  const handleSubmit=()=>{
      setError(false)
       history.push(`/assessments/select/${exams}`)
  }

  useEffect( () => {
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
            onChange={(e)=>setExams(e.target.value)}
            >
              {
                getExamsByLevelState.exams.map((option)=>(
                    <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))
              }
            
            </TextField> : "no exams found"}
           
            <Button 
            variant="contained"
             color="primary" 
             size="large" 
             disabled={ exams ? false : true}
             onClick={()=>handleSubmit()}
             style={{borderStartEndRadius:5}}>
              Start Assessment
            </Button>
         </div>
       </div>
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