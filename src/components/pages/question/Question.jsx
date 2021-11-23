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

import { DeleteOutline } from "@material-ui/icons";


import {Link} from "react-router-dom";




const schools = [
  {
    value: "Remara Catholic",
    label: "Remera Catholic",
  },
  {
    value: "Saint Ignus",
    label: "Saint Ignus",
  }
];

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 160 },
  { field: "lastName", headerName: "Last name", width: 160 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 120,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
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

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function ListStudent(openn) {
  const [open, setOpen] = React.useState(false);
  //const [value, setValue] = React.useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //select input field
  const [school, setSchool] = React.useState("Shool");
 

  const handleChange = (event) => {
    setSchool(event.target.value);
  
  };

  return (
    <div
      style={{ flex: 4, height: "auto", width: "400px", margin: "80px 0px" }}
    >
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new Question
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Question Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter student information here.
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
              id="outlined-select-currency"
              select
              label="Exam Name"
              value={school}
              onChange={handleChange}
              helperText="Please select your Exam"
            >
              {schools.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-basic"
              label="Question"
              variant="outlined"
            />
                       <TextField
              id="outlined-basic"
              label="Options"
              variant="outlined"
            />
                       <TextField
              id="outlined-basic"
              label="Answer"
              variant="outlined"
            />
           
          
          
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add new Question</Button>
        </DialogActions>
      </Dialog>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
