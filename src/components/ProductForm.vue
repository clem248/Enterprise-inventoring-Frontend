<template>
  <body>
  <div class="form-container">
    <h2>Добавить продукт и скачать QR</h2>
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="form-group">
        <label for="name">Название:</label>
        <input type="text" id="name" v-model="product.name" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="category">Категория:</label>
        <select id="category" v-model="product.category.categoryName" class="form-control" required>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="quality">Качество:</label>
        <select id="quality" v-model="product.quality.qualityName" class="form-control" required>
          <option v-for="quality in qualities" :key="quality" :value="quality">
            {{ quality }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="location">Расположение:</label>
        <select id="location" v-model="product.location.locationName" class="form-control" required>
          <option v-for="location in locations" :key="location" :value="location">
            {{ location }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="client">ID Клиента:</label>
        <select id="client" v-model="product.client.fullName" class="form-control" required>
          <option v-for="client in clients" :key="client.id" :value="client.fullName">
            {{ client.fullName }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="file">Выбрать файл:</label>
        <input type="file" id="file" ref="file" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Добавить</button>
    </form>

    <!-- Debug information -->
    <div class="debug">
      <h3>Debug Info</h3>
      <pre>Categories: {{ categories }}</pre>
      <pre>Qualities: {{ qualities }}</pre>
      <pre>Locations: {{ locations }}</pre>
      <pre>Clients: {{ clients }}</pre>
    </div>
  </div>
  </body>
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
        category: { categoryName: '' },
        quality: { qualityName: '' },
        location: { locationName: '' },
        client: { fullName: '' },
        status: ''
      },
      categories: [],
      qualities: [],
      locations: [],
      clients: []
    };
  },
  mounted() {
    console.log('Component mounted, fetching initial data...');
    this.fetchCategories();
    this.fetchQualities();
    this.fetchLocations();
    this.fetchClients();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/categories', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.categories = response.data.map(category => category.categoryName);
        console.log('Categories loaded:', this.categories);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    },
    async fetchQualities() {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/qualities', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.qualities = response.data.map(quality => quality.qualityName);
        console.log('Qualities loaded:', this.qualities);
      } catch (error) {
        console.error('Ошибка при загрузке качеств:', error);
      }
    },
    async fetchLocations() {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/locations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.locations = response.data.map(location => location.locationName);
        console.log('Locations loaded:', this.locations);
      } catch (error) {
        console.error('Ошибка при загрузке локаций:', error);
      }
    },
    async fetchClients() {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/AllClients', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.clients = response.data;
        console.log('Clients loaded:', this.clients);
      } catch (error) {
        console.error('Ошибка при загрузке клиентов:', error);
      }
    },
    async onSubmit() {
      try {
        const formData = new FormData();
        formData.append('name', this.product.name);
        formData.append('category.categoryName', this.product.category.categoryName);
        formData.append('quality.qualityName', this.product.quality.qualityName);
        formData.append('location.locationName', this.product.location.locationName);
        formData.append('client.fullName', this.product.client.fullName);

        const file = this.$refs.file.files[0];
        formData.append('file', file);

        const response = await axios.post('http://localhost:8080/api/admin/invent/save', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.status === 200) {
          console.log('Продукт успешно добавлен:', response.data);
          this.product = {
            name: '',
            picture: '',
            qr: '',
            category: { categoryName: '' },
            quality: { qualityName: '' },
            location: { locationName: '' },
            client: { fullName: '' },
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




<style scoped>
.debug {
  margin-top: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
}
</style>
