import React from "react";
import "./homeTopBar.css";
// import { useNavigate } from 'react-router-dom';

import InputIcon from "@material-ui/icons/Input";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function HomeTopbar() {
  const history = useHistory();
  const isAuth = localStorage.getItem("x-access-token");
  const studentCode = localStorage.getItem("dbStudentCode");
  const handleLogout = () => {
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("user-data");
    
    history.push("/assessments", { push: true });
  };
  return (
    
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="topLeft">
            <img src="../../Assets/images/reb.jpg" alt="" className="topAvatar" />
            </div>
            <div className="topCenter">
            <span className="centerText">
            Primary and Ordinary level Quality  Eduction Booster
             </span>
            </div>
            
            <div className="topRight">
            {
                (!isAuth && !studentCode)  ? null: 
            <Stack spacing={2} direction="row">
         <IconButton
                className="sidebarIcon"
                color="inherit"
                onClick={() => handleLogout()}
              >
                <InputIcon />
              </IconButton>
              
           </Stack>
              }
            </div>
       
        </div>

    </div>
  );
}
