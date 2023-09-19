  <template >
      <v-app id="inspire">
        <div class="app-container">
               
          <router-view/>
    
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
@font-face {
    font-family: Staatliches;
    src: url('./assets/fonts/Staatliches-Regular.ttf');
   }

.v-sidebar-menu .vsm-header{
    color: black;
}

.btn-app-bar{
    border-radius: 50px;
    padding: 6px;
    background-color: #a299a3c5;
   }
   .btn-app-bar:hover{
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


  .button-text{
    font-family: 'Montserrat', sans-serif;
    font-weight: 100;
  }

</style>