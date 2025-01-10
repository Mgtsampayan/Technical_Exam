<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="username">Username:</label>
                <input id="username" v-model="username" type="text" required>
            </div>

            <div class="form-group">
                <label for="password">Password:</label>
                <div class="password-input">
                    <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" required>
                    <button type="button" @click="showPassword = !showPassword">
                        {{ showPassword ? 'Hide' : 'Show' }}
                    </button>
                </div>
            </div>

            <button type="submit">Login</button>
            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CryptoJS from 'crypto-js'

const router = useRouter()
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')

const handleSubmit = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.username === username.value)

    if (!user) {
        error.value = 'Invalid credentials'
        return
    }

    const hashedPassword = CryptoJS.SHA1(password.value).toString()
    if (hashedPassword === user.password) {
        localStorage.setItem('currentUser', username.value)
        router.push('/home')
    } else {
        error.value = 'Invalid credentials'
    }
}
</script>