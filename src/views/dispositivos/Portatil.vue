<template>
  <v-card width="500px" class="mx-auto">
    <v-card-title>Portátil</v-card-title>
    <v-img height="297px" lazy-src="../../assets/images/Portatil.png" src="../../assets/images/Portatil.png"></v-img>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="paquete.codigo"
              :rules="campoRules"
              label="Código"
              required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="paquete.referencia"
              :rules="campoRules"
              label="Referencia"
              required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="paquete.serial"
              label="Serial"
              required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="paquete.estado"
              :items="items"
              :rules="[(v) => !!v || 'Estado es requerido']"
              label="Estado"
              required></v-select>
          </v-col>
        </v-row>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="guardar">
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
    rutaBackend: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`,
    valid: true,
    paquete: {
      codigo: null,
      referencia: null,
      serial: null,
      estado: null,
      tipo: "Portatil", //Aquí va el id del tipo de equipo, se carga automático
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
      if (this.$refs.form.validate()) {
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
  async created() {
    //Buscar el id del tipo de equipo Portatil
    await axios.get(`${this.rutaBackend}/tipo-equipo/tipo/Portatil`).then(response => {
      if (response.data.length == 1) {
        this.paquete.tipo = response.data[0].id;
      }
    });
  }
};
</script>