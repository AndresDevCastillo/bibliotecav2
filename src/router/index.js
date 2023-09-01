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
        name: "ManagerView",
        path: "/dashboard/ManagerView",
        component: () => import("../views/dispositivos/ManagerView"),
      },
      {
        name: "DashboarCrearEquipo",
        path: "/dashboard/CrearEquipo",
        component: () => import("../views/CrearEquipo"),
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
    ],
  },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
