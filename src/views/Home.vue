<template>
  <div class="home">
    <ul>
      <li v-for="profile in profiles" :key="profile.id">
        <router-link :to="{ name: 'Profile', params: { profile: profile }}">{{profile.firstName + " " + profile.lastName}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  data() {
    return {
      profiles: [
        {id: "1", firstName: "Willow", middleName: "Emmeliine", lastName: "Sapphire", birthday: "09/22/1994", about: "meee"},
        {id: "2", firstName: "Cei", middleName: "Claire", lastName: "Wendland", birthday: "02/08/1992", about: "ceeeiiiii"},
        {id: "3", firstName: "Yuri", middleName: "Bo", lastName: "Wendland-Sapphire", birthday: "05/22/2020", about: "baby1"},
        {id: "4", firstName: "Merida", middleName: "Owl", lastName: "Wendland-Sapphire", birthday: "11/22/2019", about: "baby2"}
      ]
    }
  }
});
</script>
