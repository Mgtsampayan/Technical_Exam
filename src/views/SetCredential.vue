<template>
    <div>
        <h1>Set Credentials</h1>
        <input v-model="username" placeholder="Username" />
        <button @click="checkUsername">Check Username</button>
        <input v-model="password" type="password" placeholder="Password" />
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />
        <button @click="saveCredentials">Save</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js';
import { useAuthStore } from '../stores/index';

export default {
    data() {
        return {
            username: '',
            password: '',
            confirmPassword: '',
            errorMessage: '',
        };
    },
    methods: {
        checkUsername() {
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            if (existingUsers.includes(this.username)) {
                this.errorMessage = 'Username already exists';
            } else {
                this.errorMessage = 'Username available';
            }
        },
        async saveCredentials() {
            if (this.password !== this.confirmPassword) {
                this.errorMessage = 'Passwords do not match';
                return;
            }

            const passwordHash = CryptoJS.SHA1(this.password).toString();

            // Save the username and password hash to localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(this.username);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem(this.username, passwordHash);

            // Log the stored values for debugging
            console.log('Stored Username:', this.username);
            console.log('Stored Password Hash:', passwordHash);

            // Update the auth store (if needed)
            const authStore = useAuthStore();
            authStore.setUsername(this.username);
            authStore.setPasswordHash(passwordHash);

            // Redirect to the login page
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
.error {
    color: red;
}
</style>