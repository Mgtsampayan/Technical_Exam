import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import CryptoJS from 'crypto-js'

export const useAuthStore = defineStore('auth', () => {
    const currentUser = ref(null)
    const otpCode = ref(null)
    const phoneNumber = ref('')
    const verifiedPhone = ref('')
    const isPhoneVerified = ref(false)

    const setPhoneNumber = (number) => {
        phoneNumber.value = number
    }

    const generateOTP = async () => {
        // Mock OTP generation for testing
        otpCode.value = Math.floor(100000 + Math.random() * 900000).toString()
        console.log('Generated OTP:', otpCode.value)
        return otpCode.value
    }

    const verifyOTP = (inputOTP) => {
        return inputOTP === otpCode.value
    }

    const isUsernameTaken = (username) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        return users.some(user => user.username === username)
    }

    const checkPwnedPassword = async (password) => {
        const hash = CryptoJS.SHA1(password).toString().toUpperCase()
        const prefix = hash.slice(0, 5)
        const suffix = hash.slice(5)

        try {
            const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`)
            const hashes = response.data.split('\r\n')
            let breachCount = 0

            for (const hashLine of hashes) {
                const [hashSuffix, count] = hashLine.split(':')
                if (hashSuffix === suffix) {
                    breachCount = parseInt(count)
                    break
                }
            }

            return breachCount < 100000
        } catch (error) {
            console.error('PWNED API Error:', error)
            return false
        }
    }

    const setVerifiedPhone = (phone) => {
        verifiedPhone.value = phone
        isPhoneVerified.value = true
    }

    return {
        currentUser,
        otpCode,
        phoneNumber,
        verifiedPhone,
        isPhoneVerified,
        setPhoneNumber,
        setVerifiedPhone,
        generateOTP,
        verifyOTP,
        isUsernameTaken,
        checkPwnedPassword
    }
})
