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

import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";

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
    renderCell: (params) => {
      return (
        <>
          <Link to={"/user/" + params.row.id}>
            <button className="userListEdit">Edit</button>
          </Link>

          <DeleteOutline className="userListDelete" />
        </>
      );
    },
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

  return (
    <div
      style={{ flex: 4, height: "auto", width: "400px", margin: "80px 0px" }}
    >
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new Exam
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Exam Information</DialogTitle>
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
              id="outlined-basic"
              label="Exam Name"
              variant="outlined"
            />
            <TextField
              id="date"
              label="Start Date"
              type="datetime"
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField id="outlined-basic" label="Subject" variant="outlined" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add new Exam</Button>
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
