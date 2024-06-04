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
  <body style="background-image: url('src/img/1.jpg');">
  </body>
  </template>
  
  <script>
  export default {
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