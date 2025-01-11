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

            if (!users.includes(this.username)) {
                alert("Username does not exist");
                return;
            }

            // Hash the entered password
            const enteredPasswordHash = CryptoJS.SHA1(this.password).toString();

            if (enteredPasswordHash !== storedHash) {
                alert("Invalid password");
                return;
            }

            // Successful login
            alert(`Welcome, ${this.username}!`);
            this.$router.push("/home");
        },
    },
};
</script>
