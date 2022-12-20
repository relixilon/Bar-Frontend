import getFromDB from "./getFromDB";

class helpers {
  getImages(images) {
    return new Promise((resolve) => {
      images.forEach((image) => {
        getFromDB.image(image._id).then((res) => {
          image.src = res.data.img;
        })
      })
      resolve(images)
    })
  }
}

export default new helpers();
