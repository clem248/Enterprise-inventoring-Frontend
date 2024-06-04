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
html {
    scrollbar-width: normal;
    scrollbar-color: #777 #555;
  }
  html::-webkit-scrollbar{
    width: 4vw;
  }
  html::-webkit-scrollbar-thumb {
    background-color: #7775;
  }
  html::-webkit-scrollbar-track {
    background-color: #5555;
  }
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
