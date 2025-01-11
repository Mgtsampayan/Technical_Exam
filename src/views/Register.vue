<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <h1>Register</h1>
        <input v-model="phone" placeholder="Phone Number" />
        <button :disabled="!isValidPhone" @click="sendOtp">Send OTP</button>
        <input v-model="otpInput" placeholder="Enter OTP" :disabled="!otpEnabled" />
        <button :disabled="!otpInput" @click="verifyOtp">Verify OTP</button>
    </div>
</template>

<script>
import { useAuthStore } from '../stores/index';

export default {
    data() {
        return {
            phone: '',
            otpInput: '',
            otpEnabled: false,
        };
    },
    computed: {
        isValidPhone() {
            return /^(09|\+639)\d{9}$/.test(this.phone);
        },
    },
    methods: {
        sendOtp() {
            const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
            this.otpEnabled = true;
            const authStore = useAuthStore();
            authStore.setOtp(randomOtp);
            console.log(`OTP sent: ${randomOtp}`); // For testing
        },
        verifyOtp() {
            const authStore = useAuthStore();
            if (this.otpInput === authStore.otp) {
                this.$router.push('/set-credential');
            } else {
                alert('Invalid OTP');
            }
        },
    },
};
</script>
