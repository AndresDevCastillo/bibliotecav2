<template>
  <v-card height="710px" width="500px" class="mx-auto">
    <v-card-title> Video Beam </v-card-title>
    <v-img height="300px" src="../../assets/images/Vdbeam.jpeg"></v-img>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="paquete.codigo"
          :rules="campoRules"
          label="Codigo"
          required
        ></v-text-field>

        <v-text-field
          v-model="paquete.referencia"
          :rules="campoRules"
          label="Referencia"
          required
        ></v-text-field>

        <v-text-field
          v-model="paquete.serial"
          label="Serial"
          required
        ></v-text-field>

        <v-select
          v-model="paquete.estado"
          :items="items"
          :rules="[(v) => !!v || 'Item is required']"
          label="Estado"
          required
        ></v-select>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="guardar()"
        >
          Guardar
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">Eliminar</v-btn>
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
      codigo: null,
      referencia: null,
      serial: null,
      estado: null,
      tipo: "Video Beam",
    },
    campoRules: [(v) => !!v || "Campo requerido"],
    items: ["Bueno", "En reparacion", "Dañado", "Prestado"],
  }),
  methods: {
    guardar() {
      var vm = this;
      if (this.$refs.form.validate()) {
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
  },
};
</script>