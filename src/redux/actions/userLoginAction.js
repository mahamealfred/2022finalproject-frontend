import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from "../types/loginTypes";

export const loginAction = (user, history) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const res = await axios.post(`http://localhost:8000/auth/login`, user);

    const { data } = await res;
    localStorage.setItem("x-access-token", data.data.token);
    localStorage.setItem("user", JSON.stringify(data.data.user));
      if(data.data.role==="Admin"){
        history.push("/dashboard");
      }
      else if(data.data.role==="DistrictUser"){
        history.push("/districtdashboard");
      }
      else {
        history.push("/schooldashboard");
      }
    
  } catch (err) {
    console.log(err);
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(loginFailure(errorMessage));
    } else {
      dispatch(loginFailure("Network Error"));
    }
  }
};

export const loginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

export const loginSuccess = (login) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: login,
  };
};
export const loginFailure = (error) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload: error,
  };
};
