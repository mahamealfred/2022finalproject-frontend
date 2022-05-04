import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Link} from "react-router-dom";
import "./home.css"
import{ useEffect, useRef } from "react"
import  { init } from "ityped"

import Topbar from "../../../homeTopbar/HomeTopbar";
import Footer from '../../../Footer/Footer';

export default function Home() {

  return (
    <>
    <Topbar />
    {/* <HomeTopbar/> */}
    <div className='header'>
      {/* <div className='headerTitles'>
      <span className='headerTitlesSm'>REB </span>
      </div> */}
   <img 
   className='headerImg'
   src="../../Assets/images/students5.jpg"
   alt=''
   />
   <div  className='startassessment'>
   <Button
         
         style={{
          borderRadius: 10,
          backgroundColor: "#F9842C",
          fontSize: "18px",
          alignSelf:"center", marginTop:20 
          }}
         variant="contained"
          size="large"
         
          href="/assessments/studentLogin"
          
        >
          Go To Assessment 
        </Button>
   </div>
    
</div>
<Footer/>
    </>
  )
}
