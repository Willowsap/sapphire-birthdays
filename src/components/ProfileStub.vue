<template>
  <router-link :to="`/profile/${profile.id}`" class="userLink">
    <h2 class="title">{{ fullName }}</h2>
  </router-link>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfileStub",
  props: ["profile"],
  computed: {
    fullName() {
      return `${this.profile.fname} ${this.profile.lname}`;
    },
    reallyFullName() {
      return `${this.profile.fname} ${this.profile.mname} ${this.profile.lname}`;
    },
  },
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
