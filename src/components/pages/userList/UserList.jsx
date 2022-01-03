import { DataGrid } from "@material-ui/data-grid";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import moment from "moment";
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
import { getAllUser } from "../../../redux/actions/usersAction";


import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import IconButton from "@material-ui/core/IconButton";
import PerfectScrollbar from "react-perfect-scrollbar";

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

export default function UserList({ openn, ...rest }) {
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.users);
  const [users, setUsers] = useState([]);

  const [open, setOpen] = React.useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [schoolId, setSchoolId] = useState("");

  const addStudent = useSelector((state) => state.addStudent);
  //const [value, setValue] = React.useState(new Date());
  const [results, setResults] = useState({});
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [search, setSearch] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

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
    // await dispatch(
    //   addStudentAction({ firstname, lastname, dob, gender, schoolId })
    // );
    // setOpen(false);
    // setFirstname("");
    // setLastname("");
    // setDob("");
    // setGender("");
    // setSchoolId("");
    // await dispatch(getAllStudent());
    // console.log("added");
  };

  useEffect( async() => {
   
    if (!usersState.loading) {
      if (usersState.users) {
        setUsers(usersState.users);
        await dispatch(getAllUser());
      }
    }
  }, [usersState.users]);

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
    const users = 0;
    const searchKey = e.target.value;
    console.log(e.target.value);

    try {
      var results = [];
      const toSearch = trimString(searchKey); // trim it
      for (var i = 0; i < users.length; i++) {
        for (var key in users[i]) {
          if (users[i][key] != null) {
            if (
              users[i][key].toString().toLowerCase().indexOf(toSearch) != -1
            ) {
              if (!itemExists(results, users[i])) results.push(users[i]);
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
  console.log("po"+users);
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
                handleAdd();
              }}
            >
              Add User
            </Button>
          </Box>
      

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>User Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter User information here.
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
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              id="outlined-select-currency"
              label="School"
              value={schoolId}
              name="schoolId"
              onChange={(e) => setSchoolId(e.target.value)}
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
            Add User
            {/* {addStudent.loading ? "Loading..." : "Add new School"} */}
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
              {search ? (
                <>
                  {results.slice(0, limit).map((user) => (
                    <TableRow
                      hover
                      key={user.id}
                      selected={selectedCustomerIds.indexOf(user.id) !== -1}
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
                            //  setcategoryId(product.id);
                            //  setName(product.name);
                            setOpenUpdate(true);
                          }}
                        >
                          <BorderColorIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => {
                            //  setcategoryId(category.id);
                            //  setcategoryName(category.name);
                            setOpen(true);
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
                          // setproductId(product.id)
                          // setproductName(product.name)
                          setOpen(true);
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
         count={users.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
}
UserList.propTypes = {
 users: PropTypes.array.isRequired,
};
