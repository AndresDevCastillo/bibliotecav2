<template>
    <v-card elevation="10">
        <v-navigation-drawer v-model="drawer" app class="bg-header-global" width="322px">
            <vuescroll :ops="ops">
                <div class="bg-header-global">
                    <v-img contain height="120px" lazy-src="../../assets/logos/TAlogin.png" src="../../assets/logos/TAlogin.png">
                    </v-img>
                </div>
                <v-divider></v-divider>
                <div class="app-sidebar-content">
                    <sidebar-menu></sidebar-menu>
                    <v-list>
                        <v-list-item
                            v-for="item in menu"
                            :key="item.title"
                            link @click="navegar(item.title)">
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <v-list-group
                        :value="false"
                        prepend-icon="mdi-account-circle">
                        <template v-slot:activator>
                            <v-list-item-title>Users</v-list-item-title>
                        </template>

                        <v-list-group
                            :value="true"
                            no-action
                            sub-group>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>Admin</v-list-item-title>
                                </v-list-item-content>
                            </template>

                            <v-list-item
                                v-for="([title, icon], i) in admins"
                                :key="i"
                                link>
                                <v-list-item-title v-text="title"></v-list-item-title>

                                <v-list-item-icon>
                                    <v-icon v-text="icon"></v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                        </v-list-group>
                    </v-list-group>
                </div>
            </vuescroll>

        </v-navigation-drawer>
    </v-card>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
import vuescroll from "vuescroll";


export default {
    components: {
        SidebarMenu,
        vuescroll
    },

    props: ['drawer'],
    data: () => ({

        ops: {
            scrollPanel: {
                initialScrollY: false,
                initialScrollX: false,
                scrollingX: false,
                scrollingY: true,
                speed: 300,
                easing: undefined,
                verticalNativeBarPos: 'right'
            },
            rail: {

                background: 'rgba(0, 0, 0, 0.158)',
                opacity: 1,
                size: '10px',
                specifyBorderRadius: false,
                gutterOfEnds: null,
                gutterOfSide: '2px',
                keepShow: false
            },
            bar: {
                showDelay: 500,
                onlyShowBarOnScroll: true,
                keepShow: false,
                background: '#0378a677',
                opacity: 1,
                hoverStyle: false,
                specifyBorderRadius: false,
                minSize: 0,
                size: '9px',
                disable: false
            },
        },

        links: [
            ['mdi-inbox-arrow-down', 'Inbox'],
            ['mdi-send', 'Send'],
            ['mdi-delete', 'Trash'],
            ['mdi-alert-octagon', 'Spam'],
        ],

        menu: [
            { title: 'Inicio', icon: 'mdi-view-dashboard', ruta: 'djhfbcjdfsc' },
            { title: 'Cuenta', icon: 'mdi-account-box' },
            { title: 'Admin', icon: 'mdi-gavel' },
            { title: 'Prestamo', icon: '' },
            { title: 'Préstamo p', icon: 'mdi-person' }
        ], admins: [
            ['Management', 'mdi-account-multiple-outline'],
            ['Settings', 'mdi-cog-outline'],
        ],
        cruds: [
            ['Create', 'mdi-plus-outline'],
            ['Read', 'mdi-file-outline'],
            ['Update', 'mdi-update'],
            ['Delete', 'mdi-delete'],
        ],
    }),
    mounted() {
        this.menu = this.$store.state.userData.menu
    },
    methods: {
        prestamo() {
            this.$router.push('/dashboard/ManagerView');
        },
        navegar(title) {
            switch (title) {
                case 'Inicio':
                    this.$router.push('/');
                    break;
                case 'Prestamo':
                    this.$router.push('/dashboard/ManagerView');
                    break;
                case 'Préstamo p':
                    this.$router.push('/prestamo');
                    break;
                default:
                    break;
            }

        }
    },
}
</script>
<style scoped>
.bg-header-global {
    background-color: #E0E0E0 !important;
}

.theme--light.v-list-item:hover::before {
    color: #000 !important;
    opacity: 0.3 !important;
}

.v-list-item--link:before {
    background-color: #B3E5FC !important;
}

.fon {
    /* background-image:url("../../assets/images/sidebar/abstract4.jpg");*/
    background-image: url("../../assets/fondosidebar.png");
    background-size: 100% 100%;
    background-attachment: fixed;
    width: 100%;
    height: 100%;
    margin: 0;

}

.letra {
    color: #FFFFFF;
    font-size: 20px;
    font-family: "Mystery Quest";
    font-weight: 400;

}
</style>
<style>
.v-list-item--link:before>.v-list-item__icon>.v-icon {
    color: #B3E5FC !important;
}
</style>