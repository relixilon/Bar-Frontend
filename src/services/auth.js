import axios from "axios";
import http from "../http-common";

class auth {
  login(username, password) {
    axios.defaults.withCredentials = true;
    return http.post("/auth/signin", {
      username,
      password,
      headers: {
        crossDomain: true,
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Credentials': true,
      },
    });
  }
}

export default new auth();
