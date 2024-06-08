<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand">Inventoring</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link to="/home" class="nav-link">Главная</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/ProductForm" class="nav-link">Добавить продукт</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/InventsTable" class="nav-link">Список инвентарных предметов</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/LocationTable" class="nav-link">Список местоположений</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/CategoryTable" class="nav-link">Список категорий</router-link>
      </li>
    </ul>
    <button class="btn btn-outline-success my-2 my-sm-0" type="button">Выйти</button>
  </div>
</nav>
</template>

<script>


export default {
  
};
</script>

<style scoped src="../styles/styles.css"></style>
