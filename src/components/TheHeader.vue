<template>
  <div id="nav">
    <router-link to="/">Profile List</router-link> |
    <router-link to="/create">New Profile</router-link>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheHeader",
});
</script>

<style scoped>

</style>