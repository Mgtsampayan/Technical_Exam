// import { createRouter, createWebHistory } from 'vue-router'
// import Register from '../views/Register.vue'
// import SetCredential from '../views/SetCredential.vue'
// import Login from '../views/Login.vue'
// import Home from '../views/Home.vue'

// const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//         { path: '/', redirect: '/login' },
//         { path: '/register', component: Register },
//         { path: '/set-credential', component: SetCredential },
//         { path: '/login', component: Login },
//         {
//             path: '/home',
//             component: Home,
//             meta: { requiresAuth: true }
//         }
//     ]
// })

// router.beforeEach((to, from, next) => {
//     if (to.meta.requiresAuth && !localStorage.getItem('currentUser')) {
//         next('/login')
//     } else {
//         next()
//     }
// })

// export default router

import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import SetCredential from '../views/SetCredential.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/register', component: Register },
        { path: '/set-credential', component: SetCredential },
        { path: '/login', component: Login },
        {
            path: '/home',
            component: Home,
            meta: { requiresAuth: true }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    // Protection for authenticated routes
    if (to.meta.requiresAuth && !localStorage.getItem('currentUser')) {
        next('/login')
        return
    }

    // Protection for set-credential route
    if (to.path === '/set-credential' && !authStore.isPhoneVerified) {
        next('/register')
        return
    }

    // Prevent authenticated users from accessing auth pages
    if (['/login', '/register', '/set-credential'].includes(to.path) &&
        localStorage.getItem('currentUser')) {
        next('/home')
        return
    }

    next()
})

export default router