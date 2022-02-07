import React from 'react';
import './header.css'
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Header() {
  return (
      <>
      
      <div className='header'>
          {/* <Link to='/assessment/assessments'> Quality Education Assessment Hub</Link> */}
          <p className='title'>Quality Education Assessment Hub</p>
          <hr className="divider"/>
      </div>
      </>
  )
}
