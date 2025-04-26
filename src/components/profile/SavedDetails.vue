<template>
  <section class="saved-parts">
    <h2>Збережені деталі</h2>
    <div v-if="savedParts.length > 0" class="parts-container">
      <div v-for="product in savedParts" :key="product?.id" class="product">
        <img
          :src="product.image_url"
          :alt="product.name"
          class="product-image"
        />
        <h3>{{ product.name }}</h3>
        <div class="product-info">
          <div class="info-item">
            <i class="fa fa-tags"></i>
            <span>{{ product.category }}</span>
          </div>
          <div class="info-item">
            <i class="fa fa-industry"></i>
            <span>{{ product.manufacturer }}</span>
          </div>
          <div class="info-item">
            <i class="fa fa-credit-card"></i>
            <span>{{ product.price }} грн</span>
          </div>
          <div class="info-item">
            <i class="fa fa-cogs"></i>
            <span>{{ product.stock_quantity }} шт</span>
          </div>
        </div>

        <router-link :to="'/part/' + product.id" class="product-link">
          Деталі
        </router-link>

        <button @click="confirmRemovePart(product.id)" class="remove-button">
          Видалити
        </button>
        <button @click="showAddToCartPopup(product)" class="add-to-cart-button">
          Додати в кошик
        </button>
      </div>
    </div>
    <p v-else>Немає збережених деталей.</p>
  </section>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      savedParts: [],
    };
  },
  mounted() {
    this.fetchSavedParts();
  },
  methods: {
    async fetchSavedParts() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Будь ласка, увійдіть у систему");
        return;
      }

      try {
        const response = await axios.get(
          "https://backend-lx6d.onrender.com/api/saved",
          {
            headers: { Authorization: token },
          }
        );
        this.savedParts = response.data;
        console.log(this.savedParts);
      } catch (error) {
        console.error("Помилка отримання збережених деталей:", error);
      }
    },

    confirmRemovePart(partId) {
      Swal.fire({
        title: "Ви впевнені?",
        text: "Цю деталь буде видалено!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Так, видалити",
        cancelButtonText: "Скасувати",
      }).then((result) => {
        if (result.isConfirmed) {
          this.removePart(partId);
        }
      });
    },

    async removePart(partId) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Будь ласка, увійдіть у систему");
        return;
      }

      try {
        await axios.delete(
          `https://backend-lx6d.onrender.com/api/saved-parts/${partId}`,
          {
            headers: { Authorization: token },
          }
        );
        this.savedParts = this.savedParts.filter((part) => part.id !== partId);
      } catch (error) {
        console.error("Помилка видалення деталі:", error);
      }
    },
    async showAddToCartPopup(product) {
      const { value: quantity } = await Swal.fire({
        title: `Скільки штук додати "${product.name}"?`,
        input: "number",
        inputLabel: "Кількість",
        inputAttributes: {
          min: 1,
          max: product.stock_quantity,
          step: 1,
        },
        inputValue: 1,
        showCancelButton: true,
        confirmButtonText: "Додати",
        cancelButtonText: "Скасувати",
      });

      if (quantity) {
        this.addToCart(product.id, parseInt(quantity));
      }
    },
    async addToCart(partId, quantity) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Будь ласка, увійдіть у систему");
        return;
      }

      try {
        await axios.post(
          "https://backend-lx6d.onrender.com/api/orders/cart",
          {
            part_id: partId,
            quantity: quantity,
          },
          {
            headers: { Authorization: token },
          }
        );

        Swal.fire("Успішно", "Деталь додано в кошик!", "success");
      } catch (error) {
        console.error("Помилка додавання в кошик:", error);
        Swal.fire("Помилка", "Не вдалося додати в кошик", "error");
      }
    },
  },
};
</script>

<style>
.add-to-cart-button {
  margin-left: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 14px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.add-to-cart-button:hover {
  background-color: #45a049;
}

.product {
  min-width: 350px;
}
.saved-parts {
  padding: 20px;
}

.parts-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.part-card {
  border: 1px solid #ddd;
  padding: 15px;
  width: 200px;
  text-align: center;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.part-image {
  width: 100%;
  border-radius: 5px;
}

.remove-button {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #cc0000;
}
</style>
