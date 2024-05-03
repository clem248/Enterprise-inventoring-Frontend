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
                // Сохраняем токен и другие данные в localStorage
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('username', data.username);
                localStorage.setItem('roles', data.roles);

                // Перенаправляем на страницу Dashboard
                this.$router.push('/dashboard');
                } else {
                // Если сервер вернул ошибку, показываем соответствующее сообщение
                this.errorMessage = 'Ошибка при авторизации';
                }
            } catch (error) {
                // Если произошла ошибка при запросе, показываем сообщение об ошибке
                this.errorMessage = 'Ошибка при отправке запроса';
            }
            }
    }
  };
</script>
  

  
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


  <style scoped>
  .auth {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    margin-top: 200px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  /*Здесь используется "расскадровка каждого элемента, пока так, нужно выделить всё это в глобальные компоненты, чтобы просто потом переисполдьзовать всё
  чтобы не писать снова и снова" */ 
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="email"],
  input[type="password"] {
    width: 97%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>
  