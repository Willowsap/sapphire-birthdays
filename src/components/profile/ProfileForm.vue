<template>
  <form @submit.prevent="createProfile">
    <div class="name">
      <div class="fname">
        <label for="fname">First Name (required)</label>
        <input type="text" v-model="fname" name="fname" id="fname" required />
      </div>
      <div class="mname">
        <label for="fname">Middle Name</label>
        <input type="text" v-model="mname" name="mname" id="mname" />
      </div>
      <div class="lname">
        <label for="fname">Last Name</label>
        <input type="text" v-model="lname" name="lname" id="flame" />
      </div>
    </div>
    <div class="birthday">
      <label for="bday">Birthday (required)</label>
      <input type="date" v-model="birthday" name="bday" id="bday" required />
    </div>
    <div class="about">
      <textarea
        v-model="about"
        placeholder="What would you like to share about this person?"
      />
    </div>
    <button>Submit</button>
  </form>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfileForm",
  props: {
    profileId: {
      type: String,
      default: "new",
    },
  },
  data() {
    return {
      fname: "",
      mname: "",
      lname: "",
      about: "",
      birthday: "",
    };
  },
  methods: {
    submitForm() {
      if (this.profileId === "new") {
        this.createProfile();
      } else {
        this.updateProfile();
      }
    },
    createProfile() {
      this.$store.dispatch("createProfile", {
        fname: this.fname,
        mname: this.mname,
        lname: this.lname,
        about: this.about,
        birthday: this.birthday,
      });
      this.$router.push("/");
    },
    updateProfile() {
      this.$store.dispatch("editProfile", {
        id: this.profileId,
        fname: this.fname,
        mname: this.mname,
        lname: this.lname,
        about: this.about,
        birthday: this.birthday,
      });
      this.$router.push(`/profile/${this.profileId}`);
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

.name {
  display: flex;
  flex-direction: column;
}

.fname,
.mname,
.lname {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.birthday {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

input[type="text"] {
  margin: 10px;
}

textarea {
  width: 250px;
  height: 100px;
}

button {
  border: none;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 1rem;
  background-color: rgb(255, 255, 255);
}

button:hover {
  cursor: pointer;
  background-color: rgb(226, 196, 226);
}
</style>
