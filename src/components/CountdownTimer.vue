<template>
  <slot
    :days="dayString"
    :hours="hourString"
    :minutes="minuteString"
    :seconds="secondString"
  >
    <table class="countdown">
      <tr class="timer">
        <td class="term">
          <span class="number day">{{ dayString }}</span>
          <span class="unit">{{ dayTerm }}</span>
        </td>
        <td class="spacer">:</td>
        <td class="term">
          <span class="number hour">{{ hourString }}</span>
          <span class="unit">{{ hourTerm }}</span>
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
  </slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CountdownTimer",
  props: ["end"],
  data() {
    return {
      days: 0,
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
    dayString() {
      return this.days.toString();
    },
    hourString() {
      return this.hours > 9
        ? this.hours.toString()
        : "0" + this.hours.toString();
    },
    minuteString() {
      return this.minutes > 9
        ? this.minutes.toString()
        : "0" + this.minutes.toString();
    },
    secondString() {
      return this.seconds > 9
        ? this.seconds.toString()
        : "0" + this.seconds.toString();
    },
  },
  mounted() {
    const start = new Date().getTime();
    const end = new Date(this.end).getTime();
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
      this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
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
  padding: 5px;
  width: 100%;
  max-width: 600px;
  align-self: center;
  margin-left: auto;
  margin-right: auto;
}
.timer {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
}
.term {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.unit {
  font-size: 20px;
}
.number {
  font-size: 60px;
}
.day {
  display: flex;
  flex: 0.3;
}
.hour,
.minute,
.second {
  display: flex;
  flex: 0.15;
}
.spacer {
  font-size: 60px;
  display: flex;
  flex: 0.1;
  text-align: center;
}
</style>
