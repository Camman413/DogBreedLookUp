

<template>
  <div class="Search">
    <div id='headerBox'>
      <img id="logo" alt="Dog logo" src="../assets/logo.png">
      <h1>{{ title }}</h1>
      <input id="searchBox" type="text" v-model="searchQuery" placeholder="Search...">
    </div>
    <ul>
      <li v-for="(breed, i) in paginatedBreeds" :key="i">
        <div>
        <img v-bind:src="breed.image">
        <span id="resultTitle">{{ capitalizeWord(breed.name) }}</span>
        <router-link id="moreInfo" to='/dog' v-on:click.native="getCurrentBreed(breed)">View more about {{ capitalizeWord(breed.name) }}s</router-link>
        <br>
        <br>
        <div v-if="breed.subBreeds.length > 0">
          <span>Subbreeds: </span>
          <br>
          <div id="subbreedContainer">
            
          <span id="subbreeds" v-for="(subbreed, i) in breed.subBreeds" :key="i">
            {{capitalizeWord(subbreed)}}&nbsp;
          </span>
          </div>
        </div>
        
        </div>
      </li>
    </ul>
    <h5 id="pagingButtons" v-if="this.getPageCount > 1">
      <span v-on:click='prevPage()'>Previous Page</span>
      &nbsp;
      <span v-on:click='nextPage()'>Next Page</span>
    </h5>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { constants } from 'crypto';
import _ from 'lodash';

export default {
  data() {
    return {
      searchQuery: '',
      filteredBreeds: [],
      paginatedBreeds: [],
      currentPage: 0,
      title: "Dog Breed Search "
    }
  },
  name: 'Search',
  watch: {
    searchQuery: function (newQuery, oldQuery) {
      this.resetCurrentPage()
      this.filteredList()
      this.pagenatedList()
    }
  },
  created() {
    this.retrieveDogsFromAPI();
  },
  computed: {
    ...mapGetters({
      breeds: 'breeds'
    }),
    getPageCount : function(){
      console.log(Math.ceil(this.filteredBreeds.length / 5))
      return Math.ceil(this.filteredBreeds.length / 5)
    },
  },
  methods: {
    ...mapActions({
      retrieveDogsFromAPI: 'retrieveDogsFromAPI',
      getCurrentBreed: 'getCurrentBreed'
    }),
    capitalizeWord(word) {
      return _.capitalize(word);
    },
    filteredList : function () {
      this.filteredBreeds = []
      for(var i = 0; i < this.breeds.length; i++){
        if (this.breeds[i].name.includes(this.searchQuery)) {
          this.filteredBreeds.push(this.breeds[i])
        }
      }
    },
    nextPage : function() {
        if (this.currentPage < this.getPageCount){
          this.currentPage++
        }
        this.pagenatedList()
    },
    prevPage : function() {
      if (this.currentPage > 0){
        this.currentPage--
      }
      this.pagenatedList()
    },
    pagenatedList : function() {
      this.paginatedBreeds = []
      for(var i = 0; i< 5 && this.filteredBreeds[i]; i++){
        this.paginatedBreeds.push(this.filteredBreeds[(this.currentPage * 5) + i])
      }
    },
    resetCurrentPage : function(){
      this.currentPage = 0;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#Search{
  text-align: center;
}
#pagingButtons {
  margin: auto;
  margin-bottom: 10px;
  display: inline-block;
  text-align: center;
  position: relative;
  left: 44%;
  span{
    color: rgb(255, 255, 255);
    background-color: rgb(150, 150, 150);
    padding: 5px;
    border: 2px solid rgb(131, 131, 131);
    border-radius: 4px;
  }
  span:hover {
    cursor: pointer;
    background-color: rgb(175, 175, 175);
  }
}
h1 {
  color: rgb(63, 63, 63);
}
#searchBox {
  width: 26%;
  display: inline-block;
}
#headerBox {
  text-align: center;
  margin: auto;
  img {
    margin: auto;
  }
  h1 {
    margin: auto;
    text-align: center;
  }
  input {
    margin: auto;
  }
}
ul {
  list-style-type: none;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
li:hover {
  box-shadow: 6px 6px 12px 0 #000000;
  
  right: 5px;
  bottom: 5px;
}
li {
  border: 2px solid rgb(131, 131, 131);
  background-color: rgb(150, 150, 150);
  min-height: 100px;
  height: auto;
  padding: 10px;
  overflow: auto;
  position: relative;
  div {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    color: rgb(255, 255, 255);
    width: 100%;
    height: 100%;
    position: relative;
    #moreInfo {
      color: #cfcfcf;
      font-size: 10pt;
      float: left;
      position: absolute;
      bottom: 0;
      left: 175px;
    }
    #moreInfo:hover {
      color: #fcfcfc;
      
    }
    div{
      width: 60%;
      height: auto;
      float: right;
      position: relative;
      right: 0px;
    }
    img {
    width: 150px;
    position: relative;
    float: left;
    clear: both;
    left: 0;
    }
    #resultTitle {
      position: absolute;
      text-align:start;
      top: 0;
      left: 175px;
      
      font-size: 18pt;
    }
    #subbreeds {
      font-size: 10pt;
      display: inline-block;
      clear: both;
      height: auto;
      left: 20px;
    }
    #subbreedContainer {
      position: relative;
      right: 100px;
    }
  }
  
}

</style>
