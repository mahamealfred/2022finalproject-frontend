import { Button, MenuItem, TextField } from '@mui/material';
import './AssessmentHome.css';
import Categories, { } from '../../../../Data/Categories';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import ErrorMessage from '../../../errorMessage/ErrorMessage'

const AssessmentHome= () =>{

  const [category, setCategory]=useState("");  
  const [difficulty, setDifficulty]=useState(" ");
  const [name,setName]=useState(" ");
  const [error,setError]=useState(false);
  const history=useHistory();
  
  const handleSubmit=()=>{
    if(!category|| !difficulty|| !name){
      setError(true);
      return;
    }
    else{
      setError(false)
    // fetchQuestions(category, difficulty);
     console.log("alfred")
       history.push("/assessment/assessments/questions")
    }
   
  }

  return (
    <>
    <div className="content">
       <div className="settings">
         <span style={{ fontSize:30}}>Assessment Settings</span>
         <div className='settings_select'>
          { error && <ErrorMessage>Please Fill All The Fields</ErrorMessage>}
           <TextField 
           style={{ marginBottom: 25}}
           label="Enter your name"
           variant="outlined" 
           value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <TextField
            select
            label="Select Category"
            variant="outlined"
            style={{ marginBottom:30}}
            onChange={(e)=>setCategory(e.target.value)}
            value={category}
            >
              {
                Categories.map((cat)=>(
                  <MenuItem key={cat.category} value={cat.value}>
                    {cat.category}
                  </MenuItem>
                ))
              }
            
            </TextField>
            <TextField
            select
            label="Select Difficulity"
            variant="outlined"
            style={{ marginBottom: 30}}
            onChange={(e)=>setDifficulty(e.target.value)}
            value={difficulty}
            >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
            </TextField>
            <Button 
            variant="contained"
             color="primary" 
             size="large" 
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
    </>
  )
}
export default  AssessmentHome