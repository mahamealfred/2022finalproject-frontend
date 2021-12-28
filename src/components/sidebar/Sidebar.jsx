import React from 'react';
import './sidebar.css';
import {LineStyle, Timeline,TrendingUp,Person,MonetizationOn,Report} from '@material-ui/icons';
import {Link} from "react-router-dom";
export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sideBarWrapper">
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/dashboard" className="link">
                        <li className="sidebarListItem active">
                         <LineStyle className="sidebarIcon" />
                         Home
                        </li>
                        </Link>
                        <li className="sidebarListItem">
                         <Timeline  className="sidebarIcon" />
                         Analytics
                        </li>
                        <li className="sidebarListItem">
                         <TrendingUp  className="sidebarIcon" />
                         Performance
                        </li>
                 </ul>


                </div>
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/dashboard/users" className="link">
                    <li className="sidebarListItem">
                         <Person  className="sidebarIcon"/>
                         Users
                        </li>
                        </Link>
                        <Link to="/dashboard/students" className="link">
                        <li className="sidebarListItem">
                         <MonetizationOn  className="sidebarIcon" />
                         Students
                        </li>
                        </Link>
                        <Link to="/dashboard/school" className="link">
                        <li className="sidebarListItem">
                         <Report  className="sidebarIcon" />
                         Schools
                        </li>
                        </Link>

                    </ul>


                </div>
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">Exam Menu</h3>
                    <ul className="sidebarList">
                    <Link to="/dashboard/exams" className="link">
                        <li className="sidebarListItem active">
                         <LineStyle className="sidebarIcon" />
                         Exam
                        </li>
                        </Link>
                        <Link to="/dashboard/questions" className="link">
                        <li className="sidebarListItem">
                         <Timeline  className="sidebarIcon" />
                         Questions
                        </li>
                        </Link>
                        <Link to="/dashboard/results" className="link">
                        <li className="sidebarListItem">
                         <TrendingUp  className="sidebarIcon" />
                        Results
                        </li>
                        </Link>

                    </ul>
                </div>
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem active">
                         <LineStyle className="sidebarIcon" />
                         Mail
                        </li>
                        <li className="sidebarListItem">
                         <Timeline  className="sidebarIcon" />
                         Report
                        </li>
                        <li className="sidebarListItem">
                         <TrendingUp  className="sidebarIcon" />
                         Message
                        </li>

                    </ul>


                </div>
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">Settings</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem active">
                         <LineStyle className="sidebarIcon" />
                         Reset password
                        </li>
                        <li className="sidebarListItem">
                         <Timeline  className="sidebarIcon" />
                         Edit profile
                        </li>
                        <li className="sidebarListItem">
                         <TrendingUp  className="sidebarIcon" />
                         Logout
                        </li>
                        <li className="sidebarListItem">
                         <Person  className="sidebarIcon"/>
                         Users
                        </li>


                    </ul>


                </div>

            </div>
        </div>
    )
}
