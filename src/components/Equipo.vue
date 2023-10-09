<template>
    <div class="equipo">
        <v-card>
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Equipos</h3>
                </div>
            </v-card-title>
            <v-card-text>
                <v-data-table
                    :headers="headersEquipo"
                    :items="itemsEquipo"
                    :loading="loadTablaEquipo"
                    loading-text="Cargando, por favor espere..."
                    :footer-props="{
                        'show-current-page': true,
                        'items-per-page-options': [5, 10, 15],
                        itemsPerPageText: 'Registros mostrados',
                        pageText: '{0}-{1} de {2}',
                        showFirstLastPage: true,
                        firstIcon: 'mdi-arrow-collapse-left',
                        lastIcon: 'mdi-arrow-collapse-right',
                        prevIcon: 'mdi-minus',
                        nextIcon: 'mdi-plus'
                    }"
                    class="elevation-1">
                    <template v-slot:item.actions="{ item, index }">
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                    color="var(--c-orange)"
                                    class="mr-2" @click="editarEquipo(index)"
                                    v-bind="attrs" v-on="on">
                                    mdi-pencil
                                </v-icon>
                            </template>
                            <span>Editar equipo</span>
                        </v-tooltip>
                        <v-tooltip top color="error">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                    color="var(--c-orange)" v-bind="attrs" v-on="on" @click="eliminarEquipo(item)">
                                    mdi-delete
                                </v-icon>
                            </template>
                            <span>Eliminar equipo</span>
                        </v-tooltip>
                    </template>
                    <template slot="no-data">
                        <p class="text-dark">Sin datos</p>
                        <v-btn color="var(--c-orange)" class="mb-2 btn-tabla" @click="obtenerEquipos">Recargar</v-btn>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
        <!--Dialog para mensajes temporales-->
        <v-row justify="space-around">
            <v-col cols="auto">
                <v-dialog
                    transition="dialog-bottom-transition"
                    max-width="600" v-model="dialogError">
                    <v-card>
                        <v-toolbar
                            color="info"
                            dark class="elevation-0 primary-title">
                            <div>
                                <h3 class="headline mb-0">{{ detalleError.title }}</h3>
                            </div>
                        </v-toolbar>
                        <v-card-text>
                            <p class="text-dark my-3">{{ detalleError.body }}</p>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'EquipoComponent',
    data: () => ({
        rutaBackend: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`,
        headersEquipo: [{ text: 'Serial', value: 'serial' },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Estado', value: 'estado_equipo' },
        { text: 'Tipo', value: 'tipo_equipo' },
        { text: 'Acciones', value: 'actions', sortable: false }
        ],
        loadTablaEquipo: false,
        itemsEquipo: [],
        dialogError: false,
        detalleError: {
            title: null,
            body: null
        }
    }),
    methods: {
        tiempoDialog() {
            setTimeout(() => {
                this.dialogError = false;
                this.detalleError.title = null;
                this.detalleError.body = null;
            }, 1700);

        },
        editarEquipo(equipo) {
            console.log(equipo);
        },
        eliminarEquipo(equipo) {
            console.log(equipo);
        },
        async obtenerEquipos() {
            this.loadTablaEquipo = true;
            await axios.get(`${this.rutaBackend}/equipo`).then(response => {
                this.itemsEquipo = response.data;
            }).catch(error => {
                this.detalleError.title = "Obtener equipos";
                this.detalleError.body = "No se pudo obtener los equipo, contacta con soporte";
                this.dialogError = true;
                this.tiempoDialog();
                console.log(`Error: ${error}`);
            });
            this.loadTablaEquipo = false;
        }
    },
    created() {
this.obtenerEquipos();
    }
}
</script>