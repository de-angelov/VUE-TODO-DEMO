import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
 

export default new Vuex.Store({
    state: {
        tasks: [],
    },
    mutations: {
        updateTasks(state, payload){
            state.tasks = payload;
        },
    },
    actions:{
        updateTasks(state, payload) {
            state.commit('updateTasks', payload);
        },
    },
    getters:{
        tasks(state){
            return state.tasks;
        },
    }
});