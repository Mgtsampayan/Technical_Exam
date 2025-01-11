<template>
    <div class="set-credential-container">
        <div class="set-credential-card">
            <h2>Set Your Credentials</h2>
            <div class="input-group">
                <label for="new-username">Username</label>
                <input id="new-username" v-model="username" placeholder="Choose a username" />
            </div>
            <button @click="checkUsername" class="secondary-button">Check Username</button>
            <p v-if="errorMessage === 'Username available'" class="success-message">
                Username available!
            </p>
            <div class="input-group">
                <label for="new-password">Password</label>
                <input id="new-password" v-model="password" type="password" placeholder="Set your password" />
            </div>
            <div class="input-group">
                <label for="confirm-password">Confirm Password</label>
                <input id="confirm-password" v-model="confirmPassword" type="password"
                    placeholder="Confirm your password" />
            </div>
            <button @click="saveCredentials" class="primary-button">Save Credentials</button>
            <p v-if="errorMessage && errorMessage !== 'Username available'" class="error-message">
                {{ errorMessage }}
            </p>
        </div>
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

            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(this.username);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem(this.username, passwordHash);

            console.log('Stored Username:', this.username);
            console.log('Stored Password Hash:', passwordHash);

            const authStore = useAuthStore();
            authStore.setUsername(this.username);
            authStore.setPasswordHash(passwordHash);

            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
.set-credential-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f7f6;
}

.set-credential-card {
    background-color: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    width: 350px;
}

h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
}

.input-group {
    margin-bottom: 20px;
}

.input-group label {
    display: block;
    margin-bottom: 5px;
    color: #555;
    font-weight: 500;
}

input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
    outline: none;
    transition: border-color 0.3s ease;
}

input:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

.primary-button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1em;
    transition: background-color 0.3s ease;
    margin-top: 20px;
}

.primary-button:hover {
    background-color: #0056b3;
}

.secondary-button {
    width: 100%;
    padding: 12px;
    background-color: #f8f9fa;
    color: #495057;
    border: 1px solid #ced4da;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1em;
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
    margin-top: 10px;
}

.secondary-button:hover {
    background-color: #e2e6ea;
}

.error-message {
    color: #dc3545;
    margin-top: 10px;
    text-align: center;
}

.success-message {
    color: #28a745;
    margin-top: 10px;
    text-align: center;
}
</style>