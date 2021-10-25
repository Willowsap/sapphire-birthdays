<template>
  <ul>
    <profile-stub
      v-for="profile in profiles"
      :key="profile.id"
      :profile="profile"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProfileStub from "../components/ProfileStub.vue";

export default defineComponent({
  name: "ProfileList",
  components: {
    ProfileStub,
  },
  data() {
    return {
      profiles: this.$store.state.profiles,
    };
  },
});
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style: none;
  width: 100%;
  margin: 0px;
  padding: 0px;
}
</style>
