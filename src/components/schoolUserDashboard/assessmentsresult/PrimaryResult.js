import * as React from "react";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";

import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getPrimaryResultsBySchoolUserAction } from "../../../redux/actions/getPrimaryResultsBySchoolUserAction";
import { getAvailablePrimaryExamsDoneAction } from "../../../redux/actions/getAvailableExamsDoneAction";
import { DialogTitle } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";

import { MenuItem } from "@material-ui/core";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Report } from "@material-ui/icons";
import { Search as SearchIcon } from "react-feather";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  CardContent,
  InputAdornment,
  SvgIcon,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import logo from "../../../images/reb.jpg";
import "./primaryresult.css";
import PieChartPri from "./charts/primaryresultChartAnalysis/PieChart";
import BarChartPri from "./charts/primaryresultChartAnalysis/BarChart";
export default function PrimaryResult({ openn, ...rest }) {
  const dispatch = useDispatch();
  const primaryResultsState = useSelector(
    (state) => state.getPrimaryResultsBySchoolUser
  );
  const getAvailablePrimaryExamsDoneState = useSelector(
    (state) => state.getAvailablePrimaryExamsDone
  );

  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [examId, setExamId] = useState("");
  const todaydate = new Date().toISOString().slice(0, 10);
  const [exams, setExams] = useState("");

  //const [value, setValue] = React.useState(new Date());

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  

  const getExamByIdData = async (id) => {
    setExamId(id);
    console.log("exam id id ", id);
    await dispatch(getPrimaryResultsBySchoolUserAction(id));
    
            if (primaryResultsState.results) {
              setResults(primaryResultsState.results);
            }
          
        
    
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     if (!primaryResultsState.loading) {
  //       if (primaryResultsState.results) {
  //         setResults(primaryResultsState.results);
  //       }
  //     }
  //   }
  //   fetchData();
  // }, [primaryResultsState.results]);

  useEffect(() => {
    async function fetchData() {
      await dispatch(getAvailablePrimaryExamsDoneAction());
  
    }
    fetchData();
  }, []);
  const generatePrimaryStudentsResult = () => {
    const doc = new jsPDF();
    doc.addImage(logo, "JPEG", 20, 5, 40, 40);
    doc.setFont("Helvertica", "normal");
    doc.text("Rwanda Basic Education Board", 20, 50);
    doc.text("School Name:", 20, 55);
    doc.text("Email: info@reb.rw", 20, 60);
    results.map((result) => {
      doc.text(`${result.exam.level} ${result.exam.name} Results`, 20, 65);
    });
    doc.setFont("Helvertica", "normal");
    doc.text(`Date ${todaydate}`, 140, 65);
    doc.setFont("Helvertica", "bold");
    doc.text("Primary Student Report", 70, 75);
    const tableColumn = [
      "Full Name",
      "StudentCode",
      "Gender",
      "Assessment",
      "Marks",
      "Level",
    ];
    const tableRows = [];

    results.map((result) => {
      const fullname = result.student.lastname + " " + result.student.firstname;
      const studentResult = [
        fullname,
        result.student.studentcode,
        result.student.gender,
        result.exam.name,
        result.marks,
        result.student.level,
        // format(new Date(student.updated_at), "yyyy-MM-dd")
      ];
      tableRows.push(studentResult);
      console.log(studentResult);
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
  //const reportResults = results.filter(result => result.status === "completed");
  const assignColorToTicketStatus = (result) => {
    if (result.status === "completed") {
      return "p-3 mb-2 bg-success text-white";
    } else if (result.status === "in_progress") {
      return "p-3 mb-2 bg-warning text-dark";
    } else if (result.status === "opened") {
      return "p-3 mb-2 bg-light text-dark";
    }
  };

  const searchHandle = async (e) => {};

  return (
    <>
      <div style={{ flex: 4, height: "auto", width: "400px" }}>
        <span
          className="featuredStudent"
          style={{ fontSize: 20, fontWeight: 600 }}
        >
          <DialogTitle>Primary Level Assessment Results (P6)</DialogTitle>
        </span>
        <Box sx={{ mt: 3 }}>
          <Card>
            <Box sx={{ maxWidth: 300 }}>
              <TextField
                select
                fullWidth
                label="Select Assessment"
                variant="outlined"
                style={{ marginBottom: 30 }}
                onClick={() => 
                  getExamByIdData(exams)
                }
                value={exams}
                onChange={(e) => setExams(e.target.value) }
              >
                {getAvailablePrimaryExamsDoneState.exams.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.subject}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Card>
        </Box>
        {
          !examId? null:
        <div className="homeWidgets">
          <PieChartPri examId={examId} />
          <BarChartPri />
        </div>
}
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
            </CardContent>
            <IconButton
              aria-label="print"
              color="secondary"
              onClick={() => generatePrimaryStudentsResult()}
            >
              <Report />
              Generate Report
            </IconButton>
          </Card>
        </Box>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Student Code</TableCell>
                  <TableCell>Assessment</TableCell>
                  <TableCell>Marks</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>School Level</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <>
                  {results.slice(0, limit).map((result) => (
                    <TableRow
                      hover
                      key={result.id}
                      //  selected={selectedStudentIds.indexOf(student.id) !== -1}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {result.student.lastname}
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
                            {result.student.firstname}
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
                            {result.student.studentcode}
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
                            {result.exam.subject}
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
                            {result.marks}
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
                            {result.student.gender}
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
                            {result.student.level}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>

        <TablePagination
          component="div"
          count={students.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </div>
    </>
  );
}
PrimaryResult.propTypes = {
  students: PropTypes.array.isRequired,
};
