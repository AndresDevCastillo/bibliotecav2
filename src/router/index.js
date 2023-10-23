import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

//rutas de elementos del sidebar
const routes = [{
        path: '/',
        name: 'Login',
        component: () =>
            import ('../views/iniciarSesion.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
            import ('../views/dashboard'),
        children: [{
                name: 'DashboardWelcome',
                path: '/dashboard/welcome',
                component: () =>
                    import ('../views/welcome.vue'),
            },
            {
                name: 'ManagerView',
                path: '/dashboard/ManagerView',
                component: () =>
                    import ('../views/dispositivos/ManagerView'),
                children: [{
                        name: 'EquposView',
                        path: '/dashboard/ManagerView/',
                        component: () =>
                            import ('../components/Equipo.vue')
                    },
                    {
                        name: 'VideoBeam',
                        path: '/dashboard/ManagerView/VideoBeam',
                        component: () =>
                            import ('../views/dispositivos/VideoBeam'),
                    },
                    {
                        name: 'Portatil',
                        path: '/dashboard/ManagerView/Portatil',
                        component: () =>
                            import ('../views/dispositivos/Portatil')
                    },
                    {
                        name: 'Mouse',
                        path: '/dashboard/ManagerView/Mouse',
                        component: () =>
                            import ('../views/dispositivos/Mouse')
                    },
                    {
                        name: 'Teclado',
                        path: '/dashboard/ManagerView/Teclado',
                        component: () =>
                            import ('../views/dispositivos/Teclado')
                    },
                    {
                        name: 'Cable HDMI',
                        path: '/dashboard/ManagerView/CableHdmi',
                        component: () =>
                            import ('../views/dispositivos/CableHdmi')
                    }
                ]
            },
            {
                name: 'estadoEquipo',
                path: '/dashboard/estadoEquipo',
                component: () =>
                    import ('../views/EstadoEquipo')
            },
            {
                path: '/dashboard/prestamo',
                name: 'Prestamo',
                component: () =>
                    import ('../views/prestamo.vue')
            },
            {
                path: '/dashboard/miprestamo',
                name: 'Miprestamo',
                component: () =>
                    import ('../views/misprestamos.vue')
            },
            {
                path: '/dashboard/configprestamo',
                name: 'Configprestamo',
                component: () =>
                    import ('../views/configPrestamo.vue')
            }
        ],
    },

]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router