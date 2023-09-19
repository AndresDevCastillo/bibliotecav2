<template>
  <v-app-bar app elevate-on-scroll elevation="8" relative>
    <template v-slot:img="{ props }">
      <v-img v-bind="props" src="../../assets/Tulbar.png"></v-img>
    </template>
    <v-app-bar-nav-icon
      class="btn"
      dark
      @click="procesa()"
    ></v-app-bar-nav-icon>

    <v-toolbar-title class="letra">SISTEMA DE BIBLIOTECAS</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on" style="cursor: point" class="mx-5 mr-10">
          <v-avatar size="40">
            <img src="../../assets/perfil.png" />
          </v-avatar>
        </span>
      </template>
      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { text: "Perfil", icon: "mdi-clock" },
        { text: "Salir", icon: "mdi-account" },
      ],
    };
  },
  methods: {
    procesa() {
      console.log("generado");
      this.$emit("handrawer");
    },
  },
};
</script>
<style lang="scss" scoped>
.letra {
  color: #000000;
  font-size: 30px;
  font-family: "montserrat";
  font-weight: 500;
}
.letra{
  font-family: 'Staatliches', cursive;
  color: #F57025;
  font-size: 40px;
  text-shadow: -2px -2px 1px #FFFF;
}
</style>
