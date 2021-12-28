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
//import MenuItem from "@mui/material/MenuItem";

import { DeleteOutline } from "@material-ui/icons";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Link} from "react-router-dom";

import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux";
import {useState,useEffect} from "react";
import { getAllStudent } from "../../../redux/actions/studentsAction";
import { addStudentAction } from "../../../redux/actions/addStudentAction";





const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "lastname", headerName: "Last name", width: 160 },
  { field: "firstname", headerName: "First name", width: 160 },
  {
    field: "gender",
    headerName: "Gender",
    width: 160,
   
  },
  {
    field: "dob",
    headerName: "Age",
    type: "number",
    width: 200,
  },
 
  {
    field: "studentcode",
    headerName: "Student Code",
    width: 160,
   
  },
  {
    field: "schoolId",
    headerName: "Level",
    width: 160,
   
  },
  {
    field: "school.name",
    headerName: "School Name",
    width: 160,
   
  },
  {
    field: "createdAt",
    headerName: "CreatedAT",
    width: 200,
   
  },

  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params)=>{
      return(
          <>
          <Link to={"/user/"+params.row.id}>
          <button className="userListEdit" >Edit</button>
          </Link>
         
          <DeleteOutline className="userListDelete" />
         
          </>

      )
  }
  },
];



export default function ListStudent({openn,...rest}) {

  const dispatch = useDispatch();
  const studentsState = useSelector((state) => state.students);
  const [students, setStudents] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [firstname, setFirstname]=useState('');
  const [lastname, setLastname]=useState('');
  const [dob, setDob]=useState('');
  const [gender, setGender]=useState('');
  const [schoolId,setSchoolId]=useState('');

  
  const addStudent=useSelector((state) => state.addStudent)
  //const [value, setValue] = React.useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //select input field


  // const handleChange = (event) => {
  //   setSchool(event.target.value);
  //   setLevel(event.target.value);
  // };

const handleAdd=async ()=>{
  await dispatch(addStudentAction({firstname,lastname,dob,gender,schoolId}));
  setOpen(false);
  setFirstname('');
  setLastname('');
  setDob('');
  setGender('');
  setSchoolId('');
  await dispatch(getAllStudent())
  console.log("added")
}

  useEffect(()=>{
     
    if (!studentsState.loading) {
        if (studentsState.students) {
          setStudents(studentsState.students);
          dispatch(getAllStudent());
        }
      }
    }, [studentsState.students,studentsState.loading, dispatch]);
  return (
    <div
      style={{ flex: 4, height: "auto", width: "400px", margin: "80px 0px" }}
    >
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new Student
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Student Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter student information here.
          </DialogContentText>
      
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
              label="First Name"
              name="firstname"
              onChange={(e)=> setFirstname(e.target.value)}
              value={firstname}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              name="lastname"
              onChange={(e)=>setLastname(e.target.value)}
              value={lastname}
              variant="outlined"
            />
            <TextField
        id="date"
        label="Birthday"
        type="date"
        name="dob"
        onChange={(e)=>setDob(e.target.value)}
        value={dob}
        defaultValue="2017-05-24"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
       <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup
        aria-label="gender"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={(e)=>{setGender(e.target.value)}}
      >
        <FormControlLabel value="Female" control={<Radio />} label="Female" />
        <FormControlLabel value="Male" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
          
            <TextField
              id="outlined-select-currency"
              
              label="School"
              value={schoolId}
              name="schoolId"
              onChange={(e)=>setSchoolId(e.target.value)}
             // helperText="Please select your School"
            >
              {/* {schools.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))} */}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="level"
             // helperText="Please select your Level"
            >
              {/* {levels.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))} */}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} color="primary" autoFocus>
       {addStudent.loading ? "Loading..." : "Add new Student"}
       </Button>
        </DialogActions>
      </Dialog>
      <DataGrid
        rows={students}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      
    </div>
  );
}
ListStudent.propTypes = {
  students: PropTypes.array.isRequired,
};


