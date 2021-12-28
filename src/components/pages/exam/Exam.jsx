import { DataGrid } from "@material-ui/data-grid";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { DeleteOutline } from "@material-ui/icons";


import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux";
import {useState,useEffect} from "react";
import { getAllExam } from "../../../redux/actions/examsAction";


import { Link } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Exam name", width: 200 },
  { field: "subject", headerName: "Subject", width: 200 },
  {
    field: "startDate",
    headerName: "Start date",
    type: "date",
    width: 200,
  },
  
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/user/" + params.row.id}>
            <button className="userListEdit">Edit</button>
          </Link>

          <DeleteOutline className="userListDelete" />
        </>
      );
    },
  },
];



export default function Exam({openn,...rest}) {

  const dispatch = useDispatch();
  const examsState = useSelector((state) => state.exams);
  const [exams, setExams] = useState([]);

  const [open, setOpen] = React.useState(false);
  //const [value, setValue] = React.useState(new Date());


  useEffect(()=>{
     
    if (!examsState.loading) {
        if (examsState.exams) {
          setExams(examsState.exams);
          dispatch(getAllExam());
        }
      }
    }, [examsState.exams,examsState.loading, dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //select input field

  return (
    <div
      style={{ flex: 4, height: "auto", width: "400px", margin: "80px 0px" }}
    >
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new Exam
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Exam Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter student information here.
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
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
              label="Exam Name"
              variant="outlined"
            />
            <TextField
              id="date"
              label="Start Date"
              type="datetime"
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField id="outlined-basic" label="Subject" variant="outlined" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add new Exam</Button>
        </DialogActions>
      </Dialog>
      <DataGrid
        rows={exams}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
Exam.propTypes = {
  exams: PropTypes.array.isRequired,
};
