<template>
  <router-view></router-view>
</template>

<script>
import { createApp } from 'vue';
import router from './router.js';

const app = createApp({});
app.use(router);
app.mount('#app');
</script>

<style>
/* стили для приложения */
</style>
