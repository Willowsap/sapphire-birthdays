<template>
  <div class="profile">
    <div class="info">
      <h2>{{profile.firstName + " " + profile.lastName}}</h2>
      <h2>{{profile.birthday}}</h2>
    </div>
    <Countdown :birthday="nextBirthday" class="countdown"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Countdown from "@/components/Countdown.vue";

export default defineComponent({
  name: 'Profile',
  components: {
    Countdown
  },
  props: [
    'profile'
  ],
  computed: {
    nextBirthday() {
      const now = new Date();
      const next = new Date(this.profile.birthday);
      next.setFullYear(now.getFullYear());
      if (next - now < 0) {
        next.setFullYear(now.getFullYear() + 1);
      }
      return next;
    }
  }
})
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: row;
}
.info {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  flex: .5
}
.countdown {
  display: flex;
  flex: .5
}
</style>