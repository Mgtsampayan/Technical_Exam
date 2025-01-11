<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="login-container">
        <div class="login-card">
            <h2>Log In</h2>
            <div class="input-group">
                <label for="username">Username</label>
                <input id="username" v-model="username" placeholder="Enter your username" />
            </div>
            <div class="input-group password-group">
                <label for="password">Password</label>
                <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password"
                    placeholder="Enter your password" />
                <button type="button" @click="togglePassword" class="password-toggle">
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
            </div>
            <button @click="login" class="primary-button">Log In</button>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script>
import CryptoJS from "crypto-js";

export default {
    data() {
        return {
            username: "",
            password: "",
            showPassword: false,
            errorMessage: "",
        };
    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        login() {
            // ... (same login logic as before)
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const storedHash = localStorage.getItem(this.username);

            console.log('Retrieved Username:', this.username);
            console.log('Retrieved Password Hash:', storedHash);

            if (!users.includes(this.username)) {
                this.errorMessage = "Username does not exist";
                return;
            }

            const enteredPasswordHash = CryptoJS.SHA1(this.password).toString();

            console.log('Entered Password Hash:', enteredPasswordHash);

            if (enteredPasswordHash !== storedHash) {
                this.errorMessage = "Invalid password";
                return;
            }

            alert(`Welcome, ${this.username}!`);
            this.$router.push("/home");
        },
    },
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f7f6;
}

.login-card {
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

.password-group {
    position: relative;
}

.password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    color: #777;
    font-size: 1em;
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
}

.primary-button:hover {
    background-color: #0056b3;
}

.error-message {
    color: #dc3545;
    margin-top: 10px;
    text-align: center;
}
</style>