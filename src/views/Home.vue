<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="home">
        <h1>Hello, {{ username }}</h1>
        <button @click="logout">Logout</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')

onMounted(() => {
    username.value = localStorage.getItem('currentUser')
})

const logout = () => {
    localStorage.removeItem('currentUser')
    router.push('/login')
}
</script>