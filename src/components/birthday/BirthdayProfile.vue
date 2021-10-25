<template>
  <div class="info">
    <h2 class="name">
      {{ profile.fname + " " + profile.lname }}<br>
      {{ profile.birthday }}
    </h2>
  </div>
  <birthday-countdown class="countdown" />
  <birthday-fun />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BirthdayFun from "@/components/birthday/BirthdayFun.vue";
import BirthdayCountdown from "@/components/birthday/BirthdayCountdown.vue";

export default defineComponent({
  name: "NormalProfile",
  components: {
    BirthdayFun,
    BirthdayCountdown,
  },
  props: ["profileId"],
  data() {
    return {
      profile: this.$store.state.profiles.find((e: any) => e.id === this.profileId)
    }
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
.countdown {
  display: flex;
  flex: 0.5;
}
.name {
  font-family: 'Zen Kurenaido', sans-serif;
  font-kerning: 1px;
}
</style>