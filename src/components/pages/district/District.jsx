import React from 'react'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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
import {getAllDistrict} from "../../../redux/actions/districtsAction";
import {addDistrictAction} from "../../../redux/actions/addDistrictAction";

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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alerts = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function District({ openn, ...rest }) {
  const dispatch = useDispatch();
  const examsState = useSelector((state) => state.exams);
  const [exams, setExams] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [districts,setDistricts]=useState([]);

  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [provincename,setProvincename]=useState("");
  const [fullname,setFullname]=useState("");
  const [email,setEmail] =useState("");

  const addExam = useSelector((state) => state.addExam);
  const deleteExam = useSelector((state) => state.deleteExam);
  const updateExam = useSelector((state) => state.updateExam);
  const getDistrictsState=useSelector((state)=>state.districts);
  const addDistrict=useSelector((state)=>state.addDistrict);
  //const [value, setValue] = React.useState(new Date());
  const [openSuccessmessage, setOpenSuccessmessage] = React.useState(false);
  const [openUpdateSuccessmessage, setOpenUpdateSuccessmessage] = React.useState(false);
  const [openDeleteSuccessmessage, setOpenDeleteSuccessmessage] = React.useState(false);

  const [selectedExamIds, setSelectedExamIds] = useState([]);
  const [search, setSearch] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [examId, setExamId] = useState("");
  const [level, setLevel] = useState("");
  const [results, setResults] = useState({});
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const Provinces = [
    {
      value: "Nouth",
      label: "Nouth Province",
    },
    {
      value: "South",
      label: "South Province",
    },
    {
        value: "East",
        label: "East Province",
      },
      {
        value: "West",
        label: "West Province",
      },
      {
        value: "Kigali",
        label: "Kigali City",
      },
  ];
  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessmessage(false);
    setOpenUpdateSuccessmessage(false);
    setOpenDeleteSuccessmessage(false);
  };
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
  
    await dispatch( addDistrictAction({provincename, name,fullname, email}) );
    setOpen(false);
    setProvincename("");
    setName("");
    setFullname("");
    setEmail("");
    console.log("district =",addDistrict.districts)
    setOpenSuccessmessage(true);
    await dispatch(getAllDistrict());
    
  };

  const handleUpdate = async () => {
    // if (!name) {
    //   return alert("name is required");
    // }
    // console.log(examId);
    // await dispatch(updateExamAction({ name, subject,level, startDate, id: examId }));
    // setOpenUpdate(false);

    // setName("");
    // setSubject("");
    // setStartDate("");
    // setLevel("");
    // setSearch(false);
    // await dispatch(getAllExam());
  };
  useEffect(()=>{
    async function fetchData(){
      await dispatch(getAllDistrict());
      await dispatch(getAllExam());
    }
    fetchData();
  },[])

  useEffect(async () => {
     
      if (!getDistrictsState.loading) {
        if (getDistrictsState.districts) {
          setDistricts(getDistrictsState.districts);
       
        }
      }
    if (!examsState.loading) {
      if (examsState.exams) {
        setExams(examsState.exams);
      
      }
    }
  }, [!examsState.exams,!getDistrictsState.districts]);

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
      for (var i = 0; i < districts.length; i++) {
        for (var key in districts[i]) {
          if (districts[i][key] != null) {
            if (
              districts[i][key].toString().toLowerCase().indexOf(toSearch) !=
              -1
            ) {
              if (!itemExists(results, districts[i]))
                results.push(districts[i]);
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
                placeholder="Search a district"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Button variant="outlined" onClick={handleClickOpen}>
        Add District
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>District Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter District information here.
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
              label="Dristrict Name"
              name="subject"
              onChange={(e) => setName(e.target.value)}
              value={name}
              variant="outlined"
            />
              <TextField
              id="outlined-select-currency"
              select
              onChange={(e) => setProvincename(e.target.value)}
              label="Province"
              helperText="Please select your Province"
            >
              {Provinces.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <DialogContentText>
            Please enter District user information here.
          </DialogContentText>

            <TextField
              id="outlined-basic"
              label="FullName"
              name="fullname"
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
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
            
           
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} color="primary" autoFocus>
            {addDistrict.loading ? "Loading..." : "Add new District"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSuccessmessage}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
      >
        <Alerts
          onClose={handleClose}
          severity="success"
          color="info"
          sx={{ width: "100%" }}
        >
          {addDistrict.districts}
        </Alerts>
      </Snackbar>
      <Snackbar
        open={openUpdateSuccessmessage}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
      >
        <Alerts
          onClose={handleClose}
          severity="success"
          color="info"
          sx={{ width: "100%" }}
        >
          {/* {updateDistrict.districts} */}
        </Alerts>
      </Snackbar>
      <Snackbar
        open={openDeleteSuccessmessage}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
      >
        <Alerts
          onClose={handleClose}
          severity="success"
          color="warning"
          sx={{ width: "100%" }}
        >
          {/* {deleteDistrict.districts} */}
        </Alerts>
      </Snackbar>
      <Dialog open={openUpdate} onClose={handleClose}>
        <DialogTitle>Update Exam Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Edit District information here.
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
              label="Dristrict Name"
              name="subject"
              onChange={(e) => setName(e.target.value)}
              value={name}
              variant="outlined"
            />
              <TextField
              id="outlined-select-currency"
              select
              onChange={(e) => setProvincename(e.target.value)}
              label="Province"
              helperText="Please select your Province"
            >
              {Provinces.map((option) => (
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
                <TableCell>District Name</TableCell>
                <TableCell>Province Name</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Update Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {

              search?(
                <>
                {results.slice(0, limit).map((district) => (
                  <TableRow
                    hover
                    key={district.id}
                    selected={selectedExamIds.indexOf(district.id) !== -1}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {district.name}
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
                          {district.provincename}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      {moment(district.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      {moment(district.updatedAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell color="textPrimary" variant="body1">
                      <IconButton
                        aria-label="update"
                        onClick={() => {
                        //   setExamId(exam.id);
                        //   setName(exam.name);
                        //   setSubject(exam.subject);
                        //   setStartDate(exam.startDate);

                          setOpenUpdate(true);
                        }}
                      >
                        <BorderColorIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => {
                        //   setExamId(exam.id);
                        //   setName(exam.name);
                        //   setSubject(exam.subject);
                        //   setLevel(exam.level);
                        //   setStartDate(exam.startDate);
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
                {districts.slice(0, limit).map((district) => (
                  <TableRow
                    hover
                    key={district.id}
                    selected={selectedExamIds.indexOf(district.id) !== -1}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {district.name}
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
                          {district.provincename}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      {moment(district.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      {moment(district.updatedAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell color="textPrimary" variant="body1">
                      <IconButton
                        aria-label="update"
                        onClick={() => {
                        //   setExamId(exam.id);
                        //   setName(exam.name);
                        //   setSubject(exam.subject);
                        //   setStartDate(exam.startDate);

                          setOpenUpdate(true);
                        }}
                      >
                        <BorderColorIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => {
                        //   setExamId(exam.id);
                        //   setName(exam.name);
                        //   setSubject(exam.subject);
                        //   setLevel(exam.level);
                        //   setStartDate(exam.startDate);
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
District.propTypes = {
  districts: PropTypes.array.isRequired,
};
