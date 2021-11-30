<template>
  <profile-page profileId="baby" />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ProfilePage from "@/views/ProfilePage.vue";

export default defineComponent({
  name: "BabyPage",
  components: {
    ProfilePage,
  },
  created(): void {
    this.$store.commit("addProfile", {
      id: "baby",
      fname: "Baby",
      mname: "Babby",
      lname: "McBaby",
      about: "It's a baby",
      birthday: new Date().toDateString(),
    });
  },
});
</script>
