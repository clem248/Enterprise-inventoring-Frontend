<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: ''
      };
    },
    components: {
      MDBNavbar,
      MDBNavbarItem,
      MDBNavbarBrand,
      MDBNavbarNav,
      MDBNavbarToggler,
      MDBBadge,
      MDBIcon,
      MDBCollapse
    },
    setup() {
      const collapse7 = ref(false);

      return {
        collapse7,
      }
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:8080/api/admin/auth/signin', {
                email: this.email,
                password: this.password
                });

                if (response.status === 200) {
                const data = response.data;
                // Сохраняем токен и другие данные в localStorage
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('username', data.username);
                localStorage.setItem('roles', data.roles);

                // Перенаправляем на страницу Dashboard
                this.$router.push('/dashboard');
                } else {
                // Если сервер вернул ошибку, показываем соответствующее сообщение
                this.errorMessage = 'Ошибка при авторизации';
                }
            } catch (error) {
                // Если произошла ошибка при запросе, показываем сообщение об ошибке
                this.errorMessage = 'Ошибка при отправке запроса';
            }
            }
    }
  };
  import {
    MDBNavbar,
    MDBNavbarItem,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBBadge,
    MDBIcon,
    MDBCollapse
  } from 'mdb-vue-ui-kit';
  import { ref } from "vue";
  document.addEventListener('DOMContentLoaded', function() {
    var ps = new PerfectScrollbar('.container', {
      // Optional scrollbar configuration options
    });
  });
</script>
<template>
    <MDBNavbar
  container
  expand="lg"
  bg="light"
  class="d-flex justify-content-between"
  >
    <MDBNavbarBrand>
      <MDBIcon icon="mdb" iconStyle="fab" size="2x" />
    </MDBNavbarBrand>
    <MDBNavbarToggler
      target="#navbarColor01"
      @click="collapse7 = !collapse7"
    ></MDBNavbarToggler>
    <MDBCollapse id="navbarColor01" v-model="collapse7">
      <MDBNavbarNav class="mb-2 mb-lg-0">
        <MDBNavbarItem href="#" linkClass="link-secondary"
          ><router-link to="/" class="nav-link">Главная</router-link></MDBNavbarItem
        >
        <MDBNavbarItem href="#" linkClass="link-secondary"
          ><router-link to="/About" class="nav-link">О нас</router-link></MDBNavbarItem
        >
        <MDBNavbarItem href="#" linkClass="link-secondary"
          ><router-link to="/QrFill" class="nav-link">Заполнение</router-link></MDBNavbarItem
        >
        <MDBNavbarItem href="#" linkClass="link-secondary"
          ><router-link to="/Inventory" class="nav-link">Инвентарь</router-link></MDBNavbarItem
        >
      </MDBNavbarNav>
    </MDBCollapse>

    <MDBNavbarNav class="mb-2 mb-lg-0 d-flex flex-row">
      <MDBNavbarItem
        to="#"
        class="me-3 me-lg-0"
        linkClass="link-secondary"
        ><MDBIcon icon="shopping-cart"></MDBIcon
      ></MDBNavbarItem>
      <MDBNavbarItem
        to="#"
        class="me-3 me-lg-0"
        linkClass="link-secondary"
      >
        <MDBIcon icon="bell" />
        <MDBBadge notification color="danger" pill>1</MDBBadge>
      </MDBNavbarItem>
      <MDBNavbarItem href="#" class="me-3 me-lg-0">
        <img
          src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
          class="rounded-circle"
          height="22"
          alt=""
          loading="lazy"
        />
      </MDBNavbarItem>
    </MDBNavbarNav>
  </MDBNavbar>
    <div class="auth">
      <h2>Авторизация</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Войти</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
    
  </template>


  <style scoped>
  .auth {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    margin-top: 200px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  /*Здесь используется "расскадровка каждого элемента, пока так, нужно выделить всё это в глобальные компоненты, чтобы просто потом переисполдьзовать всё
  чтобы не писать снова и снова" */ 
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="email"],
  input[type="password"] {
    width: 97%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  .html {
    scrollbar-width: normal;
    scrollbar-color: #777 #555;
  }
  .html::-webkit-scrollbar{
    width: 4vw;
  }
  .html::-webkit-scrollbar-thumb {
    background-color: #7775;
  }
  .html::-webkit-scrollbar-track {
    background-color: #5555;
  }
  </style>
  