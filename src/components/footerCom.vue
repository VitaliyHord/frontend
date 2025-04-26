<template>
  <footer class="foot">
    <div class="foot-container">
      <div class="foot-section foot-about">
        <h3>Про нас</h3>
        <p>
          Agrospetsservise — ваш надійний партнер у світі автозапчастин.
          Пропонуємо широкий асортимент деталей для різних марок автомобілів.
        </p>
      </div>
      <div class="foot-section foot-links">
        <h3>Корисні посилання</h3>
        <ul>
          <li><a href="#/">Головна</a></li>
          <li><a href="#/categories">Категорії</a></li>
          <li><a href="#/parts">Товари</a></li>
        </ul>
      </div>
      <div class="foot-section foot-contact">
        <h3>Контакти</h3>
        <p><i class="fas fa-phone"></i> +38 (067) 123-4567</p>
        <p><i class="fas fa-envelope"></i> support@agroparts.com</p>
        <p>
          <i class="fas fa-map-marker-alt"></i> Чернігівська область, Прилуцький
          район, м. Ічня
        </p>
      </div>
      <div class="foot-section foot-social">
        <h3>Ми в соцмережах</h3>
        <a href="https://facebook.com" target="_blank"
          ><i class="fab fa-facebook-f"></i
        ></a>
        <a href="https://instagram.com" target="_blank"
          ><i class="fab fa-instagram"></i
        ></a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>&copy; 2024, Agrospetsservise. Всі права захищено.</span>
    </div>
  </footer>
</template>
<script>
export default {};
</script>

<style scoped>
.foot {
  background-color: #333;
  color: #fff;
  padding: 40px 20px;
  font-family: "Roboto", sans-serif;
}

.foot-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1100px;
  margin: 0 auto;
}

.foot-section {
  flex: 1;
  min-width: 220px;
}

.foot-section i {
  color: #fe8504;
}

.foot-section h3 {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.foot-section p,
.foot-section ul {
  font-size: 0.9em;
  margin: 0;
  line-height: 1.6;
}

.foot-section ul {
  list-style: none;
  padding: 0;
}

.foot-section ul li {
  margin-bottom: 10px;
}

.foot-section ul li a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
}

.foot-section ul li a:hover {
  color: #fff;
}

.foot-section i {
  margin-right: 10px;
}

.foot-social a {
  color: #ccc;
  font-size: 1.5em;
  margin-right: 10px;
  text-decoration: none;
  transition: color 0.3s;
}

.foot-social a:hover {
  color: #fff;
}

.foot-bottom {
  text-align: center;
  margin-top: 20px;
  border-top: 1px solid #444;
  padding-top: 10px;
  font-size: 0.8em;
  color: #ccc;
}

@media screen and (max-width: 768px) {
  .foot-container {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .foot-section {
    min-width: 100%;
    text-align: center;
  }

  .foot-social {
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  .foot-bottom {
    margin-top: 40px;
  }

  .foot-section h3 {
    font-size: 1.1em;
  }

  .foot-section p,
  .foot-section ul {
    font-size: 0.9em;
  }

  .foot-section ul li a {
    font-size: 1em;
  }

  .foot-social a {
    font-size: 1.3em;
  }
}

@media screen and (max-width: 480px) {
  .foot-container {
    padding: 0 10px;
  }

  .foot-section h3 {
    font-size: 1em;
  }

  .foot-section p,
  .foot-section ul {
    font-size: 0.8em;
  }

  .foot-social a {
    font-size: 1.2em;
  }

  .foot-bottom {
    font-size: 0.7em;
  }
}

@media screen and (max-width: 320px) {
  .foot-container {
    padding: 0 5px;
  }

  .foot-section h3 {
    font-size: 0.9em;
  }

  .foot-section p,
  .foot-section ul {
    font-size: 0.75em;
  }

  .foot-social a {
    font-size: 1.1em;
  }

  .foot-bottom {
    font-size: 0.6em;
  }

  .foot-section ul li a {
    font-size: 0.9em;
  }
}
</style>
