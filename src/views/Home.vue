<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="home-container">
        <div class="welcome-card">
            <h1>Welcome, <span class="username">{{ username }}</span></h1>
            <p class="greeting">Ready to start your day?</p>
            <button @click="logout">Logout</button> <!-- Add for easy to go into Login page -->
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '../stores/index';
import { useRouter } from 'vue-router';

export default {
    computed: {
        username() {
            const authStore = useAuthStore();
            return authStore.username || 'Guest';
        },
    },

    setup() {
      const authStore = useAuthStore();
      const router = useRouter();

      const logout = () => {
        authStore.logout();
        router.push('/login'); // Redirect to Login page after logout
      };
      return { logout };
    },
};
</script>

<style scoped>
.home-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f7f6;
    /* Light background */
}

.welcome-card {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    text-align: center;
}

h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
    color: #333;
}

.username {
    font-weight: bold;
    color: #007bff;
    /* Primary color */
}

.greeting {
    color: #777;
    font-size: 1.1em;
}
/* For LogOut Button */
.logout-button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-top: 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.logout-button:hover {
    background-color: #c82333;
}
</style>
