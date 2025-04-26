import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem("token") || null, // Перевіряємо, чи є токен у локальному сховищі
    isLoggedIn: !!localStorage.getItem("token"),
  },
  mutations: {
    setAuth(state, { token }) {
      state.token = token;
      state.isLoggedIn = true;
      localStorage.setItem("token", token); // Зберігаємо токен у localStorage
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token"); // Видаляємо токен з localStorage
    },
  },
  actions: {
    login({ commit }, { token }) {
      commit("setAuth", { token });
    },
    logout({ commit }) {
      commit("logout");
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    getToken: (state) => state.token,
  },
});
