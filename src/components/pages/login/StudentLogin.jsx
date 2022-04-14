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
  import React from "react";
  import { Formik, Form, Field, ErrorMessage } from "formik";
  import * as Yup from "yup";
  import HomeTopbar from "../../homeTopbar/HomeTopbar";
  import { loginAction } from "../../../redux/actions/userLoginAction";
  import { useDispatch, useSelector } from "react-redux";
  import { useHistory } from "react-router-dom";
  import {studentLoginAction} from "../../../redux/actions/studentLoginAction";
  
  export default function StudentLogin() {
    const dispatch = useDispatch();
    const studentLogin = useSelector((state) => state.studentLogin);
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
      remember: false,
    };
    const validationSchema = Yup.object().shape({
      email: Yup.string().email("Please enter valid email").required("Required"),
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    });
    const onSubmit = (values, props) => {
      console.log(values);
      
      dispatch(studentLoginAction(values, history));
    };
    return (
      <Grid>
        <HomeTopbar />
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
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
                    name="studentCode"
                    placeholder="Enter Code"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="studentCode" />}
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
  
                  <Field
                    as={FormControlLabel}
                    name="remember"
                    control={<Checkbox color="primary" />}
                    label="Remember me"
                  />
               <p>{studentLogin.error}</p>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    style={btnStyle}
                    // disabled={props.isSubmitting}

                  >
                    {studentLogin.loading ? "Loading" : "Sign in"}
                  </Button>
                </Form>
              )}
            </Formik>
            <Typography>
              <Link href="#" style={forgotStyle}>
                Forgot password?
              </Link>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
  }
  