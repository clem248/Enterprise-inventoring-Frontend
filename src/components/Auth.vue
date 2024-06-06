<template>
  <div class="auth">
    <h2>Авторизация</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Войти</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/api/admin/auth/signin', {
          email: this.email,
          password: this.password
        });

        if (response.status === 200) {
          const data = response.data;
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('username', data.username);
          localStorage.setItem('roles', data.roles);
          this.$router.push('/home');
        } else {
          this.errorMessage = 'Ошибка при авторизации';
        }
      } catch (error) {
        this.errorMessage = 'Ошибка при отправке запроса';
      }
    }
  }
};
</script>

<style scoped src="../styles/styles.css"></style>
