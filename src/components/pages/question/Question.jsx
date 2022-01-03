import { useState } from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import Button from "@material-ui/core/Button";
import "./question.css";
import {
  Card,
  Table,
  Box,
  TableBody,
  TableCell,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Search as SearchIcon } from "react-feather";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@mui/material/MenuItem";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Question = ({ ...rest }) => {
  const [open, setOpen] = useState(false);
  // const dispatch = useDispatch()
  const [results, setResults] = useState({});
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [search, setSearch] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [schoolId, setSchoolId] = useState("");

  const handleAdd = async () => {
    setOpen(true);
  };
  const handleAddClose = () => {
    setOpen(false);
  };

  function handleChange(event) {}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleUpdate = async () => {};
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async () => {
    setOpen(false);
    window.location.reload();
  };
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
    const products = 0;
    const searchKey = e.target.value;
    console.log(e.target.value);

    try {
      var results = [];
      const toSearch = trimString(searchKey); // trim it
      for (var i = 0; i < products.length; i++) {
        for (var key in products[i]) {
          if (products[i][key] != null) {
            if (
              products[i][key].toString().toLowerCase().indexOf(toSearch) != -1
            ) {
              if (!itemExists(results, products[i])) results.push(products[i]);
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
      <Card {...rest}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete the product below ""?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
              {/* {? "Loading..." : "Delete"} */}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openUpdate}
          onClose={handleCloseUpdate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Update Product"}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Product Name"
              margin="normal"
              name="name"
              // onChange={(e)=> setName(e.target.value)}
              type="text"
              // value={name}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Category Id"
              margin="normal"
              name="categoryId"
              // onChange={(e)=> setcategoryId(e.target.value)}
              type="text"
              // value={categoryId}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Price"
              margin="normal"
              name="price"
              // onChange={(e)=> setPrice(e.target.value)}
              type="text"
              // value={price}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Quantity"
              margin="normal"
              name="quantity"
              //onChange={(e)=> setQuantity(e.target.value)}
              type="text"
              // value={quantity}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Image"
              margin="normal"
              name="imageUrl"
              //  onChange={(e)=> setImageUrl(e.target.value)}
              type="text"
              // value={imageUrl}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Description"
              margin="normal"
              name="description"
              //  onChange={(e)=> setDescription(e.target.value)}
              type="text"
              // value={description}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdate} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary" autoFocus>
              {/* { updateProductState.loading ? "Loading..." : "Update Product"} */}
            </Button>
          </DialogActions>
        </Dialog>
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
          <Box></Box>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Question Information</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter question information here.
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
                {/* {addStudent.loading ? "Loading..." : "Add new Student"} */}
              </Button>
            </DialogActions>
          </Dialog>

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
              Add Question
            </Button>
          </Box>
        </Box>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Question</TableCell>
                  <TableCell>Correct Answer</TableCell>
                  <TableCell>Incorrect answer</TableCell>
                  <TableCell>Exam Name</TableCell>
                  <TableCell>Number of Question</TableCell>
                  <TableCell>Create Date</TableCell>
                  <TableCell>Update Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {search ? (
                  <>
                    {results.slice(0, limit).map((product) => (
                      <TableRow
                        hover
                        //key={product.id}
                        selected={
                          selectedCustomerIds.indexOf(product.id) !== -1
                        }
                      >
                        <TableCell>{product}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <Typography color="textPrimary" variant="body1">
                              {/* {product.name} */}
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
                              {/* {product.productId} */}
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
                              {/* {product.price} */}
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
                              {/* {product.quantity} */}
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
                              {/* {product.description} */}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {/* {moment(product.createdAt).format("DD/MM/YYYY")} */}
                        </TableCell>
                        <TableCell>
                          {/* {moment(product.updatedAt).format("DD/MM/YYYY")} */}
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
                    {/* {products.slice(0, limit).map((product) => ( */}
                    <TableRow
                      hover
                      // key={product.id}
                      // selected={selectedProductIds.indexOf(product.id) !== -1}
                    >
                      <TableCell>1</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {/* {product.name} */}
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
                            {/* {product.category.name} */}
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
                            {/* {product.price} */}
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
                            {/* {product.quantity} */}
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
                            {/* {product.description} */}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {/* {moment(product.createdAt).format("DD/MM/YYYY")} */}
                      </TableCell>
                      <TableCell>
                        {/* {moment(product.updatedAt).format("DD/MM/YYYY")} */}
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
                    {/* )) */}
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
      </Card>
    </div>
  );
};

Question.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default Question;
