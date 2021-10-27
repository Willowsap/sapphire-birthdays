<template>
  <normal-profile v-if="!isBirthday && profile" :profile="profile" />
  <birthday-profile v-if="isBirthday && profile" :profile="profile" />
  <!--<router-link :to="`/edit/${profileId}`">Edit</router-link>-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BirthdayProfile from "@/components/birthday/BirthdayProfile.vue";
import NormalProfile from "@/components/profile/NormalProfile.vue";
import { Profile } from "@/models/profile.model";

export default defineComponent({
  name: "ProfilePage",
  components: {
    NormalProfile,
    BirthdayProfile,
  },
  props: {
    profileId: String,
  },
  computed: {
    profile() {
      return this.$store.getters.profileList.find(
        (e: Profile) => e.id === this.profileId
      );
    },
    isBirthday() {
      if (!this.profile) {
        return false;
      }
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
