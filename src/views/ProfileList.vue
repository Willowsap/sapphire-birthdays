<template>
  <section class="actions">
    <input
      type="text"
      name="query"
      id="query"
      class="query"
      v-model="query"
      placeholder="Search"
    />
    <profile-paginator
      :items="queriedItems"
      @onChange="updatePage"
      v-if="!loading"
      class="paginator"
    />
  </section>
  <ul v-if="!loading">
    <profile-stub
      v-for="profile in pageOfItems"
      :key="profile.id"
      :profileId="profile.id"
      :name="`${profile.fname} ${profile.lname}`"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import ProfileStub from "@/components/ProfileStub.vue";
import ProfilePaginator from "@/components/ProfilePaginator.vue";
import { Profile } from "@/models/profile.model";

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
      pageOfItems: this.$store.state.profiles,
      query: "",
    };
  },
  computed: {
    ...mapState(["profiles"]),
    queriedItems() {
      if (this.query) {
        return this.$store.state.profiles.filter((e: Profile) => {
          return (
            e["fname"].indexOf(this.query) !== -1 ||
            e["lname"].indexOf(this.query) !== -1
          );
        });
      } else {
        return this.$store.state.profiles;
      }
    },
  },
  methods: {
    updatePage(newItems: Array<Profile>) {
      this.pageOfItems = newItems;
    },
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
  overflow-y: auto;
  overflow-x: hidden;
}
.actions {
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.query {
  flex: 0.3;
  max-width: 250px;
  min-width: 10px;
}
.paginator {
  flex: 1;
}
</style>
