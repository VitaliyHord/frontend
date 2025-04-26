<template>
  <header>
    <nav>
      <div class="logo">
        <a href="#/" class="header-text">
          Agro Parts
          <span class="car"><i class="fa-solid fa-tractor"></i></span>
        </a>
      </div>
      <div class="burger-icon" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </div>
      <div :class="['nav-links', { 'is-active': isMenuOpen }]">
        <ul>
          <li :class="{ active: isActive('/') }">
            <a href="#/">Головна</a>
          </li>
          <li :class="{ active: isActive('/categories') }">
            <a href="#/categories">Категорії</a>
          </li>
          <li :class="{ active: isActive('/products') }">
            <a href="#/parts">Товари</a>
          </li>
        </ul>
      </div>
      <div :class="['auth-links', { 'is-active': isMenuOpen }]">
        <div v-if="isLoggedIn">
          <a href="#/user_dashboard">
            <i class="fas fa-user-circle"></i> Кабінет
          </a>
          <a href="#/" @click="logout">
            <i class="fas fa-sign-out-alt"></i> Вихід
          </a>
        </div>
        <div v-else>
          <a href="#/login">Логін</a>
          <a href="#/register">Реєстрація</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  computed: {
    ...mapState(["isLoggedIn"]),
  },
  methods: {
    isActive(link) {
      return this.$route.path === link;
    },
    ...mapActions(["logout"]),
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
  watch: {
    $route() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style>
header {
  position: fixed;
  background-color: white;
  top: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 3px solid #424551;
  height: 70px;
}
.header-text {
  font-weight: 700;
  font-size: 28px;
  color: #424551;
  text-decoration: none;
}
.header-text .fa-car {
  color: #fe8504;
  margin-left: 10px;
}
.fas {
  color: black;
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px auto 0;
  max-width: 1100px;
  font-size: 16px;
}
.nav-links ul li.active a,
.nav-links ul li a:hover {
  border-bottom: 2px solid #424551;
  padding-bottom: 8px;
}
.nav-links,
.auth-links {
  display: flex;
  align-items: center;
}
.nav-links ul {
  display: flex;
  list-style-type: none;
  gap: 1.5em;
}
.nav-links ul li a {
  text-decoration: none;
  font-weight: 700;
  color: #424551;
}
.auth-links a {
  color: white;
  text-decoration: none;
  font-weight: 700;
}
.auth-links a {
  background-color: #fe8504;
  padding: 8px 15px;
  border-radius: 5px;
  color: white;
  transition: 0.5s ease;
}
.auth-links a:hover {
  background-color: white;
  color: #fe8504;
}
.auth-links a i {
  color: white;
}
.auth-links div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}

.burger-icon {
  display: none;
  font-size: 28px;
  cursor: pointer;
  color: #424551;
}
</style>
