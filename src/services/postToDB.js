import axios from "axios";
import http from "../http-common";

class postToDB {
  day(date, bar, amount, notes) {
    axios.defaults.withCredentials = true;
    return http.post("/user/submitDay", {
      date: date,
      bar: bar,
      notes: notes,
      amount: amount,

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

}

export default new postToDB();
