<template>
  <div class="table-container">
    <h2>Список местоположений</h2>
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Название</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(location, index) in locations" :key="index">
        <td>{{ location.id }}</td>
        <td>{{ location.locationName }}</td>
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
      locations: []
    };
  },
  created() {
    this.fetchLocations();
  },
  methods: {
    async fetchLocations() {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/locations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });

        this.locations = response.data;
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
