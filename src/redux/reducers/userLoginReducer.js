import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from "../types/loginTypes";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state, //spredding
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    case USER_LOGIN_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
