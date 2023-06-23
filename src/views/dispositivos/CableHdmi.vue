<template>
  <v-card height="760px" width="500px" class="mx-auto">
    <v-card-title> Cable HDMI </v-card-title>
    <v-img height="350px" src="../../assets/images/cable.png"></v-img>
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
          :counter="7"
          :rules="campoRules"
          label="Referencia"
          required
        ></v-text-field>

        <v-text-field v-model="paquete.serial" label="Serial" required></v-text-field>

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

        <v-btn color="error" class="mr-4" @click="reset">Limpiar </v-btn>
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
      tipo: "Cable HDMI",
    },
    campoRules: [
      (v) => !!v || "Campo requerido",
    ],
    select: null,
    items: ["Nuevo", "En reparacion", "Dañado", "Prestado"],
  }),

  methods: {
    guardar() {
      var vm = this;
      if (this.$refs.form.validate()){
        axios
          .post("http://localhost:3000/dispositivos", this.paquete)
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