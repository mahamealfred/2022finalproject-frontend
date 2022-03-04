import { Button } from '@mui/material';
import React from 'react';
import { MousePointer } from 'react-feather';
import {useHistory} from "react-router-dom";
import "./topbar.css"
const Topbar = () => {

    const history=useHistory();
    const handleClick=()=>{
        history.push('/assessments/studentLogin')
    }
  return (
    <div className="topbar">
    <div className="topbarWrapper">
      <div className="topLeft">
        <img
          src="../Assets/images/reb.jpg"
          alt=""
          className="topAvatar"
        />
      
      </div>
      <div className="leftTopBar">
        <ul className='topList'>
            <li className='toplistItem' >HOME</li>
            <li className='toplistItem' >ABOUT</li>
            <li className='toplistItem' >CONTACT</li>
        </ul>
        </div>
      <div className="toRight">
       <Button
       variant="contained"
       color="primary"
       onClick={handleClick()}
       >Go to Assessment</Button>
      </div>
    </div>
  </div>
  )
};

export default Topbar;
