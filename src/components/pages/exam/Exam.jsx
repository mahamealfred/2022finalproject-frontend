import Button from "@mui/material/Button";
import * as React from "react";
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
import Print from "@material-ui/icons/Print";

import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import IconButton from "@material-ui/core/IconButton";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";

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
    console.log(subject, name, startDate, level);
    await dispatch(
      addExamAction({
        name,
        subject,
        startDate,
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
      updateExamAction({ name, subject, level, startDate, id: examId })
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

  const searchHandle = async (e) => {};

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
                placeholder="Search an Exam"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Button variant="outlined" onClick={handleClickOpen}>
        Add Exam
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Exam Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter Exam information here.
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
            {addExam.loading ? "Loading..." : "Add new Exam"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openUpdate} onClose={handleClose}>
        <DialogTitle>Update Exam Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Edit Exam information here.
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
            {updateExam.loading ? "Loading..." : "Update Exam"}
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
                <TableCell>Assessment Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Update Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
                          {exam.startDate}
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
                          <Print />
                        </Link>
                      </IconButton>
                      <IconButton
                        aria-label="update"
                        onClick={() => {
                          setExamId(exam.id);
                          setName(exam.name);
                          setSubject(exam.subject);
                          setStartDate(exam.startDate);

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
                          setOpenDelete(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
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
