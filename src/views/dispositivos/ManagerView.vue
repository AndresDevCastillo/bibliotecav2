<template>
    <v-row col="2">
        <v-card width="500px" height="200px" class="carta" >
            <v-card-title>
                SELECCIONE UN EQUIPO
            </v-card-title>
            <v-card-text>
                <v-select
                    @change="registrar"
                    v-model="select"
                    :items="items"
                    item-text="texto"
                    item-value="ruta"
                    label="Estado"
                    return-object
                    single-line  
                    required></v-select>
            </v-card-text>
        </v-card>
        <div>
            <router-view></router-view>
        </div>
    </v-row>

    

</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        select: { texto: '', ruta: '' },
        items: [
            {
                texto: 'VideoBeam',
                ruta: '/dashboard/ManagerView/VideoBeam',
            },
            {
                texto: 'Portátil',
                ruta: '/dashboard/ManagerView/Portatil'
            },
             {
                texto: 'Mouse',
                ruta: '/dashboard/ManagerView/Mouse'
            },
             {
                texto: 'Teclado',
                ruta: '/dashboard/ManagerView/Teclado'
            },
             {
                texto: 'Cable HDMI',
                ruta: '/dashboard/ManagerView/CableHdmi'
            }

        ],
        miBody : {
            estado: "dañado"
        }
    }),

    methods: {
        registrar() {
            this.$router.push(this.select.ruta);
        },
        async registrarEstado() {
            await axios.get('http://localhost:3000/estado-equipo/3', );
        }
    },
}

</script>

<style>
.carta{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
    background-color: rgba(255, 255, 255, 0) !important;
}
</style>