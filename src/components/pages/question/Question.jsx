import React from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import Button from "@material-ui/core/Button";
import "./question.css";
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
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import { getAllQuestion } from "../../../redux/actions/questionsAction";
import { deleteQuestionAction } from "../../../redux/actions/deleteQuestionAction";
import { updateQuestionAction } from "../../../redux/actions/updateQuestionAction";
import { addQuestionAction } from "../../../redux/actions/addQuestionAction";
import { getQuestionByExamIdAction } from "../../../redux/actions/getQuestionByExamIdAction";
import { useParams } from "react-router-dom";

const Question = ({ ...rest }) => {
  const [open, setOpen] = useState(false);
  // const dispatch = useDispatch()
  const [results, setResults] = useState({});
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [search, setSearch] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [question, setQuestion] = useState("");
  const [correct_answer, setCorrect_answer] = useState("");
  const [incorrect_answer, setIncorrect_answer] = useState("");
  const [examId, setExamId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const params = useParams();

  const [questionId, setQuestionId] = useState("");

  const dispatch = useDispatch();
  const questionsState = useSelector((state) => state.questions);
  const deleteQuestion = useSelector((state) => state.deleteQuestion);
  const updateQuestion = useSelector((state) => state.updateQuestion);
  const addQuestion = useSelector((state) => state.addQuestion);
  const getQuestionByExamIdState = useSelector(
    (state) => state.getQuestionByExamId
  );

  const handleAdd = async () => {
    setOpen(true)
    const data = {
      question: question,
      correct_answer: correct_answer,
      examId: examId,
      // create an array from incorrect answer using ,
      incorrect_answer: incorrect_answer.split(","),
    };
    console.log("question sent:", data);
    await dispatch(addQuestionAction(data));
    setQuestion("");
    setCorrect_answer("");
    setIncorrect_answer("");
    await dispatch(getQuestionByExamIdAction(examId));
    console.log("added")
  };
  const handleAddClose = () => {
    setOpen(false);
  };

  function handleChange(event) {}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleUpdate = async () => {
    if (!question) {
      return alert("Question is required");
    }
    const data = {
      question: question,
      correct_answer: correct_answer,
     
      id: questionId,
      // create an array from incorrect answer using ,
      incorrect_answer: incorrect_answer.split(","),
    };
    console.log(questionId);
    await dispatch( updateQuestionAction( data));
    setOpenUpdate(false);
    setQuestion("");
    setCorrect_answer("");
    setIncorrect_answer("");
    setSearch(false);
    await dispatch(getQuestionByExamIdAction(examId));
  };

  const handleCloseUpdate = () => {
    setQuestion("");
    setCorrect_answer("");
    setIncorrect_answer("");
    setOpenUpdate(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteQuestionAction(questionId));
    setOpenDelete(false);
    window.location.reload();
  };

  useEffect(() => {
    const id = params.id;
    console.log("my id", id)
    setExamId(id);
    dispatch(getQuestionByExamIdAction(id));
  }, []);

  useEffect(() => {
    if (!getQuestionByExamIdState.loading) {
      if (getQuestionByExamIdState.questions) {
        setQuestions(getQuestionByExamIdState.questions);
      }
    }
  }, [!getQuestionByExamIdState.loading]);

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
      for (var i = 0; i < questions.length; i++) {
        for (var key in questions[i]) {
          if (questions[i][key] != null) {
            if (
              questions[i][key].toString().toLowerCase().indexOf(toSearch) !=
              -1
            ) {
              if (!itemExists(results, questions[i]))
                results.push(questions[i]);
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
      <Card {...rest}>
        <Dialog
          open={openUpdate}
          onClose={handleCloseUpdate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Update  Question"}
          </DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
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
                label="Incorrect Answer"
                name="incorrect_answer"
                onChange={(e) => setIncorrect_answer(e.target.value)}
                value={incorrect_answer}
                variant="outlined"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdate} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary" autoFocus>
              {updateQuestion.loading ? "Loading..." : "Update Question"}
            </Button>
          </DialogActions>
        </Dialog>
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
                  placeholder="Search Question"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
          <Box></Box>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Question Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter school information here.
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
                  label="Question "
                  name="question"
                  onChange={(e) => setQuestion(e.target.value)}
                  value={question}
                  variant="outlined"
                />

                <TextField
                  id="outlined-basic"
                  label="Correct Answer "
                  name="correct_answer"
                  onChange={(e) => setCorrect_answer(e.target.value)}
                  value={correct_answer}
                  variant="outlined"
                ></TextField>
                <TextField
                  id="outlined-basic"
                  label="Options  "
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
                {addQuestion.loading ? "Loading..." : "Add new Question"}
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
                Are you sure you want to delete the Question below "{question}"?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="primary" autoFocus>
                {deleteQuestion.loading ? "Loading..." : "Delete"}
              </Button>
            </DialogActions>
          </Dialog>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setOpen(true);
                handleAdd();
              }}
            >
              Add Question
            </Button>
          </Box>
        </Box>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Question</TableCell>
                  <TableCell>Correct Answer</TableCell>
                  <TableCell>Incorrect answer</TableCell>
                  <TableCell>Create Date</TableCell>
                  <TableCell>Update Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  search ? (
                    <>
                    {results.slice(0, limit).map((question) => (
                      <TableRow
                        hover
                        key={question.id}
                        selected={selectedProductIds.indexOf(question.id) !== -1}
                      >
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <Typography color="textPrimary" variant="body1">
                              {question.question}
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
                              {question.correct_answer}
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
                              {question.incorrect_answer.map((answer) => (
                                <Box
                                  sx={{
                                    alignItems: "center",
                                    display: "flex",
                                  }}
                                >
                                  <Typography color="textPrimary" variant="body1">
                                    {answer}
                                  </Typography>
                                </Box>
                              ))}
                            </Typography>
                          </Box>
                        </TableCell>
  
                        <TableCell>
                          {moment(question.createdAt).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>
                          {moment(question.updatedAt).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell color="textPrimary" variant="body1">
                          <IconButton
                            aria-label="update"
                            onClick={() => {
                              setQuestionId(question.id);
                              setQuestion(question.question);
                              setCorrect_answer(question.correct_answer);
                              setIncorrect_answer(question.incorrect_answer);
                              setOpenUpdate(true);
                            }}
                          >
                            <BorderColorIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            color="secondary"
                            onClick={() => {
                              setQuestionId(question.id);
                              setQuestion(question.question);
                              setCorrect_answer(question.correct_answer);
                              setIncorrect_answer(question.incorrect_answer);
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
                  {questions.slice(0, limit).map((question) => (
                    <TableRow
                      hover
                      key={question.id}
                      selected={selectedProductIds.indexOf(question.id) !== -1}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {question.question}
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
                            {question.correct_answer}
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
                            {question.incorrect_answer.map((answer) => (
                              <Box
                                sx={{
                                  alignItems: "center",
                                  display: "flex",
                                }}
                              >
                                <Typography color="textPrimary" variant="body1">
                                  {answer}
                                </Typography>
                              </Box>
                            ))}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        {moment(question.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(question.updatedAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell color="textPrimary" variant="body1">
                        <IconButton
                          aria-label="update"
                          onClick={() => {
                            setQuestionId(question.id);
                            setQuestion(question.question);
                            setCorrect_answer(question.correct_answer);
                            setIncorrect_answer(question.incorrect_answer);
                            setOpenUpdate(true);
                          }}
                        >
                          <BorderColorIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => {
                            setQuestionId(question.id);
                            setQuestion(question.question);
                            setCorrect_answer(question.correct_answer);
                            setIncorrect_answer(question.incorrect_answer);
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
      </Card>
    </div>
  );
};

Question.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default Question;
