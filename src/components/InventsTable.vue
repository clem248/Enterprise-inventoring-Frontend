<template>
  <body>
  <div class="table-container">
    <h2>Список инвентаризированных предметов</h2>
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
          <td>{{ invent.category.categoryName }}</td>
          <td>{{ invent.quality.qualityName }}</td>
          <td>{{ invent.location.locationName }}</td>
          <td>{{ invent.client }}</td>
          <td>{{ invent.status }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="searchInvents">Найти</button>
    <button @click="downloadExcel">Скачать Excel</button>
  </div>

  <!--  <div class="button-container">-->
  <!--<button @click="addInvents">Добавить</button>-->
  <!--<button @click="delInvents">Удалить</button>-->
  <!--<button @click="redInvents">Редактировать</button>-->
  <!--<button @click="create">Создать</button>-->
<!--</div>-->
  
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
    },
    async downloadExcel() {
      try {
        const response = await axios({
          url: 'http://localhost:8080/api/admin/downloadExcel',
          method: 'GET',
          responseType: 'blob', // Important
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'invents.xlsx'); //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Ошибка при скачивании файла:', error);
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
</style>
