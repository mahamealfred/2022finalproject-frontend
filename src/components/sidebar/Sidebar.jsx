import React from "react";
import "./sidebar.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
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
import logo from "../../images/reb.jpg";
import { getAllStudentNumbersAction } from "../../redux/actions/getAllStudentNumbersAction";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { data } from "../charts/RadarChart";
import { dataOrdi } from "../charts/oridinaryLevelCharts/RadarChart";
import { p6schoolPerformance} from "../../components/widgetsLarge/WidgetLarge";
import {s3SchoolsPerformance} from "../../components/widgetsLarge/OrdinaryLevelWidgetLarge";
export default function Sidebar() {
  const dispatch = useDispatch();
  const todaydate = new Date().toISOString().slice(0, 10);
  const numbersState = useSelector((state) => state.getAllStudentNumbers);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await dispatch(getAllStudentNumbersAction());
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!numbersState.loading) {
        if (numbersState.students) {
          setStudents(numbersState.students);
        }
      }
    }
    fetchData();
  }, [!numbersState.students]);

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
    doc.text("Phone: 320", 20, 55);
    doc.text("Email: info@reb.rw", 20, 60);
    doc.text("Address:P.O. BOX 3817, Kigali, Rwanda", 20, 65);
    doc.setFont("Helvertica", "normal");
    doc.text(`Date ${todaydate}`, 140, 75);
    doc.setFont("Helvertica", "bold");
    doc.text(`Primary Students Performance Report`, 67, 85);

    const tableColumn = [];
    const tableRows = [];
    const columnData = ["Primary Students Performance Analysis"];

    tableColumn.push(columnData);
    data.map((dt) => {
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
    doc.text("Phone: 320", 20, 55);
    doc.text("Email: info@reb.rw", 20, 60);
    doc.text("Address:P.O. BOX 3817, Kigali, Rwanda", 20, 65);
    doc.setFont("Helvertica", "normal");
    doc.text(`Date ${todaydate}`, 140, 75);
    doc.setFont("Helvertica", "bold");
    doc.text(`Ordinary level Students Performance Report`, 67, 85);

    const tableColumn = [];
    const tableRows = [];
    const columnData = ["Ordinary Level Students Performance Analysis"];
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
    doc.text("Phone: 320", 20, 55);
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
    doc.text("Phone: 320", 20, 55);
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
    doc.text("Phone: 320", 20, 55);
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
    doc.text(60, 140, "Performance %");
    doc.setFont("Helvertica", "Normal");
    doc.text(120, 100, "P6");
    doc.text(
      120,
      110,
      `${numbersState.students.totalNumberOfStudentInPrimary}`
    );
    doc.text(
      120,
      120,
      `${numbersState.students.totalNumberOfMaleStudentInPrimary}`
    );
    doc.text(
      120,
      130,
      `${numbersState.students.totalNumberOfFemaleStudentInPrimary}`
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
    doc.text("Phone: 320", 20, 55);
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
    doc.text(60, 140, "Performance %");
    doc.setFont("Helvertica", "Normal");
    doc.text(120, 100, "S3");
    doc.text(
      120,
      110,
      `${numbersState.students.totalNumberOfStudentInOrdinaryLevel}`
    );
    doc.text(
      120,
      120,
      `${numbersState.students.totalNumberOfMaleStudentInOrdinaryLevel}`
    );
    doc.text(
      120,
      130,
      `${numbersState.students.totalNumberOfFemaleStudentInOrdinaryLevel}`
    );
 
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.save(`report_${dateStr}.pdf`);
  };
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
            {/* <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li> */}
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
            {/* <Link to="/dashboard/students" className="link">
              <li className="sidebarListItem">
                <MonetizationOn className="sidebarIcon" />
                District performance
              </li>
            </Link> */}
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
            {/* <Link to="/dashboard/questions" className="link">
              <li className="sidebarListItem ">
                <LineStyle className="sidebarIcon" />
                Questions
              </li>
            </Link> */}
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
          <li className="sidebarListItem">
              <IconButton
                className="sidebarIcon"
                color="inherit"
                onClick={handleLogout}
              >
                <InputIcon />
              </IconButton>
              Logout
            </li>
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Reset password
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Edit profile
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
}
