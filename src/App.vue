<template >
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
      return (this.$route.meta.layout || default_layout) + '-layout';
    }
  }
}
</script>

<style lang="scss">
@import "assets/base.scss";
@import "scss/_dashboard.scss";

:root {
  --c-orange: orange;
}

.bc-orange {
  background-color: orange;
}

.c-orange {
  color: orange;
}

.btn-tabla {
  background-color: var(--c-orange) !important;
  color: white !important;
}

.btn-cancelar:hover::before,
.btn-cancelar:focus::before {
  transition: all .3s ease;
  opacity: 0.4 !important;
  background-color: var(--c-orange) !important;
}

.btn-cancelar:hover>.v-btn__content,
.btn-cancelar:focus>.v-btn__content {
  color: #FFFFFF;
}

.v-text-field.v-input--is-focused>.v-input__control>.v-input__slot:after {
  border-color: var(--c-orange) !important;
}

.v-text-field__slot>.v-label.primary--text {
  color: var(--c-orange) !important;
}

.v-progress-linear>.v-progress-linear__background.primary {
  background-color: var(--c-orange) !important;
}

.v-progress-linear .v-progress-linear__indeterminate .long,
.v-progress-linear .v-progress-linear__indeterminate .short {
  background-color: var(--c-orange) !important;
}

.v-sidebar-menu .vsm-header {
  color: rgb(0, 0, 0);
}

.v-sidebar-menu .vsm-link {
  background-color: orange !important;
}

.v-sidebar-menu .vsm-title {
  color: #FFFFFF;
}

.v-sidebar-menu .vsm-icon {
  color: #FFFFFF;
}

.v-sidebar-menu .vsm-arrow {
  color: #FFFFFF;
  opacity: 1;
}

.v-sidebar-menu .vsm-link:hover {
  background-color: #ffffff70;
}


.v-sidebar-menu .vsm-item.active-item>.vsm-link>.vsm-icon+.vsm-title {
  color: #000;

}

.v-sidebar-menu .vsm-dropdown .vsm-item .vsm-link {
  padding: 0 2rem;
}

.v-sidebar-menu .vsm-dropdown::before {
  background-color: orange !important;
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
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
}</style>