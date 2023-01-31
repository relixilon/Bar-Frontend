import axios from "axios";
import http from "../http-common";

class postToDB {
  register(data) {
    axios.defaults.withCredentials = true;
    return http.post("/auth/register", {
      username: data.username,
      password: data.password,
      bars: data.bars,
      roles: data.role,
      headers: {
        crossDomain: true,
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Credentials': true,
      },
    })
  }
  day(date, bar, amounts, notes) {
    axios.defaults.withCredentials = true;
    return http.post("/user/submitDay", {
      date: date,
      bar: bar,
      notes: notes,
      amounts: amounts,
      headers: {
        crossDomain: true,
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Credentials': true,
      },
    });
  }
  image(image, date, bar) {
    axios.defaults.withCredentials = true;
    let formData = new FormData();

    formData.append("date", date);
    formData.append("bar", bar);
    formData.append("image", image);

    return http.post("/user/submitImage", formData, {

      headers: {
        crossDomain: true,
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Credentials': true,
      },
    });
  }
  deleteImage(id) {
    axios.defaults.withCredentials = true;
    return http.post("/user/deleteImage", {
      id: id,
      headers: {
        crossDomain: true,
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Credentials': true,
      },
    });
  }
}
export default new postToDB();
