import React from 'react';
import './featuredinfo.css';
import {ArrowDownward,ArrowUpward} from '@material-ui/icons';
import {getAllStudentNumbersAction} from '../../redux/actions/getAllStudentNumbersAction';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { DialogTitle } from "@mui/material";
export default function FeaturedInfoOrdi() {

    const dispatch = useDispatch();

  const numbersState=useSelector((state)=>state.getAllStudentNumbers);
  const [students,setStudents]=useState([]);

  useEffect(()=>{
      async function fetchData(){
        await dispatch(getAllStudentNumbersAction());
      }
  fetchData();
  },[])
    
  useEffect( () => {
    async function fetchData(){
    if (!numbersState.loading) {
      if (numbersState.students) {
        setStudents(numbersState.students);
      
      }
    }
}
    fetchData();
  }, [!numbersState.students]);
  console.log('data...:',numbersState.students.count)

    return (
<>
{numbersState.loading ? (
        "Loading"
      ) : (
          <>
          <DialogTitle>
            <span className="featuredStudent">Ordinary Level Information (S3)</span>
          </DialogTitle>
        <div className="featured" >
            <div className="featuredItemOrdinary">
             <span className="featuredTitle">Total Students In Ordinary Level (S3)</span>
             <div className="featuredMoneyContainer">
                 <span className="featuredStudent">{numbersState.students.totalNumberOfStudentInOrdinaryLevel}</span>
                 <span className="featuredRate">
                     Students <ArrowDownward className="featuredIcon negative" />
                 </span>
             </div>
             <span className="featuredSub">Quality Education</span>
            </div>
            <div className="featuredItemOrdinary">
             <span className="featuredTitle">Total Male Student In Ordinary   (S3)</span>
             <div className="featuredMoneyContainer">
                 <span className="featuredStudent">{numbersState.students.totalNumberOfMaleStudentInOrdinaryLevel}</span>
                 <span className="featuredRate">
                     Students <ArrowDownward className="featuredIcon negative"/>
                 </span>
             </div>
             <span className="featuredSub">Compared to last Month</span>
            </div>
             
            <div className="featuredItemOrdinary">
             <span className="featuredTitle">Total Number of Female Student in Ordinary (S3)</span>
             <div className="featuredMoneyContainer">
                 <span className="featuredStudent">{numbersState.students.totalNumberOfFemaleStudentInOrdinaryLevel}</span>
                 <span className="featuredRate">
                     Students <ArrowDownward className="featuredIcon negative" />
                 </span>
             </div>
             <span className="featuredSub">Compared to last Month</span>
            </div>
            <div className="featuredItemOrdinary">
             <span className="featuredTitle">Number of Available Assessment In (S3)</span>
             <div className="featuredMoneyContainer">
                 <span className="featuredStudent">{numbersState.students.totalNumberOfAssessmentInOrdinaryLevel}</span>
                 <span className="featuredRate">
                     Assessments<ArrowUpward className="featuredIcon "/>
                 </span>
                
             </div>
             <span className="featuredSub">Compared to last Month</span>
            </div>
        </div>
        </>
      )}

      
        </>
    )
}
