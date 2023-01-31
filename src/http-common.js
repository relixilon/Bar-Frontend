import axios from "axios";
axios.defaults.withCredentials = true;

export default axios.create({
  //baseURL: "http://3.69.70.35:3000/api",
  baseURL: "http://192.168.1.14:3000/api",

  headers: {
    crossDomain: true,
    'Access-Control-Allow-Credentials': true,
    "Content-type": "application/json"
  }
});
