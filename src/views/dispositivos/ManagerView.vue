<template>
    <v-row no-gutters>
        <v-card width="100%">
            <v-card-title class="pt-0 px-0">
                <v-bottom-navigation
                    :value="value"
                    color="var(--c-orange)" class="justify-content-center" height="auto">
                    <div>
                        <h4 class="word-break">Seleccione equipo a registrar</h4>
                        <v-select
                            @change="registrar"
                            v-model="select"
                            :items="items"
                            item-text="texto"
                            item-value="ruta"
                            label="Tipo de equipo"
                            return-object
                            single-line
                            required></v-select>
                    </div>
                </v-bottom-navigation>
            </v-card-title>
            <v-card-text>
                <router-view></router-view>
            </v-card-text>
        </v-card>

        <!-- <v-card width="300px" height="300px" class="mx-auto">
                <v-card-title>
                    Seleccione equipo a registrar
                </v-card-title>
                <v-card-text>

                </v-card-text>
            </v-card> -->
    </v-row>
</template>

<script>
export default {
    data: () => ({
        value: 1,
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
    }),

    methods: {
        registrar() {
            this.$router.push(this.select.ruta);
        }
    },
}
</script>