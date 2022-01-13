<template>
  <h1 :class="{ big: isBig, small: !isBig }">
    It's your birthday, {{ profile.fname }}!
  </h1>
  <p :class="{ about: true, sneaky: isSneaky }">{{ profile.about }}</p>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "BirthdayFun",
  props: ["profile"],
  data() {
    return {
      isBig: false,
      isSneaky: true,
    };
  },
  methods: {
    play(): void {
      setInterval(() => {
        this.isBig = !this.isBig;
      }, 1000);
    },
  },
  mounted(): void {
    this.play();
  },
});
</script>

<style scoped>
.sneaky {
  opacity: 30%;
}
.big {
  animation: get-big 0.3s ease-out forwards;
}
.small {
  animation: get-small 0.3s ease-out forwards;
}
@keyframes get-big {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(2);
  }
}
@keyframes get-small {
  0% {
    transform: scale(2);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
