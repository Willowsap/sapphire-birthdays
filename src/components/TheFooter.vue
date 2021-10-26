<template>
  <nav class="footer">
    <h4>By Willow Sapphire</h4>
  </nav>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheFooter",
});
</script>

<style scoped>
.footer {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  bottom: 0;
  position: absolute;
}
</style>
