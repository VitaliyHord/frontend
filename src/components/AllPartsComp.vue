<template>
  <section class="products-page">
    <aside class="filters">
      <h3>Фільтри</h3>
      <div>
        <label v-for="category in categories" :key="category.id">
          <input
            type="checkbox"
            :value="category.id"
            v-model="selectedCategories"
          />
          {{ category.name }}
        </label>
      </div>

      <div>
        <label for="price-min">Ціна (від): </label>
        <input
          id="price-min"
          v-model="priceMin"
          type="number"
          placeholder="Мінімальна ціна"
        />
      </div>
      <div>
        <label for="price-max">Ціна (до): </label>
        <input
          id="price-max"
          v-model="priceMax"
          type="number"
          placeholder="Максимальна ціна"
        />
      </div>

      <div>
        <label for="manufacturer">Виробник: </label>
        <select v-model="manufacturer">
          <option
            v-for="manufacturer in manufacturers"
            :key="manufacturer.id"
            :value="manufacturer.name"
          >
            {{ manufacturer.name }}
          </option>
        </select>
      </div>

      <div>
        <label for="stock-min">Кількість на складі (від): </label>
        <input
          id="stock-min"
          v-model="stockMin"
          type="number"
          placeholder="Мінімальна кількість"
        />
      </div>

      <button @click="applyFilter">Застосувати фільтри</button>
      <button @click="resetFilters">Скасувати фільтри</button>
    </aside>

    <div class="products">
      <h2>Товари</h2>
      <div class="product-list">
        <div v-for="product in products" :key="product.id" class="product">
          <router-link :to="'/part/' + product.id" class="product-link">
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
            <p class="description">{{ product.description }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      products: [],
      categories: [],
      manufacturers: [],
      selectedCategories: [],
      priceMin: null,
      priceMax: null,
      manufacturer: "",
      stockMin: null,
    };
  },
  mounted() {
    this.fetchCategories();
    this.fetchManufacturers();
    if (this.$route.query.category) {
      this.selectedCategories = [this.$route.query.category];
    }
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      const categoryIds = this.selectedCategories.join(",");
      const queryParams = new URLSearchParams();

      if (categoryIds) queryParams.append("categories", categoryIds);
      if (this.priceMin) queryParams.append("priceMin", this.priceMin);
      if (this.priceMax) queryParams.append("priceMax", this.priceMax);
      if (this.manufacturer)
        queryParams.append("manufacturer", this.manufacturer);
      if (this.stockMin) queryParams.append("stockMin", this.stockMin);

      try {
        const response = await axios.get(
          `https://backend-lx6d.onrender.com/api/parts?${queryParams.toString()}`
        );
        this.products = response.data;
      } catch (error) {
        console.error("Помилка завантаження товарів:", error);
        Swal.fire({
          icon: "error",
          title: "Помилка",
          text: "Не вдалося завантажити товари. Спробуйте ще раз пізніше.",
        });
      }
    },

    async fetchCategories() {
      try {
        const response = await axios.get(
          "https://backend-lx6d.onrender.com/api/categories"
        );
        this.categories = response.data;
      } catch (error) {
        console.error("Помилка завантаження категорій:", error);
        Swal.fire({
          icon: "error",
          title: "Помилка",
          text: "Не вдалося завантажити категорії. Спробуйте ще раз пізніше.",
        });
      }
    },

    async fetchManufacturers() {
      try {
        const response = await axios.get(
          "https://backend-lx6d.onrender.com/api/manufacturers"
        );
        this.manufacturers = response.data;
      } catch (error) {
        console.error("Помилка завантаження виробників:", error);
        Swal.fire({
          icon: "error",
          title: "Помилка",
          text: "Не вдалося завантажити виробників. Спробуйте ще раз пізніше.",
        });
      }
    },

    applyFilter() {
      this.fetchProducts();
    },

    resetFilters() {
      this.selectedCategories = [];
      this.priceMin = null;
      this.priceMax = null;
      this.manufacturer = "";
      this.stockMin = null;

      this.$router.push({ path: "/parts" }).then(() => {
        setTimeout(() => {
          this.fetchProducts();
        }, 100);
      });
    },
  },
};
</script>

<style>
.filters {
  width: 250px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  position: sticky;
  top: 20px;
  height: 87vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
}

.filters h3 {
  margin-bottom: 10px;
  font-size: 1.2em;
  color: #333;
}

.filters div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filters label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #555;
}

.filters input[type="checkbox"] {
  width: 16px;
  height: 16px;
}

.filters input[type="number"],
.filters select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.filters button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
}

.filters button:first-of-type {
  background: #28a745;
  color: white;
}

.filters button:first-of-type:hover {
  background: #218838;
}

.filters button:last-of-type {
  background: #dc3545;
  color: white;
}

.filters button:last-of-type:hover {
  background: #c82333;
}

* {
  box-sizing: border-box;
}

.products-page {
  display: flex;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

.products {
  max-width: 800px;
  flex-grow: 1;
  margin-left: 20px;
  overflow-y: auto;
  height: calc(87vh);
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 6px;
}

.product {
  background: white;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  width: calc(50% - 20px);
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-link {
  text-decoration: none;
  color: inherit;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.product-info {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  flex: 1 1 48%;
}

.info-item i {
  color: #fe8504;
}

.product:hover {
  transform: scale(1.02);
  box-shadow: 2px 5px 7px rgba(0, 0, 0, 0.4);
}

h3 {
  font-size: 1.2em;
  margin: 10px 0;
  color: #333;
}

.description {
  font-size: 0.9em;
  color: #666;
}
</style>
