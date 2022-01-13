<template>
  <router-link
    :to="`/profile/${profileId}`"
    class="userLink"
    v-if="typeof profileId !== 'function'"
  >
    <h2 class="title">{{ name }}</h2>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfileStub",
  props: ["profileId", "name"],
});
</script>

<style scoped>
.userLink {
  width: 100%;
  padding: 5px;
  border-color: #806f81;
  border-width: 0.5px;
  text-decoration: none;
}
.userLink:hover {
  cursor: pointer;
  background-color: #806f81;
}
.title {
  color: white;
}
</style>
