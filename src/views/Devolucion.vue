<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title>Entrega de Préstamos</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-select
                label="Usuario"
                outlined
                :items="usuarios"
                :item-text="
                  (item) => {
                    return `${item.nombre} ${item.apellido}`;
                  }
                "
                item-value="cedula"
                v-model="usuario"
              ></v-select>
            </v-col>
            <v-col>
              <v-btn @click="buscar()" color="#FFA027">Buscar</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Prestamos</v-card-title>
            <v-data-table :items="prestamos" :headers="prestamosHeaders">
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="verNovedades(item)">
                  mdi-eye
                </v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-show="revisar">
        <v-col>
          <v-card>
            <v-card-title>Revisar Equipos</v-card-title>
            <v-data-table :items="detalles" :headers="detalleHeader">
              <template v-slot:item.estado="{ index }">
                <v-select
                  :items="estados"
                  item-value="id"
                  item-text="estado"
                  v-model="arrayEstados[index]"
                ></v-select>
              </template>
              <template v-slot:item.observacion="{ index }">
                <input
                  type="text"
                  class="form-control"
                  id="Estado"
                  v-model="arrayObservaciones[index]"
                />
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-col>
        <v-btn color="#FFA027" v-show="revisar" @click="confirmarNovedad()"
          >Comfirmar</v-btn
        ></v-col
      >
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
//import Swal from "sweetalert2";
export default {
  data() {
    return {
      usuario: "",
      usuarios: [],
      prestamos: [],
      detalles: [],
      paqueteNovedad: {
        prestamo: null,
        estado_prestamo: 2,
        novedades: [],
      },
      revisar: false,
      estados: [],
      arrayEstados: [],
      arrayObservaciones: [],
      prestamosHeaders: [
        { text: "N°", value: "id" },
        {
          text: "Fecha Inicio",
          value: "detalle[0].fecha_inicio",
        },
        { text: "Fecha Final", value: "detalle[0].fecha_fin" },
        { text: "Estado", value: "estado_prestamo.estado" },
        { text: "Action", value: "actions", sortable: false },
      ],
      detalleHeader: [
        { text: "Tipo de equipo", value: "equipo.tipo_equipo.tipo" },
        { text: "Serial", value: "equipo.serial" },
        { text: "Fecha Inicio", value: "fecha_inicio" },
        { text: "Fecha Final", value: "fecha_fin" },
        { text: "estado", value: "estado" },
        { text: "Observacion", value: "observacion" },
      ],
    };
  },
  methods: {
    async buscar() {
      await axios
        .get("http://localhost:3000/prestamo/usuario/" + this.usuario)
        .then((resp) => {
          this.prestamos = resp.data;
        });
      // Lógica para buscar préstamos por usuario
      console.log("Buscando préstamos para el usuario:", this.usuario);
    },
    confirmar() {
      // Lógica para confirmar la entrega de préstamo
      console.log("Confirmar entrega de préstamo");
    },
    eliminarDetalle(index) {
      // Lógica para eliminar un detalle
      console.log("Eliminando detalle en índice:", index);
      this.detalles.splice(index, 1);
    },
    verDetalle(index) {
      // Lógica para ver los detalles
      console.log("Viendo detalles para el préstamo en el índice:", index);
    },
    async obtenerPrestamos() {
      await axios
        .get("http://localhost:3000/prestamo/obtenerPrestamos")
        .then((resp) => {
          this.prestamos = resp.data;
        });
    },
    async obtenerUsuarios() {
      await axios.get("http://localhost:3000/usuario").then((resp) => {
        this.usuarios = resp.data;
      });
    },
    async obtenerEstados() {
      await axios.get("http://localhost:3000/estado-equipo").then((resp) => {
        this.estados = resp.data;
      });
    },
    verNovedades(item) {
      console.log(item);
      this.paqueteNovedad.prestamo = item.id;
      this.detalles = item.detalle;
      this.arrayEstados = [];
      this.arrayObservaciones = [];
      item.detalle.forEach((detalle) => {
        this.arrayEstados.push(detalle.equipo.estado_equipo.id);
        this.arrayObservaciones.push("");
      });
      this.revisar = true;
    },
    async confirmarNovedad() {
      this.detalles.forEach((detalle, index) => {
        this.paqueteNovedad.novedades.push({
          descripcion: this.arrayObservaciones[index],
          equipo: detalle.equipo.id,
          estado_equipo: this.arrayEstados[index],
          prestamo: this.paqueteNovedad.prestamo,
        });
      });
      await axios
        .post("http://localhost:3000/novedad/crear", this.paqueteNovedad)
        .then(() => {
          alert("Se creo");
        })
        .catch((error) => {
          console.log(error);
          alert("No se creo");
        });
    },
  },
  async created() {
    await this.obtenerUsuarios();
    await this.obtenerEstados();
    /* Swal.fire({
      icon: "success",
      text: "Ella  no te ama",
      timer: 1700,
      showConfirmButton: false,
    }); */
  },
};
</script>

<style>
/* Agrega estilos personalizados aquí si es necesario */
</style>
