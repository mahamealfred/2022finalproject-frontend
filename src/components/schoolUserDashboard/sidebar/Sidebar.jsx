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
import jwt from "jsonwebtoken";
import axios from "axios";
import { IconButton } from "@material-ui/core";
export default function Sidebar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [schoolName,setSchoolName]=useState("");
  const [students, setStudents] = useState([]);
  const todaydate = new Date().toISOString().slice(0, 10);

  const studentsState = useSelector(
    (state) => state.getSpecificStudentNumberInSchool
  );
  const decode= (token) => {
    const JWT_SECRET="mytokensecret";
    const payload =jwt.verify(token, JWT_SECRET);
     return payload;
  }
  const getSchoolName=async()=>{
   
    // const id = params.id;
     const token =localStorage.getItem('x-access-token');
     if (token) {
     const details=decode(token);
     const schoolId=details.userSchooldbId;
       
     await axios.get(`http://localhost:8000/schools/schoolbyid/${schoolId}`
     ).then(function (response) {
     const res = response.data.data;
    
     return res;
     })
     .then(function (res) {
         setSchoolName(res.name);
         //districtName=res.name;
       console.log("school name",res)
     })
     }
   }
 
  useEffect(() => {
    async function fetchData() {
      await dispatch(getSpecificStudentNumberInSchoolAction());
      getSchoolName();
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
    doc.rect(18, 18, doc.internal.pageSize.width - 44, doc.internal.pageSize.height - 44, 'S');
    doc.addImage(logo, "JPEG", 20, 5, 40, 40);
    doc.setFont("Helvertica", "normal");
    doc.text("Rwanda Basic Education Board", 20, 50);
    doc.text(`School Name: ${schoolName}`, 20, 55);
    doc.text("Email: info@reb.rw", 20, 60);
    doc.setFont("Helvertica", "normal");
    doc.text(`Date ${todaydate}`, 140, 65);
    doc.setFont("Helvertica", "bold");
    doc.text(`Primary Student Report`, 70, 75);
   
    doc.setFont("Helvertica", "bold");
    doc.text(60, 100, "Level");
    doc.text(60, 110, "Total Students");
    doc.text(60, 120, "Number OF Male");
    doc.text(60, 130, "Number OF Female");
    doc.text(60, 140, "Performance %");
    doc.setFont("Helvertica", "Normal");
    doc.text(120, 100, "P6");
    doc.text(120, 110, `${studentsState.students[0].totalStudentInPrimary}`);
    doc.text(120, 120, `${studentsState.students[0].totalMaleStudentInPrimary}`);
    doc.text(120, 130, `${studentsState.students[0].totalFemaleStudentInPrimary}`);
    doc.text(120, 140, `${Math.round(
      (studentsState.students[0].primaryStudentPercentage[0]
        .total /
        (studentsState.students[0].primaryStudentPercentage[0]
          .AssessmentCount *
          100)) *
      100
    )} %`);
    doc.addPage();
    doc.rect(18, 18, doc.internal.pageSize.width - 44, doc.internal.pageSize.height - 44, 'S');
    doc.addImage(logo, "JPEG", 20, 5, 40, 40);
    doc.setFont("Helvertica", "normal");
    doc.text("Rwanda Basic Education Board", 20, 50);
    doc.text(`School Name: ${schoolName}`, 20, 55);
    doc.text("Email: info@reb.rw", 20, 60);
    doc.setFont("Helvertica", "normal");
    doc.text(`Date ${todaydate}`, 140, 65);
    doc.setFont("Helvertica", "bold");
    doc.text(`Ordinary Level Student Report`, 70, 75);
    doc.setFont("Helvertica", "bold");
    doc.text(60, 100, "Level");
    doc.text(60, 110, "Total Students");
    doc.text(60, 120, "Number OF Male");
    doc.text(60, 130, "Number OF Female");
    doc.text(60, 140, "Performance %");
    doc.setFont("Helvertica", "Normal");
    doc.text(120, 100, "S3");
    doc.text(120, 110, `${studentsState.students[0].totalStudentInOrdinary}`);
    doc.text(120, 120, `${studentsState.students[0].totalMaleStudentInOrdinary}`);
    doc.text(120, 130, `${studentsState.students[0].totalFemaleStudentInOrdinary}`);
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
                fontSize="20px"
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
