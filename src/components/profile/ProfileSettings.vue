<template>
  <div class="profile-page">
    <div class="form-container">
      <h2>Профіль користувача</h2>
      <form @submit.prevent="updateProfile">
        <label>Ім'я:</label>
        <input v-model="user.firstname" type="text" />
        <label>Прізвище:</label>
        <input v-model="user.lastname" type="text" />
        <label>Email:</label>
        <input v-model="user.email" type="email" />
        <label>Телефон:</label>
        <input v-model="user.phone" type="text" />
        <button type="submit">Оновити</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
      },
      message: "",
    };
  },
  mounted() {
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/profile", {
          headers: { Authorization: token },
        });
        this.user = { ...response.data };
      } catch (error) {
        console.error("Помилка отримання профілю:", error);
      }
    },
    async updateProfile() {
      try {
        const token = localStorage.getItem("token");
        await axios.put("/api/profile", this.user, {
          headers: { Authorization: token },
        });
        this.message = "Профіль успішно оновлено";
      } catch (error) {
        console.error("Помилка оновлення профілю:", error);
        this.message = "Помилка оновлення профілю";
      }
    },
  },
};
</script>

<style scoped>
.profile-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  width: 400px;
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
  color: white;
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
</style>
