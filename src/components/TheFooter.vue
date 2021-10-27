<template>
  <nav class="footer">
    <h4>By Willow Sapphire</h4>
    <router-link to="/baby" class="baby">Baby</router-link>
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
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  bottom: 0;
  position: absolute;
}
.baby {
  text-decoration: none;
  color: white;
  margin-right: 20px;
}
</style>
