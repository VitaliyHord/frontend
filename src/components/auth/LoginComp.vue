<template>
  <div class="back-container">
    <section class="form-container">
      <h2>Вхід до акаунту</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Логін</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="btn">Вхід</button>
      </form>
      <p>
        Немає акаунту? <router-link to="/register">Зареєструватися</router-link>
      </p>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { mapActions } from "vuex";

export default {
  data() {
    return { username: "", password: "" };
  },
  methods: {
    ...mapActions(["login"]),

    async handleLogin() {
      try {
        const response = await axios.post(
          "https://backend-lx6d.onrender.com/api/auth/login",
          {
            username: this.username,
            password: this.password,
          }
        );

        this.login({ token: response.data.token });

        Swal.fire({
          icon: "success",
          title: "Успішно!",
          text: "Ви успішно увійшли в акаунт.",
        });

        this.$router.push("/user_dashboard");
      } catch (error) {
        console.error("Помилка входу:", error);
        Swal.fire({
          icon: "error",
          title: "Помилка входу",
          text: error.response
            ? error.response.data.message
            : "Сервер не відповідає.",
        });
      }
    },
  },
};
</script>
<style scoped>
.back-container {
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-container {
  width: 400px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: #fe8504;
  outline: none;
}

.btn {
  width: 100%;
  padding: 12px;
  background-color: #fe8504;
  color: #000;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #ffb560;
}

p {
  margin-top: 20px;
  font-size: 14px;
}

p a {
  color: #fe8504;
  text-decoration: none;
}

p a:hover {
  text-decoration: underline;
}
</style>
