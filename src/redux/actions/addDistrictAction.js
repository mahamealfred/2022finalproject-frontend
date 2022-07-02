import axios from "axios";
import {
    ADD_DISTRICT_REQUEST,
    ADD_DISTRICT_SUCCESS,
    ADD_DISTRICT_FAILURE,
  } from "../types/addDistrictTypes";
  

export const addDistrictAction = (data, history) => async (dispatch) => {
  try {
    dispatch(adddistrictRequest());
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
    
    // localStorage.setItem('my-token', user.data.token);
     localStorage.setItem('district-data', JSON.stringify(district.data));
     const successMessage=await res.data.message
     console.log("Add success message",successMessage)
    dispatch(adddistrictSuccess (successMessage));
    //alert(" District created successfully");
   // history('/dashboard', { replace: true })
   
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(adddistrictFailure(errorMessage));
    } else {
      dispatch(adddistrictFailure("Network Error"));
    }
  }
};

export const adddistrictRequest = () => {
  return {
    type: ADD_DISTRICT_REQUEST,
  };
};

export const adddistrictSuccess = (districts) => {
  return {
    type: ADD_DISTRICT_SUCCESS,
    payload: districts,
  };
};
export const adddistrictFailure = (error) => {
  return {
    type: ADD_DISTRICT_FAILURE,
    payload: error,
  };
};