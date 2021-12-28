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
import MenuItem from "@mui/material/MenuItem";
import {Link} from "react-router-dom";


import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux";
import {useState,useEffect} from "react";
import { getAllSchool } from "../../../redux/actions/schoolsAction";

import { DeleteOutline } from "@material-ui/icons";

const levels = [
  {
    value: "P6",
    label: "P6",
  },
  {
    value: "S3",
    label: "S3",
  },
];


const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "School name", width: 160 },
  { field: "province", headerName: "Province", width: 160 },
  {
    field: "district",
    headerName: "District",
    width: 120,
  },
  {
    field: "sector",
    headerName: "Sector",
    width: 160,
    
  },
  {
    field: "cell",
    headerName: "Cell",
    width: 160,
    
  },
  {
    field: "level",
    headerName: "Level",
    width: 160,
    renderCell: (params)=>{
      return(
          <>
          {console.log(params.row.level)}
          </>

      )
  }
    
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


 

export default function School({openn,...rest}) {

  const dispatch = useDispatch();
  const schoolsState = useSelector((state) => state.schools);
  const [schools, setSchools] = useState([]);

  const [open, setOpen] = React.useState(false);
  //const [value, setValue] = React.useState(new Date());
 
  useEffect(()=>{
    dispatch(getAllSchool());
  })
  useEffect(()=>{
     
    if (!schoolsState.loading) {
        if (schoolsState.schools) {
          setSchools(schoolsState.schools);
        }
      }
    }, [schoolsState.schools,schoolsState.loading, dispatch]);

 
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //select input field
  const [school, setSchool] = React.useState("Shool");
  const [level, setLevel] = React.useState("Shool");

  const handleChange = (event) => {
    setSchool(event.target.value);
    setLevel(event.target.value);
  };

  return (
    <div
      style={{ flex: 4, height: "auto", width: "400px", margin: "80px 0px" }}
    >
      <Button variant="outlined" onClick={handleClickOpen}>
        Add School
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>School Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter School information here.
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
              label="School Name"
              variant="outlined"
            />

            <TextField
              id="outlined-select-currency"
              select
              label="Province"
              value={school}
              onChange={handleChange}
              helperText="Please select your Province"
            >
              {schools.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Distrct"
              value={level}
              onChange={handleChange}
              helperText="Please select your District"
            >
              {levels.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Sector"
              value={level}
              onChange={handleChange}
              helperText="Please select your Sector"
            >
              {levels.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Cell"
              value={level}
              onChange={handleChange}
              helperText="Please select your Cell"
            >
              {levels.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Level"
              value={level}
              onChange={handleChange}
              helperText="Please select your Cell"
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
          <Button onClick={handleClose}>Add new School</Button>
        </DialogActions>
      </Dialog>
      <DataGrid
        rows={schools}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
School.propTypes = {
  schools: PropTypes.array.isRequired,
};
