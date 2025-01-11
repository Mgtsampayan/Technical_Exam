<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="home-container">
        <div class="welcome-card">
            <h1>Welcome, <span class="username">{{ username }}</span></h1>
            <p class="greeting">Ready to start your day?</p>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '../stores/index';

export default {
    computed: {
        username() {
            const authStore = useAuthStore();
            return authStore.username || 'Guest';
        },
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
</style>