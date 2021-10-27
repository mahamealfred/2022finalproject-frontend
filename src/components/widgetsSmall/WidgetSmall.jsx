import React from 'react';
import './widgetSmall.css';
import { Visibility } from '@material-ui/icons';

export default function WidgetSmall() {
    return (
        <div className="widgetSmall">
            <span className="widgetSmallTitle">New join Members</span>
            <ul className="widgetSmallList">
                <li className="widgetSmallListItem">
                    <img src="../../Assets/images/alf1.jpeg" alt="" className="widgetSmallImg"/>
                <div className="widgetSmallUser">
                 <span className="widgetSmallUsrename">Mahame Alfred</span>
                 <span className="widgetSmallUserTitle">Software Developer</span>
                </div>
                <button className="widgetSmallButton">
                 <Visibility className="widgetSmallIcon"/>
                 Display
                </button>
                </li>
                <li className="widgetSmallListItem">
                    <img src="../../Assets/images/alf1.jpeg" alt="" className="widgetSmallImg"/>
                <div className="widgetSmallUser">
                 <span className="widgetSmallUsrename">Mahame Alfred</span>
                 <span className="widgetSmallUserTitle">Software Developer</span>
                </div>
                <button className="widgetSmallButton">
                 <Visibility className="widgetSmallIcon"/>
                 Display
                </button>
                </li>
                <li className="widgetSmallListItem">
                    <img src="../../Assets/images/alf1.jpeg" alt="" className="widgetSmallImg"/>
                <div className="widgetSmallUser">
                 <span className="widgetSmallUsrename">Mahame Alfred</span>
                 <span className="widgetSmallUserTitle">Software Developer</span>
                </div>
                <button className="widgetSmallButton">
                 <Visibility className="widgetSmallIcon"/>
                 Display
                </button>
                </li>

            </ul>
            
        </div>
    )
}
