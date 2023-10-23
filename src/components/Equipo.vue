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
                                    class="mr-2" @click="editarEquipo(item)"
                                    v-bind="attrs" v-on="on">
                                    mdi-pencil
                                </v-icon>
                            </template>
                            <span>Editar equipo</span>
                        </v-tooltip>
                        <v-tooltip top color="error">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                    color="var(--c-orange)" v-bind="attrs" v-on="on" @click="eliminarEquipo(index)">
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
        <dialogMensaje :mostrar="dialogMsj" :title="detalleMsj.title" :body="detalleMsj.body" :classTitle="detalleMsj.classTitle" @cerrado="dialogMsj = false" />
    </div>
</template>
<script>
import axios from 'axios';
import dialogMensaje from './dialogMensaje.vue';
export default {
    name: 'EquipoComponent',
    components: { dialogMensaje },
    data: () => ({
        rutaBackend: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`,
        headersEquipo: [{ text: 'Código', value: 'codigo' },
        { text: 'Serial', value: 'serial' },
        { text: 'Referencia', value: 'referencia' },
        { text: 'Estado', value: 'estado_equipo.estado' },
        { text: 'Tipo', value: 'tipo_equipo.tipo' },
        { text: 'Acciones', value: 'actions', sortable: false }
        ],
        loadTablaEquipo: false,
        itemsEquipo: [],
        dialogMsj: false,
        detalleMsj: {
            classTitle: 'error',
            title: null,
            body: null
        }
    }),
    methods: {

        editarEquipo(equipo) {
            console.log(equipo);
        },
        async eliminarEquipo(idEquipo) {
            await axios.delete(`${this.rutaBackend}/equipo/${idEquipo}`).then(response => {
                console.log(response);
                this.obtenerEquipos();
            });
        },
        async obtenerEquipos() {
            this.loadTablaEquipo = true;
            await axios.get(`${this.rutaBackend}/equipo`).then(response => {
                this.itemsEquipo = response.data;
            }).catch(error => {
                this.detalleMsj.title = "Obtener equipos";
                this.detalleMsj.body = "No se pudo obtener los equipo, contacta con soporte";
                this.dialogMsj = true;
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