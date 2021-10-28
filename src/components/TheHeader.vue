<template>
  <ul id="nav">
    <router-link class="link" to="/">Profile List</router-link>
    <div class="spacer">|</div>
    <router-link v-if="signedIn" class="link" to="/create"
      >New Profile</router-link
    >
    <div class="spacer" v-if="signedIn">|</div>
    <router-link v-if="!signedIn" class="link" to="/signIn"
      >Sign In</router-link
    >
    <div class="spacer" v-if="!signedIn">|</div>
    <router-link v-if="!signedIn" class="link" to="/signUp"
      >Sign Up</router-link
    >
    <button class="link" v-if="signedIn" @click="logout">Logout</button>
  </ul>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheHeader",
  computed: {
    signedIn() {
      return this.$store.getters.isSignedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
});
</script>

<style scoped>
.nav {
  display: flex;
  flex-direction: row;
  list-style: none;
}
.link {
  text-decoration: none;
}
.spacer {
  display: inline;
  width: 10px;
  margin-left: 5px;
  margin-right: 5px;
}
button {
  background-color: transparent;
  border: none;
  font-family: inherit;
  font-size: inherit;
  font-weight: bold;
  color: #2c3e50;
}
button:hover {
  cursor: pointer;
}
</style>
