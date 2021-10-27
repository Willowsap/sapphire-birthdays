<template>
  <label for="query">Search</label>
  <input type="text" name="query" id="query" v-model="query" />
  <ul v-if="!loading">
    <profile-stub
      v-for="profile in pageOfItems"
      :key="profile.id"
      :profileId="profile.id"
      :name="`${profile.fname} ${profile.lname}`"
    />
  </ul>
  <profile-paginator :items="queriedItems" @onChange="updatePage" v-if="!loading" />
  <h2 v-if="profiles.length === 0">No Profiles Yet</h2>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import ProfileStub from "@/components/ProfileStub.vue";
import ProfilePaginator from "@/components/ProfilePaginator.vue";

export default defineComponent({
  name: "ProfileList",
  components: {
    ProfileStub,
    ProfilePaginator,
  },
  data() {
    return {
      loading: false,
      perPage: 2,
      pageOfItems: [],
      queriedItems: this.$store.state.profiles,
      query: "",
    };
  },
  computed: {
    ...mapState(["profiles"]),
  },
  methods: {
    updatePage(newItems: any) {
      this.pageOfItems = newItems;
    },
    search(newItems: any) {
      this.queriedItems = newItems;
    }
  },
  mounted() {
    if (!this.profiles) {
      this.$store.dispatch("loadProfiles");
    }
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
  overflow: auto;
}
</style>
