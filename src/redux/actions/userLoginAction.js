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
    console.log();
    localStorage.setItem("x-access-token", data.data.token);
    localStorage.setItem("user", JSON.stringify(data.data.user));

    history.push("/dashboard");
  } catch (err) {
    console.log(err);
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(loginFailure(errorMessage));
    } else {
      dispatch(loginFailure("Network n Error"));
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
