import Button from "@mui/material/Button";
import * as React from "react";
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

  const [selectedExamIds, setSelectedExamIds] = useState([]);
  const [search, setSearch] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [examId, setExamId] = useState("");
  const [level, setLevel] = useState("");

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
    console.log(provincename, name,fullname,email);
    await dispatch( addDistrictAction({provincename, name,fullname, email}) );
    setOpen(false);
    setProvincename("");
    setName("");
    setFullname("");
    setEmail("");
    await dispatch(getAllDistrict());
    console.log("added");
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

  useEffect(async () => {
     
      if (!getDistrictsState.loading) {
        if (getDistrictsState.districts) {
          setDistricts(getDistrictsState.districts);
          await dispatch(getAllDistrict());
        }
      }
    if (!examsState.loading) {
      if (examsState.exams) {
        setExams(examsState.exams);
        await dispatch(getAllExam());
      }
    }
  }, [examsState.exams,getDistrictsState.districts]);

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
