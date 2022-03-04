
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Link} from "react-router-dom";
import "./assessmentsHome.css"
import{ useEffect, useRef } from "react"
import  { init } from "ityped"
import Topbar from './topbar/Topbar';
import HomeTopbar from '../../homeTopbar/HomeTopbar';
import Footer from '../../Footer/Footer';

export default function AssessmentsHome() {

  return (
    <>
    <Topbar />
    <div className='header'>
      <div className='headerTitles'>
      <span className='headerTitlesSm'>Primary and Ordinary2 level Quality Education Booster System</span>
      <span className='headerTitlesLg'>REB</span>
      </div>
   <img 
   className='headerImg'
   src="../../Assets/images/students5.jpg"
   alt=''
   />
</div>
<Footer/>
    </>
  )
}
