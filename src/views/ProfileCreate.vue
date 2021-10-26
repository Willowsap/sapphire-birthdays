<template>
  <profile-form />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProfileForm from "@/components/profile/ProfileForm.vue";

export default defineComponent({
  name: "ProfileCreate",
  components: {
    ProfileForm,
  },
});
</script>

<style scoped></style>
