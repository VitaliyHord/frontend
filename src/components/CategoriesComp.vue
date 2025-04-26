<template>
  <section>
    <h2>Категорії</h2>
    <div class="categories">
      <router-link
        v-for="category in categories"
        :key="category.id"
        :to="'/parts'"
        @click="selectCategory(category.id)"
        :class="['category', { active: selectedCategory === category.id }]"
      >
        <img
          :src="category.image_url"
          :alt="category.name"
          class="category-image"
        />
        <h3>{{ category.name }}</h3>
      </router-link>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
      selectedCategory: null,
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get(
          "https://backend-lx6d.onrender.com/api/categories"
        );
        this.categories = response.data;
      } catch (error) {
        console.error("Помилка завантаження категорій:", error);
      }
    },
    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
      this.$emit("category-selected", categoryId);

      this.$router.push({ path: "/parts", query: { category: categoryId } });
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 50px 20px;
  text-align: center;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}

.category {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: calc(33.333% - 20px);
  text-decoration: none;
  color: inherit;
}

.category-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.category:hover {
  transform: scale(1.05);
  transition: 0.3s;
}
</style>
