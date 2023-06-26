<template>
    <v-app id="inspire">
        <Header @handrawer="actualiza()" />
        <Sidebar :drawer="drawer" />
        <v-main>
            <v-container
                class="py-5 "
                fluid>
                <v-row class="justify-center">
                    <v-col
                        cols="8">
                        <v-bottom-navigation v-model="value" height="auto" class="flex-column">
                            <v-row>
                                <v-col cols="6" class="pr-1 pb-0">
                                    <v-autocomplete
                                        v-model="paquete.dispositivo"
                                        :items="dispositivosDisponibles"
                                        :item-text="(dispositivo) => { return `${dispositivo.tipo} - ${dispositivo.serial}`; }"
                                        item-value="codigo"
                                        label="Dispositivos disponibles"
                                        filled
                                        required
                                        append-icon="mdi-devices">
                                    </v-autocomplete>
                                </v-col>
                                <v-col cols="6" class="pl-1 pb-0">
                                    <v-text-field
                                        type="number"
                                        min="1"
                                        filled
                                        label="Cantidad"
                                        append-icon="mdi-plus"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col cols="6" class="pr-1">
                                    <v-menu
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="date"
                                                filled
                                                label="Fecha de inicio"
                                                append-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="date"
                                            @input="menu2 = false"
                                            color="orange white"
                                            header-color="#ffa726"
                                            locale="es">
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="6" class="pl-1">
                                    <v-select
                                        required
                                        v-model="sel"
                                        filled
                                        label="Hora inicio"
                                        append-icon="mdi-timer-sand"
                                        :items="horas">
                                    </v-select>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col cols="6" class="pr-1">
                                    <v-menu
                                        v-model="menu3"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="date"
                                                filled
                                                label="Fecha de fin"
                                                append-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="date"
                                            @input="menu3 = false"
                                            color="orange white"
                                            header-color="#ffa726"
                                            locale="es">
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="6" class="pl-1">
                                    <v-select
                                        required
                                        v-model="sel"
                                        filled
                                        label="Hora fin"
                                        append-icon="mdi-timer-sand-complete"
                                        :items="horas">
                                    </v-select>
                                </v-col>
                            </v-row>
                            <v-row justify="center" no-gutters>
                                <v-btn
                                    :disabled="!valid"
                                    color="#ffa726"
                                    class="py-4 px-2 btn-agregar"
                                    @click="guardar()">
                                    <v-icon dark>
                                        mdi-plus
                                    </v-icon>
                                </v-btn>
                            </v-row>
                        </v-bottom-navigation>
                        <v-card width="500px" class="mx-auto mt-2">
                            <v-card-title> Prestar dispositivo </v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="6" class="pr-1 pb-0">
                                        <v-autocomplete
                                            v-model="paquete.dispositivo"
                                            :items="dispositivosDisponibles"
                                            :item-text="(dispositivo) => { return `${dispositivo.tipo} - ${dispositivo.serial}`; }"
                                            item-value="codigo"
                                            label="Dispositivos disponibles"
                                            filled
                                            required
                                            append-icon="mdi-devices">
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols="6" class="pl-1 pb-0">
                                        <v-text-field
                                            type="number"
                                            min="1"
                                            filled
                                            label="Cantidad"
                                            append-icon="mdi-plus"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters>
                                    <v-col cols="6" class="pr-1">
                                        <v-menu
                                            v-model="menu2"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    v-model="date"
                                                    filled
                                                    label="Fecha de inicio"
                                                    append-icon="mdi-calendar"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="date"
                                                @input="menu2 = false"
                                                color="orange white"
                                                header-color="#ffa726"
                                                locale="es">
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="6" class="pl-1">
                                        <v-select
                                            required
                                            v-model="sel"
                                            filled
                                            label="Hora inicio"
                                            append-icon="mdi-timer-sand"
                                            :items="horas">
                                        </v-select>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters>
                                    <v-col cols="6" class="pr-1">
                                        <v-menu
                                            v-model="menu3"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    v-model="date"
                                                    filled
                                                    label="Fecha de fin"
                                                    append-icon="mdi-calendar"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="date"
                                                @input="menu3 = false"
                                                color="orange white"
                                                header-color="#ffa726"
                                                locale="es">
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="6" class="pl-1">
                                        <v-select
                                            required
                                            v-model="sel"
                                            filled
                                            label="Hora fin"
                                            append-icon="mdi-timer-sand-complete"
                                            :items="horas">

                                        </v-select>
                                    </v-col>
                                </v-row>
                                <v-row justify="center" no-gutters>
                                    <v-btn
                                        :disabled="!valid"
                                        color="#ffa726"
                                        class="py-4 px-2 btn-agregar"
                                        @click="guardar()">
                                        <v-icon dark>
                                            mdi-plus
                                        </v-icon>
                                    </v-btn>
                                </v-row>
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
        sel: null,
        horas: [],
        value: 'recent',
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, 10),
        menu2: false,
        menu3: false,
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
        async obtenerDispositivos(excluirId = 0) {
            let url = `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/`;
            return await axios.get(`${url}dispositivos?estado=Nuevo&serial_ne=${excluirId}`).then(response => {
                console.log(response);
                return response.data;
            })
        },
        /**
         * 
         * @param {Date} fechaInicio Fecha y hora inicio del préstamo
         * @param {Date} fechaFin Fecha y hora fin del préstamo
         * @param {Int} codDispositivo Código del dispositivo a prestar
         * @param {String} tipoDisp Tipo de dispositivo a prestar portatil | video Beam | etc
         * @return boolean, Si el dispositivo está disponible para reserva se retornará true, false en otros casos
         */
        async verDisponibilidad(fechaInicio = null, fechaFin = null, codDispositivo, /* tipoDisp = 'portatil' */) {
            let disp = await this.obtenerPrestamosDispositivo(codDispositivo, false);
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
                    let fechaHoraIni = new Date(fechaInicio);
                    let prestarPorHora = false;
                    for (const dispositivo of disp) {
                        //Fecha y hora del dispositivo en milis
                        let fechaDispIni = new Date(dispositivo.fechaInicio);
                        let fechaSinHDispI = `${fechaDispIni.getFullYear()}-${fechaDispIni.getMonth() + 1}-${fechaDispIni.getDate()}`;
                        let fechaDispFin = new Date(dispositivo.fechaFin);
                        let fechaSinHDispF = `${fechaDispFin.getFullYear()}-${fechaDispFin.getMonth() + 1}-${fechaDispFin.getDate()}`;
                        //let horaDispFin = `${new Date(dispositivo.fechaFin).getHours()}:${new Date(dispositivo.fechaFin).getMinutes()}`;
                        /*Tiene un tema por resolver, hay que verificar que las fechas(Y-m-d) sean iguales
                        * a la que se envía del formulario
                        */
                        //Validamos que las fechas del dispositivo en prestamo sean las mismas del dispositivo verificado
                        if (dispositivo.dispositivo == codDispositivo && fechaSinHDispI == fechaSinHora1 && fechaSinHDispF == fechaSinHora2 && fechaHoraIni.getTime() >= fechaDispFin.getTime()) {
                            prestarPorHora = true; //Sí se puede prestar
                        }
                        else if (dispositivo.dispositivo == codDispositivo) {
                            prestarPorHora = false;
                        }
                    }
                    console.log(prestarPorHora);
                    return prestarPorHora;
                }
                else {
                    let prestarPorDias = false;
                    for (const dispositivo of disp) {
                        //Fecha y hora del dispositivo en milis
                        //let fechaDispIni = new Date(dispositivo.fechaInicio);
                        //let fechaSinHDispI = `${fechaDispIni.getFullYear()}-${fechaDispIni.getMonth() + 1}-${fechaDispIni.getDate()}`;
                        let fechaDispFin = new Date(dispositivo.fechaFin);
                        //let fechaSinHDispF = `${fechaDispFin.getFullYear()}-${fechaDispFin.getMonth() + 1}-${fechaDispFin.getDate()}`;
                        //let horaDispFin = `${new Date(dispositivo.fechaFin).getHours()}:${new Date(dispositivo.fechaFin).getMinutes()}`;
                        /*Tiene un tema por resolver, hay que verificar que las fechas(Y-m-d) sean iguales
                        * a la que se envía del formulario
                        */
                        //Validamos que las fechas del dispositivo en prestamo sean las mismas del dispositivo verificado
                        if (dispositivo.dispositivo == codDispositivo && fechaIni.getTime() >= fechaDispFin.getTime()) {
                            prestarPorDias = true; //Sí se puede prestar
                        }
                        else if (dispositivo.dispositivo == codDispositivo) {
                            prestarPorDias = false;
                        }
                    }
                    console.log(prestarPorDias);
                    return prestarPorDias;
                }

            }
            return true; //Se puede prestar
        },
        async obtenerPrestamosDispositivo(codDispositivo = null, traerTodos = false) {
            /* Estados dispositivo:
               * 1: Reservado
               * 2: Prestado
               * 3: Devuelto
                */
            let url = `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/`;
            if (!traerTodos) {
                return await axios.get(`${url}prestamos?estado=1&estado=2&dispositivo=${codDispositivo}`).then(response => {
                    console.log(response);
                    return response.data;
                })
            }
            else {
                //Traigo todos los dispositivos excepto el que ya verifique
                return await axios.get(`${url}prestamos?estado=1&estado=2&dispositivo_ne=${codDispositivo}`).then(response => {
                    console.log(response);
                    return response.data;
                })
            }

        },
        async guardar() {
            let url = `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/prestamos`;

            if (this.$refs.form.validate()) {
                let dispPrestamo = await this.obtenerPrestamosDispositivo(this.paquete.dispositivo, false);
                //Verificamos si no hay prestamos y mandamos a registrar el préstamo
                if (dispPrestamo.length == 0) {
                    this.paquete.estado = 1;
                    axios.post(url, this.paquete).then(response => {
                        console.log(response);
                    })
                } else {
                    let dispNuevos = this.obtenerDispositivos(this.paquete.dispositivo);
                    let sePuede = false;
                    for (const i of dispNuevos) {

                        if (this.verDisponibilidad(this.paquete.fechaInicio, this.paquete.fechaFin, i.codigo)) {
                            sePuede = true;
                            break;
                        }
                    }
                    console.log(sePuede);
                }
            }
        },
        actualiza() {
            console.log("actualizado");
            this.drawer = !this.drawer;
        }
    },
    mounted() {
        let url = `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/${process.env.VUE_APP_API_DISPOSITIVOS}?estado=Nuevo&tipo=Portatil`;
        axios.get(url).then((response) => {
            console.log('bien');
            console.log(response.data);
            this.dispositivosDisponibles = response.data;
        }).catch(function (error) {
            // handle error
            console.log(error);
        }).finally(function () {
            this.$refs.form.reset();
            // always executed
        });
        for (let i = 6; i <= 21; i++) {
            this.horas.push(i);
        }
        let hora = new Date().getHours();
        this.sel = 6;
        if (hora >= 6 && hora <= 21) {
            this.sel = hora;
        }
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

.v-item-group.v-bottom-navigation .v-btn {
    align-items: center;
    border-radius: 4px !important;
    display: inline-flex !important;
    flex: 0 0 auto;
    font-weight: 500;
    letter-spacing: 0.0892857143em !important;
    justify-content: center !important;
    outline: 0;
    position: relative;
    text-decoration: none !important;
    text-indent: 0.0892857143em;
    text-transform: uppercase !important;
    transition-duration: 0.28s !important;
    transition-property: box-shadow, transform, opacity !important;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
    vertical-align: middle;
    white-space: nowrap !important;
    height: 38px !important;
    min-width: 64px !important;
    padding: 0 16px !important;
    color: #FFFFFF !important;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
}

.v-item-group.v-bottom-navigation .v-btn:focus::before,
.v-item-group.v-bottom-navigation .v-btn:hover::before {
    opacity: 0.24;
}

.row.no-gutters {
    height: 70px;
}

.btn-agregar {
    color: #FFFFFF;
}
</style>
