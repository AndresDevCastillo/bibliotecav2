<template>
    <v-app id="inspire">
        <Header @handrawer="actualiza()" />
        <Sidebar :drawer="drawer" />
        <v-main>
            <v-container
                class="py-5 "
                fluid>
                <v-row>
                    <v-col
                        cols="12">
                        <v-card height="760px" width="500px" class="mx-auto mt-2">
                            <v-card-title> Prestar dispositivo </v-card-title>
                            <v-card-text>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-select
                                        v-model="paquete.dispositivo"
                                        :items="dispositivosDisponibles"
                                        :item-text="(dispositivo) => { return `${dispositivo.tipo} - ${dispositivo.serial}`; }"
                                        item-value="codigo"
                                        label="Dispositivos disponibles"
                                        required></v-select>
                                    <v-row cols="12">
                                        <v-col cols="6">
                                            <v-text-field type="datetime-local" label="Fecha inicio" v-model="paquete.fechaInicio" required></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field type="datetime-local" label="Fecha fin" v-model="paquete.fechaFin" required></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-btn
                                        :disabled="!valid"
                                        color="success"
                                        class="mr-4"
                                        @click="guardar()">
                                        Guardar
                                    </v-btn>

                                    <v-btn color="error" class="mr-4" @click="reset">Limpiar </v-btn>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import Header from '../components/core/Header.vue'
import Sidebar from '../components/core/Sidebar.vue'
import axios from "axios";


export default {
    components: { Header, Sidebar },
    data: () => ({
        dispositivosDisponibles: [],
        cards: ['Today', 'Yesterday'],
        drawer: true,
        valid: true,
        campoRules: [(v) => ! !v || "Campo requerido",
        ],
        select: null,
        paquete: {
            dispositivo: null,
            fechaInicio: null,
            fechaFin: null,
            estado: 0,
        },

    }),
    methods: {
        /**
         * 
         * @param {Date} fechaInicio Fecha y hora inicio del préstamo
         * @param {Date} fechaFin Fecha y hora fin del préstamo
         * @param {Int} codDispositivo Código del dispositivo a prestar
         * @param {String} tipoDisp Tipo de dispositivo a prestar portatil | video Beam | etc
         * @return boolean, Si el dispositivo está disponible para reserva se retornará true, false en otros casos
         */
        async verDisponibilidad(fechaInicio = null, fechaFin = null, codDispositivo, tipoDisp = 'portatil') {
            let disp = await this.obtenerPrestamosDispositivo(tipoDisp);
            /* Primero validamos si ese dispositivo está reservado o prestado
            * Si no está ahí se retorna true para proceder con el préstamo
             */
            let estaEnPrestamo = false;
            for (const dispositivo of disp) {
                if (dispositivo.dispositivo == codDispositivo) {
                    estaEnPrestamo = true;
                    break;
                }
            }
            /*Si está en los dispositivos reservados o prestados
            * Pasamos a validar fecha y hora
            */
            if (estaEnPrestamo) {
                let fechaIni = new Date(fechaInicio);
                let fechaF = new Date(fechaFin);
                let fechaSinHora1 = `${fechaIni.getFullYear()}-${fechaIni.getMonth() + 1}-${fechaIni.getDate()}`;
                let fechaSinHora2 = `${fechaF.getFullYear()}-${fechaF.getMonth() + 1}-${fechaF.getDate()}`;
                //Validamos si las fechas sin horas son iguales(préstamo para el mismo día)
                if (fechaSinHora1 == fechaSinHora2) {
                    //Fecha y hora a reservar en milis
                    let fechaHoraIni = new Date(fechaInicio).getTime();
                    let prestarPorHora = false;
                    for (const dispositivo of disp) {
                        //Fecha y hora del dispositivo en milis
                        let fechaDispFin = new Date(dispositivo.fechaFin).getTime();
                        //let horaDispFin = `${new Date(dispositivo.fechaFin).getHours()}:${new Date(dispositivo.fechaFin).getMinutes()}`;
                        /*Tiene un tema por resolver, hay que verificar que las fechas(Y-m-d) sean iguales
                        * a la que se envía del formulario
                        */
                        if (dispositivo.dispositivo == codDispositivo && fechaHoraIni >= fechaDispFin) {
                            prestarPorHora = true; //Sí se puede prestar
                        }
                        else if (dispositivo.dispositivo == codDispositivo) {
                            prestarPorHora = false;
                        }
                    }
                    console.log(prestarPorHora);
                }

            }
            return true; //Se puede prestar
        },
        async obtenerPrestamosDispositivo(tipoDisp = 'portatil') {
            let url = `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/prestamos`;
            return await axios.get(url).then(response => {
                let dispositivos = response.data
                let dispRet = []
                /* Estados dispositivo:
                * 1: Reservado
                * 2: Prestado
                * 3: Devuelto
                 */
                dispRet = dispositivos.filter(dispositivo => dispositivo.estado == 1 || dispositivo.estado == 2 && dispositivo.tipo.toLowerCase() == tipoDisp.toLowerCase());
                return dispRet;
            })
        },
        async guardar() {
            let url = `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/prestamos`;

            if (this.$refs.form.validate()) {
                let dispPrestamo = await this.obtenerPrestamosDispositivo('portatil');
                //Verificamos si no hay prestamos y mandamos a registrar el préstamo
                if (dispPrestamo.length == 0) {
                    this.paquete.estado = 1;
                    axios.post(url, this.paquete).then(response => {
                        console.log(response);
                    })
                } else {
                    this.verDisponibilidad(this.paquete.fechaInicio, this.paquete.fechaFin, this.paquete.dispositivo, 'portatil');
                    console.log(dispPrestamo);
                }


            }
        },
        actualiza() {
            console.log("actualizado");
            this.drawer = !this.drawer;
        }
    },
    mounted() {
        let url = `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/${process.env.VUE_APP_API_DISPOSITIVOS}`;
        axios.get(url).then((response) => {
            console.log('bien');
            console.log(response.data);
            let dispositivos = response.data
            this.dispositivosDisponibles = dispositivos.filter(dispositivo => dispositivo.estado == 'Nuevo' && dispositivo.tipo == 'Portatil');

        }).catch(function (error) {
            // handle error
            console.log(error);
        }).finally(function () {
            this.$refs.form.reset();
            // always executed
        });
    },
}
</script>
<style>
#inspire {
    background-image: url("../assets/fondo.png");
    background-size: 100% 100%;
    background-attachment: fixed;
    margin: 0;
}
</style>
