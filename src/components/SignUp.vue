<template>
    <form @submit.prevent="signUp">
      <div class="register-container" id="register">
        <div class="top">
          <h2>Регистрация</h2>
        </div>
        <div class="input-box">
          <input type="text" class="input-field" v-model="username" placeholder="Имя" required>
          <i class="bx bx-user"></i>
        </div>
        <div class="input-box">
          <input type="email" class="input-field" v-model="email" placeholder="Почта" required>
          <i class="bx bx-envelope"></i>
        </div>
        <div class="input-box">
          <input type="password" class="input-field" v-model="password" placeholder="Пароль" required>
          <i class="bx bx-lock-alt"></i>
        </div>
        <div class="form-group">
          <label for="role">Роль:</label>
          <select id="role" v-model="selectedRole" class="form-control">
            <option v-for="role in roles" :key="role" :value="role">
              {{ role }}
            </option>
          </select>
        </div>
        <div class="error-message" v-if="error">{{ error }}</div>
        <button type="submit">Зарегистрироваться</button>
      </div>
    </form>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        selectedRole: 'manager',
        roles: ['manager', 'admin', 'super_admin'],
        error: '',
      };
    },
    methods: {
      async signUp() {
        try {
          const response = await axios.post('http://localhost:8080/api/admin/auth/signup', {
            username: this.username,
            email: this.email,
            password: this.password,
            role: [this.selectedRole],
          });
  
          if (response.status === 200) {
            console.log('User registered successfully!');
            this.$router.push('/login');
          } else {
            console.error('Registration failed:', response.data);
            this.error = response.data.message || 'Registration failed';
          }
        } catch (error) {
          console.error('Error during registration:', error.response || error.message);
          this.error = (error.response && error.response.data.message) || 'An unexpected error occurred';
        } finally {
          this.username = '';
          this.email = '';
          this.password = '';
        }
      },
    },
  };
  </script>
  
  <style scoped src="../styles/styles.css"></style>
  
  
