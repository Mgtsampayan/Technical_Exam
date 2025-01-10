<template>
    <div class="set-credential">
        <h2>Set Your Credentials</h2>
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

            <div class="form-group">
                <label for="confirmPassword">Confirm Password:</label>
                <input id="confirmPassword" v-model="confirmPassword" :type="showPassword ? 'text' : 'password'"
                    required>
            </div>

            <button type="submit" :disabled="!isValid">Create Account</button>
            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import CryptoJS from 'crypto-js'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const error = ref('')

const isValid = computed(() => {
    return username.value &&
        password.value &&
        password.value === confirmPassword.value
})

const handleSubmit = async () => {
    if (!isValid.value) return

    if (authStore.isUsernameTaken(username.value)) {
        error.value = 'Username already taken'
        return
    }

    const isPasswordSafe = await authStore.checkPwnedPassword(password.value)
    if (!isPasswordSafe) {
        error.value = 'Password is too common. Please choose a stronger password.'
        return
    }

    const hashedPassword = CryptoJS.SHA1(password.value).toString()
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    users.push({
        username: username.value,
        password: hashedPassword
    })

    localStorage.setItem('users', JSON.stringify(users))
    router.push('/login')
}
</script>