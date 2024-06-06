<template>
  <div class="form-container">
    <h2>Добавить продукт</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="name">Название:</label>
        <input type="text" id="name" v-model="product.name" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="category">Категория:</label>
        <select id="category" v-model="product.category.id" class="form-control" required>
          <option value="1">Компьютерное комплектующее</option>
          <option value="2">Мебель</option>
          <option value="3">Инструменты</option>
        </select>
      </div>
      <div class="form-group">
        <label for="quality">Качество:</label>
        <select id="quality" v-model="product.quality.id" class="form-control" required>
          <option value="1">Низкое</option>
          <option value="2">Среднее</option>
          <option value="3">Высокое</option>
        </select>
      </div>
      <div class="form-group">
        <label for="inventNumber">Инвентарный номер:</label>
        <input type="text" id="inventNumber" v-model="product.qr" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="location">Расположение:</label>
        <input type="text" id="location" v-model="product.location.id" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="clientId">ID Клиента:</label>
        <input type="text" id="clientId" v-model="product.client.id" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="picture">Картинка:</label>
        <input type="text" id="picture" v-model="product.picture" class="form-control">
      </div>
      <div class="form-group">
        <label for="status">Статус:</label>
        <input type="text" id="status" v-model="product.status" class="form-control">
      </div>
      <button type="submit" class="btn btn-primary">Добавить</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: {
        name: '',
        picture: '',
        qr: '',
        category: { id: 1 },
        quality: { id: 1 },
        location: { id: 1 },
        client: { id: 1 },
        status: ''
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await axios.post('http://localhost:8080/api/admin/invent/save', this.product, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.status === 201) {
          console.log('Продукт успешно добавлен:', response.data);
          // Очистка формы после успешной отправки
          this.product = {
            name: '',
            picture: '',
            qr: '',
            category: { id: 1 },
            quality: { id: 1 },
            location: { id: 1 },
            client: { id: '' },
            status: ''
          };
        } else {
          console.error('Ошибка при добавлении продукта:', response);
        }
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
      }
    }
  }
};
</script>

<style scoped src="../styles/styles.css"></style>
