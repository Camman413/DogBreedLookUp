import axios from 'axios'

class API {

    get(url) {
        return axios.get(url);
    }

    getAllDogs() {
        return this.get('https://dog.ceo/api/breeds/list/all');
    }

    getDogImage(breed) {
        return this.get(`https://dog.ceo/api/breed/${breed}/images/random`);
    }

    getMoreDogImages(breed) {
        return this.get(`https://dog.ceo/api/breed/${breed}/images/random/5`);
    }
}

export default API;