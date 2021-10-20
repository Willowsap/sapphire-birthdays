<template>
  <div class="home">
    <ul>
      <li v-for="prf in profiles" :key="prf.id" class="userLink">
        <router-link :to="`/message/${prf.id}`">{{
          prf.firstName + " " + prf.lastName
        }}</router-link>
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
        {
          id: "1",
          firstName: "Willow",
          middleName: "Emmeliine",
          lastName: "Sapphire",
          birthday: "09/22/1994",
          about: "meee",
        },
        {
          id: "2",
          firstName: "Cei",
          middleName: "Claire",
          lastName: "Wendland",
          birthday: "02/08/1992",
          about: "ceeeiiiii",
        },
        {
          id: "3",
          firstName: "Yuri",
          middleName: "Bo",
          lastName: "Wendland-Sapphire",
          birthday: "05/22/2020",
          about: "baby1",
        },
        {
          id: "4",
          firstName: "Merida",
          middleName: "Owl",
          lastName: "Wendland-Sapphire",
          birthday: "11/22/2019",
          about: "baby2",
        },
      ],
    };
  },
});
</script>

<style scoped>
.userLink {
  width: 100%;
  padding: 5px;
  background-color: rgb(196, 196, 250);
}
.userLink a {
  text-decoration: none;
}
.userLink:hover {
  cursor: pointer;
  background-color: rgb(151, 151, 190);
}
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style: none;
}
</style>
