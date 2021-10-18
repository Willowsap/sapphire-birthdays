<template>
  <div class="countdown">
    <div class="timeUnit">
      <span class="number">{{ dayString }} </span>
      <span class="number">{{ hourString }}</span>
      <span class="number">{{ minuteString }}</span>
      <span class="number">{{ secondString }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Countdown",
  props: ['birthday'] ,
  data() {
  	return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      interval: 0
    };
  },
  computed: {
    dayString() {
      return this.days.toString() + " days, ";
    },
    hourString() {
      return (this.hours > 9 ? this.hours.toString() : "0" + this.hours.toString()) + " hours";
    },
    minuteString() {
      return (this.minutes > 9 ? this.minutes.toString() : "0" + this.minutes.toString()) + " minutes";
    },
    secondString() {
      return (this.seconds > 9 ? this.seconds.toString() : "0" + this.seconds.toString()) + " seconds";
    }
  },
  mounted(){
    const start = this.birthday.getTime();
    const end = start + (1000 * 60 * 60 * 24); // 24 hours after birthday begins
    this.timerCount(start, end);
    this.interval = setInterval(() => {
      this.timerCount(start, end);
    }, 1000);
  },
  methods: {
    timerCount(start: number, end: number){
      let now = new Date().getTime();
      let distance = start - now;
      let passTime =  end - now;
      if (distance < 0 && passTime < 0) {
        clearInterval(this.interval);
        return;
      } else if(distance < 0 && passTime > 0){
        this.setTimeVars(passTime);
      } else if( distance > 0 && passTime > 0 ){
        this.setTimeVars(distance);
      }
    },
    setTimeVars(dist: number){
      this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
    }
  }
});
</script>

<style scoped>
.countdown {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  flex: 1;
  background-color: rgb(181, 181, 255);
  padding: 5px;
}
.timeUnit {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
}
</style>