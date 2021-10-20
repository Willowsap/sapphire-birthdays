<template>
  <form>
    <div class="inputDiv">
      <label for="birthday">Birthday!</label>
      <input type="date" name="birthday" />
    </div>
    <div class="inputDiv">
      <label for="fname">First Name</label>
      <input type="text" name="fname" />
    </div>
    <div class="inputDiv">
      <label for="mname">Middle Name</label>
      <input type="text" name="mname" />
    </div>
    <div class="inputDiv">
      <label for="lname">Last Name</label>
      <input type="text" name="lname" />
    </div>
    <div class="inputDiv">
      <label for="about">About</label>
      <input type="text" name="about" />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  data() {
    return {
      fname: "",
      mname: "",
      lname: "",
      about: "",
      birthday: "",
    };
  },
});
</script>

<style>
form {
  display: flex;
  flex-direction: column;
}
</style>
