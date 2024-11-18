<template>
  <AppBar />
  <footer class="text-end app-footer">
    <p class="text-end text-muted">Made with ❤️ by <a class="text-decoration-none text-black" href="https://bombstart.tech/">Bombstart.tech</a></p>
  </footer>
</template>

<script>
import AppBar from "./layouts/default/AppBar.vue";

export default {
  name: "App",

  components: { AppBar },

  created() {},
};
</script>

<style>
.v-list-item--active {
}
</style>
