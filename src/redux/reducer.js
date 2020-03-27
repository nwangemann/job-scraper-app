import axios from "axios";

let initialState = {
  user: {},
  loginView: true
};

const SWITCH_TO_LOGIN = "SWITCH_TO_LOGIN"
const SWITCH_TO_REGISTER = "SWITCH_TO_REGISTER"
const SUBMIT_USER = "SUBMIT_USER";
const GET_SESSION = "GET_SESSION";
const LOGOUT = "LOGOUT";

export function switchToLogin(){
    return {
        type: SWITCH_TO_LOGIN,
        payload: ''
    }
}

export function switchToRegister(){
    return {
        type: SWITCH_TO_REGISTER,
        payload: ''
    }
}

export function submitUser(user) {
  return {
    type: SUBMIT_USER,
    payload: user
  };
}

export function getSession() {
  let user = axios.get("/auth/userSession");
  return {
    type: GET_SESSION,
    payload: user.data
  };
}

export function logout() {
  axios.get("/auth/logout");
  return {
    type: LOGOUT,
    payload: {}
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_TO_LOGIN:
        return { ...state, loginView: true }
    case SWITCH_TO_REGISTER:
        return { ...state, loginView: false }
    case LOGOUT:
      return { ...state, user: {} };
    case SUBMIT_USER:
      return { ...state, user: action.payload };
    case GET_SESSION:
      return { user: action.payload, loading: false };
    default:
      return state;
  }
}
