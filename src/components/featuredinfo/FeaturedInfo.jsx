import React from 'react';
import './featuredinfo.css';
import {ArrowDownward,ArrowUpward} from '@material-ui/icons';
import { getAllPrimaryStudents } from '../../redux/actions/getPrimaryStudentsAction';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function FeaturedInfo() {

    const dispatch = useDispatch();
  const primaryStudentsState = useSelector((state) => state.getPrimaryStudent);
  const [students,setStudents]=useState([]);
    
  useEffect( () => {
    async function fetchData(){
    if (!primaryStudentsState.loading) {
      if (primaryStudentsState.students) {
        setStudents(primaryStudentsState.students);
        await dispatch(getAllPrimaryStudents());
      }
    }
}
    fetchData();
  }, [primaryStudentsState.students]);

    return (
<>

        <div className="featured" >
            <div className="featuredItem">
             <span className="featuredTitle">Total Students In Primary (P6)</span>
             <div className="featuredMoneyContainer">
                 <span className="featuredStudent">46</span>
                 <span className="featuredRate">
                     Students <ArrowDownward className="featuredIcon negative" />
                 </span>
             </div>
             <span className="featuredSub">Compared to last Month</span>
            </div>
            <div className="featuredItem">
             <span className="featuredTitle">Total Student In Ordinary Level (S3)</span>
             <div className="featuredMoneyContainer">
                 <span className="featuredStudent">$4,000</span>
                 <span className="featuredRate">
                     Students <ArrowDownward className="featuredIcon negative"/>
                 </span>
             </div>
             <span className="featuredSub">Compared to last Month</span>
            </div>
             
            <div className="featuredItem">
             <span className="featuredTitle">Total Asssements</span>
             <div className="featuredMoneyContainer">
                 <span className="featuredStudent">4,000</span>
                 <span className="featuredRate">
                     Assessments <ArrowDownward className="featuredIcon negative" />
                 </span>
             </div>
             <span className="featuredSub">Compared to last Month</span>
            </div>
            <div className="featuredItem">
             <span className="featuredTitle">Total number of Schools</span>
             <div className="featuredMoneyContainer">
                 <span className="featuredStudent">65,000</span>
                 <span className="featuredRate">
                     P6 & S3<ArrowUpward className="featuredIcon "/>
                 </span>
                
             </div>
             <span className="featuredSub">Compared to last Month</span>
            </div>
        </div>
      
        </>
    )
}
