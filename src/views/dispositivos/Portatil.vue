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
            <EstadoEquipo @selectEstado="guardarEstadoSeleccionado" />
          </v-col>
        </v-row>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="guardar">
          Guardar
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import EstadoEquipo from "../../components/EstadoEquipo.vue";
export default {
  components: { EstadoEquipo },
  data: () => ({
    rutaBackend: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`,
    valid: true,
    paquete: {
      codigo: null,
      referencia: null,
      serial: null,
      estado: null,//Aquí va el id del estado de equipo, valor emitido desde EstadoEquipoComponent
      tipo: "Portatil", //Aquí va el id del tipo de equipo, se carga automático
    },
    campoRules: [
      (v) => !!v || "Campo requerido",
    ],
    select: null,
    items: ["Nuevo", "En reparacion", "Dañado", "Prestado"],
  }),

  methods: {
    guardarEstadoSeleccionado(estado) {
      if (typeof estado == 'object') {
        this.paquete.estado = estado.id;
      }
    },
    async guardar() {
      if (this.$refs.form.validate()) {
        this.axios
          .post(`${this.rutaBackend}/equipo/crear`, this.paquete)
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
            this.$refs.form.reset();
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