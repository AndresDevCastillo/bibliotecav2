<template>
    <v-select
        v-model="estado"
        :items="items"
        item-text="estado"
        item-value="id"
        return-object
        :rules="[(v) => !!v || 'Estado es requerido']"
        label="Estado"
        required></v-select>
</template>
<script>
import axios from 'axios'
export default {
    name:'EstadoEquipo',
    data: () => ({
        rutaBackend: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`,
        estado: null,
        items: [],
    }),
    methods: {
        async obtenerEstadosEquipo() {
            await axios.get(`${this.rutaBackend}/estado-equipo`).then(response => {
                this.items = response.data;
            });
        }
    },
    mounted() {
        this.obtenerEstadosEquipo();
    },
    watch: {
        estado() {
            this.$emit('selectEstado', this.estado);
        }
    }
}
</script>