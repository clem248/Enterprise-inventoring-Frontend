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
          <tr v-for="(location, index) in locations" :key="location.id">
            <td>{{ location.id }}</td>
            <td>{{ location.locationName }}</td>
            <td>
              <button @click="deleteLoc(index)">Удалить</button>
            </td>
          </tr>
          <tr>
            <td><input v-model="newLocation.id" type="text" placeholder="ID (optional)"></td>
            <td><input v-model="newLocation.locationName" type="text" placeholder="Название"></td>
            <td>
              <button @click="createLoc">Создать</button>
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
      newLocation: {}, // Object to store new location data
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
        const response = await axios.post('http://localhost:8080/api/admin/locations', this.newLocation, { // Include newLocation directly in request body
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include authorization header if needed
          },
        });

        if (!response.ok) {
          throw new Error('Failed to create location');
        }

        const createdLocation = await response.json();
        this.locations.push(createdLocation); // Add the newly created location to the list
        this.newLocation = {}; // Reset the newLocation object for future entries

        // Handle success (e.g., display a success message)
        console.log('Location created successfully!');
      } catch (error) {
        console.error('Error creating location:', error);
        // Handle errors appropriately (e.g., display an error message to the user)
      }
    },
    deleteLoc(index) {
      // Assuming you have a backend method to delete by ID:
      const locationId = this.locations[index].id; // Get ID of the location to delete
      if (locationId) {
        // Implement logic to confirm deletion (optional)
        // ...

        // Send delete request to backend (example using axios)
        axios.delete(`http://localhost:8080/api/admin/locations/${locationId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include authorization header if needed
          },
        })
          .then(() => {
            this.locations.splice(index, 1); // Remove location from local array on success
            console.log('Location deleted successfully!');
          })
          .catch(error => {
            console.error('Error deleting location:', error);
            // Handle errors appropriately (e.g., display an error message to the user)
          });
      } else {
        console.warn('Location ID not found for deletion.'); // Handle cases where ID is missing
      }
    },
  },
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

  .table th,
  .table td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  .table th {
    background-color: #f2f2f2;
    text-align: left;
  }
</style>
