import axios from "axios";

const options = {
  baseURL: "http://localhost:8888/api/",
  responseType: "json"
};

let token = null;

if (window.localStorage.getItem("user") !== null) {
  token = JSON.parse(window.localStorage.getItem("user")).access_token;
  options.headers = { Authorization: "Bearer " + token };
}

export default axios.create(options);
