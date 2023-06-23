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
        children: [
            {
                name: 'DashboardWelcome',
                path: '/dashboard/welcome',
                component: () =>
                    import ('../views/welcome.vue'),
            },
            {
                name: 'ManagerView',
                path: '/dashboard/ManagerView',
                component: ()=>
                    import ('../views/dispositivos/ManagerView'),
                    children:[
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
                name: 'DashboarListarDispositivo',
                path: '/dashboard/listardispositivios',
                component: () =>
                    import ('../views/dispositivos/ListarDispositivo'),
            },
        ],
    },
    
    
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router