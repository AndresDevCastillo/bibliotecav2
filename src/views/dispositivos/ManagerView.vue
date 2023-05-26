<template>
    <v-row col="2">
        <v-card width="300px" height="300px" class="mx-auto">
            <v-card-title>
                Seleccione equipo a registrar
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
            }

        ],
    }),

    methods: {
        registrar() {
            this.$router.push(this.select.ruta);
        }
    },
}
</script>