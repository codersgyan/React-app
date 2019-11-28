import { LOGOUT, ANTHENTICATE } from "./types";
import Api from "../utils/Api";

export const register = formdata => dispatch => {
  //   console.log(formdata);
  return new Promise((resolve, reject) => {
    Api.post("users", formdata)
      .then(res => {
        if (res.status === 201) {
          resolve(res.data);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const login = formdata => dispatch => {
  //   console.log(formdata);
  return new Promise((resolve, reject) => {
    Api.post("login", formdata)
      .then(res => {
        if (res.status === 200) {
          resolve(res.data);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const logUserIn = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: ANTHENTICATE,
      payload: data
    });
  });
};

export const logout = () => dispatch => {
  return new Promise((resolve, reject) => {
    // Clear User from local storage

    window.localStorage.removeItem("user");

    resolve(true);
    dispatch({
      type: LOGOUT,
      payload: null
    });
  });
};
