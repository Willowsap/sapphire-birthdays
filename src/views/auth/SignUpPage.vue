<template>
  <form @submit.prevent="signUp">
    <div class="inputFields">
      <div class="email">
        <label for="email">Email</label>
        <input type="email" v-model="email" name="email" id="email" required />
      </div>
      <div class="password">
        <label for="password">Password</label>
        <input
          type="password"
          v-model="password"
          name="password"
          id="password"
          required
        />
      </div>
    </div>
    <button>Sign Up!</button>
  </form>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SignUpPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signUp() {
      this.$store
        .dispatch("signUp", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/");
        });
    },
  },
});
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.inputFields {
  display: flex;
  flex-direction: column;
  flex: 0.5;
}

label {
  margin-right: 10px;
}

.email,
.password {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

button {
  border: none;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 1rem;
  background-color: rgb(255, 255, 255);
  align-self: center;
  max-width: 200px;
}

button:hover {
  cursor: pointer;
  background-color: rgb(226, 196, 226);
}
</style>
