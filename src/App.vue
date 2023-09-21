<template>
  <v-app id="inspire">
    <div class="app-container">
      <router-view />
    </div>
  </v-app>
</template>

<script>
const default_layout = "default";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },
};
</script>

<style lang="scss">
@import "assets/base.scss";
@import "scss/_dashboard.scss";
@font-face {
  font-family: Staatliches;
  src: url("./assets/fonts/Staatliches-Regular.ttf");
}
@font-face {
  font-family: SairaCondensed;
  src: url("./assets/fonts/SairaCondensed-Light.ttf");
}

.v-sidebar-menu .vsm-header {
  color: black;
}

.btn-app-bar {
  border-radius: 50px;
  padding: 6px;
  background-color: #a299a3c5;
}
.btn-app-bar:hover {
  border-radius: 50px;
  padding: 6px;
  background-color: #a299a3 !important;
}

/*    .body-component{
    background-image: url("./assets/fondo.png");
    background-size: cover;
    background-repeat: no-repeat;
    height:100vh;
    background-attachment: fixed;
    overflow: scroll;
  } */

.button-text {
  font-family: "Montserrat", sans-serif;
  font-weight: 100;
}
.v-card__title {
  font-family: "Staatliches", cursive;
  color: #f9a21f !important;
  font-size: 23px !important;
  text-shadow: -1px -1px 1px #baafaf !important;
}
.v-card__text {
  font-family: SairaCondensed !important;
  color: black !important;
  font-weight: 800 !important;
}
.v-card:hover {
  transition: all 0.3s ease;
  box-shadow: 0px 10px 15px -3px rgb(255, 165, 0) !important;
}
</style>
