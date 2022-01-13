<template>
  <countdown-timer :end="birthdayEnd">
    <template #default="slotProps">
      <div class="cd">
        <span class="number">{{ slotProps.hours }}</span>
        <span class="spacer">:</span>
        <span class="number">{{ slotProps.minutes }}</span>
        <span class="spacer">:</span>
        <span class="number">{{ slotProps.seconds }}</span>
      </div>
    </template>
  </countdown-timer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CountdownTimer from "../CountdownTimer.vue";

export default defineComponent({
  name: "BirthdayCountdown",
  components: {
    CountdownTimer,
  },
  computed: {
    birthdayEnd(): Date {
      const end = new Date();
      end.setHours(0);
      end.setMinutes(0);
      end.setSeconds(0);
      end.setDate(end.getDate() + 1);
      return end;
    },
  },
});
</script>

<style scoped>
.cd {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.spacer,
.number {
  font-size: 20px;
  font-weight: bold;
  margin-left: 2px;
}
</style>
