<template>
  <table class="countdown">
    <tr class="timer">
      <td class="term">
        <span class="number hour">{{ hourString }}</span>
        <span class="unit">{{ hourTerm}}</span>
      </td>
      <td class="spacer">:</td>
      <td class="term">
        <span class="number minute">{{ minuteString }}</span>
        <span class="unit">{{ minuteTerm }}</span>
      </td>
      <td class="spacer">:</td>
      <td class="term">
        <span class="number second">{{ secondString }}</span>
        <span class="unit">{{ secondTerm }}</span>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BirthdayCountdown",
  props: ["birthday"],
  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      interval: 0,
      dayTerm: "Days",
      hourTerm: "Hours",
      minuteTerm: "Minutes",
      secondTerm: "Seconds",
    };
  },
  computed: {
    hourString() {
      return this.hours > 9 ? this.hours.toString() : "0" + this.hours.toString();
    },
    minuteString() {
      return this.minutes > 9 ? this.minutes.toString() : "0" + this.minutes.toString();
    },
    secondString() {
      return this.seconds > 9 ? this.seconds.toString() : "0" + this.seconds.toString();
    },
  },
  mounted() {
    const now = new Date();
    const start = now.getTime();
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime();
    this.timerCount(start, end);
    this.interval = setInterval(() => {
      this.timerCount(start, end);
    }, 1000);
  },
  methods: {
    timerCount(start: number, end: number) {
      let now = new Date().getTime();
      let distance = start - now;
      let passTime = end - now;
      if (distance < 0 && passTime < 0) {
        clearInterval(this.interval);
        return;
      } else if (distance < 0 && passTime > 0) {
        this.setTimeVars(passTime);
      } else if (distance > 0 && passTime > 0) {
        this.setTimeVars(distance);
      }
    },
    setTimeVars(dist: number) {
      this.hours = Math.floor(
        (dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
    },
  },
});
</script>

<style scoped>
.countdown {
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-between;
  align-self: center;
  flex: 1;
  padding: 5px;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.timer {
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
}
.term {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: visible;
}
.unit {
  font-size: 20px;
}
.number {
  font-size: 60px;
  text-align: center;
  align-self: center;
  align-items: center;
}
.hour, .minute, .second {
  display: flex;
  flex: .2;
}
.spacer {
  font-size: 60px;
  display: flex;
  flex: .1;
  text-align: center;
}

</style>
