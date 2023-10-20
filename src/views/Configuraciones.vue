<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="pa-4" elevation="12">
          <v-card-title class="headline font-weight-bold orange--text">
            Ingresar Equipos
          </v-card-title>
          <v-divider class="my-4"></v-divider>

          <!-- Div para "Ingresar Equipos" -->
          <v-form>
            <v-text-field
              label="Tipo de equipo"
              v-model="tipoEquipo"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              label="Cantidad"
              v-model="cantidad"
              outlined
              dense
              type="number"
            ></v-text-field>
          </v-form>
          <v-layout justify-center>
            <v-btn color="#FFA027">Agregar</v-btn>
          </v-layout>

          <v-divider class="my-4"></v-divider>

          <v-data-table
            :headers="headers"
            :items="equipos"
            class="elevation-1"
          ></v-data-table>

          <!-- Div para "Estado de equipo" -->
          <v-divider class="my-4"></v-divider>
          <v-card-title class="headline font-weight-bold orange--text">
            Estado de Equipos
          </v-card-title>
          <v-divider class="my-2"></v-divider>
          <v-form>
            <v-text-field
              label="Estado de equipo"
              v-model="estadoEquipo"
              outlined
              dense
            ></v-text-field>
          </v-form>
          <v-layout justify-center>
            <v-btn color="orange">Agregar</v-btn>
          </v-layout>

          <v-divider class="my-4"></v-divider>

          <v-data-table
            :headers="estadoHeaders"
            :items="estadosEquipos"
            class="elevation-1"
          ></v-data-table>

          <!-- Div para "Crear Usuarios" -->
          <v-divider class="my-4"></v-divider>
          <v-card-title class="headline font-weight-bold orange--text">
            Crear Usuarios
          </v-card-title>
          <v-divider class="my-2"></v-divider>
          <v-form>
            <v-text-field
              label="Nombre"
              v-model="nombre"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              label="Apellido"
              v-model="apellido"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              label="Teléfono"
              v-model="telefono"
              outlined
              dense
              type="tel"
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="email"
              outlined
              dense
            ></v-text-field>
            <v-select
              label="Rol"
              v-model="rol"
              :items="roles"
              outlined
              dense
            ></v-select>
          </v-form>
          <v-layout justify-center>
            <v-btn color="orange">Agregar</v-btn>
          </v-layout>

          <v-divider class="my-4"></v-divider>

          <v-data-table
            :headers="usuarioHeaders"
            :items="usuarios"
            class="elevation-1"
          ></v-data-table>

          <!-- Div para "Roles" -->
          <v-divider class="my-4"></v-divider>
          <v-card-title class="headline font-weight-bold orange--text">
            Roles
          </v-card-title>
          <v-divider class="my-2"></v-divider>
          <v-form>
            <v-text-field
              label="Tipo de roles habilitados"
              v-model="tipoRoles"
              outlined
              dense
            ></v-text-field>
          </v-form>
          <v-layout justify-center>
            <v-btn color="orange">Agregar</v-btn>
          </v-layout>

          <v-divider class="my-4"></v-divider>

          <v-data-table
            :headers="rolesHeaders"
            :items="rolesHabilitados"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tipoEquipo: "",
      cantidad: 0,
      estadoEquipo: "",
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      rol: null,
      roles: ["Administrador", "Usuario", "Invitado"], // Ejemplo de roles
      headers: [
        { text: "Id", value: "id" },
        { text: "Tipo de equipo", value: "tipoEquipo" },
        { text: "Cantidad", value: "cantidad" },
      ],
      estadosEquipos: [], // Aquí los datos de estados de equipos
      estadoHeaders: [
        { text: "Id", value: "id" },
        { text: "Estado de equipo", value: "estadoEquipo" },
      ],
      usuarios: [], // Datos de usuarios
      usuarioHeaders: [
        { text: "Id", value: "id" },
        { text: "Nombre", value: "nombre" },
        { text: "Apellido", value: "apellido" },
        { text: "Teléfono", value: "telefono" },
        { text: "Email", value: "email" },
        { text: "Rol", value: "rol" },
      ],
      rolesHabilitados: [], // Aquí poner los datos de roles habilitados
      rolesHeaders: [
        { text: "Id", value: "id" },
        { text: "Rol", value: "rol" },
      ],
      tipoRoles: "",
    };
  },
  methods: {
    crearUsuario() {
      const nuevoUsuario = {
        id: this.usuarios.length + 1,
        nombre: this.nombre,
        apellido: this.apellido,
        telefono: this.telefono,
        email: this.email,
        rol: this.rol,
      };

      this.usuarios.push(nuevoUsuario);

      // Limpia los campos después de crear el usuario
      this.nombre = "";
      this.apellido = "";
      this.telefono = "";
      this.email = "";
      this.rol = null;
    },
  },
};
</script>
