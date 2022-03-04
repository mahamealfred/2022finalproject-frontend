import React from "react";
import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  Person,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sideBarWrapper">
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/districtdashboard" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
          </ul>
        </div>
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">Schools Menu</h3>
          <ul className="sidebarList">
            <Link to="/districtdashboard/school" className="link">
              <li className="sidebarListItem">
                <Person className="sidebarIcon" />
                Students
              </li>
            </Link>
          </ul>
        </div>
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">Results Menu</h3>
          <ul className="sidebarList">
            <Link to="/districtdashboard/exams" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Primary Level Results
              </li>
            </Link>
            <Link to="/districtdashboard/results" className="link">
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Ordinary Level Results
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
              <Report className="sidebarIcon" />
              Reports
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
              <Timeline className="sidebarIcon" />
              Edit profile
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
