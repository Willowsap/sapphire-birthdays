<template>
  <form @submit.prevent="createProfile">
    <div class="name">
      <input type="text" v-model="fname" placeholder="First Name" required/>
      <input type="text" v-model="mname" placeholder="Middle Name"/>
      <input type="text" v-model="lname" placeholder="Last Name"/>
    </div>
    <div class="birthday">
      <input type="date" v-model="birthday" required/>
    </div>
    <div class="about">
      <textarea v-model="about" placeholder="About" />
    </div>
    <button>Submit</button>
  </form>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent ({
  data() {
    return {
      fname: "",
      mname: "",
      lname: "",
      about: "",
      birthday: ""
    }
  },
  methods: {
    createProfile() {
      this.$store.commit('addProfile', {
        id: "nfldln",
        fname: this.fname,
        mname: this.mname,
        lname: this.lname,
        about: this.about,
        birthday: this.birthday
      })
      this.$router.push('/');
    }
  }
})
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.name {
  display: flex;
  flex: 1;
  flex-direction: row;
}
</style>