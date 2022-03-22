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
import InputIcon from "@material-ui/icons/Input";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getSpecificStudentNumberInSchoolAction } from "../../../redux/actions/getSpecificStudentNumberInSchoolAction";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../../images/reb.jpg";

import { IconButton } from "@material-ui/core";
export default function Sidebar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);

  const studentsState = useSelector(
    (state) => state.getSpecificStudentNumberInSchool
  );

  useEffect(() => {
    async function fetchData() {
      await dispatch(getSpecificStudentNumberInSchoolAction());
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!studentsState.loading) {
        if (studentsState.students) {
          setStudents(studentsState.students);
        }
      }
    }
    fetchData();
  }, [!studentsState.students]);

  const generateReports = () => {
    const doc = new jsPDF();
    
    doc.addImage(logo, "JPEG", 15, 20, 40, 40);
    doc.setFont("Helvertica", "bold");
    doc.text(" Priamry Student List And Performance.", 20, 20);
    doc.setFont("Helvertica", "bold");
    doc.text(60, 60, "Level");
    doc.text(60, 80, "Total Students");
    doc.text(60, 100, "Number OF Male");
    doc.text(60, 120, "Number OF Female");
    doc.text(60, 140, "Performance %");
    doc.setFont("Helvertica", "Normal");
    doc.text(120, 60, "P6");
    doc.text(120, 80, `${studentsState.students[0].totalStudentInPrimary}`);
    doc.text(120, 100, `${studentsState.students[0].totalMaleStudentInPrimary}`);
    doc.text(120, 120, `${studentsState.students[0].totalFemaleStudentInPrimary}`);
    doc.text(120, 140, `${Math.round(
      (studentsState.students[0].primaryStudentPercentage[0]
        .total /
        (studentsState.students[0].primaryStudentPercentage[0]
          .AssessmentCount *
          100)) *
      100
    )} %`);
    doc.addPage();
    doc.setFont("Helvertica", "bold");
    doc.text(" Ordinary Level Student List And Performance.", 20, 20);
    doc.setFont("Helvertica", "bold");
    doc.text(60, 60, "Level");
    doc.text(60, 80, "Total Students");
    doc.text(60, 100, "Number OF Male");
    doc.text(60, 120, "Number OF Female");
    doc.text(60, 140, "Performance %");
    doc.setFont("Helvertica", "Normal");
    doc.text(120, 60, "P6");
    doc.text(120, 80, `${studentsState.students[0].totalStudentInOrdinary}`);
    doc.text(120, 100, `${studentsState.students[0].totalMaleStudentInOrdinary}`);
    doc.text(120, 120, `${studentsState.students[0].totalFemaleStudentInOrdinary}`);
    doc.text(120, 140, `${Math.round(
      (studentsState.students[0].ordinaryStudentPercentage[0]
        .total /
        (studentsState.students[0].ordinaryStudentPercentage[0]
          .AssessmentCount *
          100)) *
      100
    )} %`);
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    
    doc.save(`report_${dateStr}.pdf`);
  };
  const reportStudents = students.filter(
    (student) => student.status === "completed"
  );
  const assignColorToTicketStatus = (student) => {
    if (student.status === "completed") {
      return "p-3 mb-2 bg-success text-white";
    } else if (student.status === "in_progress") {
      return "p-3 mb-2 bg-warning text-dark";
    } else if (student.status === "opened") {
      return "p-3 mb-2 bg-light text-dark";
    }
  };

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
            <Link to="/schooldashboard" className="link">
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
          <h3 className="sideBarTitle">Student Menu</h3>
          <ul className="sidebarList">
            <Link to="/schooldashboard/students" className="link">
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
            <Link to="/schooldashboard/primaryresults" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Primary Level Results
              </li>
            </Link>
            <Link to="/schooldashboard/ordinarylevelresults" className="link">
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
              <IconButton
                color="secondary"
                size="small"
                fontSize="24px"
                onClick={() => generateReports()}
              >
                <Report className="sidebarIcon" />
                Generate General Reports
              </IconButton>
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
