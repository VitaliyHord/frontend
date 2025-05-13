<template>
  <section class="cart">
    <h2 class="cart-title">🛒 Ваш кошик</h2>

    <div v-if="cart.length">
      <table class="cart-table">
        <thead>
          <tr>
            <th>Назва</th>
            <th>Кількість</th>
            <th>Ціна</th>
            <th>Сума</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td>{{ item.name }}</td>
            <td>
              <input
                type="number"
                v-model.number="item.quantity"
                min="1"
                @change="updateQuantity(item)"
                class="quantity-input"
              />
            </td>
            <td>{{ item.price }} грн</td>
            <td>{{ item.price * item.quantity }} грн</td>
            <td>
              <button class="remove-button" @click="removeItem(item.part_id)">
                ❌
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="address-section">
        <label for="address">Адреса доставки:</label>
        <input
          id="address"
          v-model="shippingAddress"
          type="text"
          placeholder="вул. Незалежності 10, Київ"
          class="address-input"
        />
      </div>

      <div class="total">
        <strong>Загальна сума:</strong> {{ totalPrice }} грн
      </div>

      <button class="checkout-button" @click="checkoutOrder">
        ✅ Оформити замовлення
      </button>
    </div>
    <div v-else class="empty-cart">
      <p>Ваш кошик порожній 💤</p>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      cart: [],
      shippingAddress: "",
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  mounted() {
    this.fetchCart();
  },
  methods: {
    async fetchCart() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://backend-lx6d.onrender.com/api/orders/cart",
          {
            headers: { Authorization: token },
          }
        );
        this.cart = response.data;
      } catch (error) {
        console.error("Не вдалося завантажити кошик:", error);
        Swal.fire(
          "Помилка",
          this.extractErrorMessage(error, "Не вдалося завантажити кошик"),
          "error"
        );
      }
    },

    async updateQuantity(item) {
      const token = localStorage.getItem("token");
      try {
        await axios.put(
          `https://backend-lx6d.onrender.com/api/orders/cart/${item.part_id}`,
          { quantity: item.quantity },
          { headers: { Authorization: token } }
        );
        Swal.fire("Оновлено", "Кількість оновлено", "success");
      } catch (error) {
        console.error("Помилка оновлення кількості:", error);
        Swal.fire(
          "Помилка",
          this.extractErrorMessage(error, "Не вдалося оновити кількість"),
          "error"
        );
      }
    },

    async removeItem(itemId) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(
          `https://backend-lx6d.onrender.com/api/orders/cart/${itemId}`,
          {
            headers: { Authorization: token },
          }
        );
        this.cart = this.cart.filter((item) => item.id !== itemId);
        Swal.fire("Видалено", "Товар видалено з кошика", "success");
      } catch (error) {
        console.error("Помилка видалення:", error);
        Swal.fire(
          "Помилка",
          this.extractErrorMessage(error, "Не вдалося видалити товар"),
          "error"
        );
      }
    },

    async checkoutOrder() {
      const token = localStorage.getItem("token");
      try {
        await axios.post(
          "https://backend-lx6d.onrender.com/api/orders/orders",
          { shipping_address: this.shippingAddress },
          { headers: { Authorization: token } }
        );
        this.cart = [];
        this.shippingAddress = "";
        Swal.fire("Успішно!", "Ваше замовлення оформлено!", "success");
      } catch (error) {
        console.error("Помилка оформлення замовлення:", error);
        Swal.fire(
          "Помилка",
          this.extractErrorMessage(error, "Не вдалося оформити замовлення"),
          "error"
        );
      }
    },

    extractErrorMessage(error, fallbackMessage) {
      // Якщо сервер повертає повідомлення — використай його
      return (
        error.response?.data?.message ||
        error.response?.data?.error ||
        fallbackMessage
      );
    },
  },
};
</script>

<style scoped>
.cart {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background-color: #fffefc;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.cart-title {
  font-size: 28px;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}
.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
.cart-table th,
.cart-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}
.cart-table th {
  background-color: #f8f8f8;
  font-weight: bold;
}
.quantity-input {
  width: 60px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  text-align: center;
}
.remove-button {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
.address-section {
  margin: 20px 0;
}
.address-input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-top: 6px;
}
.total {
  text-align: right;
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0;
}
.checkout-button {
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  background-color: #f39353;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.checkout-button:hover {
  background-color: #d7793f;
}
.empty-cart {
  text-align: center;
  font-size: 18px;
  color: #777;
}
</style>
