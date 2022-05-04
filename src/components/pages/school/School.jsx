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
import { getAllSchool } from "../../../redux/actions/schoolsAction";
import { addSchoolAction } from "../../../redux/actions/addSchoolAction";
import { updateSchoolAction } from "../../../redux/actions/updateSchoolAction";
import { deleteSchoolAction } from "../../../redux/actions/deleteSchoolAction";
import { getAllDistrict } from "../../../redux/actions/districtsAction";
import {searchSchoolAction} from "../../../redux/actions/searchSchoolAction";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import IconButton from "@material-ui/core/IconButton";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";
import { Link } from "react-router-dom";
import ViewComfyIcon from '@material-ui/icons/ViewComfy';

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

export default function School({ openn, ...rest }) {
  const dispatch = useDispatch();
  const schoolsState = useSelector((state) => state.schools);
  const districtsState = useSelector((state) => state.districts);
  const searchSchool=useSelector((state)=>state.searchSchool);
  const [schools, setSchools] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [schoolId, setSchoolId] = useState("");

  const addSchool = useSelector((state) => state.addSchool);
  const updateSchool = useSelector((state) => state.updateSchool);
  const deleteSchool = useSelector((state) => state.deleteSchool);
  //const [value, setValue] = React.useState(new Date());
  const [results, setResults] = useState({});
  const [selectedSchoolIds, setSelectedSchoolIds] = useState([]);
  const [search, setSearch] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleCloseUpdate = () => {
    setName("");
    setDistrictId("");
    setSector("");
    setCell("");
    setFullname("");
    setEmail("");
    setOpenUpdate(false);
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
      addSchoolAction({ name, districtId, sector, cell, fullname, email })
    );
    setOpen(false);
    setName("");
    setDistrictId("");
    setSector("");
    setCell("");
    setFullname("");
    setEmail("");
    await dispatch(getAllSchool());

    console.log("added");
  };
  console.log(name);
  useEffect(() => {
    async function fetchData() {
      await dispatch(getAllSchool());
      await dispatch(getAllDistrict());
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!schoolsState.loading) {
        if (schoolsState.schools) {
          setSchools(schoolsState.schools);
        }
      }
      if (!districtsState.loading) {
        if (districtsState.districts) {
          setDistricts(districtsState.districts);
        }
      }
    }
    fetchData();
  }, [schoolsState.schools, districtsState.districts]);

  const handleUpdate = async () => {
    if (!name) {
      return alert("name is required");
    }
    console.log(schoolId);
    await dispatch(
      updateSchoolAction({ name, districtId, sector, cell, id: schoolId })
    );
    setOpenUpdate(false);
    setName("");
    setDistrictId("");
    setSector("");
    setCell("");
    setSearch(false);
    await dispatch(getAllSchool());
  };

  const handleDelete = async () => {
    await dispatch(deleteSchoolAction(schoolId));
    setOpenDelete(false);
    window.location.reload();
  };

  // const searchHandle = async (e) => {
  //   setSearch(true);
  //   let searchKey=e.target.value;
  //   await dispatch(searchSchoolAction(searchKey));
  //   setResults(schools)
  //   console.log("school...",searchSchool);
  // };

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
      for (var i = 0; i < schools.length; i++) {
        for (var key in schools[i]) {
          if (schools[i][key] != null) {
            if (
              schools[i][key].toString().toLowerCase().indexOf(toSearch) !=
              -1
            ) {
              if (!itemExists(results, schools[i]))
                results.push(schools[i]);
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
                placeholder="Search School "
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Button variant="outlined" onClick={handleClickOpen}>
        Add new School
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>School Information</DialogTitle>
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
              label="School Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              variant="outlined"
            />

            <TextField
              id="outlined-select-district"
              select
              name="district"
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
              label="District"
              helperText="Please select your District"
            >
              {districts.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-basic"
              label="Sector"
              name="sector"
              onChange={(e) => setSector(e.target.value)}
              value={sector}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Cell"
              name="cell"
              onChange={(e) => setCell(e.target.value)}
              value={cell}
              variant="outlined"
            />

            <DialogTitle>School User Information</DialogTitle>
            <TextField
              id="outlined-basic"
              label="Full Name"
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
            {addSchool.loading ? "Loading..." : "Add new School"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openUpdate} onClose={handleCloseUpdate}>
        <DialogTitle>Update School Information</DialogTitle>
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
              label="School Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              variant="outlined"
            />

            <TextField
              id="outlined-select-district"
              select
              name="district"
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
              label="District"
              helperText="Please select your District"
            >
              {districts.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-basic"
              label="Sector"
              name="sector"
              onChange={(e) => setSector(e.target.value)}
              value={sector}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Cell"
              name="cell"
              onChange={(e) => setCell(e.target.value)}
              value={cell}
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary" autoFocus>
            {updateSchool.loading ? "Loading..." : "Update School"}
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
            Are you sure you want to delete the School below "{name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            {deleteSchool.loading ? "Loading..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>School Name</TableCell>
                <TableCell>District</TableCell>
                <TableCell>Sector</TableCell>
                <TableCell>Cell</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Update Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                search ? (
                  <>
                  {results.slice(0, limit).map((school) => (
                    <TableRow
                      hover
                      key={school.id}
                      selected={selectedSchoolIds.indexOf(school.id) !== -1}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {school.name}
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
                            {school.district.name}
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
                            {school.sector}
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
                            {school.cell}
                          </Typography>
                        </Box>
                      </TableCell>
  
                      <TableCell>
                        {moment(school.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(school.updatedAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell color="textPrimary" variant="body1">
                      <IconButton arial-label="add">
                          <Link to={`/dashboard/studentsinschool/${school.id}`}>
                            <ViewComfyIcon/>
                          </Link>
                        </IconButton>
                        <IconButton
                          aria-label="update"
                          onClick={() => {
                            setSchoolId(school.id);
                            setName(school.name);
                            setDistrictId(school.districtId);
                            setSector(school.sector);
                            setCell(school.cell);
                            setOpenUpdate(true);
                            setOpenUpdate(true);
                          }}
                        >
                          <BorderColorIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => {
                            setSchoolId(school.id);
                            setName(school.name);
                            setDistrictId(school.districtId);
                            setSector(school.sector);
                            setCell(school.cell);
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
                  {schools.slice(0, limit).map((school) => (
                    <TableRow
                      hover
                      key={school.id}
                      selected={selectedSchoolIds.indexOf(school.id) !== -1}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {school.name}
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
                            {school.district.name}
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
                            {school.sector}
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
                            {school.cell}
                          </Typography>
                        </Box>
                      </TableCell>
  
                      <TableCell>
                        {moment(school.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(school.updatedAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell color="textPrimary" variant="body1">
                      <IconButton arial-label="add">
                          <Link to={`/dashboard/studentsinschool/${school.id}`}>
                            <ViewComfyIcon/>
                          </Link>
                        </IconButton>
                        <IconButton
                          aria-label="update"
                          onClick={() => {
                            setSchoolId(school.id);
                            setName(school.name);
                            setDistrictId(school.districtId);
                            setSector(school.sector);
                            setCell(school.cell);
                            setOpenUpdate(true);
                            setOpenUpdate(true);
                          }}
                        >
                          <BorderColorIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => {
                            setSchoolId(school.id);
                            setName(school.name);
                            setDistrictId(school.districtId);
                            setSector(school.sector);
                            setCell(school.cell);
                            setOpenDelete(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
                )
              }
             
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
School.propTypes = {
  schools: PropTypes.array.isRequired,
};
