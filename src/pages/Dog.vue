<template>
  <div id="dogInfo">
    <div id="mainCard">
      <card
        v-bind:title="capitalizeWord(currentBreed.name)"
        subtitle="Subbreeds:"
        v-bind:content="arrayToString(currentBreed.subBreeds)"
        v-bind:icon="currentBreed.image"
        iconWidth="300px"
        linkDest="/"
        linkText="Back to Search"
        width="100%"
        ratio="1.3"
      />
    </div>
    <div id="imagesCard">
      <card
        subtitle="More Images:"
        v-bind:content="imagesToHTML(currentBreed.moreImages)"
        width="100%"
        ratio="1.3"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";
import card from "../components/InfoCard.vue";

export default {
  components: {
    card: card
  },
  name: "Dog",
  data() {
    return {};
  },
  props: {},
  computed: {
    ...mapGetters({
      currentBreed: "currentBreed"
    })
  },
  methods: {
    capitalizeWord(word) {
      return _.capitalize(word);
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
    },
    imagesToHTML: function(images) {
      let imagesHTML = "";
      for (let i = 0; i < images.length; i++) {
        imagesHTML =
          imagesHTML +
          `<img src="${images[i]}" style="width: 150px; margin: 15px;">`;
      }
      return `${imagesHTML}`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#dogInfo {
  text-align: center;
}
#mainCard {
  display: inline-block;
  width: 90%;
}
#imagesCard {
  display: inline-block;
  width: 65%;
}
</style>
