<template>
  <nav-bar />
  <div>
    <form class="main" v-on:submit.prevent="submit()">
      <input class="date" type="Date" v-model="this.$store.state.date" @change="getData()" />
      <h3>Ingresos</h3>
      <div class="inputs">
        <div class="amount" v-for="amount in amounts" :key="amount._id">
          <div class="amountLabel">
            <span>{{ amount.label }}</span>
          </div>
          <input class="amountAmount" type="number" step="any" :value="amount.value" :id="amount.label"
            @change="updateAmount" placeholder="0">
        </div>
      </div>
      <div class="newItem">
        <input class="amountLabel" type="text" v-model="label" placeholder="Categoria">
        <input class="amountAmount" type="number" v-model="value" placeholder="0">
        <button @click="addCategory">Añadir</button>
      </div>
      <div>
      </div>
      <span>Notes</span>
      <textarea :value="notes" name="" id="" cols="30" rows="10" @change="updateNotes"></textarea>
      <button class="submit" v-on:click="submit">Submit</button>
      <div class="imageWrap">
        <div v-for="image in this.images" :key="image.id">
          <img class="image" :class="{ magnify: image.magnify }" :src="('data:image/png;base64,' + image.img)"
            :alt="image.id" v-on:click="magnifyImage(image.id)" />
          <button class="deleteButton" @click="imageOptions(image.id)">Borrar</button>
          <div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import postToDB from "../services/postToDB"
import navBar from "./nav.vue"
export default {
  name: "mainPage",
  components: {
    navBar
  },
  data: function () {
    return {
      magnify: false,
      label: '',
      value: '',
    }
  },

  computed: {
    bar() {
      return this.$store.state.currentBar
    },
    amounts() {
      return this.$store.state.day.amounts
    },
    notes() {
      return this.$store.state.day.notes
    },
    images() {
      return this.$store.state.day.images
    },
  },

  beforeCreate() {
    this.$store.dispatch('getDay')
  },
  methods: {
    addCategory() {
      this.$store.commit('setAmount', {
        label: this.label,
        value: this.value,
      })
      this.value = null
      this.label = ''
    },
    updateAmount(e) {
      this.$store.commit('setAmount', {
        value: e.target.value,
        label: e.target.id
      })
    },
    updateNotes(e) {
      this.$store.commit('setNotes', e.target.value)
    },
    submit() {
      postToDB.day(this.$store.state.date, this.$store.state.currentBar, this.$store.state.day.amounts, this.$store.state.day.notes)
        .then(() => {
        },
          error => {
            if (error) {
              alert('Error por favor intenta de nuevo')
            }

          }
        );
    },
    getData() {
      this.$store.dispatch('getDay')
    },
    imageOptions(image) {
      if (confirm('Eliminar imagen?')) {
        this.$store.dispatch('deleteImage', image).then(() => {
          this.$store.dispatch('getDay')
        })
      }
    },
    magnifyImage(image) {
      this.$store.commit('magnifyImage', image)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin-top: 2vh;
  gap: 1vh;
}


.inputs {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 40vw;
  gap: 1vw;
}

.amount {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1vw;

}

.amountLabel {
  width: 10vw;
}

.amountAmount {
  width: 10vh;
}

.imageWrap {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100vw;
  gap: 4vh;
}

.submit {
  margin: 4vh 0 0 0;
}

.image {
  width: 90vw;
}

.deleteButton {
  margin: 0 0 0 2vw;
  height: 5vh;
  width: 10vw;
  background-color: red;
  color: white;
  border: none;
  font-size: 30px;
}

.magnify {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>

