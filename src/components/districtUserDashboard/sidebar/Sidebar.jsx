import React from "react";
import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  Person,
  Report,
} from "@material-ui/icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import InputIcon from '@material-ui/icons/Input';
import { useHistory } from 'react-router-dom';
import {getStudentNumberByDistrictUserAction} from "../../../redux/actions/getStudentNumberByDistrictUserAction";
import {
 
  IconButton,

} from '@material-ui/core';
import logo from "../../images/reb.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {P6Performance} from "../charts/RadarChart";
import { dataOrdi } from "../charts/oridinaryLevelCharts/RadarChart";
import { s3SchoolsPerformance} from "../widgetLarge/WidgetLargeOrdi";
import { p6schoolPerformance} from "../widgetLarge/WidgetLarge";
import jwt from "jsonwebtoken";
import axios from "axios";
export default function Sidebar() {
  
  const dispatch = useDispatch();
  const todaydate = new Date().toISOString().slice(0, 10);
  const studentsState = useSelector(
    (state) => state.getStudentNumberByDistictUser
  );
  const [students, setStudents] = useState([]);
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
          //districtName=res.name;
        console.log("distict name",res)
      })
  }


      else{
        return null
      }
  
    }, [])
 
  useEffect(() => {
    async function fetchData() {
      await dispatch(getStudentNumberByDistrictUserAction());
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

  const generateStudentPerformanceReport = () => {
    const doc = new jsPDF();
    doc.rect(
      18,
      18,
      doc.internal.pageSize.width - 44,
      doc.internal.pageSize.height - 44,
      "S"
    );
    doc.addImage(logo, "JPEG", 20, 5, 40, 40);
    doc.setFont("Helvertica", "normal");
    doc.text("Rwanda Basic Education Board", 20, 50);
    doc.text(`${name} District`, 20, 55);
    doc.text("Email: info@reb.rw", 20, 60);
    doc.text("Address:P.O. BOX 3817, Kigali, Rwanda", 20, 65);
    doc.setFont("Helvertica", "normal");
    doc.text(`Date ${todaydate}`, 140, 75);
    doc.setFont("Helvertica", "bold");
    doc.text(`Primary Students Performance Report`, 67, 85);

    const tableColumn = [];
    const tableRows = [];
    const columnData = ["Primary students performance analytics %"];

    tableColumn.push(columnData);
    P6Performance.map((dt) => {
      const rowsData = [dt.name + ": " + dt.value];
      tableRows.push(rowsData);
    });
    doc.autoTable(tableColumn, tableRows, {
      startY: 100,
      theme: "striped",
      margin: 40,

      styles: {
        font: "courier",
        fontSize: 12,
        overflow: "linebreak",
        cellPadding: 4,
        halign: "center",
        fontWeight: "bold",
      },
      head: [tableColumn],
      body: [tableRows],
    });

    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.save(`report_${dateStr}.pdf`);
  };
  const generateOrdinaryPerformanceReport = () => {
    const doc = new jsPDF();
    doc.rect(
      18,
      18,
      doc.internal.pageSize.width - 44,
      doc.internal.pageSize.height - 44,
      "S"
    );
    doc.addImage(logo, "JPEG", 20, 5, 40, 40);
    doc.setFont("Helvertica", "normal");
    doc.text("Rwanda Basic Education Board", 20, 50);
    doc.text(`${name} District`, 20, 55);
    doc.text("Email: info@reb.rw", 20, 60);
    doc.text("Address:P.O. BOX 3817, Kigali, Rwanda", 20, 65);
    doc.setFont("Helvertica", "normal");
    doc.text(`Date ${todaydate}`, 140, 75);
    doc.setFont("Helvertica", "bold");
    doc.text(`Ordinary level Students Performance Report`, 45, 85);

    const tableColumn = [];
    const tableRows = [];
    const columnData = ["Ordinary level students performance analytics %"];
    tableColumn.push(columnData);
    dataOrdi.map((dt) => {
      const rowsData = [dt.name + ": " + dt.value];
      tableRows.push(rowsData);
    });
    doc.autoTable(tableColumn, tableRows, {
      startY: 100,
      theme: "striped",
      margin: 40,

      styles: {
        font: "courier",
        fontSize: 12,
        overflow: "linebreak",
        cellPadding: 4,
        halign: "center",
        fontWeight: "bold",
      },
      head: [tableColumn],
      body: [tableRows],
    });

    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.save(`report_${dateStr}.pdf`);
  };
  const generatePrimaryShoolPerformanceReport = () => {
    const doc = new jsPDF();
    // doc.rect(
    //   18,
    //   18,
    //   doc.internal.pageSize.width - 44,
    //   doc.internal.pageSize.height - 44,
    //   "S"
    // );
    doc.addImage(logo, "JPEG", 20, 5, 40, 40);
    doc.setFont("Helvertica", "normal");
    doc.text("Rwanda Basic Education Board", 20, 50);
    doc.text(`${name} District`, 20, 55);
    doc.text("Email: info@reb.rw", 20, 60);
    doc.text("Address:P.O. BOX 3817, Kigali, Rwanda", 20, 65);
    doc.setFont("Helvertica", "normal");
    doc.text(`Date ${todaydate}`, 140, 75);
    doc.setFont("Helvertica", "bold");
    doc.text(`P6 School Performance Report`, 67, 85);
   // p6schoolPerformance
   const tableColumn=['School Name','%']
    const tableRows=[]

    p6schoolPerformance.map(school =>{
      const schoolData=[
        school['school.name'],
        school['results.avarage'].toFixed(2)
       // format(new Date(student.updated_at), "yyyy-MM-dd")

      ];
      tableRows.push(schoolData);
    });
   
    doc.autoTable(tableColumn, tableRows, { 
      startY: 100,
    theme: "striped",
    margin: 3,
    styles: {
      font: "courier",
      fontSize: 10,
      overflow: "linebreak",
      cellPadding: 3,
      halign: "center",
      fontWeight: "bold",
    },
    head: [tableColumn],
    body: [tableRows],
     });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.save(`report_${dateStr}.pdf`);
  };
  const generateOrdinaryShoolPerformanceReport = () => {
    const doc = new jsPDF();
    // doc.rect(
    //   18,
    //   18,
    //   doc.internal.pageSize.width - 44,
    //   doc.internal.pageSize.height - 44,
    //   "S"
    // );
    doc.addImage(logo, "JPEG", 20, 5, 40, 40);
    doc.setFont("Helvertica", "normal");
    doc.text("Rwanda Basic Education Board", 20, 50);
    doc.text(`${name} District`, 20, 55);
    doc.text("Email: info@reb.rw", 20, 60);
    doc.text("Address:P.O. BOX 3817, Kigali, Rwanda", 20, 65);
    doc.setFont("Helvertica", "normal");
    doc.text(`Date ${todaydate}`, 140, 75);
    doc.setFont("Helvertica", "bold");
    doc.text(`S3 School Performance Report`, 67, 85);
   // p6schoolPerformance
   const tableColumn=['School Name','%']
    const tableRows=[]

    s3SchoolsPerformance.map(school =>{
      const schoolData=[
        school['school.name'],
        school['results.avarage'].toFixed(2)
       // format(new Date(student.updated_at), "yyyy-MM-dd")

      ];
      tableRows.push(schoolData);
    });
   
    doc.autoTable(tableColumn, tableRows, { 
      startY: 100,
    theme: "striped",
    margin: 3,
    styles: {
      font: "courier",
      fontSize: 10,
      overflow: "linebreak",
      cellPadding: 3,
      halign: "center",
      fontWeight: "bold",
    },
    head: [tableColumn],
    body: [tableRows],
     });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.save(`report_${dateStr}.pdf`);
  };

  const generateReports = () => {
    const doc = new jsPDF();
    doc.rect(
      18,
      18,
      doc.internal.pageSize.width - 44,
      doc.internal.pageSize.height - 44,
      "S"
    );
    doc.addImage(logo, "JPEG", 20, 5, 40, 40);
    doc.setFont("Helvertica", "normal");
    doc.text("Rwanda Basic Education Board", 20, 50);
    doc.text(`${name} District`, 20, 55);
    doc.text("Email: info@reb.rw", 20, 60);
    doc.text("Address:P.O. BOX 3817, Kigali, Rwanda", 20, 65);
    doc.setFont("Helvertica", "normal");
    doc.text(`Date ${todaydate}`, 140, 75);
    doc.setFont("Helvertica", "bold");
    doc.text(`Primary Student Report`, 67, 85);

    doc.setFont("Helvertica", "bold");
    doc.text(60, 100, "Level");
    doc.text(60, 110, "Total Students");
    doc.text(60, 120, "Number OF Male");
    doc.text(60, 130, "Number OF Female");
    doc.text(60, 140, "Performance ");
    doc.setFont("Helvertica", "Normal");
    doc.text(120, 100, "P6");
    doc.text(
      120,
      110,
      `${studentsState.students[0].totalStudentInPrimary}`
    );
    doc.text(
      120,
      120,
      `${studentsState.students[0].totalMaleStudentInPrimary}`
    );
    doc.text(
      120,
      130,
      `${studentsState.students[0].totalFemaleStudentInPrimary}`
    );
    doc.text(
      120,
      140,
      `${(
        (studentsState.students[0].primaryStudentPercentage[0]
          .total /
          (studentsState.students[0].primaryStudentPercentage[0]
            .AssessmentCount *
            100)) *
        100
      ).toFixed(2)}`+"%"
    );
    doc.addPage();
    doc.rect(
      18,
      18,
      doc.internal.pageSize.width - 44,
      doc.internal.pageSize.height - 44,
      "S"
    );
    doc.addImage(logo, "JPEG", 20, 5, 40, 40);
    doc.setFont("Helvertica", "normal");
    doc.text("Rwanda Basic Education Board", 20, 50);
    doc.text(`${name} District`, 20, 55);
    doc.text("Email: info@reb.rw", 20, 60);
    doc.text("Address:P.O. BOX 3817, Kigali, Rwanda", 20, 65);
    doc.setFont("Helvertica", "normal");
    doc.text(`Date ${todaydate}`, 140, 75);
    doc.setFont("Helvertica", "bold");
    doc.text(`Ordinary Level Student Report`, 67, 85);
    doc.setFont("Helvertica", "bold");
    doc.text(60, 100, "Level");
    doc.text(60, 110, "Total Students");
    doc.text(60, 120, "Number OF Male");
    doc.text(60, 130, "Number OF Female");
    doc.text(60, 140, "Performance ");
    doc.setFont("Helvertica", "Normal");
    doc.text(120, 100, "S3");
    doc.text(
      120,
      110,
      `${studentsState.students[0].totalStudentInOrdinary}`
    );
    doc.text(
      120,
      120,
      `${studentsState.students[0].totalMaleStudentInOrdinary}`
    );
    doc.text(
      120,
      130,
      `${studentsState.students[0].totalFemaleStudentInOrdinary}`
    );
    doc.text(
      120,
      140,
      `${(
        (studentsState.students[0].ordinaryStudentPercentage[0]
          .total /
          (studentsState.students[0].ordinaryStudentPercentage[0]
            .AssessmentCount *
            100)) *
        100
      ).toFixed(2)}`+"%"
    );
    
 
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.save(`report_${dateStr}.pdf`);
  };
 
  const history=useHistory();
  const handleLogout=() =>{
      
      localStorage.removeItem('x-access-token');
      localStorage.removeItem('user-data');
      history.push("/", { push: true} );
     
      
        }
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
          </ul>
        </div>
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">Schools Menu</h3>
          <ul className="sidebarList">
            <Link to="/districtdashboard/schools" className="link">
              <li className="sidebarListItem">
                <Person className="sidebarIcon"/>
                Schools
              </li>
            </Link>
          </ul>
        </div>
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">Results Menu</h3>
          <ul className="sidebarList">
            <Link to="/districtdashboard/primaryresults" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Primary Level Results
              </li>
            </Link>
            <Link to="/districtdashboard/ordinarylevelresults" className="link">
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Ordinary Level Results
              </li>
            </Link>
          </ul>
        </div>
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">Notifications Menu & Report</h3>
          <ul className="sidebarList">
            {/* <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Mail
            </li> */}
            <li className="sidebarListItem">
              <IconButton
                color="secondary"
                size="small"
                fontSize="20px"
                onClick={() => generateReports()}
              >
                <Report className="sidebarIcon" />
                Generate General Report
              </IconButton>
            </li>
            <li className="sidebarListItem">
              <IconButton
                color="secondary"
                size="small"
                fontSize="20px"
                onClick={() => generateStudentPerformanceReport()}
              >
                <Report className="sidebarIcon" />
                P6 Students Performance Report
              </IconButton>
            </li>
            <li className="sidebarListItem">
              <IconButton
                color="secondary"
                size="small"
                fontSize="20px"
                onClick={() => generateOrdinaryPerformanceReport()}
              >
                <Report className="sidebarIcon" />
                S3 Students Performance Report
              </IconButton>
            </li>
            <li className="sidebarListItem">
              <IconButton
                color="secondary"
                size="small"
                fontSize="20px"
                onClick={() => generatePrimaryShoolPerformanceReport()}
              >
                <Report className="sidebarIcon" />
                P6 Schools Performance Report
              </IconButton>
            </li>
            <li className="sidebarListItem">
              <IconButton
                color="secondary"
                size="small"
                fontSize="20px"
                onClick={() => generateOrdinaryShoolPerformanceReport()}
              >
                <Report className="sidebarIcon" />
                S3 Schools Performance Report
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
            <IconButton className="sidebarIcon" color="inherit" onClick={()=>handleLogout()}>
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
