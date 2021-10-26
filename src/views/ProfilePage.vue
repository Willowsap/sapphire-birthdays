<template>
  <normal-profile v-if="!isBirthday" :profileId="profileId" />
  <birthday-profile v-if="isBirthday" :profileId="profileId" />
  <router-link :to="`/edit/${profileId}`">Edit</router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BirthdayProfile from "@/components/birthday/BirthdayProfile.vue";
import NormalProfile from "@/components/profile/NormalProfile.vue";

export default defineComponent({
  name: "ProfilePage",
  components: {
    NormalProfile,
    BirthdayProfile,
  },
  props: {
    profileId: String,
  },
  data() {
    return {
      profile: this.$store.dispatch("getProfile", this.profileId),
    };
  },
  computed: {
    isBirthday() {
      const now = new Date();
      const bday = new Date(this.profile.birthday);
      if (
        now.getMonth() === bday.getMonth() &&
        now.getDate() === bday.getDate()
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
});
</script>

<style scoped></style>
