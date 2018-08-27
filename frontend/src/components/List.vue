<template>
<div class="holder">
  <form @submit.prevent="addTask"> 
    <input class="input-task" type="text" placeholder="Enter a task.." v-model="newTask">
    <button class="btn-add" type="submit">ADD</button>
  </form>
  
  <p>Your Tasks</p>
  <ul>
    <li  
    v-for="(task, index) in tasks" 
    :key="index"
    :class="{ isCompleted: task.isCompleted }"
    >
      <input 
      class="btn-status" 
      type="checkbox" 
      v-on:click="toggleStatus(index)" 
      v-model="task.isCompleted">
      <div class="text">{{ task.text }} </div>
      <button class="btn-remove" v-on:click="remove(index)">X</button>
    </li>
    <li v-if="tasks.length===0">
      <div class="text"> No Items </div>
    </li>
  </ul>

</div>
</template>

<script>
import store from '../store';
export default {
  store,
  name: "list",
  props:['list'],
  data() {
    return {
      newTask:'',
    };
  },
  computed:{
    tasks(){
      return store.getters.tasks;
    }
  },
  watch:{

  },
  methods: {
    addTask() {
      const updatedTasks = [...this.tasks];
      updatedTasks.push({
        text: this.newTask,
        isCompleted: false,
      });
      store.dispatch('updateTasks', updatedTasks);
      this.newTask = '';
    },
    remove(id){
      const updatedTasks = [...this.tasks];
      updatedTasks.splice(id, 1);
      store.dispatch('updateTasks', updatedTasks);
    },
    toggleStatus(id){
      const updatedTasks = [...this.tasks];
      const updatedStatusTask = { isCompleted: !this.tasks[id].isCompleted, text: this.tasks[id].text };
      updatedTasks.splice(id, 1, updatedStatusTask );
      store.dispatch('updateTasks', updatedTasks);
    }
  }
};
</script>

<style scoped>
  .input-task {
    width: calc(90% - 40px);
    border: 0;
    padding: 20px;
    font-size: 1.3em;
    background-color: #323333;
    color: #687F7F;
  }

  .isCompleted {
    background-color: #ede745;
  }

  .isCompleted:hover {
    background-color: #f8f6ba;
  }

  .btn-add {
    width: 10%;
    height: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 1.3em;
  }

  .btn-remove {}

  .btn-status {}

  .text {
    display: inline-block;
    width: 90%;
  }

  ul {
    padding: 0;
  }

  li:first-child {
    border-top: 1px solid black;
  }

  li {
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    width: 100%;
    border-bottom: 1px solid black;
    list-style-type: none;
    font-size: 1.3em;
  }

  li:hover{
    background-color: #a1ddc2
  }

  p {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.3em;
  }
</style>
