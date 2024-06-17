<template>
  <body>
    <div class="table-container">
      <h2>Список местоположений</h2>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td><input v-model="newLocation.id" type="text" placeholder="ID (optional)"></td>
          <td><input v-model="newLocation.locationName" type="text" placeholder="Название"></td>
          <td>
            <button @click="createLoc">Создать</button>
          </td>
        </tr>
          <tr v-for="(location, index) in locations" :key="location.id">
            <td>{{ location.id }}</td>
            <td>{{ location.locationName }}</td>
            <td>
              <button @click="deleteLoc(index)" class="btn-delete">Удалить</button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </body>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      locations: [],
      newLocation: {},
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
          },
        });

        this.locations = response.data;
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    },
    async createLoc() {
      try {
        const response = await axios.post('http://localhost:8080/api/admin/locations', this.newLocation, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const createdLocation = response.data;
        this.locations.push(createdLocation);

        this.newLocation = {};

        console.log('Location created successfully!');

      } catch (error) {
        console.error('Error creating location:', error);
      }
    },

    deleteLoc(index) {
      const locationId = this.locations[index].id;
      if (locationId) {
        axios.delete(`http://localhost:8080/api/admin/locations/${locationId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
          .then(() => {
            this.locations.splice(index, 1);
            console.log('Location deleted successfully!');
          })
          .catch(error => {
            console.error('Error deleting location:', error);
          });
      } else {
        console.warn('Location ID not found for deletion.');
      }
    },
  },
};
</script>

<style scoped>

</style>
