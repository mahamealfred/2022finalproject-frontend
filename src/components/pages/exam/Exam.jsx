import Button from "@mui/material/Button";
import  React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem } from "@material-ui/core";
//import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getAllExam } from "../../../redux/actions/examsAction";
import { addExamAction } from "../../../redux/actions/addExamAction";
import { deleteExamAction } from "../../../redux/actions/deleteExamAction";
import { updateExamAction } from "../../../redux/actions/updateExamAction";

import DescriptionIcon from '@material-ui/icons/Description';

import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import IconButton from "@material-ui/core/IconButton";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

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

export default function Exam({ openn, ...rest }) {
  const dispatch = useDispatch();
  const examsState = useSelector((state) => state.exams);
  const [exams, setExams] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate,setEndDate]=useState("");

  const addExam = useSelector((state) => state.addExam);
  const deleteExam = useSelector((state) => state.deleteExam);
  const updateExam = useSelector((state) => state.updateExam);
  //const [value, setValue] = React.useState(new Date());
  const [selectedExamIds, setSelectedExamIds] = useState([]);
  const [search, setSearch] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [examId, setExamId] = useState("");
  const [level, setLevel] = useState("");
  const [results, setResults] = useState({});

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const subjects = [
    {
      value: "Mathematics",
      label: "Mathematics",
    },
    {
      value: "English",
      label: "English",
    },
    {
      value: "Physics",
      label: "Physics",
    },
    {
      value: "Kinyarwanda",
      label: "Kinyarwanda",
    },
    {
      value: "Social Study",
      label: "Social Study",
    },
    {
      value: "Chemistry",
      label: "Chemistry",
    },
  ];
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
  const handleCloseUpdate = () => {
    setName("");
    setSubject("");
    setLevel("");
    setStartDate("");

    setOpenUpdate(false);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async () => {
    await dispatch(deleteExamAction(examId));
    setOpenDelete(false);
    window.location.reload();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleAdd = async () => {
    await dispatch(
      addExamAction({
        name,
        subject,
        startDate,
        endDate,
        level,
      })
    );
    setOpen(false);
    setSubject("");
    setName("");
    setStartDate("");
    setLevel("");
    await dispatch(getAllExam());
    console.log("added");
  };

  const handleUpdate = async () => {
    if (!name) {
      return alert("name is required");
    }
    console.log(examId);
    await dispatch(
      updateExamAction({ name, subject, level, startDate,endDate, id: examId })
    );
    setOpenUpdate(false);

    setName("");
    setSubject("");
    setStartDate("");
    setLevel("");
    setSearch(false);
    await dispatch(getAllExam());
  };

  useEffect(() => {
    dispatch(getAllExam());
  }, []);

  useEffect(() => {
    if (!examsState.loading) {
      if (examsState.exams) {
        setExams(examsState.exams);
      }
    }
  }, [examsState.exams]);

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
      for (var i = 0; i < exams.length; i++) {
        for (var key in exams[i]) {
          if (exams[i][key] != null) {
            if (
              exams[i][key].toString().toLowerCase().indexOf(toSearch) !=
              -1
            ) {
              if (!itemExists(results, exams[i]))
                results.push(exams[i]);
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
                placeholder="Search an Assessment"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Button variant="outlined" onClick={handleClickOpen}>
        Add Assessment
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Assessment Details</DialogTitle>
        {
                  !addExam.error? null:
                  <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant="filled" severity="error">
                  {addExam.error}
                   </Alert>
                   </Stack>
                }
        <DialogContent>
          <DialogContentText>
            Please enter Assessment information here.
          </DialogContentText>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            {/* <TextField
              id="outlined-basic"
              label="Subject"
              name="subject"
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
              variant="outlined"
            /> */}
             <TextField
              id="outlined-select-currency"
              select
              onChange={(e) => setSubject(e.target.value)}
              label="subject"
              helperText="Please select your subject"
            >
              {subjects.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-basic"
              label="Description"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              variant="outlined"
            />
            <TextField
              id="date"
              label="Start Date"
              type="date"
              name="startDate"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
             <TextField
              id="date"
              label="End Date"
              type="date"
              name="endDate"
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-select-currency"
              select
              onChange={(e) => setLevel(e.target.value)}
              label="level"
              helperText="Please select your Level"
            >
              {levels.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} color="primary" autoFocus>
            {addExam.loading ? "Loading..." : "Add new Assessment"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openUpdate} onClose={handleClose}>
        <DialogTitle>Update Assessment Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Edit Assessment information here.
          </DialogContentText>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Subject"
              name="subject"
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Description"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              variant="outlined"
            />
            <TextField
              id="date"
              label="Start Date"
              type="date"
              name="startDate"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
             <TextField
              id="date"
              label="End Date"
              type="date"
              name="endDate"
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-select-currency"
              select
              onChange={(e) => setLevel(e.target.value)}
              label="level"
              helperText="Please select your Level"
            >
              {levels.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary" autoFocus>
            {updateExam.loading ? "Loading..." : "Update Assessment"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the Exam below "{name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            {deleteExam.loading ? "Loading..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>Assessment Description</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Update Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
              search?(
                <>
                {results.slice(0, limit).map((exam) => (
                  <TableRow
                    hover
                    key={exam.id}
                    selected={selectedExamIds.indexOf(exam.id) !== -1}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {exam.subject}
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
                          {exam.name}
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
                          {exam.level}
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
                          {moment(exam.startDate).format("DD/MM/YYYY")}
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
                          {moment(exam.endDate).format("DD/MM/YYYY")}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      {moment(exams.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      {moment(exam.updatedAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell color="textPrimary" variant="body1">
                      <IconButton arial-label="add">
                        <Link to={`/dashboard/questions/${exam.id}`}>
                          <DescriptionIcon />
                        </Link>
                      </IconButton>
                      <IconButton
                        aria-label="update"
                        onClick={() => {
                          setExamId(exam.id);
                          setName(exam.name);
                          setSubject(exam.subject);
                          setStartDate(exam.startDate);
                          setEndDate(exam.endDate);

                          setOpenUpdate(true);
                        }}
                      >
                        <BorderColorIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => {
                          setExamId(exam.id);
                          setName(exam.name);
                          setSubject(exam.subject);
                          setLevel(exam.level);
                          setStartDate(exam.startDate);
                          setEndDate(exam.endDate);
                          setOpenDelete(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </>
              ):(
              <>
                {exams.slice(0, limit).map((exam) => (
                  <TableRow
                    hover
                    key={exam.id}
                    selected={selectedExamIds.indexOf(exam.id) !== -1}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {exam.subject}
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
                          {exam.name}
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
                          {exam.level}
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
                          {moment(exam.startDate).format("DD/MM/YYYY")}
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
                          {moment(exam.endDate).format("DD/MM/YYYY")}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      {moment(exams.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      {moment(exam.updatedAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell color="textPrimary" variant="body1">
                      <IconButton arial-label="add">
                        <Link to={`/dashboard/questions/${exam.id}`}>
                          <DescriptionIcon />
                        </Link>
                      </IconButton>
                      <IconButton
                        aria-label="update"
                        onClick={() => {
                          setExamId(exam.id);
                          setName(exam.name);
                          setSubject(exam.subject);
                          setStartDate(exam.startDate);
                          setEndDate(exam.endDate);

                          setOpenUpdate(true);
                        }}
                      >
                        <BorderColorIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => {
                          setExamId(exam.id);
                          setName(exam.name);
                          setSubject(exam.subject);
                          setLevel(exam.level);
                          setStartDate(exam.startDate);
                          setEndDate(exam.endDate);
                          setOpenDelete(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
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
    </div>
  );
}
Exam.propTypes = {
  exams: PropTypes.array.isRequired,
};
