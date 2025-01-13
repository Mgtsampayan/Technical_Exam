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

        // Adding LogOut action
        logout() {
          this.otp = '';
          this.username = '';
          this.passwordHash = '';


          // Clear these information into localStorage, remove it as well
          localStorage.removeItem('otp');
          localStorage.removeItem('username');
          localStorage.removeItem('passwordHash');
        },
    },
});
