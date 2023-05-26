<template>
 <v-card height="600px" width="500px" class="mx-auto">
    <v-card-title>
    Portatil
    </v-card-title>
    <v-img
          height="200px"
          src="../../assets/cursos.png"
        ></v-img>
    <v-card-text>
  <v-form 
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="codigo"
      :rules="campoRules"
      label="Codigo"
      required
    ></v-text-field>
    
    <v-text-field
      v-model="referencia"
      :counter="7"
      :rules="campoRules"
      label="Referencia"
      required
    ></v-text-field> 
    
    <v-text-field
      v-model="serial"
      label="Serial"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Estado"
      required
    ></v-select>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Validar
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >Limpiar
    </v-btn>

  </v-form>
  </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      codigo: '',
      campoRules: [
        v => !!v || 'Campo requerido',
        v => (v && v.length >= 7) || 'El campo debe tener minimo 7 caracteres',
      ],
      referencia: '',
      
      serial: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Nuevo',
        'En reparacion',
        'Dañado',
        'Prestado',
      ],
      checkbox: false,
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>