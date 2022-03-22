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

import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getAllStudentsBySchoolUserAction } from "../../../redux/actions/getAllStudentsBySchoolUserAction";
import { addStudentBySchoolUser } from "../../../redux/actions/addStudentBySchoolUseAction";
import { deleteStudentAction } from "../../../redux/actions/deleteStudentAction";
import { getAllSchool } from "../../../redux/actions/schoolsAction";

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
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Report } from "@material-ui/icons";
import { format } from "date-fns";

export default function ListStudent({ openn, ...rest }) {
  const dispatch = useDispatch();
  const studentsState = useSelector(
    (state) => state.getAllStudentsBySchoolUser
  );
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

  const addStudent = useSelector((state) => state.addStudentBySchoolUser);
  const deleteStudent = useSelector((state) => state.deleteStudent);
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
    await dispatch(getAllStudentsBySchoolUserAction());
    console.log("added");
  };

useEffect(()=>{
  async function fetchData(){
    await dispatch(getAllStudentsBySchoolUserAction());
    await dispatch(getAllSchool());
  }
  fetchData();
  
},[])

  useEffect(() => {
    async function fetchData() {
      if (!studentsState.loading) {
        if (studentsState.students) {
          setStudents(studentsState.students);
        }
        if (!schoolsState.loading) {
          if (schoolsState.schools) {
            setSchools(schoolsState.schools);
           
          }
        }
      }
    }
    fetchData();
  }, [!studentsState.students,! schoolsState.schools]);

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteStudentAction(studentId));
    setOpenDelete(false);
    window.location.reload();
  };

  const generateListOfAllStudent =()=> {
    const doc = new jsPDF();
     const tableColumn=['Last Name','First Name','Email','StudentCode','Gender','Level']
    const tableRows=[]

    students.map(student =>{
      const studentData=[
        student.lastname,
        student.firstname,
        student.email,
        student.studentcode,
        student.gender,
        student.level,
       // format(new Date(student.updated_at), "yyyy-MM-dd")
      ];
      tableRows.push(studentData);
      console.log(studentData)
    });
    const imageData=`<img src="../../Assets/images/reb.jpg" alt="" className="topAvatar" />`;
   console.log('imge...',imageData)
    doc.autoTable(tableColumn, tableRows, { 
      startY: 20,
      theme: "grid",
     margin: 10,
     styles: {
       font: "courier",
       fontSize: 12,
       overflow: "linebreak",
       cellPadding: 1,
       halign: "left"
     },
     });
  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  doc.text(" Students List.", 14, 15);
 doc.addImage(imageData, 'JPEG', 15, 40, 180, 160);
 doc.save(`report_${dateStr}.pdf`);
  };
  const reportStudents = students.filter(student => student.status === "completed");
  const assignColorToTicketStatus = student => {
    if (student.status === "completed") {
      return "p-3 mb-2 bg-success text-white";
    } else if (student.status === "in_progress") {
      return "p-3 mb-2 bg-warning text-dark";
    } else if (student.status === "opened") {
      return "p-3 mb-2 bg-light text-dark";
    }
  };

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
                placeholder="Search Student"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    
    <Box>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new Student
      </Button>
      <IconButton
                  aria-label="print"
                  color="secondary"
                  onClick={() => generateListOfAllStudent(reportStudents)}
                >
                  <Report />
                  Generate Report
                </IconButton>

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
            <TextField
              id="outlined-basic"
              label="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              variant="outlined"
            />
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
            {addStudent.loading ? "Loading..." : "Add new Student"}
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
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Student Code</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>School Level</TableCell>
                <TableCell>Create Date</TableCell>
                <TableCell>Update Date</TableCell>
               
                <TableCell>Action</TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              <>
                {students.slice(0, limit).map((student) => (
                  <TableRow
                    hover
                    key={student.id}
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
                          {student.lastname}
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
                          {student.firstname}
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
                          {student.email}
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
                          {student.studentcode}
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
                          {student.gender}
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
                          12
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
                          {student.level}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {moment(student.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      {moment(student.updatedAt).format("DD/MM/YYYY")}
                    </TableCell>
                    
                    <TableCell color="textPrimary" variant="body1">
                    <TableBody className={assignColorToTicketStatus(student)}>
                  {student.status}
                </TableBody>
                      <IconButton
                        aria-label="update"
                        onClick={() => {
                          // setproductId(product.id);
                          // setName(product.name);
                          // setcategoryId(product.categoryId);
                          // setPrice(product.price);
                          // setImageUrl(product.imageUrl);
                          // setDescription(product.description)
                          // setQuantity(product.quantity);
                          setOpenUpdate(true);
                        }}
                      >
                        <BorderColorIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => {
                          setStudentId(student.id);
                          setFirstname(student.firstname);
                          setLastname(student.lastname);
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
  students: PropTypes.array.isRequired,
};
