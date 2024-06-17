<template>
  <body>
  <div class="table-container">
    <h2>Список инвентаризированных предметов</h2>
    <!-- Поле ввода для поиска по ID -->
    <div>
      <label for="searchId">Поиск по ID:</label>
      <input v-model="searchId" type="text" id="searchId">
      <button @click="searchById">Найти по ID</button>
      <button @click="searchInvents">Сбросить</button>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Название</th>
        <th>Картинка</th>
        <th>QR</th>
        <th>Категория</th>
        <th>Качество</th>
        <th>Расположение</th>
        <th>Клиент</th>
        <th>Статус</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="invent in invents" :key="invent.id">
        <td>{{ invent.id }}</td>
        <td>{{ invent.name }}</td>
        <td>{{ invent.picture }}</td>
        <td>{{ invent.qr }}</td>
        <td>{{ invent.category && invent.category.categoryName }}</td>
        <td>{{ invent.quality && invent.quality.qualityName }}</td>
        <td>{{ invent.location && invent.location.locationName }}</td>
        <td>{{ invent.client }}</td>
        <td>{{ invent.status }}</td>
      </tr>
      </tbody>
    </table>
    <button @click="downloadExcel">Скачать Excel</button>
  </div>
  </body>
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
      searchId: '' // Добавлено поле для хранения ID для поиска
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
        const response = await axios.get(`http://localhost:8080/api/admin/invent?page=${this.page}&pageSize=${this.pageSize}`, {
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
        const response = await axios.get('http://localhost:8080/api/admin/invent', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        this.invents = response.data;
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    },
    async downloadExcel() {
      try {
        const response = await axios({
          url: 'http://localhost:8080/api/admin/invent/download',
          method: 'get',
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'invents.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Ошибка при скачивании файла:', error);
      }
    },
    async searchById() {
      if (!this.searchId.trim()) {
        return; // Не выполняем поиск, если поле поиска пустое
      }
      try {
        const response = await axios.get(`http://localhost:8080/api/admin/invent/${this.searchId.trim()}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        this.invents = [response.data]; // Заменяем массив инвентаризированных предметов найденным объектом
      } catch (error) {
        console.error('Ошибка при выполнении запроса по ID:', error);
      }
    }
  }
};
</script>

<style scoped>
.table-container {
  padding: 2% 2% 0 2%;
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

/* Стили для поля поиска и кнопки */
input[type="text"] {
  padding: 6px;
  width: 200px;
  margin-right: 10px;
}

button {
  padding: 6px 10px;
  cursor: pointer;
}
</style>
