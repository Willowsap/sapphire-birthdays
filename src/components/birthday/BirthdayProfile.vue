<template>
  <div class="info">
    <h2 class="name">
      {{ profile.fname + " " + profile.lname }}<br />
      {{ profile.birthday }}
    </h2>
  </div>
  <birthday-countdown />
  <birthday-fun :profileId="profileId" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BirthdayFun from "@/components/birthday/BirthdayFun.vue";
import BirthdayCountdown from "@/components/birthday/BirthdayCountdown.vue";
import { Profile } from "@/models/profile.model";

export default defineComponent({
  name: "NormalProfile",
  components: {
    BirthdayFun,
    BirthdayCountdown,
  },
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

<style scoped>
.info {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
}
.name {
  font-family: "Zen Kurenaido", sans-serif;
  font-kerning: 1px;
}
</style>
