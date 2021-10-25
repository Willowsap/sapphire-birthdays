<template>
  <div class="profileImage">
    <img :src="image" />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent ({
  props: {
    image: String,
  },
})
</script>

<style scoped>

</style>