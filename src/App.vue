<template>
  <the-header />
  <router-view />
  <the-footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";

export default defineComponent({
  components: {
    TheHeader,
    TheFooter,
  },
});
</script>

<style>
body {
  background-color: #968298;
  height: 100%;
}
#app {
  font-family: "Zen Kurenaido", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
