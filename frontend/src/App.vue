<template>
  <div id="app">
    <List 
     />
  </div>
</template>
<script>
import List from "./components/List.vue";
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';

Vue.use(VueAxios, axios)

export default {
  store,
  name: "app",
  created() {
    this.getList();
  },
  data() {
    return {}
  },
  computed: {
    tasks() {
      return store.getters.tasks;
    },
    loadedTask() {
      return store.getters.loadedTask;
    }
  },
  watch: {
    tasks: function () {
      this.updateList();
    },
  },
  methods: {
    updateList() {
      const body = {
        tasks: Object.assign({}, this.tasks),
      }
      Vue.axios.post("http://localhost:4000", body)
        .then(() => {});
    },
    getList() {
      Vue.axios.get("http://localhost:4000")
        .then((res) => {
          const updatedTasks = Object.values(res.data.tasks) || [];
          store.dispatch('updateTasks', updatedTasks);
        });

    }

  },
  components: {
    List
  }
};
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
body {
  background-color: #42b983;
  font-family: 'Montserrat', sans-serif;
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
}

body,
html {
  margin: 0;
  height: 100%;
}

#app {
  width: 50%;
}
</style>
