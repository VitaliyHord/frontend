<template>
  <div class="register-page">
    <div class="form-container">
      <h2>Реєстрація</h2>
      <form @submit.prevent="registerUser">
        <label>Логін:</label>
        <input v-model="form.username" required />

        <label>Пароль:</label>
        <input type="password" v-model="form.password" required />

        <label>Електронна пошта:</label>
        <input type="email" v-model="form.email" required />

        <label>Ім'я:</label>
        <input v-model="form.firstname" required />

        <label>Прізвище:</label>
        <input v-model="form.lastname" required />

        <label>Номер телефону:</label>
        <input v-model="form.phone" required />

        <button type="submit">Зареєструватися</button>
      </form>
      <p>Є акаунт? <router-link to="/login">Увійти</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      form: {
        username: "user",
        password: "1111",
        email: "user@example.com",
        firstname: "Ім'я",
        lastname: "Прізвище",
        phone: "+380000000000",
      },
      message: "",
    };
  },

  methods: {
    async registerUser() {
      try {
        const response = await axios.post(
          "https://backend-lx6d.onrender.com/api/auth/register",
          this.form
        );

        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Успішно!",
            text: "Ви успішно зареєстровані. Перейдіть на сторінку входу.",
          }).then(() => {
            this.$router.push("/login");
          });
        }
      } catch (error) {
        console.error("Error:", error);

        let errorMessage = "Щось пішло не так. Спробуйте ще раз.";

        if (error.response) {
          if (error.response.status === 409) {
            errorMessage = error.response.data.message;
          } else if (error.response.status === 400) {
            errorMessage = "Всі обов'язкові поля повинні бути заповнені.";
          }
        } else {
          errorMessage = "Сервер не відповідає.";
        }

        Swal.fire({
          icon: "error",
          title: "Помилка реєстрації",
          text: errorMessage,
        });
      }
    },
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  background: #f4f4f4;
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

label {
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
  text-align: left;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 15px;
}

input:focus {
  border-color: #fe8504;
  outline: none;
}

button {
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

button:hover {
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
