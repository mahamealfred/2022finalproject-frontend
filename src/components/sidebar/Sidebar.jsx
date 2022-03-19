import React from "react";
import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  Person,
  MonetizationOn,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import InputIcon from "@material-ui/icons/Input";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
export default function Sidebar() {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("user-data");
    history.push("/", { push: true });
  };
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
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <Link to="/dashboard/users" className="link">
              <li className="sidebarListItem">
                <Person className="sidebarIcon" />
                Users
              </li>
            </Link>
          </ul>
        </div>
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">District Menu</h3>
          <ul className="sidebarList">
            <Link to="/dashboard/districts" className="link">
              <li className="sidebarListItem active">
                <Person className="sidebarIcon" />
                Districts
              </li>
            </Link>
            <Link to="/dashboard/students" className="link">
              <li className="sidebarListItem">
                <MonetizationOn className="sidebarIcon" />
                District performance
              </li>
            </Link>
          </ul>
        </div>
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">School Menu</h3>
          <ul className="sidebarList">
            <Link to="/dashboard/schools" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Schools
              </li>
            </Link>
            <Link to="/dashboard/students" className="link">
              <li className="sidebarListItem">
                <LineStyle className="sidebarIcon" />
                Students
              </li>
            </Link>
            
          </ul>
        </div>
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">Assessment Menu</h3>
          <ul className="sidebarList">
            <Link to="/dashboard/exams" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Assessments
              </li>
            </Link>
            <Link to="/dashboard/questions" className="link">
              <li className="sidebarListItem ">
                <LineStyle className="sidebarIcon" />
                Questions
              </li>
            </Link>
            
          </ul>
        </div>
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">Results Menu</h3>
          <ul className="sidebarList">
            <Link to="/dashboard/exams" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Primary Results
              </li>
            </Link>
            <Link to="/dashboard/questions" className="link">
              <li className="sidebarListItem ">
                <LineStyle className="sidebarIcon" />
                Ordinary Results
              </li>
            </Link>
            
          </ul>
        </div>
        
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">Notifications Menu</h3>
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
              <IconButton
                className="sidebarIcon"
                color="inherit"
                onClick={() => handleLogout()}
              >
                <InputIcon />
              </IconButton>
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
