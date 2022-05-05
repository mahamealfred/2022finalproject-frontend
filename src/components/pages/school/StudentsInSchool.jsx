import React from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import Button from "@material-ui/core/Button";
import "./studentInSchool.css";
import {
  Card,
  Table,
  Box,
  TableBody,
  TableCell,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Search as SearchIcon } from "react-feather";
import IconButton from "@material-ui/core/IconButton";
import { useParams } from "react-router-dom";
import { getStudentsBySchoolIdAction } from "../../../redux/actions/getStudentsBySchoolIdAction";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { Report } from "@material-ui/icons";
import logo from "../../images/reb.jpg";
import BarChartOrd from "../school/schoolAnalytics/ordinarylevel/BarChart";
import FeaturedInfoOrdi from "../school/schoolAnalytics/ordinarylevel/FeaturedInfo";
import PieChartOrdi from "../school/schoolAnalytics/ordinarylevel/PieChart";
import FeaturedInfoPri from "../school/schoolAnalytics/primary/FeaturedInfo";
import PieChartPri from "../school/schoolAnalytics/primary/PieChart";
import BarChartPri from "../school/schoolAnalytics/primary/BarChart";
import DoughnutChartOrdi from "../school/schoolAnalytics/ordinarylevel/DoughnutChart";
import DoughnutChartPri from "../school/schoolAnalytics/primary/DoughnutChart";
import axios from "axios";
import { DialogTitle } from "@mui/material";
const StudentsInSchool = ({ ...rest }) => {
  // const dispatch = useDispatch()

  const [search, setSearch] = useState(false);
  const [schoolId, setSchoolId] = useState("");
  const [students, setStudents] = useState([]);
  const [schoolName,setSchoolName]=useState('');
  const params = useParams();
  const dispatch = useDispatch();

  const getStudentBySchoolIdState = useSelector(
    (state) => state.getStudentBySchoolId
  );
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [results, setResults] = useState({});
 
  const todaydate=new Date().toISOString().slice(0,10);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  const getSchoolName=async()=>{
    const id = params.id;
      
    await axios.get(`http://localhost:8000/schools/schoolbyid/${id}`
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
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const todaysDate = () => {
    const time = new Date(Date.now());
    const year = time.getFullYear();
    const month = time.getMonth();
    const day = time.getDay();
    const date = `${year}-${month}-${day}`;
    return date;
  };

  const generateListOfAllStudent = () => {
    const doc = new jsPDF();
    doc.addImage(logo, "JPEG", 20, 5, 40, 40);
    doc.setFont("Helvertica", "normal");
    doc.text("Rwanda Basic Education Board", 20, 50);
    doc.text(`School Name: ${schoolName}`, 20, 55);
    doc.text("Email: info@reb.rw", 20, 60);
    doc.setFont("Helvertica", "normal");
    doc.text(`Date ${todaydate}`, 140, 65);
    doc.setFont("Helvertica", "bold");
    doc.text("Primary Student Assessment Report", 70, 75);
    const tableColumn = [
      "Last Name",
      "First Name",
      "StudentCode",
      "Gender",
      "Level",
      "Marks",
    ];
    const tableRows = [];

    students.map((student) => {
      const marks = () => {
        if (!student.results[0]) {
          return "No Marks";
        }
        return student.results[0].marks;
      };

      const studentData = [
        student.lastname,
        student.firstname,
        student.studentcode,
        student.gender,
        student.level,
        marks(),
        // format(new Date(student.updated_at), "yyyy-MM-dd")
      ];
      if (student.level === "P6") {
        tableRows.push(studentData);
      } else {
        return null;
      }
      console.log(studentData);
    });

    doc.autoTable(tableColumn, tableRows, {
      startY: 80,
      theme: "striped",
      margin: 10,
      styles: {
        font: "courier",
        fontSize: 12,
        overflow: "linebreak",
        cellPadding: 3,
        halign: "center",
      },
      head: [tableColumn],
      body: [tableRows],
    });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.save(`report_${dateStr}.pdf`);
  };
  const generateListOfAllStudentOrdinaryLevel = () => {
    const doc = new jsPDF();
    doc.addImage(logo, "JPEG", 20, 5, 40, 40);
    doc.setFont("Helvertica", "normal");
    doc.text("Rwanda Basic Education Board", 20, 50);
    doc.text(`School Name: ${schoolName}`, 20, 55);
    doc.text("Email: info@reb.rw", 20, 60);
    doc.setFont("Helvertica", "normal");
    doc.text(`Date ${todaydate}`, 140, 65);
    doc.setFont("Helvertica", "bold");
    doc.text("Ordinary Level Student Assessment Report", 70, 75);
    const tableColumn = [
      "Last Name",
      "First Name",
      "StudentCode",
      "Gender",
      "Level",
      "Marks",
    ];
    const tableRows = [];

    students.map((student) => {
      const marks = () => {
        if (!student.results[0]) {
          return "No Marks";
        }
        return student.results[0].marks;
      };

      const studentData = [
        student.lastname,
        student.firstname,
        student.studentcode,
        student.gender,
        student.level,
        marks(),
        // format(new Date(student.updated_at), "yyyy-MM-dd")
      ];
      if (student.level === "S3") {
        tableRows.push(studentData);
      } else {
        return null;
      }
      console.log(studentData);
    });

    doc.autoTable(tableColumn, tableRows, {
      startY: 80,
      theme: "striped",
      margin: 10,
      styles: {
        font: "courier",
        fontSize: 12,
        overflow: "linebreak",
        cellPadding: 3,
        halign: "center",
      },
      head: [tableColumn],
      body: [tableRows],
    });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.save(`report_${dateStr}.pdf`);
  };


  useEffect(() => {
   getSchoolName();
    const id = params.id;
  
    setSchoolId(id);
    dispatch(getStudentsBySchoolIdAction(id));
  }, []);

  useEffect(() => {
    if (!getStudentBySchoolIdState.loading) {
      if (getStudentBySchoolIdState.students) {
        setStudents(getStudentBySchoolIdState.students);
      }
    }
  }, [!getStudentBySchoolIdState.loading]);

  const trimString = (s) => {
    var l = 0,
      r = s.length - 1;
    while (l < s.length && s[l] == " ") l++;
    while (r > l && s[r] == " ") r -= 1;
    return s.substring(l, r + 1);
  };
  const compareObjects = (o1, o2) => {
    var k = "";
    for (k in o1) if (o1[k] != o2[k]) return false;
    for (k in o2) if (o1[k] != o2[k]) return false;
    return true;
  };
  const itemExists = (haystack, needle) => {
    for (var i = 0; i < haystack.length; i++)
      if (compareObjects(haystack[i], needle)) return true;
    return false;
  };
  const searchHandle = async (e) => {
    setSearch(true);
    const searchKey = e.target.value;
    // console.log(e.target.value)

    try {
      var results = [];
      const toSearch = trimString(searchKey); // trim it
      for (var i = 0; i < students.length; i++) {
        for (var key in students[i]) {
          if (students[i][key] != null) {
            if (
              students[i][key].toString().toLowerCase().indexOf(toSearch) !=
              -1
            ) {
              if (!itemExists(results, students[i]))
                results.push(students[i]);
            }
          }
        }
      }
      setResults(results);
    } catch (error) {
      console.log(error);
    }
  };
 
  


  return (
    <div style={{ flex: 4, height: "auto", width: "400px" }}>
       <DialogTitle>
            <span style={{ fontWeight:"600",fontSize:"30px", color:"#F9842C" }}>{schoolName} School</span>
          </DialogTitle>
      <div className="homeWidgets">
        <FeaturedInfoOrdi />
      </div>
      <div className="homeWidgets">
        <PieChartOrdi />
        <BarChartOrd />
      </div>
      <div className="homeWidgets">
        <DoughnutChartOrdi />
        <BarChartOrd />
      </div>
      <div className="homeWidgets">
        <FeaturedInfoPri />
      </div>
      <div className="homeWidgets">
        <PieChartPri />
        <BarChartPri />
      </div>
      <div className="homeWidgets">
        <DoughnutChartPri />
        <BarChartOrd />
      </div>
      <Card {...rest}>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  onChange={(e) => searchHandle(e)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search Student"
                  variant="outlined"
                />
              </Box>
              <IconButton
                aria-label="print"
                color="secondary"
                onClick={() => generateListOfAllStudent()}
              >
                <Report />
                Generate Primary Level Report
              </IconButton>
              <IconButton
                aria-label="print"
                color="secondary"
                onClick={() => generateListOfAllStudentOrdinaryLevel()}
              >
                <Report />
                Generate Ordinary Level Report
              </IconButton>
            </CardContent>
          </Card>
          <Box></Box>
        </Box>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Student Code</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Marks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                    search?(
                      <>
                      {results.slice(0, limit).map((student) => (
                        <TableRow
                          hover
                          key={student.id}
                          selected={selectedProductIds.indexOf(student.id) !== -1}
                        >
                          <TableCell>
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {student.lastname + " " + student.firstname}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {student.studentcode}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {student.gender}
                              </Typography>
                            </Box>
                          </TableCell>
    
                          <TableCell>
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {student.level}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                <Box
                                  sx={{
                                    alignItems: "center",
                                    display: "flex",
                                  }}
                                >
                                  {!student.results[0] ? (
                                    "No Marks"
                                  ) : (
                                    <Typography color="textPrimary" variant="body1">
                                      {student.results[0].marks}
                                    </Typography>
                                  )}
                                </Box>
                              </Typography>
                            </Box>
                          </TableCell>
    
                          <TableCell
                            color="textPrimary"
                            variant="body1"
                          ></TableCell>
                        </TableRow>
                      ))}
                    </>
                    ):(
                <>
                  {students.slice(0, limit).map((student) => (
                    <TableRow
                      hover
                      key={student.id}
                      selected={selectedProductIds.indexOf(student.id) !== -1}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {student.lastname + " " + student.firstname}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {student.studentcode}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {student.gender}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {student.level}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              {!student.results[0] ? (
                                "No Marks"
                              ) : (
                                <Typography color="textPrimary" variant="body1">
                                  {student.results[0].marks}
                                </Typography>
                              )}
                            </Box>
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell
                        color="textPrimary"
                        variant="body1"
                      ></TableCell>
                    </TableRow>
                  ))}
                </>
                    )}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          // count={products.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </div>
  );
};

StudentsInSchool.propTypes = {
  students: PropTypes.array.isRequired,
};

export default StudentsInSchool;
