import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/Register.vue';
import SetCredentials from '../views/SetCredential.vue';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';

const routes = [
    { path: '/register', component: Register },
    { path: '/set-credential', component: SetCredentials },
    { path: '/login', component: Login },
    { path: '/home', component: Home },
    { path: '/', redirect: '/register' },  // Redirect to register as Main Route
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
