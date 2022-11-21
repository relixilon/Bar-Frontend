<template>
  <div>
    <label>
      <input type="file" accept="image/*" ref="file" @change="selectImage">
    </label>
  </div>
  <div>
    <button @click="upload">
      Upload
    </button>
  </div>
  <div v-for="image in images" :key="image._id">
  </div>
</template>

<script>
import postToDB from '../services/postToDB'
import getFromDB from '../services/getFromDB'
export default {
  name: 'ImageUpload',
  data() {
    return {
      images: [],
      file: null
    }
  },
  props: {
    bar: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  mounted() {
    getFromDB.image(this.date, this.bar)
      .then((res) => {
        console.log(res.data.img)
        this.images = res.data.img
      },
        error => {
          console.log(error)
        }
      )
  },

  methods: {
    displayImage(data) {
      var base = this
      let base64String = btoa(
        String.fromCharCode.apply(null, new Uint8Array(data))
      );
      base.img = "data:image/png;base64," + base64String;
    },
    selectImage() {
      this.currentImage = this.$refs.file.files.item(0)
      this.previewImage = URL.createObjectURL(this.currentImage)
      this.progress = 0
    },
    upload() {
      this.progress = 0
      postToDB.image(this.currentImage, this.date, this.bar)
        .then((response) => {
          this.imageInfos.push({
            name: response.data.name,
            url: response.data.url
          })
        })
        .catch(() => {
          this.progress = 0
          alert('Could not upload the file!')
        })
    },
  }

}
</script>

<style>

</style>