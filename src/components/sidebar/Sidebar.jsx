import React from 'react';
import './sidebar.css';
import {LineStyle, Timeline,TrendingUp,Person,Gradient,MonetizationOn,Report} from '@material-ui/icons';
import {Link} from "react-router-dom";
export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sideBarWrapper">
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" className="link">
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
                         Sales
                        </li>
                 </ul>


                </div>
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/users" className="link">
                    <li className="sidebarListItem">
                         <Person  className="sidebarIcon"/>
                         Users
                        </li>
                        </Link>
                        <Link to="/products" className="link">
                        <li className="sidebarListItem active">
                         <Gradient className="sidebarIcon" />
                         Products
                        </li>
                        </Link>
                        <Link to="/students" className="link">
                        <li className="sidebarListItem">
                         <MonetizationOn  className="sidebarIcon" />
                         Students
                        </li>
                        </Link>
                        <li className="sidebarListItem">
                         <Report  className="sidebarIcon" />
                         Reports
                        </li>

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
                         FeedBack
                        </li>
                        <li className="sidebarListItem">
                         <TrendingUp  className="sidebarIcon" />
                        Messages
                        </li>

                    </ul>
                </div>
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem active">
                         <LineStyle className="sidebarIcon" />
                         Manage
                        </li>
                        <li className="sidebarListItem">
                         <Timeline  className="sidebarIcon" />
                         Analytics
                        </li>
                        <li className="sidebarListItem">
                         <TrendingUp  className="sidebarIcon" />
                         Report
                        </li>

                    </ul>


                </div>
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">Settings</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem active">
                         <LineStyle className="sidebarIcon" />
                         Home
                        </li>
                        <li className="sidebarListItem">
                         <Timeline  className="sidebarIcon" />
                         Analytics
                        </li>
                        <li className="sidebarListItem">
                         <TrendingUp  className="sidebarIcon" />
                         Sales
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
