<template>
  <div class="info">
    <h2 class="name">
      {{ profile.fname + " " + profile.lname }}<br />
      {{ profile.birthday }}
    </h2>
  </div>
  <countdown-timer :end="nextBirthday" v-if="!isBirthday" />
  <birthday-countdown v-else />
  <profile-image
    v-if="profile.imagePath"
    :image="profile.imagePath"
    :alt="profile.fname + profile.lname"
  />
  <birthday-fun v-if="isBirthday" />
  <router-link :to="`/edit/${profileId}`">Edit</router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CountdownTimer from "@/components/CountdownTimer.vue";
import { Profile } from "@/models/profile.model";
import BirthdayCountdown from "@/components/birthday/BirthdayCountdown.vue";
import BirthdayFun from "@/components/birthday/BirthdayFun.vue";
import ProfileImage from "@/components/ProfileImage.vue";

export default defineComponent({
  name: "ProfilePage",
  components: {
    CountdownTimer,
    BirthdayCountdown,
    BirthdayFun,
    ProfileImage,
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
    nextBirthday() {
      const now = new Date();
      const next = new Date(this.profile.birthday);
      next.setFullYear(now.getFullYear());
      if (next.getTime() - now.getTime() < 0) {
        next.setFullYear(next.getFullYear() + 1);
      }
      return next;
    },
  },
});
</script>

<style scoped>
.info {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  flex: 0.5;
}
.name {
  font-family: "Zen Kurenaido", sans-serif;
  font-kerning: 1px;
}
</style>
