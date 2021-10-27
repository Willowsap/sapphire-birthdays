<template>
  <the-header />
  <router-view v-if="!loading" />
  <h1 v-else>loading...</h1>
  <the-footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import { mapState } from "vuex";

export default defineComponent({
  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    loadProfiles() {
      this.loading = true;
      this.$store.dispatch("loadProfiles").then(() => {
        this.loading = false;
      });
    },
  },
  created() {
    this.loadProfiles();
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
