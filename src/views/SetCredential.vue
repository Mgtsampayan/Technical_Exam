<template>
    <div>
        <h1>Set Credentials</h1>
        <input v-model="username" placeholder="Username" />
        <button @click="checkUsername">Check Username</button>
        <input v-model="password" type="password" placeholder="Password" />
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />
        <button @click="saveCredentials">Save</button>
    </div>
</template>

<script>
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useAuthStore } from '../stores/index';

export default {
    data() {
        return {
            username: '',
            password: '',
            confirmPassword: '',
        };
    },
    methods: {
        checkUsername() {
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            if (existingUsers.includes(this.username)) {
                alert('Username already exists');
            } else {
                alert('Username available');
            }
        },
        async saveCredentials() {
            if (this.password !== this.confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            const passwordHash = CryptoJS.SHA1(this.password).toString();
            const prefix = passwordHash.substring(0, 5);
            const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
            const pwnedCount = response.data
                .split('\r')
                .map((line) => parseInt(line.split(':')[1]))
                .reduce((a, b) => a + b, 0);

            if (pwnedCount > 100000) {
                alert('Password is too common');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(this.username);
            localStorage.setItem('users', JSON.stringify(users));

            const authStore = useAuthStore();
            authStore.setUsername(this.username);
            authStore.setPasswordHash(passwordHash);

            this.$router.push('/login');
        },
    },
};
</script>
