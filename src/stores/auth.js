import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '../utils/axios'
import CryptoJS from 'crypto-js'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const registrationData = ref({
        phoneNumber: '',
        otp: '',
        generatedOTP: '',
        username: '',
        password: ''
    })

    const isAuthenticated = computed(() => !!user.value)

    const validatePhilippinePhone = (phone) => {
        const phoneRegex = /^(09|\+639)\d{9}$/
        return phoneRegex.test(phone)
    }

    const requestOTP = async (phoneNumber) => {
        try {
            // For development/testing, generate a random 6-digit OTP locally
            // In production, this should call the actual API
            const randomOTP = Math.floor(100000 + Math.random() * 900000).toString()
            console.log('Generated OTP:', randomOTP) // For testing purposes

            registrationData.value.generatedOTP = randomOTP
            return true
        } catch (error) {
            console.error('OTP Generation Error:', error)
            throw new Error('Failed to generate OTP')
        }
    }

    const validateOTP = (inputOTP) => {
        return inputOTP === registrationData.value.generatedOTP
    }

    const checkUsernameAvailability = (username) => {
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
        return !existingUsers.some(user => user.username === username)
    }

    const validatePassword = async (password) => {
        try {
            const passwordHash = CryptoJS.SHA1(password).toString()
            const prefix = passwordHash.substring(0, 5)
            const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`)
            const data = await response.text()

            const occurrences = data.split('\r\n').reduce((total, line) => {
                const [, count] = line.split(':')
                return total + parseInt(count, 10)
            }, 0)

            return occurrences < 100000
        } catch (error) {
            console.error('Password Validation Error:', error)
            throw new Error('Failed to validate password security')
        }
    }

    const registerUser = async (username, password) => {
        try {
            const hashedPassword = CryptoJS.SHA1(password).toString()
            const newUser = {
                username,
                password: hashedPassword
            }

            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
            existingUsers.push(newUser)
            localStorage.setItem('users', JSON.stringify(existingUsers))

            return true
        } catch (error) {
            console.error('Registration Error:', error)
            throw new Error('Failed to register user')
        }
    }

    const login = async (username, password) => {
        try {
            const hashedPassword = CryptoJS.SHA1(password).toString()
            const users = JSON.parse(localStorage.getItem('users') || '[]')

            const matchedUser = users.find(
                user => user.username === username && user.password === hashedPassword
            )

            if (matchedUser) {
                user.value = { username: matchedUser.username }
                return true
            }

            return false
        } catch (error) {
            console.error('Login Error:', error)
            throw new Error('Failed to login')
        }
    }

    const logout = () => {
        user.value = null
    }

    return {
        user,
        registrationData,
        isAuthenticated,
        validatePhilippinePhone,
        requestOTP,
        validateOTP,
        checkUsernameAvailability,
        validatePassword,
        registerUser,
        login,
        logout
    }
})