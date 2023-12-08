<template>
  <v-container>
    <v-card class="pa-4" elevation="12">
      <v-card-title class="headline font-weight-bold orange--text">
        PRESTAMO DE DISPOSITIVOS
      </v-card-title>

      <!-- Identificación y Nombre & Apellido -->
      <v-row>
        <v-col cols="6">
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
            v-model="paquetePrestamo.usuario"
          ></v-select>
          {{ paquetePrestamo }}
          {{ tipoEquipoArray }}
        </v-col>
      </v-row>
      <!-- Fecha Inicial y Hora Inicial -->
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Fecha Inicial"
            outlined
            v-model="paquetePrestamo.fecha_inicio"
            @click="toggleDatePicker('fechaInicial')"
          >
            <template v-slot:append>
              <v-btn icon @click="toggleDatePicker('fechaInicial')">
                <v-icon>mdi-calendar</v-icon>
              </v-btn>
            </template>
          </v-text-field>
          <v-date-picker
            v-model="paquetePrestamo.fecha_inicio"
            @input="hideDatePicker"
            v-if="showDatePickerFor === 'fechaInicial'"
            color="orange"
          ></v-date-picker>
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Hora Inicial"
            outlined
            v-model="paquetePrestamo.horaInicial"
            @click="toggleTimePicker('horaInicial')"
          >
            <template v-slot:append>
              <v-btn icon @click="toggleTimePicker('horaInicial')">
                <v-icon>mdi-clock-time-four-outline</v-icon>
              </v-btn>
            </template>
          </v-text-field>
          <v-time-picker
            v-model="paquetePrestamo.horaInicial"
            format="24hr"
            @input="hideTimePicker"
            v-if="showTimePickerFor === 'horaInicial'"
            color="orange"
          ></v-time-picker>
        </v-col>
      </v-row>

      <!-- Fecha Final y Hora Final -->
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Fecha Final"
            outlined
            v-model="paquetePrestamo.fecha_fin"
            @click="toggleDatePicker('fechaFinal')"
          >
            <template v-slot:append>
              <v-btn icon @click="toggleDatePicker('fechaFinal')">
                <v-icon>mdi-calendar</v-icon>
              </v-btn>
            </template>
          </v-text-field>
          <v-date-picker
            v-model="paquetePrestamo.fecha_fin"
            @input="hideDatePicker"
            v-if="showDatePickerFor === 'fechaFinal'"
            color="orange"
          ></v-date-picker>
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Hora Final"
            outlined
            v-model="paquetePrestamo.horaFinal"
            @click="toggleTimePicker('horaFinal')"
          >
            <template v-slot:append>
              <v-btn icon @click="toggleTimePicker('horaFinal')">
                <v-icon>mdi-clock-time-four-outline</v-icon>
              </v-btn>
            </template>
          </v-text-field>
          <v-time-picker
            v-model="paquetePrestamo.horaFinal"
            format="24hr"
            @input="hideTimePicker"
            v-if="showTimePickerFor === 'horaFinal'"
            color="orange"
          ></v-time-picker>
        </v-col>
      </v-row>

      <!-- Tipo de Equipo, Cantidad y Botón Buscar -->
      <v-row>
        <v-col cols="4">
          <v-select
            label="Tipo de Equipo"
            outlined
            v-model="tipoEquipoArray.tipo_equipo"
            :items="tiposEquipo"
            item-value="id"
            item-text="tipo"
            return-object
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            label="Cantidad"
            outlined
            v-model="tipoEquipoArray.cantidad"
            :items="cantidades"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-btn @click="añadirTipo()" class="boton" color="orange"
            >Agregar</v-btn
          >
        </v-col>
      </v-row>
      <v-row class="my-8" v-if="equiposPrestados.length > 0">
        <v-col cols="12" class="text-end">
          <v-btn color="error" class="mr-3" @click="cancelar">Cancelar</v-btn>
          <v-btn color="green" @click="confirmar">Confirmar</v-btn>
        </v-col>
        <v-col cols="12">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="texttabla">Tipo de Equipo</th>
                  <th class="texttabla">Serial</th>
                  <th class="texttabla">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in equiposPrestados" :key="index">
                  <td class="texttabla">{{ item.tipo_equipo }}</td>
                  <td class="texttabla">{{ item.serial }}</td>
                  <td class="texttabla">
                    {{ item.cantidad }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
      <!-- Tabla de Resultados -->
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="texttabla">Tipo de Equipo</th>
              <th class="texttabla">Cantidad</th>
              <th class="texttabla">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paquetePrestamo.detalle" :key="item.tipo">
              <td class="texttabla">{{ item.tipo_equipo.tipo }}</td>
              <td class="texttabla">{{ item.cantidad }}</td>
              <td class="texttabla">
                <v-btn fab dark small color="red">
                  <v-icon dark>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <!-- Botón Registrar Prestamo -->
    <v-btn block color="orange" class="botonfinal" @click="prestar"
      >REGISTRAR PRESTAMO</v-btn
    >
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      idPrestamoProceso: null,
      paquetePrestamo: {
        usuario: null,
        fecha_inicio: null,
        horaInicial: null,
        fecha_fin: null,
        horaFinal: null,
        detalle: [],
      },
      tipoEquipoArray: {
        tipo_equipo: null,
        cantidad: null,
      },
      usuarios: [],
      showDatePickerFor: "",
      showTimePickerFor: "",
      tipoEquipo: "",
      cantidad: "",
      tiposEquipo: [],
      equiposPrestados: [],
      cantidades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      desserts: [
        {
          tipo: "Portatil",
          serial: 159,
        },
        {
          tipo: "Portatil",
          serial: 159,
        },
        {
          tipo: "Portatil",
          serial: 159,
        },
      ],
    };
  },
  methods: {
    toggleDatePicker(field) {
      if (this.showDatePickerFor === field) {
        this.hideDatePicker();
      } else {
        this.showDatePickerFor = field;
      }
    },
    toggleTimePicker(field) {
      if (this.showTimePickerFor === field) {
        this.hideTimePicker();
      } else {
        this.showTimePickerFor = field;
      }
    },
    hideDatePicker() {
      this.showDatePickerFor = "";
    },
    hideTimePicker() {
      this.showTimePickerFor = "";
    },
    async obtenerUsuarios() {
      await axios.get("http://localhost:3000/usuario").then((resp) => {
        this.usuarios = resp.data;
      });
    },
    async obtenerTipoDeEquipo() {
      await axios.get("http://localhost:3000/tipo-equipo").then((resp) => {
        this.tiposEquipo = resp.data;
      });
    },
    añadirTipo() {
      this.paquetePrestamo.detalle.push(this.tipoEquipoArray);
      this.tipoEquipoArray = {
        tipo_equipo: null,
        cantidad: null,
      };
    },
    async prestar() {
      if (this.paquetePrestamo != null) {
        let f1 = this.paquetePrestamo.fecha_inicio.toString().split("-");
        let h1 = this.paquetePrestamo.horaInicial.toString().split(":");
        const f11 = new Date(Date.UTC(f1[0], f1[1] - 1, f1[2], h1[0], 0, 0))
          .toISOString()
          .toString();
        f1 = this.paquetePrestamo.fecha_fin.toString().split("-");
        h1 = this.paquetePrestamo.horaFinal.toString().split(":");
        const f12 = new Date(Date.UTC(f1[0], f1[1] - 1, f1[2], h1[0], 0, 0))
          .toISOString()
          .toString();
        const detalles = this.paquetePrestamo.detalle.map((detalle) => {
          return {
            tipo_equipo: detalle.tipo_equipo.id,
            cantidad: detalle.cantidad,
          };
        });
        const paquete = {
          fecha_inicio: f11.toString().slice(0, 19),
          fecha_fin: f12.toString().slice(0, 19),
          detalle: detalles,
          usuario: this.paquetePrestamo.usuario,
        };
        await axios
          .post("http://localhost:3000/prestamo/crear", paquete)
          .then((response) => {
            for (let i = 0; i < response.data.length - 1; i++) {
              const detalle = response.data[i];
              let codigos = "",
                tipo_equipo = "";
              if (detalle.prestado) {
                detalle.equipos.forEach((equipo, index) => {
                  codigos +=
                    index < detalle.equipos.length - 1
                      ? equipo.codigo + ", "
                      : equipo.codigo;
                  tipo_equipo = equipo.tipo_equipo.tipo;
                });
                this.equiposPrestados.push({
                  tipo_equipo: tipo_equipo,
                  serial: codigos,
                  cantidad: detalle.cantPrestados,
                });
              } else {
                this.equiposPrestados.push({
                  tipo_equipo:
                    this.paquetePrestamo.detalle[detalle.indexPrestamo]
                      .tipo_equipo.tipo,
                  serial: detalle.message,
                  cantidad: detalle.cantPrestados,
                });
              }
            }
            this.idPrestamoProceso =
              response.data[response.data.length - 1].idPrestamo;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async cancelar() {
      if (this.idPrestamoProceso) {
        await axios
          .delete(`http://localhost:3000/prestamo/${this.idPrestamoProceso}`)
          .then((response) => {
            console.log(response);
            this.paquetePrestamo = {
              usuario: null,
              fecha_inicio: null,
              horaInicial: null,
              fecha_fin: null,
              horaFinal: null,
              detalle: [],
            };
            this.equiposPrestados = [];
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async confirmar() {
      if (this.idPrestamoProceso) {
        await axios
          .put(
            `http://localhost:3000/prestamo/confirmar/${this.idPrestamoProceso}`
          )
          .then((response) => {
            console.log(response);
            this.paquetePrestamo = {
              usuario: null,
              fecha_inicio: null,
              horaInicial: null,
              fecha_fin: null,
              horaFinal: null,
              detalle: [],
            };
            this.equiposPrestados = [];
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  async created() {
    await this.obtenerUsuarios();
    await this.obtenerTipoDeEquipo();
  },
};
</script>
