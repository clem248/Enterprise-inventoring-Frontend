<template>
  <body>
    <div class="table-container">
      <h2>Список категорий</h2>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td><input type="text" v-model="newCategory.id" placeholder="ID (optional)"></td>
          <td><input type="text" v-model="newCategory.categoryName" placeholder="Название"></td>
          <td>
            <button @click="createCat">Создать</button>
          </td>
        </tr>
        <tr v-for="(category, index) in categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.categoryName }}</td>
          <td>
            <button @click="deleteCat(index)" class="btn-delete">Удалить</button>
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
      categories: [],
      newCategory: {}, // Object to store new category data
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
          },
        });

        this.categories = response.data;
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    },
    async createCat() {
      try {
        const response = await axios.post('http://localhost:8080/api/admin/categories', this.newCategory, { // Include newCategory directly in request body
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include authorization header if needed
          },
        });

        if (!response.ok) {
          throw new Error('Failed to create category');
        }

        const createdCategory = await response.json();
        this.categories.push(createdCategory); // Add the newly created category to the list locally
        this.newCategory = {}; // Reset the newCategory object for future entries

        // Handle success (e.g., display a success message)
        console.log('Category created successfully!');
      } catch (error) {
        console.error('Error creating category:', error);
        // Handle errors appropriately (e.g., display an error message to the user)
      }
    },
    deleteCat(index) {
      // Assuming you have a backend method to delete by ID:
      const categoryId = this.categories[index].id; // Get ID of the category to delete
      if (categoryId) {
        // Implement logic to confirm deletion (optional)
        // ...

        // Send delete request to backend (example using axios)
        axios.delete(`http://localhost:8080/api/admin/categories/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include authorization header if needed
          },
        })
          .then(() => {
            this.categories.splice(index, 1); // Remove category from local array on success
            console.log('Category deleted successfully!');
          })
          .catch(error => {
            console.error('Error deleting category:', error);
            // Handle errors appropriately (e.g., display an error message to the user)
          });
      } else {
        console.warn('Category ID not found for deletion.'); // Handle cases where ID is missing
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

.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>
