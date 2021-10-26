<template>
  <h1>It's your birthday!</h1>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { Profile } from "@/models/profile.model";

export default defineComponent({
  name: "BirthdayFun",
  props: ["profileId"],
  data() {
    return {
      profile: this.$store.state.profiles.find(
        (e: Profile) => e.id === this.profileId
      ),
    };
  },
});
</script>

<style></style>
