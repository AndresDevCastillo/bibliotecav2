import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//rutas de elementos del sidebar
const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/iniciarSesion.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/dashboard"),
    children: [
      {
        name: "DashboardWelcome",
        path: "/dashboard/welcome",
        component: () => import("../views/welcome.vue"),
      },

      {
        name: "DashboarCrearEquipo",
        path: "/dashboard/CrearEquipo",
        component: () => import("../views/CrearEquipo"),
      },
      {
        name: "DashboarConfiguraciones",
        path: "/dashboard/Configuraciones",
        component: () => import("../views/Configuraciones"),
      },
      {
        name: "DashboarListarDispositivo",
        path: "/dashboard/listardispositivios",
        component: () => import("../views/dispositivos/ListarDispositivo"),
      },
      {
        name: "registrarprestamo",
        path: "/dashboard/registrarprestamo",
        component: () => import("../views/Prestamo"),
      },
      {
        name: "prestamo",
        path: "/dashboard/prestamo",
        component: () => import("../views/Prestamo"),
      },
      {
        name: "devolucion",
        path: "/dashboard/devolucion",
        component: () => import("../views/Devolucion"),
      },
    ],
  },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
