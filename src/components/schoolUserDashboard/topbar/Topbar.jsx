import React from 'react';
import './topbar.css';
import { NotificationsNone,Language, Settings, Logout }  from '@material-ui/icons';
import InputIcon from '@material-ui/icons/Input';
import { useHistory } from 'react-router-dom';
import {
 
  IconButton,

} from '@material-ui/core';
export default function Topbar() {
    const history=useHistory();
    const handleLogout=() =>{
        
        localStorage.removeItem('x-access-token');
        localStorage.removeItem('user-data');
        history.push("/", { push: true} );
       
        
          }
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">School User</span>
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
                    <IconButton color="inherit" onClick={()=>handleLogout()}>
            <InputIcon />
          </IconButton>
                          
                    </div>
                    <img src="../Assets/images/reb.jpg" alt="" className="topAvatar" />
                </div>

            </div>
         

            
            
            
         </div>
    )
}
