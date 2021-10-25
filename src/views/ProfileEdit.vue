<template>
  <form @submit.prevent="updateProfile">
    <div class="name">
      <input type="text" v-model="profile.fname" placeholder="First Name" required/>
      <input type="text" v-model="profile.mname" placeholder="Middle Name"/>
      <input type="text" v-model="profile.lname" placeholder="Last Name"/>
    </div>
    <div class="birthday">
      <input type="date" v-model="profile.birthday" required/>
    </div>
    <div class="about">
      <textarea v-model="profile.about" placeholder="About" />
    </div>
    <button>Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Profile } from "../models/profile.model";

export default defineComponent({
  name: 'ProfileEdit',
  props: {
    profileId: String,
  },
  data() {
    return {
      profile: this.$store.state.profiles.find((e: Profile) => e.id === this.profileId)
    }
  },
  methods: {
    updateProfile() {
      this.$store.commit('updateProfile', {
        id: this.profile.id,
        fname: this.profile.fname,
        mname: this.profile.mname,
        lname: this.profile.lname,
        about: this.profile.about,
        birthday: this.profile.birthday
      })
      this.$router.push(`/${this.profileId}`);
    }
  }
})
</script>

<style scoped>

</style>