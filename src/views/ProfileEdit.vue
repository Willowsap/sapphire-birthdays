<template>
  <profile-form :profileId="profileId" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProfileForm from "@/components/profile/ProfileForm.vue";

export default defineComponent({
  name: "ProfileEdit",
  components: {
    ProfileForm,
  },
  props: {
    profileId: String,
  },
});
</script>

<style scoped></style>
