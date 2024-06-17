<template>
  <MDBNavbar container expand="lg" bg="light" class="d-flex justify-content-center">
    <MDBNavbarToggler target="#navbarColor01" @click="collapse7 = !collapse7"></MDBNavbarToggler>
    <MDBCollapse id="navbarColor01" v-model="collapse7">
      <MDBNavbarNav class="mb-2 mb-lg-0 d-flex justify-content-center">
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
        <MDBNavbarItem linkClass="link-secondary">
          <button @click="logout" class="btn btn-outline-danger">Выйти</button>
        </MDBNavbarItem>
      </MDBNavbarNav>
    </MDBCollapse>
  </MDBNavbar>
</template>

<script>
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

    // Метод для выхода (logout)
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('roles');
      // Переход на страницу логина
      this.$router.push('/login');
    };

    return {
      collapse7,
      logout
    };
  },
  components: {
    MDBNavbar,
    MDBNavbarItem,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBCollapse
  }
};
</script>

<style scoped>
/* Стилизация навбара */
.nav-link {
  position: relative;
  color: #000000 !important;
  text-decoration: none;
  padding-bottom: 18px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #1e70ef;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Выравнивание кнопки "Выйти" вправо */
.navbar-nav {
  flex-grow: 1; /* Растягиваем навбар на всю доступную ширину */
}

.ml-auto {
  margin-left: auto; /* Перемещаем кнопку "Выйти" вправо */
}
</style>
