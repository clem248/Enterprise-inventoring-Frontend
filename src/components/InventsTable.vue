<template>
  <div class="table-container">
    <h2>Список инвентарных предметов</h2>
    <button @click="searchInvents">Найти</button>
    <table class="table table-hover">
      <thead class="thead-dark">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Название</th>
        <th scope="col">Картинка</th>
        <th scope="col">QR</th>
        <th scope="col">Категория</th>
        <th scope="col">Качество</th>
        <th scope="col">Расположение</th>
        <th scope="col">Клиент</th>
        <th scope="col">Статус</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="invent in invents" :key="invent.id">
        <td>{{ invent.id }}</td>
        <td>{{ invent.name }}</td>
        <td>{{ invent.picture }}</td>
        <td>{{ invent.qr }}</td>
        <td>{{ invent.category.categoryName }}</td>
        <td>{{ invent.quality.qualityName }}</td>
        <td>{{ invent.location.locationName }}</td>
        <td>{{ invent.client }}</td>
        <td>{{ invent.status }}</td>
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
      invents: [],
      page: 1,
      pageSize: 10,
      loading: false,
      allDataLoaded: false,
    };
  },
  created() {
    this.fetchInvents();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async fetchInvents() {
      if (this.loading || this.allDataLoaded) return;

      this.loading = true;
      try {
        const response = await axios.get(`http://localhost:8080/api/admin/invent?page=${this.page}&size=${this.pageSize}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = response.data;

        if (data.length < this.pageSize) {
          this.allDataLoaded = true;
        }

        this.invents = [...this.invents, ...data];
        this.page++;
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        this.loading = false;
      }
    },
    handleScroll() {
      const scrollPosition = window.innerHeight + window.scrollY;
      const bodyHeight = document.body.offsetHeight;

      if (scrollPosition >= bodyHeight && !this.loading && !this.allDataLoaded) {
        this.fetchInvents();
      }
    },
    async searchInvents() {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/invent?page=1&size=1', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        this.invents = response.data;
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
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
