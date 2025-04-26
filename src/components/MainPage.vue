<template>
  <section class="hero">
    <div class="content">
      <h1>Ласкаво просимо до Agrospetsservise!</h1>
      <p>
        Шукаєте якісні автозапчастини? У нас ви знайдете все необхідне для
        вашого автомобіля за доступними цінами та з гарантією надійності.
      </p>
      <a href="#/categories" class="btn">Переглянути категорії</a>
    </div>
    <div class="image"></div>
  </section>

  <section class="why-best">
    <h2>Чому саме ми?</h2>
    <div class="reasons">
      <div class="reason">
        <i class="fa-solid fa-star"></i>
        <p>Гарантована якість кожної деталі</p>
      </div>
      <div class="reason">
        <i class="fa-solid fa-tags"></i>
        <p>Конкурентні та прозорі ціни</p>
      </div>
      <div class="reason">
        <i class="fa-solid fa-headset"></i>
        <p>Підтримка клієнтів 24/7 — ми завжди на зв'язку</p>
      </div>
    </div>
  </section>

  <section class="why-us">
    <h2>Чому обирають Agrospetsservise?</h2>
    <div class="content">
      <div class="text">
        <p>
          Ми пропонуємо широкий вибір автозапчастин від провідних виробників,
          забезпечуємо швидку доставку по Україні та надаємо кваліфіковану
          допомогу при виборі товарів.
        </p>
      </div>
      <div class="image"></div>
    </div>
  </section>

  <section class="best-products">
    <h2>Наші топові товари</h2>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-home">
        <router-link :to="'/part/' + product.id" class="product-link">
          <img
            :src="product.image_url"
            :alt="product.name"
            class="product-image-home"
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
  </section>

  <section class="about">
    <h2>Про нас</h2>
    <p>
      Agrospetsservise — ваш надійний партнер у світі автозапчастин. Ми працюємо
      для того, щоб кожен водій міг легко знайти саме те, що потрібно його авто.
    </p>
    <p class="address">Чернігівська область, Прилуцький район, м. Ічня</p>
  </section>

  <div class="map">
    <h2>Ми на карті</h2>
    <div class="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.655969224804!2d32.3906887769911!3d50.86284235915765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46d8b4f6eb5d8c8b%3A0x28e0cb93c8eeb13f!2z0JjQstCw0L3QvtC80LjRgtC10YIg0L7QsdC70LDRgdGC0YwsINCa0LDQt9Cw0LvRjNC90YvQuSDQm9Cw0LPQsNCz0L7QstC40YfQvdC40Lkg0LrRg9C70YzQtdC90LjRhtCw!5e0!3m2!1suk!2sua!4v1713356206545!5m2!1suk!2sua"
        width="100%"
        height="400"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>

  <section class="call-to-action">
    <h2>Не проґавте вигідні пропозиції та знижки!</h2>
    <a href="#/register" class="btn">Зареєструватися</a>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(
          "https://backend-lx6d.onrender.com/api/parts"
        );
        this.products = response.data;
        const allowedIds = [2, 3, 16];
        this.products = response.data.filter((product) =>
          allowedIds.includes(product.id)
        );
      } catch (error) {
        console.error("Помилка завантаження товарів:", error);
      }
    },
  },
};
</script>

<style>
.map-container {
  width: 100%;
  max-width: 100%;
  height: 400px;
  margin-top: 1rem;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.map h2 {
  margin-bottom: 1rem;
  text-align: center;
}

.product-list {
  display: flex;
  justify-content: center;
}
.product-home {
  background: white;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  width: calc(33.3% - 20px);
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.product-image-home {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}
* {
  box-sizing: border-box;
}

section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 50px 0;
  text-align: center;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero .content {
  max-width: 500px;
}

.hero .image {
  width: 50%;
  height: 400px;
  background: url("../assets/hero.jpg") no-repeat center/cover;
  border-top-left-radius: 20px;
}

.why-best .reasons {
  display: flex;
  justify-content: space-around;
  margin: 60px 0 40;
}

.reason {
  text-align: center;
}

.reason i {
  color: #fe8504;
  font-size: 60px;
}

.why-us,
.about {
  background: #fe8504;
}

.why-us .content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.why-us .image {
  width: 950px;
  height: 220px;
  background: url("../assets/agriculture-part.png") no-repeat center/contain;
  border-top-left-radius: 20px;
  margin-left: 40px;
}

.why-us h2,
.why-us p,
.about h2,
.about p {
  color: white;
}

.btn {
  display: inline-block;
  background: #fe8504;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  color: white;
  font-weight: bold;
}
</style>
