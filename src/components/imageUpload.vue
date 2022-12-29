<template>
  <div>
    <label>
      <input type="file" multiple accept="image/*" ref="file" @change="selectImage">
    </label>
  </div>
  <div>
    <button @click="upload">
      Upload
    </button>
  </div>
  <div v-for="image in imagePreview" :key="image" class="imageWrap">
    <img class="image" :src="image" alt="Image Preview">
  </div>

</template>

<script>
import postToDB from '../services/postToDB'
export default {
  name: 'ImageUpload',
  data() {
    return {
      selectedImages: [],
      imagePreview: []
    }
  },
  methods: {
    selectImage() {
      this.selectedImages = this.$refs.file.files
      for (let i = 0; i < this.selectedImages.length; i++) {
        this.imagePreview.push(URL.createObjectURL(this.selectedImages[i]))
      }
    },
    upload() {
      for (let i = 0; i < this.selectedImages.length; i++) {
        postToDB.image(this.selectedImages[i], this.$store.state.date, this.$store.state.currentBar)
      }
      this.$store.dispatch('getDay')
      this.selectedImages = null
      this.imagePreview = null
    },
  }
}
</script>

<style scoped>
.image {
  width: 20vw;
  height: 20vw;
}

.imageWrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 60vw;
}
</style>