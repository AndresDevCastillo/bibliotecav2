<template>
  <v-card height="760px" width="500px" class="mx-auto">
    <v-card-title> Mouse </v-card-title>
    <v-img height="350px" src="../../assets/images/Mouse.png"></v-img>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="paquete.estado" :counter="20" :rules="campoRules" label="Ingrese estado Equipo"
          required></v-text-field>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="guardar()">
          Guardar
        </v-btn>
        <v-btn color="error" class="mr-4" @click="reset()">Limpiar </v-btn>
        <v-p>{{ paquete }}</v-p>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: true,

    paquete: {
      estado: null,
    },
    campoRules: [
      (v) => !!v || "Campo requerido",
    ]
  }),

  methods: {
    guardar() {
      var vm = this;
      if (this.$refs.form.validate()){
        axios
          .post("http://localhost:3000/dispositivo", this.paquete)
          .then(function (response) {
            // handle success
            console.log(response);
            alert("guardado");
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            vm.$refs.form.reset();
            // always executed
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  },
  mounted() {
    axios.get('http://localhost:3000/estado-equipo').then((response) => console.log(response.data));
  }
};
</script>