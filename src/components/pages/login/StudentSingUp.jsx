import {
    Avatar,
    Button,
    Checkbox,
    Link,
    FormControlLabel,
    Grid,
    Paper,
    TextField,
    Typography,
  } from "@material-ui/core";
  import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
  import Alert from '@mui/material/Alert';
  import Stack from '@mui/material/Stack';
  import React from "react";
  import { Formik, Form, Field, ErrorMessage } from "formik";
  import * as Yup from "yup";
  import HomeTopbar from "../../homeTopbar/HomeTopbar";
  import { useDispatch, useSelector } from "react-redux";
  import { useHistory } from "react-router-dom";
  import {studentSingupAction} from "../../../redux/actions/studentSingupAction";
  
  export default function StudentSingUp() {
    const dispatch = useDispatch();
    const studentSingup = useSelector((state) => state.studentSingup);
    const history = useHistory();
  
    const paperStyle = {
      padding: 20,
      height: "65vh",
      width: 300,
      margin: "80px auto",
    };
    const avatarStyle = {
      backgroundColor: "green",
      margin: "8px 0px",
    };
    const btnStyle = {
      margin: "6px 0px",
    };
    const textStyle = {
      margin: "20px 0px",
    };
    const forgotStyle = {
      textDecoration: "none",
    };
    const initialValues = {
      email: "",
      password: "",
      studentcode:"",
    };
    const validationSchema = Yup.object().shape({
      email: Yup.string().email("Please enter valid email").required("Required"),
      studentcode: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    });
    const onSubmit = (values, props) => {
      console.log(values);
      dispatch(studentSingupAction(values, history));
      
    };
    return (
      <Grid>
        <HomeTopbar />
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign Up</h2>
          </Grid>
          <Grid style={textStyle}>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {(props) => (
                <Form>
                  <Field
                    as={TextField}
                    label="Email"
                    name="email"
                    placeholder="Enter email"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="email" />}
                  />
                  <Field
                    as={TextField}
                    label="Student Code"
                    name="studentcode"
                    placeholder="Enter Code"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="studentcode" />}
                  />
                  <Field
                    as={TextField}
                    label="Password"
                    name="password"
                    placeholder="Enter password"
                    type="password"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="password" />}
                  />
                   {
                  !studentSingup.error? null:
                  <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant="filled" severity="error">
                  {studentSingup.error}
                   </Alert>
                   </Stack>
                }
                
               {/* <p>{studentSingup.error}</p> */}
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    style={btnStyle}
                    // disabled={props.isSubmitting}
                  >
                    {studentSingup.loading ? "Loading" : "Sing Up"}
                  </Button>
                </Form>
              )}
            </Formik>
            <Typography>
              <Link href="/assessments/studentLogin" style={forgotStyle}>
                Already have an account?
              </Link>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
  }
  