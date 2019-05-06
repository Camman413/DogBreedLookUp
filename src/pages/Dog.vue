<template>
  <div>
        <div id="infoCard">
            <img id="mainImage" v-bind:src="currentBreed.image">
            <h1 id="title">{{capitalizeWord(currentBreed.name)}}</h1>
            <h4><a href="/">Back to Search</a></h4>
            <div v-if="currentBreed.subBreeds.length > 0">
                <h2 id="subtitle">Subbreeds:</h2>
                <div id="subbreeds">
                    <span v-for="(subbreed, i) in currentBreed.subBreeds" :key="i">{{capitalizeWord(subbreed)}}, </span>
                </div>
            </div>
            <div>
                <h2 id="moreImagesTitle">More Images:<img id="refreshImages" src="../assets/refresh.png" v-on:click="currentBreed.getMoreImages()"></h2>
                <div id="moreImages">
                    <span v-for="(image, i) in currentBreed.moreImages" :key="i">
                        <img id="images" v-bind:src="image">
                    </span>
                </div>
            </div>
        </div>
  </div>
</template>

<script>

import { mapGetters, mapActions, mapState } from 'vuex'

export default {
    name: 'Dog',
    data (){
    return {
    }
    },
    props: {
    },
    computed: {
        ...mapGetters({
            currentBreed: 'currentBreed' 
    
        })
    },
    methods: {
        capitalizeWord(word) {
      return _.capitalize(word);
    },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    #infoCard {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        background-color: rgb(150, 150, 150);
        min-height: 400px;
        height: auto;
        width: 95%;
        margin: auto;
        position: relative;
        padding: 1%;
        color: rgb(26, 26, 26);
        #refreshImages{
            box-shadow: none;
            height: 25px;
            position: relative;
            top: 5px;
            cursor: pointer;
        }
        a {
            color: #cfcfcf;
            position: absolute;
            top: 14%;
            left: 20%;
            font-size: 16pt;
            margin: 15px;
        }
        a:hover {
                color: #fcfcfc;
            }
        img {
            box-shadow: -6px 6px 12px 2px #000000;
        }
        #mainImage {
            width: 18%;
            
        }
        #title {
            position: absolute;
            left: 20%;
            top: 5%;
            font-size: 36pt;
            margin: 0;
            
        }
        #subtitle {
            position: absolute;
            left: 23%;
            top: 23%;
            margin: 5px;
        }
        #subbreeds{
            height: 250px;
            width: 20%;
            position: absolute;
            top: 30%;
            left: 21%;
            
        }
        #images{
            width: 15%;
            margin: 15px;
        }
        #moreImages{
            margin: auto;
            width: auto;
        }
    }
</style>
