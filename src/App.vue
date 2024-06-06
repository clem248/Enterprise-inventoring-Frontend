<template>
  <div id="app">
    <Navbar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  setup() {
    const route = useRoute();
    const showNavbar = ref(route.path !== '/login');

    watch(route, (newRoute) => {
      showNavbar.value = newRoute.path !== '/login';
    });

    return {showNavbar};
  }
};
</script>

<style>
/* Добавьте любые стили, которые могут понадобиться */
</style>
