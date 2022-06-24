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
        {
            path: '/about-vue',
            name: 'aboutVue',
            // route level code-splitting
            // this generates a separate chunk (HomeView.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/HomeView.vue'),
        },
    ],
})

export default router
