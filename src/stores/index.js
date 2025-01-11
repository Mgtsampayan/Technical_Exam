import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        otp: '',
        username: '',
        passwordHash: '',
    }),
    actions: {
        setOtp(otp) {
            this.otp = otp;
        },
        setUsername(username) {
            this.username = username;
        },
        setPasswordHash(hash) {
            this.passwordHash = hash;
        },
    },
});
