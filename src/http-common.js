import axios from "axios";
axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: "http://18.193.129.154:3000/api",
  headers: {
    crossDomain: true,
    'Access-Control-Allow-Credentials': true,
    "Content-type": "application/json"
  }
});
