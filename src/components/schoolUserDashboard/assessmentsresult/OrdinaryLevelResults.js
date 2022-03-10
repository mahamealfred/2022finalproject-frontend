import * as React from "react";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";

import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getPrimaryResultsBySchoolUserAction } from "../../../redux/actions/getPrimaryResultsBySchoolUserAction";
import { addStudentBySchoolUser } from "../../../redux/actions/addStudentBySchoolUseAction";
import { deleteStudentAction } from "../../../redux/actions/deleteStudentAction";
import { getAllSchool } from "../../../redux/actions/schoolsAction";
import { getAvailablePrimaryExamsDoneAction } from "../../../redux/actions/getAvailableExamsDoneAction";

import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import IconButton from "@material-ui/core/IconButton";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";
import { MenuItem } from "@material-ui/core";

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
import DoughnutChart from "./charts/DoughnutChart";

export default function OrdinaryLevelResults({ openn, ...rest }) {
  const dispatch = useDispatch();
  const primaryResultsState = useSelector(
    (state) => state.getPrimaryResultsBySchoolUser
  );
  const getAvailablePrimaryExamsDoneState = useSelector(
    (state) => state.getAvailablePrimaryExamsDone
  );

  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [examId, setExamId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [level, setLevel] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [exams, setExams] = useState("");

  //const [value, setValue] = React.useState(new Date());

  const [openUpdate, setOpenUpdate] = useState(false);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const levels = [
    {
      value: "P6",
      label: "primary 6",
    },
    {
      value: "S3",
      label: "Ordinary 3",
    },
  ];

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    await dispatch(
      addStudentBySchoolUser({ firstname, lastname, email, dob, gender, level })
    );
    setOpen(false);
    setFirstname("");
    setLastname("");
    setEmail("");
    setDob("");
    setGender("");
    setLevel("");
    await dispatch(getPrimaryResultsBySchoolUserAction(examId));
    console.log("added");
  };

  useEffect(() => {
    async function fetchData() {
      await dispatch(getAvailablePrimaryExamsDoneAction());
      setExamId(exams);
      if (!primaryResultsState.loading) {
        if (primaryResultsState.results) {
          setResults(primaryResultsState.results);
          await dispatch(getPrimaryResultsBySchoolUserAction(examId));
        }
      }
    }
    fetchData();
  }, [primaryResultsState.results]);

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteStudentAction(studentId));
    setOpenDelete(false);
    window.location.reload();
  };

  const searchHandle = async (e) => {};

  return (
    <>
      <div style={{ flex: 4, height: "auto", width: "400px" }}>
        <span
          className="featuredStudent"
          style={{ fontSize: 20, fontWeight: 600 }}
        >
          Ordinary Level Assessment Results (S3)
        </span>
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
            <Box sx={{maxWidth:300}}>
              <TextField
              select
              fullWidth
              label="Select Assessment"
              variant="outlined"
              style={{ marginBottom: 30 }}
              value={exams}
              onChange={(e) => setExams(e.target.value)}
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
OrdinaryLevelResults.propTypes = {
  students: PropTypes.array.isRequired,
};
