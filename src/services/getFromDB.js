import axios from "axios";
import http from "../http-common";

class getFromDB {
  day(date, bar) {
    axios.defaults.withCredentials = true;
    return http.post("/user/getDay", {
      date: date,
      bar: bar,
      headers: {
        crossDomain: true,
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Credentials': true,
      },
    });
  }
  image(date, bar) {
    axios.defaults.withCredentials = true;
    return http.post("/user/getImage", {
      date: date,
      bar: bar,
      headers: {
        crossDomain: true,
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Credentials': true,
      },
    });
  }
}

export default new getFromDB();
