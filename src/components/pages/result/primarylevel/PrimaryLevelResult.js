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

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

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
import {getAllprimaryResultbyAdminAction} from "../../../../redux/actions/getAllprimaryResultbyAdminAction";

export default function ListStudent({ openn, ...rest }) {
  const dispatch = useDispatch();
  const studentsState = useSelector((state) => state.students);
  const schoolsState = useSelector((state) => state.schools);
  const [schools, setSchools] = useState([]);

  const [students, setStudents] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [level, setLevel] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [results, setResults] = useState({});
  const [search, setSearch] = useState(false);
  const addStudent = useSelector((state) => state.addStudent);
  const deleteStudent = useSelector((state) => state.deleteStudent);
  const getAllprimaryresult=useSelector((state)=>state.getAllprimaryResultbyAdmin);
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
    //   addStudentAction({
    //     firstname,
    //     lastname,
    //     dob,
    //     gender,
    //     level,
    //     schoolId,
    //   })
    );
    setOpen(false);
    setFirstname("");
    setLastname("");
    setEmail("");
    setDob("");
    setGender("");
    setLevel("");
    setSchoolId("");
    // await dispatch(getAllStudent());
   
  };
  useEffect(()=>{
    async function fetchData(){
     await dispatch(getAllprimaryResultbyAdminAction());
    //   await dispatch(getAllSchool());
    }
    fetchData();
  },[])

  useEffect(() => {
    async function fetchData() {
      if (!getAllprimaryresult.loading) {
        if (getAllprimaryresult.results) {
          setResults(getAllprimaryresult.results);
          
        }
        if (!schoolsState.loading) {
          if (schoolsState.schools) {
            setSchools(schoolsState.schools);
           
          }
        }
      }
    }
    fetchData();
  }, [getAllprimaryresult.results, schoolsState.schools]);
console.log("results:",getAllprimaryresult.results.map((p)=>p['student.id']))
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = async () => {
   // await dispatch(deleteStudentAction(studentId));
    setOpenDelete(false);
    window.location.reload();
  };

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
      for (var i = 0; i < getAllprimaryresult.results.length; i++) {
        for (var key in getAllprimaryresult.results[i]) {
          if (getAllprimaryresult.results[i][key] != null) {
            if (
                getAllprimaryresult.results[i][key].toString().toLowerCase().indexOf(toSearch) !=
              -1
            ) {
              if (!itemExists(results, getAllprimaryresult.results[i]))
                results.push(getAllprimaryresult.results[i]);
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
                placeholder="Search Student"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>


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
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              name="lastname"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              variant="outlined"
            />
            {/* <TextField
              id="outlined-basic"
              label="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              variant="outlined"
            /> */}
            <TextField
              id="date"
              label="Birthday"
              type="date"
              name="dob"
              onChange={(e) => setDob(e.target.value)}
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
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
            <DialogTitle>School Information</DialogTitle>
            <TextField
              id="outlined-select-school"
              label="School"
              value={schoolId}
              select
              name="schoolId"
              onChange={(e) => setSchoolId(e.target.value)}
              helperText="Please select your School"
            >
              {schools.map((school) => (
                <MenuItem key={school.id} value={school.id}>
                  {school.name}
                </MenuItem>
              ))}
            </TextField>
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
            {/* {addStudent.loading ? "Loading..." : "Add new Student"} */}
            Add
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
            Are you sure you want to delete the Student below "{lastname}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            {deleteStudent.loading ? "Loading..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Last Name</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Student Code</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>School Level</TableCell>
                <TableCell>Total Marks</TableCell>
                <TableCell>Create Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                search?(
                  <>
                  {results.slice(0, limit).map((student) => (
                    <TableRow
                      hover
                      key={student['student.id']}
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
                            {student['student.lastname']}
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
                          {student['student.firstname']}
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
                          {student['student.studentcode']}
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
                          {student['student.gender']}
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
                          {student['student.level']}
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
                            {student.total}
                          </Typography>
                        </Box>
                      </TableCell>
                     
                      <TableCell>
                        {moment(student.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                     
                    </TableRow>
                  ))}
                </>
                ):(
              <>
                {getAllprimaryresult.results.slice(0, limit).map((student) => (
                  <TableRow
                    hover
                    key={student['student.id']}
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
                        {student['student.firstname']}
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
                        {student['student.lastname']}
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
                        {student['student.studentcode']}
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
                          {student['student.gender']}
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
                        {student['student.level']}
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
                          {student.total}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {moment(student.createdAt).format("DD/MM/YYYY")}
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
        count={students.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
}
ListStudent.propTypes = {
  results: PropTypes.array.isRequired,
};
