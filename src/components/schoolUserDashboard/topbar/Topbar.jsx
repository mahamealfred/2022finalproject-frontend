import React from 'react';
import './topbar.css';
import { NotificationsNone,Language, Settings }  from '@material-ui/icons';

export default function Topbar() {
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
                        <Settings />
                          
                    </div>
                    <img src="../Assets/images/reb.jpg" alt="" className="topAvatar" />
                </div>

            </div>
         

            
            
            
         </div>
    )
}
