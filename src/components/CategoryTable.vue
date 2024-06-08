<template>
  <div class="table-container">
    <h2>Список категорий</h2>
    <table class="table table-hover">
      <thead class="thead-dark">
      <tr>
        <th>ID</th>
        <th>Название</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(category, index) in categories" :key="index">
        <td>{{ category.id }}</td>
        <td>{{ category.categoryName }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: []
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/categories', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        this.categories = response.data;
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    }
  }
};
</script>

<style scoped>
.table-container {
  padding: 10% 10% 0 10%;
  overflow: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>
