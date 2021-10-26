<template>
  <div class="info">
    <h2 class="name">
      {{ profile.fname + " " + profile.lname }}<br />
      {{ profile.birthday }}
    </h2>
  </div>
  <countdown-timer :end="nextBirthday" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CountdownTimer from "@/components/CountdownTimer.vue";
import { Profile } from "@/models/profile.model";

export default defineComponent({
  name: "NormalProfile",
  components: {
    CountdownTimer,
  },
  props: ["profileId"],
  data() {
    return {
      profile: this.$store.state.profiles.find(
        (e: Profile) => e.id === this.profileId
      ),
    };
  },
  computed: {
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
