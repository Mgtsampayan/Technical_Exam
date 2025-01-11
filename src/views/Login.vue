<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <h1>Login</h1>
        <input v-model="username" placeholder="Username" />
        <div>
            <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" />
            <button @click="togglePassword">
                {{ showPassword ? "Hide" : "Show" }}
            </button>
        </div>
        <button @click="login">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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
            // Fetch stored credentials
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const storedHash = localStorage.getItem(this.username);

            // Log the retrieved values for debugging
            console.log('Retrieved Username:', this.username);
            console.log('Retrieved Password Hash:', storedHash);

            if (!users.includes(this.username)) {
                this.errorMessage = "Username does not exist";
                return;
            }

            // Hash the entered password using SHA-1
            const enteredPasswordHash = CryptoJS.SHA1(this.password).toString();

            // Log the entered password hash for debugging
            console.log('Entered Password Hash:', enteredPasswordHash);

            if (enteredPasswordHash !== storedHash) {
                this.errorMessage = "Invalid password";
                return;
            }

            // Successful login
            alert(`Welcome, ${this.username}!`);
            this.$router.push("/home");
        },
    },
};
</script>

<style scoped>
.error {
    color: red;
}
</style>