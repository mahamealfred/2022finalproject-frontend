
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//import MenuItem from "@mui/material/MenuItem";

import { DeleteOutline } from "@material-ui/icons";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getAllExam } from "../../../redux/actions/examsAction";
import { addExamAction } from "../../../redux/actions/addExamAction";
import { deleteExamAction } from "../../../redux/actions/deleteExamAction";

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
  const [question, setQuestion] = useState("");
  const [correct_answer, setCorrect_answer] = useState("");
  const [incorrect_answer, setIncorrect_answer] = useState([]);

  const addExam = useSelector((state) => state.addExam);
  const deleteExam =useSelector((state)=>state.deleteExam);
  //const [value, setValue] = React.useState(new Date());
  const [results, setResults] = useState({});
  const [selectedExamIds, setSelectedExamIds] = useState([]);
  const [search, setSearch] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [examId,setExamId]=useState("");


  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async () =>{
    await dispatch(deleteExamAction(examId))
    setOpenDelete(false);
    window.location.reload();
  }
 

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
    console.log(subject,name,startDate)
    await dispatch(
      addExamAction({ name,subject, startDate,question,correct_answer,incorrect_answer})
    );
    setOpen(false);
    setSubject("");
    setName("");
    setStartDate("");
    setQuestion("");
    setCorrect_answer("");
    setIncorrect_answer("");
    await dispatch(getAllExam());
    console.log("added");
  };

  useEffect( async() => {
   
    if (!examsState.loading) {
      if (examsState.exams) {
        setExams(examsState.exams);
        await dispatch(getAllExam());
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
    const exams = 0;
    const searchKey = e.target.value;
    console.log(e.target.value);

    try {
      var results = [];
      const toSearch = trimString(searchKey); // trim it
      for (var i = 0; i < exams.length; i++) {
        for (var key in exams[i]) {
          if (exams[i][key] != null) {
            if (
              exams[i][key].toString().toLowerCase().indexOf(toSearch) != -1
            ) {
              if (!itemExists(results, exams[i])) results.push(exams[i]);
            }
          }
        }
      }
      setResults(results);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(results);
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
                placeholder="Search products"
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
              id="outlined-basic"
              label="Question"
              name="question"
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Correct Answer"
              name="correct_answer"
              onChange={(e) => setCorrect_answer(e.target.value)}
              value={correct_answer}
              variant="outlined"
            />
           
           <TextField
              id="outlined-basic"
              label="Incorrect answer"
              name="incorrect_answer"
              onChange={(e) => setIncorrect_answer(e.target.value)}
              value={incorrect_answer}
              variant="outlined"
            />
          
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} color="primary" autoFocus>
            {addExam.loading ? "Loading..." : "Add new Exam"}
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
          Are you sure you want to delete the Exam below "{subject}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            {deleteExam.loading? "Loading..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      

      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>Exam Description</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Update Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {search ? (
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
                           {exam.startDate}
                          </Typography>
                        </Box>
                      </TableCell>
                      
                      <TableCell>
                        {moment(exam.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(exam.updatedAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell color="textPrimary" variant="body1">
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
              ) : (
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
                          setStartDate(exam.startDate);
                         setOpenDelete(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                   )) }
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
