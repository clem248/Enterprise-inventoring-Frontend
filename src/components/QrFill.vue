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
    <div class="form-container">
      <h2>Добавить продукт</h2>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="id">ID:</label>
          <input type="text" id="id" v-model="product.id" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="name">Название:</label>
          <input type="text" id="name" v-model="product.name" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="category">Категория:</label>
          <select id="category" v-model="product.category" class="form-control" required>
            <option value="1">Компьютерное комплектующее</option>
            <option value="2">Мебель</option>
            <option value="3">Инструменты</option>
          </select>
        </div>
        <div class="form-group">
          <label for="quality">Качество:</label>
          <select id="quality" v-model="product.quality" class="form-control" required>
            <option value="1">Низкое</option>
            <option value="2">Среднее</option>
            <option value="3">Высокое</option>
          </select>
        </div>
        <div class="form-group">
          <label for="inventNumber">Инвентарный номер:</label>
          <input type="text" id="inventNumber" v-model="product.inventNumber" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="location">Расположение:</label>
          <input type="text" id="location" v-model="product.location" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="clientId">ID Клиента:</label>
          <input type="text" id="clientId" v-model="product.clientId" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Добавить</button>
      </form>
      <div class="container" data-mdb-perfect-scrollbar="true"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: {
          id: '',
          name: '',
          category: 1,
          quality: 1,
          inventNumber: '',
          location: '',
          clientId: '',
        },
      };
    },
    methods: {
      onSubmit() {
        // Отправить данные формы
        console.log('Данные формы:', this.product);
  
        // Сбросить форму
        this.product = {
          id: '',
          name: '',
          category: 1,
          quality: 1,
          inventNumber: '',
          location: '',
        };
      },
    },
    name: 'Navbar',
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
  
  </script>
  
  <style scoped>
  .form-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-control {
    width: 100%;
  }
  
  .btn {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  .navbar {
    background-color: #ff0000;
    color: #000000;
    padding: 10px 20px;
  }
  
  .navbar-brand {
    float: left;
    font-weight: bold;
  }
  
  .navbar-nav {
    float: right;
  }
  
  .navbar-nav li {
    display: inline-block;
    margin-right: 20px;
  }
  
  .nav-link {
    color: #000000;
    text-decoration: none;
  }
  
  .nav-link:hover {
    color: #2200ff;
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