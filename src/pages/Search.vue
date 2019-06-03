

<template>
  <div class="Search">
    <div id="headerBox">
      <img id="logo" alt="Dog logo" src="../assets/logo.png">
      <h1 class="onSurface high">{{ title }}</h1>
      <input id="searchBox" type="text" v-model="searchQuery" placeholder="Search...">
    </div>
    <ul>
      <li v-for="(breed, i) in paginatedBreeds" :key="i">
        <card
          class="surfaceHover"
          v-bind:title="capitalizeWord(breed.name)"
          subtitle="Subbreeds:"
          v-bind:content="arrayToString(breed.subBreeds)"
          v-bind:icon="breed.image"
          iconWidth="150px"
          linkDest="/dog"
          v-bind:linkText="`View more about ${breed.name}s`"
          v-bind:linkClickFunc="getCurrentBreed"
          v-bind:linkFuncParam="breed"
          width="100%"
        />
      </li>
    </ul>
    <h5 id="pagingButtons" v-if="this.getPageCount > 1">
      <span class="button primary" v-on:click="prevPage()">Previous Page</span>
      &nbsp;
      <span class="button primary" v-on:click="nextPage()">Next Page</span>
    </h5>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import card from "../components/InfoCard.vue";

export default {
  components: {
    card: card
  },
  data() {
    return {
      searchQuery: "",
      filteredBreeds: [],
      paginatedBreeds: [],
      currentPage: 0,
      title: "Dog Breed Search ",
      logo: "require(../)"
    };
  },
  name: "Search",
  watch: {
    searchQuery: function() {
      this.resetCurrentPage();
      this.filteredList();
      this.pagenatedList();
    }
  },
  created() {
    this.retrieveDogsFromAPI();
  },
  computed: {
    ...mapGetters({
      breeds: "breeds"
    }),
    getPageCount: function() {
      return Math.ceil(this.filteredBreeds.length / 5);
    }
  },
  methods: {
    ...mapActions({
      retrieveDogsFromAPI: "retrieveDogsFromAPI",
      getCurrentBreed: "getCurrentBreed"
    }),
    capitalizeWord(word) {
      return _.capitalize(word);
    },
    filteredList: function() {
      this.filteredBreeds = [];
      for (var i = 0; i < this.breeds.length; i++) {
        if (this.breeds[i].name.includes(this.searchQuery)) {
          this.filteredBreeds.push(this.breeds[i]);
        }
      }
    },
    nextPage: function() {
      if (this.currentPage < this.getPageCount) {
        this.currentPage++;
      }
      this.pagenatedList();
    },
    prevPage: function() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
      this.pagenatedList();
    },
    pagenatedList: function() {
      this.paginatedBreeds = [];
      for (var i = 0; i < 5 && this.filteredBreeds[i]; i++) {
        this.paginatedBreeds.push(
          this.filteredBreeds[this.currentPage * 5 + i]
        );
      }
    },
    resetCurrentPage: function() {
      this.currentPage = 0;
    },
    arrayToString: function(array) {
      let string = "";
      if (array.length > 1) {
        if (array.length > 2) {
          for (let i = 0; i < array.length - 1; i++) {
            string = string + this.capitalizeWord(array[i]) + ", ";
          }
        } else {
          string = string + this.capitalizeWord(array[0]) + " ";
        }
        string = string + "and " + this.capitalizeWord(array[array.length - 1]);
      } else if (array.length === 1) {
        string = string + this.capitalizeWord(array[0]);
      }
      return string;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style lang="scss" scoped>
#Search {
  text-align: center;
}
#pagingButtons {
  margin: auto;
  margin-bottom: 10px;
  display: inline-block;
  text-align: center;
  position: relative;
  left: 44%;
  span {
    padding: 5px;
  }
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
li {
  div {
    font-weight: bold;
    width: 100%;
    height: 100%;
    position: relative;
    #moreInfo {
      font-size: 10pt;
      float: left;
      position: absolute;
      bottom: 0;
      left: 175px;
    }
    div {
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
      text-align: start;
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
