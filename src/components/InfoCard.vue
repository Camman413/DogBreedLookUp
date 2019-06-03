<template>
  <div
    id="card"
    class="surface"
    :style="{'--cardWidth': width, '--cardFontRatio':ratio,'--iconWidth':iconWidth}"
  >
    <div id="leftBox">
      <img id="cardIcon" v-show="icon" v-bind:src="icon">
      <div id="cardText">
        <h1 id="title" class="onSurface high" v-show="title">{{title}}</h1>
        <h3 id="subtitle" class="onSurface med">{{subtitle}}</h3>
        <p id="content" class="onSurface med" v-html="content"></p>
      </div>
    </div>
    <router-link
      id="cardLink"
      class="link onSurface med"
      v-on:click.native="linkClickFunc(linkFuncParam)"
      :to="linkDest"
    >{{linkText}}</router-link>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String,
    content: undefined,
    icon: undefined,
    iconWidth: String,
    linkDest: String,
    linkText: String,
    linkClickFunc: undefined,
    linkFuncParam: undefined,
    width: String,
    height: Number,
    ratio: String
  }
};
</script>

<style lang="scss" scoped>
#card {
  display: flex;
  padding: 5px;
  width: var(--cardWidth);
  justify-content: space-between;
  #leftBox {
    display: flex;
    #cardIcon {
      width: var(--iconWidth);
      flex: 1 0 auto;
    }
    #cardText {
      display: flex;
      flex-direction: column;
      #title {
        margin: 5px;
        font-size: calc(32px * var(--cardFontRatio));
      }
      #subtitle {
        margin: 5px;
        font-size: calc(24px * var(--cardFontRatio));
      }
      #content {
        margin: 5px;
        font-size: calc(20px * var(--cardFontRatio));
      }
    }
  }
  #cardLink {
    align-self: flex-start;
    height: auto;
    font-size: calc(16px * var(--cardFontRatio));
  }
}
</style>
