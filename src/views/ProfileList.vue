<template>
  <ul v-if="!loading">
    <profile-stub
      v-for="profile in profiles"
      :key="profile.id"
      :profileId="profile.id"
      :name="`${profile.fname} ${profile.lname}`"
    />
  </ul>
  <h2 v-else>No Profiles Yet</h2>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import ProfileStub from "../components/ProfileStub.vue";

export default defineComponent({
  name: "ProfileList",
  components: {
    ProfileStub,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState(["profiles"]),
  },
  methods: {
    loadProfiles() {
      this.$store.dispatch("loadProfiles").then(() => {
        this.loading = false;
      });
    },
  },
  created() {
    this.loadProfiles();
  },
});
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style: none;
  width: 100%;
  margin: 0px;
  padding: 0px;
}
</style>
