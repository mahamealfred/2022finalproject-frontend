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



import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getAllSchool } from "../../../redux/actions/schoolsAction";
import { addSchoolAction } from "../../../redux/actions/addSchoolAction";

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

export default function School({ openn, ...rest }) {
  const dispatch = useDispatch();
  const schoolsState = useSelector((state) => state.schools);
  const [schools, setSchools] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");
  const [level,setLevel]=useState("");
  const [fullname,setFullname]=useState("");
  const [email,setEmail]=useState("");



  const addSchool = useSelector((state) => state.addSchool);
  //const [value, setValue] = React.useState(new Date());
  const [results, setResults] = useState({});
  const [selectedSchoolIds, setSelectedSchoolIds] = useState([]);
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
    await dispatch(
      addSchoolAction({ province, district,sector,cell,fullname,email,level })
    );
    setOpen(false);
   
    setName("");
    setProvince("");
    setDistrict("");
    setSector("");
    setCell("");
    setLevel("");
    setFullname("");
    setEmail("");
    await dispatch(getAllSchool());
    console.log("added");
  };
  console.log(name);

  useEffect( () => {
   async function fetchData(){
    if (!schoolsState.loading) {
      if (schoolsState.schools) {
        setSchools(schoolsState.schools);
        await dispatch(getAllSchool());
      }
    }
    
   }
   fetchData();
  }, [schoolsState.schools]);
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
    const schools = 0;
    const searchKey = e.target.value;
    console.log(e.target.value);

    try {
      var results = [];
      const toSearch = trimString(searchKey); // trim it
      for (var i = 0; i < schools.length; i++) {
        for (var key in schools[i]) {
          if (schools[i][key] != null) {
            if (
              schools[i][key].toString().toLowerCase().indexOf(toSearch) != -1
            ) {
              if (!itemExists(results, schools[i])) results.push(schools[i]);
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
                placeholder="Search products"
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
              id="outlined-basic"
              label="Province"
              name="province"
              onChange={(e) => setProvince(e.target.value)}
              value={province}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="District"
              name="district"
              onChange={(e) => setDistrict(e.target.value)}
              value={district}
              variant="outlined"
            />
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
              <TextField
              id="outlined-basic"
              label="level"
              name="level"
              onChange={(e) => setLevel(e.target.value)}
              value={level}
              variant="outlined"
            /> 
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

      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>School Name</TableCell>
                <TableCell>Province</TableCell>
                <TableCell>District</TableCell>
                <TableCell>Sector</TableCell>
                <TableCell>Cell</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Update Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {search ? (
                <>
                  {results.slice(0, limit).map((school) => (
                    <TableRow
                      hover
                      //key={product.id}
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
                          {school.province}
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
                           {school.district}
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
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                           {school.level}
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
                          {school.province}
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
                          {school.district}
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
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                      {school.level}
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
