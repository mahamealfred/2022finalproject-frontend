import axios from "axios";
import {
    ADD_DISTRICT_REQUEST,
    ADD_DISTRICT_SUCCESS,
    ADD_DISTRICT_FAILURE,
  } from "../types/addDistrictTypes";
  

export const addDistrictAction = (data, history) => async (dispatch) => {
  try {
    dispatch(districtRequest());
    const token = await localStorage.getItem("x-access-token");
    let headers;
    if (token) {
      headers = {
        "Content-Type": "application/json",
        token: `${token}`,
      };
    } else {
      headers = {
        "Content-Type": "application/json",
      };
    }
    const res = await axios.post(`http://localhost:8000/districts/addDistrict`,
    data,
     {
      headers: headers,
    });

    const district = await res.data;
    console.log(district)
    // localStorage.setItem('my-token', user.data.token);
     localStorage.setItem('district-data', JSON.stringify(district.data));
    dispatch(districtSuccess ({ data: district.data }));
    alert(" District created successfully");
    history('/dashboard', { replace: true })
   
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(districtFailure(errorMessage));
    } else {
      dispatch(districtFailure("Network Error"));
    }
  }
};

export const districtRequest = () => {
  return {
    type: ADD_DISTRICT_REQUEST,
  };
};

export const districtSuccess = (districts) => {
  return {
    type: ADD_DISTRICT_SUCCESS,
    payload: districts,
  };
};
export const districtFailure = (error) => {
  return {
    type: ADD_DISTRICT_FAILURE,
    payload: error,
  };
};