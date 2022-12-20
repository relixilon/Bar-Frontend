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
    {{ images }}
  </div>
  <div v-if="imagePreview" class="imagePreview">
    <img class="image" :src="imagePreview" alt="Image Preview">
  </div>

</template>

<script>
import postToDB from '../services/postToDB'
export default {
  name: 'ImageUpload',
  props: {
    images: Array
  },
  data() {
    return {
      currentImage: null,
      imagePreview: null,
    }
  },
  methods: {
    selectImage() {
      this.currentImage = this.$refs.file.files.item(0)
      this.imagePreview = URL.createObjectURL(this.currentImage)
    },
    upload() {
      postToDB.image(this.currentImage, this.$store.state.date, this.$store.state.currentBar)
        .then(() => {
          this.$forceUpdate();
        })
      this.currentImage = null
      this.imagePreview = null

    },
  }

}
</script>

<style>
.image {
  width: 20vw;
  height: 20vw;
}

.imageWrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>