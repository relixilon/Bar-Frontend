import axios from "axios";
import http from "../http-common";

class getFromDB {

  user(id) {
    axios.defaults.withCredentials = true;
    return http.get("/user/getUser", {
      params: {
        id: id,
      },
      headers: {
        crossDomain: true,
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Credentials': true,
      },
    });
  }
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
  imageAmount(date, bar) {
    axios.defaults.withCredentials = true;
    return http.get("/user/getImageAmount", {
      params: {
        date: date,
        bar: bar,
      },
      headers: {
        crossDomain: true,
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Credentials': true,
      },
    });
  }

  images(date, bar) {
    axios.defaults.withCredentials = true;
    return http.get("/user/getImages", {
      params: {
        date: date,
        bar: bar,
      },
      headers: {
        crossDomain: true,
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Credentials': true,
      },
    });
  }

  image(id) {
    axios.defaults.withCredentials = true;
    return http.get("/user/getImage", {
      params: {
        id: id,
      },
      headers: {
        crossDomain: true,
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Credentials': true,
      },
    });
  }
  dashboard(bar) {
    axios.defaults.withCredentials = true;
    return http.get("/user/dashboard", {
      params: {
        bar: bar,
      },
      headers: {
        crossDomain: true,
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Credentials': true,
      },
    });
  }
}


export default new getFromDB();
