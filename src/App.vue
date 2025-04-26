<template>
  <headerCom />
  <div class="margin">
    <router-view></router-view>
  </div>
  <footerCom />
</template>

<script>
import headerCom from "./components/headerCom.vue";
import footerCom from "./components/footerCom.vue";

export default {
  name: "App",
  components: {
    headerCom,
    footerCom,
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$store.dispatch("login", { token });
    }
  },
};
</script>

<style>
html {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  margin: 70px 0 -170px;
  padding: 0;
}
html {
  scroll-behavior: smooth;
}
</style>
