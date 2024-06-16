<template>
  <MDBNavbar container expand="lg" bg="light" class="d-flex justify-content-between">
    <MDBNavbarToggler target="#navbarColor01" @click="collapse7 = !collapse7"></MDBNavbarToggler>
    <MDBCollapse id="navbarColor01" v-model="collapse7">
      <MDBNavbarNav class="mb-2 mb-lg-0">
        <MDBNavbarItem linkClass="link-secondary">
          <router-link to="/home" class="nav-link">Главная</router-link>
        </MDBNavbarItem>
        <MDBNavbarItem linkClass="link-secondary">
          <router-link to="/ProductForm" class="nav-link">Добавить продукт</router-link>
        </MDBNavbarItem>
        <MDBNavbarItem linkClass="link-secondary">
          <router-link to="/InventsTable" class="nav-link">Список инвентаризированных предметов</router-link>
        </MDBNavbarItem>
        <MDBNavbarItem linkClass="link-secondary">
          <router-link to="/LocationTable" class="nav-link">Список местоположений</router-link>
        </MDBNavbarItem>
        <MDBNavbarItem linkClass="link-secondary">
          <router-link to="/CategoryTable" class="nav-link">Список категорий</router-link>
        </MDBNavbarItem>
        <!-- <MDBNavbarItem linkClass="link-secondary">-->
        <!--    <button @click="logout">Выйти</button>-->
        <!--</MDBNavbarItem>-->
      </MDBNavbarNav>
    </MDBCollapse>
  </MDBNavbar>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import {
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse
} from 'mdb-vue-ui-kit';

export default {
  name: 'Navbar',
  setup() {
    const collapse7 = ref(false);
    return { collapse7 };
  },
  components: {
    MDBNavbar,
    MDBNavbarItem,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBCollapse
  }
}
</script>

<style scoped src="../styles/styles.css"></style>
