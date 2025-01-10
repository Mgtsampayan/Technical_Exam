<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="register">
        <h2>Registration</h2>
        <form @submit.prevent="handlePhoneSubmit">
            <div class="form-group">
                <label for="phone">Phone Number:</label>
                <input id="phone" v-model="phone" type="text" placeholder="09XXXXXXXXX" :disabled="otpSent">
                <button type="button" @click="sendOTP" :disabled="!isValidPhone || otpSent">
                    Send OTP
                </button>
            </div>

            <div v-if="otpSent" class="form-group">
                <label for="otp">Enter OTP:</label>
                <input id="otp" v-model="otp" type="text" maxlength="6">
                <button type="submit" :disabled="otp.length !== 6">
                    Verify OTP
                </button>
            </div>

            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const phone = ref('')
const otp = ref('')
const otpSent = ref(false)
const error = ref('')

const isValidPhone = computed(() => {
    const phoneRegex = /^(09|\+639)\d{9}$/
    return phoneRegex.test(phone.value)
})

const sendOTP = async () => {
    if (!isValidPhone.value) return

    authStore.setPhoneNumber(phone.value)
    await authStore.generateOTP()
    otpSent.value = true
}

const handlePhoneSubmit = async () => {
    try {
        if (authStore.verifyOTP(otp.value)) {
            // Store verified phone number in state before navigation
            authStore.setVerifiedPhone(phone.value)
            await router.push('/set-credential')
        } else {
            error.value = 'Invalid OTP'
        }
    } catch (err) {
        console.error('Navigation error:', err)
        error.value = 'An error occurred. Please try again.'
    }
}
</script>