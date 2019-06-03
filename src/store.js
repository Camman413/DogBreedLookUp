/* eslint-disable no-console */
import vue from 'vue'
import vuex from 'vuex'
import API from './service'
import Dog from './models/dog';

const api = new API();

vue.use(vuex)

export default new vuex.Store({
    state: {
        breeds: [],
        currentBreed: {},
    },
    actions: {
        retrieveDogsFromAPI({
            commit
        }) {
            api.getAllDogs()
                .then((response) => {
                    commit('setBreeds', Object.entries(response.data.message).map(breed => new Dog(breed)));
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getCurrentBreed({
            commit
        }, breed) {
            commit('setCurrentBreed', breed)
            //console.log(breed)

        }
    },
    getters: {
        breeds(state) {
            return state.breeds;
        },
        currentBreed(state) {
            return state.currentBreed
        }
    },
    mutations: {
        setBreeds(state, breeds) {
            state.breeds = breeds
        },
        setCurrentBreed(state, currentBreed) {
            state.currentBreed = currentBreed
            //console.log(state.currentBreed)
        }
    }
})