<template>
  <section class="part-details">
    <div v-if="part" class="part-info">
      <h2>{{ part.name }}</h2>
      <div class="part-image">
        <img :src="part.image_url" :alt="part.name" />
      </div>
      <div class="display-container">
        <div class="part-details-info">
          <p>
            <i class="fa fa-tags" style="color: #f39353"></i>
            <strong>Category:</strong> {{ part.category }}
          </p>
          <p>
            <i class="fa fa-industry" style="color: #f39353"></i>
            <strong>Manufacturer:</strong> {{ part.manufacturer }}
          </p>
          <p>
            <i class="fa fa-credit-card" style="color: #f39353"></i>
            <strong>Price:</strong> {{ part.price }} грн
          </p>
          <p>
            <i class="fa fa-align-left" style="color: #f39353"></i>
            <strong>Description:</strong> {{ part.description }}
          </p>
        </div>
        <div class="part-attributes">
          <ul>
            <li v-for="(attribute, index) in part.attributes" :key="index">
              <i class="fa fa-check-circle" style="color: #f39353"></i>
              <strong>{{ attribute.name }}:</strong> {{ attribute.value }}
              {{ attribute.unit }}
            </li>
          </ul>
        </div>
      </div>
      <div v-if="isAuthorized">
        <button @click="savePart" class="save-button">Зберегти деталь</button>
        <button @click="showAddToCartPopup(part)" class="add-to-cart-buttons">
          Додати в кошик
        </button>
      </div>

      <p v-else>Для збереження деталей необхідно авторизуватись.</p>
    </div>
    <div v-else>
      <p>Loading part details...</p>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      part: null,
      isAuthorized: false,
    };
  },
  mounted() {
    this.fetchPartDetails();
    this.checkAuthorization();
  },
  methods: {
    async fetchPartDetails() {
      const partId = this.$route.params.id;
      try {
        const response = await axios.get(
          `https://backend-lx6d.onrender.com/api/part-details/${partId}`
        );
        this.part = response.data;
      } catch (error) {
        console.error("Error fetching part details:", error);
      }
    },

    checkAuthorization() {
      const token = localStorage.getItem("token");
      if (token) {
        this.isAuthorized = true;
      }
    },

    async savePart() {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Будь ласка, увійдіть у систему",
          showConfirmButton: true,
        });
        return;
      }

      try {
        const response = await axios.post(
          "https://backend-lx6d.onrender.com/api/saved",
          { part_id: this.part.id },
          { headers: { Authorization: token } }
        );

        if (response.data.message === "Ця деталь вже була додана") {
          Swal.fire({
            icon: "info",
            title: "Ця деталь вже була додана",
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Деталь успішно збережена!",
            showConfirmButton: true,
          });
        }
      } catch (error) {
        console.error("Помилка збереження деталі:", error);
        Swal.fire({
          icon: "error",
          title: "Не вдалося зберегти деталь",
          showConfirmButton: true,
        });
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
.add-to-cart-buttons {
  margin-left: 10px;
  background-color: #4caf50;
  margin-top: 10px;
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.add-to-cart-buttons:hover {
  background-color: #45a049;
}

.save-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #fe8504;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.save-button:hover {
  background-color: #ffb560;
}

.display-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.display-container div {
  width: 400px;
  line-height: 1.5;
}
.part-details {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Arial", sans-serif;
}

.part-info {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.part-info h2,
.part-info .part-image {
  text-align: center;
}

.part-image img {
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.part-image img:hover {
  transform: scale(1.05);
}

.part-details-info p {
  font-size: 1.1em;
  margin: 10px 0;
  color: #333;
}

.part-details-info i {
  margin-right: 8px;
}

.part-attributes ul {
  list-style-type: none;
  padding: 0;
}

.part-attributes li {
  margin: 8px 0;
  font-size: 1em;
  color: #555;
}

h2 {
  font-size: 2.2em;
  color: #333;
  font-weight: 600;
  margin-bottom: 20px;
}

h3 {
  font-size: 1.6em;
  margin-top: 20px;
  color: #333;
  font-weight: 600;
}

h3 i {
  margin-right: 10px;
}

i {
  color: #fe8504;
  margin-right: 10px;
}

.part-info {
  text-align: left;
}

.part-info h2 {
  font-size: 2.4em;
  color: #333;
}

.part-details-info p {
  font-size: 1.2em;
  margin: 10px 0;
}
</style>
