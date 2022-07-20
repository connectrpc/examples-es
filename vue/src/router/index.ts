import { createRouter, createWebHistory } from 'vue-router'
import ElizaView from '../views/ElizaView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'eliza',
            component: ElizaView,
        },
    ],
})

export default router
