<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <h1>Hello, {{ username }}</h1>
    </div>
</template>

<script>
import { useAuthStore } from '../stores/index';

export default {
    computed: {
        username() {
            const authStore = useAuthStore();
            return authStore.username || 'Guest';
        },
    },
};
</script>
