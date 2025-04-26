<template>
  <div class="dashboard promo-section">
    <div class="promo-container">
      <div :class="['sidebar promo-left', { open: isMenuOpen }]">
        <button
          @click="selectTab('profile')"
          :class="{ active: activeTab === 'profile' }"
          class="promo-link promo-link_one"
        >
          Налаштування профілю
        </button>
        <button
          @click="selectTab('savedDetails')"
          :class="{ active: activeTab === 'savedDetails' }"
          class="promo-link promo-link_two"
        >
          Збережені деталі
        </button>
        <button
          @click="selectTab('cart')"
          :class="{ active: activeTab === 'cart' }"
          class="promo-link promo-link_three"
        >
          Кошик
        </button>
      </div>

      <div class="content promo-right" @click="closeMenuIfOpen">
        <ProfileSettings v-if="activeTab === 'profile'" />
        <SavedDetails v-if="activeTab === 'savedDetails'" />
        <Cart v-if="activeTab === 'cart'" />
      </div>
    </div>
  </div>
</template>

<script>
import ProfileSettings from "./ProfileSettings.vue";
import SavedDetails from "./SavedDetails.vue";
import Cart from "./CartComp.vue";

export default {
  components: {
    ProfileSettings,
    SavedDetails,
    Cart,
  },
  data() {
    return {
      activeTab: "profile",
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenuIfOpen() {
      if (this.isMenuOpen) {
        this.isMenuOpen = false;
      }
    },
    selectTab(tab) {
      this.activeTab = tab;
      this.isMenuOpen = false;
    },
  },
};
</script>

<style scoped>
.promo-section {
  text-align: center;
  padding: 20px;
}

.promo-container {
  width: 1100px;
  margin: 0 auto;
  display: flex;
}

.sidebar {
  width: 250px;
  background: #fff;
  padding: 20px 20px 20px 0;
  border-right: 1px solid #ddd;
  transition: transform 0.3s ease-in-out;
}

.sidebar.open {
  transform: translateX(0);
}

.promo-link {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: none;
  background: #fe8504;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.promo-link:hover,
.promo-link.active {
  background: #6d4211;
}

.logout-link {
  display: block;
  margin-top: 20px;
  color: red;
  text-decoration: none;
}

.promo-right {
  margin: 0 auto;
  height: 70vh;
  display: flex;
  overflow-y: auto;
}
</style>
