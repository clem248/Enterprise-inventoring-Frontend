<template>
  <body>
  <div class="form-container">
    <h2>Добавить продукт и скачать QR</h2>
    <form @submit.prevent="onSubmit">
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
        <label for="inventNumber">Инвентарный номер:</label>
        <input type="text" id="inventNumber" v-model="product.qr" class="form-control" required>
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
        <label for="clientId">ID Клиента:</label>
        <input type="text" id="clientId" v-model="product.client" class="form-control" required>
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
<!---   <div class="button-container">-->
<!---    <button @click="downloadQR">Скачать</button>-->
<!--- </div>-->

    <!-- Debug information -->
    <div class="debug">
      <h3>Debug Info</h3>
      <pre>Categories: {{ categories }}</pre>
      <pre>Qualities: {{ qualities }}</pre>
      <pre>Locations: {{ locations }}</pre>
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
        client: '',
        status: ''
      },
      categories: [],
      qualities: [],
      locations: []
    };
  },
  mounted() {
    console.log('Component mounted, fetching initial data...');
    this.fetchCategories();
    this.fetchQualities();
    this.fetchLocations();
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
            category: { categoryName: '' },
            quality: { qualityName: '' },
            location: { locationName: '' },
            client: '',
            status: ''
          };
        } else {
          console.error('Ошибка при добавлении продукта:', response);
        }
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
      }
    }
/*     async downloadQR (){
      try{
        const response = await axios.get('http://localhost:8080/api/admin/invent/download', this.qr,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      }

    }*/
  }
};

</script>

<style scoped>
/* Your existing styles */

.debug {
  margin-top: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
}


</style>


