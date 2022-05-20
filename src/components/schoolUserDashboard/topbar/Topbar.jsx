import React from 'react';
import './topbar.css';
import { NotificationsNone,Language, Settings, Logout }  from '@material-ui/icons';
import InputIcon from '@material-ui/icons/Input';
import { useHistory } from 'react-router-dom';
import {useEffect,useState} from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import {
 
  IconButton,

} from '@material-ui/core';
export default function Topbar() {
    const isAuth = localStorage.getItem("x-access-token");
    const history=useHistory();
    const handleLogout=() =>{
        
        localStorage.removeItem('x-access-token');
        localStorage.removeItem('user-data');
        history.push("/", { push: true} );
        
          }
          const [name,setName]=useState("")
          const decode= (token) => {
              const JWT_SECRET="mytokensecret";
              const payload =jwt.verify(token, JWT_SECRET);
               return payload;
            }
           // const history= useHistory();
            useEffect(async() => {
            
              const token =localStorage.getItem('x-access-token');
              if (token) {
              const details=decode(token);
              const schoolId=details.userSchooldbId
              await axios.get(`http://localhost:8000/schools/schoolbyid/${schoolId}`
              ).then(function (response) {
              const res = response.data.data;
             
              return res;
              })
              .then(function (res) {
                  setName(res.name);
                  //districtName=res.name;
                console.log("distict name",res)
              })
          }
      
      
              else{
                return null
              }
          
            }, [])
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo"> School {name}</span>
                     </div>
             <div className="toRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                           <span className="topIconBadge"> 2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                           <span className="topIconBadge"> 2</span>
                    </div>
                    {/* {
                        !isAuth? null:
                    <div className="topbarIconContainer">
                    <IconButton color="inherit" onClick={()=>handleLogout()}>
                    <InputIcon />
                     </IconButton>
                          
                    </div>
} */}
                    <img src="../Assets/images/reb.jpg" alt="" className="topAvatar" />
                </div>

            </div>
         

            
            
            
         </div>
    )
}
