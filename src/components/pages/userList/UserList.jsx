import Button from "@mui/material/Button";
import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import moment from "moment";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//import MenuItem from "@mui/material/MenuItem";

import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getAllUser } from "../../../redux/actions/usersAction";

import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import IconButton from "@material-ui/core/IconButton";
import PerfectScrollbar from "react-perfect-scrollbar";
import { addUserAction } from "../../../redux/actions/addUserAction";
import { deleteUserAction } from "../../../redux/actions/deleteUserAction";
import { getAllSchool } from "../../../redux/actions/schoolsAction";
import { getAllDistrict } from "../../../redux/actions/districtsAction";


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
import MenuItem from "@mui/material/MenuItem";

export default function UserList({ openn, ...rest }) {
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.users);
  const districtsState = useSelector((state) => state.districts);
  const schoolsState = useSelector((state) => state.schools);

  const [users, setUsers] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [schools, setSchools] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [schoolId, setSchoolId] = useState("");

  const addUser = useSelector((state) => state.addUser);
  const deleteUser = useSelector((state) => state.deleteUser);
  //const [value, setValue] = React.useState(new Date());

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [userId, setUserId] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [errors, setErrors] = useState({});
  const validate = (fullname, email, role, districtId, schoolId) => {
    // this function will check if the form values are valid
  };

  const roles = [
    {
      value: "DistrictUser",
      label: "District User",
    },
  ];
 

  const handleAddUser = async () => {
    await dispatch(addUserAction({ fullname, email, role, districtId }));
    setOpen(false);
    setFullname("");
    setEmail("");
    setRole("");
    setDistrictId("");
    await dispatch(getAllUser());
    console.log("added");
  };
  const handleCloseDelete = () => {
    setFullname("");
    setEmail("");
    setRole("");
    setSchoolId("");
    setDistrictId("");
    setOpenDelete(false);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteUserAction(userId));
    setOpenDelete(false);
    // window.location.reload();
  };

  useEffect(()=>{
    async function fetchData(){
      await dispatch(getAllUser());
      await dispatch(getAllSchool());
      await dispatch(getAllDistrict());
    }
    fetchData();
  },[])
  useEffect(() => {
    async function fecthData() {
      if (!usersState.loading) {
        if (usersState.users) {
          setUsers(usersState.users);
        
        }
      }
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
    fecthData();
  }, [usersState.users,schoolsState.schools,districtsState.districts]);

  const searchHandle = async (e) => {};

  return (
    <>
     
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
                  placeholder="Search User"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

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
              validate();
            }}
          >
            Add User
          </Button>
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>User Information</DialogTitle>
          {!addUser.error ? null : (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="error">
                {addUser.error}
              </Alert>
            </Stack>
          )}
          <DialogContent>
            <DialogContentText>
              Please enter User information here.
            </DialogContentText>

            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                errors={errors}
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

              <TextField
                id="outlined-select-role"
                label="Role"
                select
                value={role}
                name="role"
                onChange={(e) => setRole(e.target.value)}
                helperText="Please select your Role"
              >
                {roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-district"
                label="District"
                select
                value={districtId}
                name="districtId"
                onChange={(e) => setDistrictId(e.target.value)}
                helperText="Please select your District"
              >
                {districts.map((district) => (
                  <MenuItem key={district.id} value={district.id}>
                    {district.name}
                  </MenuItem>
                ))}
              </TextField>
              {/* <TextField
              id="outlined-select-school"
              label="School"
              select
              value={schoolId}
              name="schoolId"
              onChange={(e) => setSchoolId(e.target.value)}
              helperText="Please select your School"
            >
              {schools.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField> */}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddUser} color="primary" autoFocus>
              {addUser.loading ? "Loading..." : "Add new User"}
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
              Are you sure you want to delete the User below "{fullname}"?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
              {deleteUser.loading ? "Loading..." : "Delete"}
            </Button>
          </DialogActions>
        </Dialog>

        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Update Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <>
                  {users.slice(0, limit).map((user) => (
                    <TableRow
                      hover
                      key={user.id}
                      selected={selectedUserIds.indexOf(user.id) !== -1}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {user.fullname}
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
                            {user.email}
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
                            {user.role}
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
                            {user.isActive}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        {moment(user.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(user.updatedAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell color="textPrimary" variant="body1">
                        <IconButton
                          aria-label="update"
                          onClick={() => {
                            setUserId(user.id);
                            setFullname(user.fullname);
                            setEmail(user.email);
                            setRole(user.role);
                            setOpenUpdate(true);
                          }}
                        >
                          <BorderColorIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => {
                            setUserId(user.id);
                            setFullname(user.fullname);
                            setEmail(user.email);
                            setRole(user.role);
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
          count={users.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </div>
    </>
  );
}
UserList.propTypes = {
  users: PropTypes.array.isRequired,
};
