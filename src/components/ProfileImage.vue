<template>
  <div class="profileImage">
    <img :src="image" :alt="alt" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    image: String,
    alt: String,
  },
});
</script>

<style scoped>
.profileImage {
  height: 15rem;
  margin: 1rem 0;
}

.profileImage img {
  border-radius: 50%;
  height: 100%;
}
</style>
