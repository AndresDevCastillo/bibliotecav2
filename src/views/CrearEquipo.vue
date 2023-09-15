<template>
  <div class="container mt-5">
    <div class="card border-warning">
      <div class="card-header bg-warning text-white">
        <h5 class="font-weight-bold">Registre un dispositivo</h5>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="tipoEquipo">Tipo de Equipo</label>
            <input
              type="text"
              class="form-control"
              id="tipoEquipo"
              v-model="equipo"
            />
          </div>
          <div class="form-group">
            <label for="serial">Serial</label>
            <input
              type="text"
              class="form-control"
              id="serial"
              v-model="serial"
            />
          </div>
          <div class="form-group">
            <label for="descripcion">Descripción</label>
            <textarea
              class="form-control"
              id="descripcion"
              v-model="descripcion"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="estado">Estado</label>
            <input
              type="text"
              class="form-control"
              id="Estado"
              v-model="Estado"
            />
          </div>
          <button
            class="btn btn-warning text-white font-weight-bold"
            @click="guardar"
          >
            Guardar
          </button>
          <button class="btn btn-danger ml-2" @click="eliminar">
            Eliminar
          </button>
        </form>
      </div>
    </div>
    <v-card color="grey-lighten-4" flat height="200px" rounded="0">
      <v-toolbar extended>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Title</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      equipo: "",
      serial: "",
      descripcion: "",
    };
  },
  methods: {
    guardar() {
      // Lógica para guardar la información aquí
      console.log("Guardar clickeado");
    },
    eliminar() {
      // Lógica para eliminar la información aquí
      console.log("Eliminar clickeado");
    },
  },
};
</script>

<style scoped>
.card {
  margin-top: 50px;
  padding: 10px;
  height: auto;
}
</style>
