import React from 'react';
import './topbar.css';
import { NotificationsNone,Language, Settings }  from '@material-ui/icons';
import {useEffect,useState} from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
 export let districtName=[]
export default function Topbar() {
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
        const districtId=details.userDistrictdbId
        await axios.get(`http://localhost:8000/districts/districtbyid/${districtId}`
        ).then(function (response) {
        const res = response.data.data;
       
        return res;
        })
        .then(function (res) {
            setName(res.name);
            districtName=res.name;
            console.log("distict name",districtName)
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
                    <span className="logo">{name} District 
                    </span>
                    
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
                    <div className="topbarIconContainer">
                        <Settings />
                          
                    </div>
                    <img src="../Assets/images/reb.jpg" alt="" className="topAvatar" />
                </div>

            </div>
         

            
            
            
         </div>
    )
}
