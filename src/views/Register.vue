<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="register-container">
        <div class="register-card">
            <h2>Register</h2>
            <div class="input-group">
                <label for="phone">Phone Number</label>
                <input id="phone" v-model="phone" placeholder="Enter your phone number" />
            </div>
            <button :disabled="!isValidPhone" @click="sendOtp" class="primary-button">
                Send OTP
            </button>
            <div class="input-group" v-if="otpEnabled">
                <label for="otp">Enter OTP</label>
                <input id="otp" v-model="otpInput" placeholder="Enter verification code" />
            </div>
            <button :disabled="!otpInput || !otpEnabled" @click="verifyOtp" class="secondary-button" v-if="otpEnabled">
                Verify OTP
            </button>
        </div>
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

<style scoped>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f7f6;
}

.register-card {
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
}

.primary-button:hover {
    background-color: #0056b3;
}

.secondary-button {
    width: 100%;
    padding: 12px;
    background-color: #f8f9fa;
    /* Light gray */
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

.secondary-button:disabled {
    background-color: #e9ecef;
    color: #adb5bd;
    border-color: #ced4da;
    cursor: not-allowed;
}
</style>