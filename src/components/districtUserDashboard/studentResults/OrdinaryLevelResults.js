import * as React from "react";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";

import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getOrdinaryLevelResultsBySchoolUserAction } from "../../../redux/actions/getOrdinaryLevelResultBySchoolUserAction";

import { getOrdinaryLevelExamsAction } from "../../../redux/actions/getOrdinaryLevelExamsAction";

import PerfectScrollbar from "react-perfect-scrollbar";
import { DialogTitle } from "@mui/material";
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

export default function OrdinaryLevelResults({ openn, ...rest }) {
  const dispatch = useDispatch();
  const ordinaryResultsState = useSelector(
    (state) => state.getOrdinaryLevelResultBySchoolUser
  );
  const getOrdinaryLevelExamsState = useSelector(
    (state) => state.getOrdinaryLevelExams
  );

  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);

  const [examId, setExamId] = useState("");

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

  useEffect(() => {
    async function fetchData() {
      await dispatch(getOrdinaryLevelExamsAction());
      setExamId(exams);

      if (!ordinaryResultsState.loading) {
        if (ordinaryResultsState.results) {
          setResults(ordinaryResultsState.results);
          await dispatch(getOrdinaryLevelResultsBySchoolUserAction(examId));
        }
      }
    }
    fetchData();
  }, [ordinaryResultsState.results]);

  const searchHandle = async (e) => {};

  return (
    <>
      <div style={{ flex: 4, height: "auto", width: "400px" }}>
        <span
          className="featuredStudent"
          style={{ fontSize: 20, fontWeight: 600 }}
        >
          <DialogTitle>Ordinary Level Assessment Results (S3)</DialogTitle>
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
            <Box sx={{ maxWidth: 300 }}>
            <TextField
                select
                fullWidth
                label="Select School"
                variant="outlined"
                style={{ marginBottom: 30 }}
                value={exams}
                onChange={(e) => setExams(e.target.value)}
              >
                {getOrdinaryLevelExamsState.exams.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.subject}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                label="Select Assessment"
                variant="outlined"
                style={{ marginBottom: 30 }}
                value={exams}
                onChange={(e) => setExams(e.target.value)}
              >
                {getOrdinaryLevelExamsState.exams.map((option) => (
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
