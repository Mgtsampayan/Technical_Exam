import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import SetCredential from '../views/SetCredential.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: { guestOnly: true }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: { guestOnly: true }
        },
        {
            path: '/set-credential',
            name: 'SetCredential',
            component: SetCredential,
            meta: { guestOnly: true }
        }
    ]
})

// Navigation guards
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const isAuthenticated = authStore.isAuthenticated

    // Protect authenticated routes
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
        return
    }

    // Prevent authenticated users from accessing guest routes
    if (to.meta.guestOnly && isAuthenticated) {
        next('/home')
        return
    }

    next()
})

export default router