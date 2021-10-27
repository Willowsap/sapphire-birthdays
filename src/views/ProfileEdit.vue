<template>
  <form @submit.prevent="submitForm">
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
    <div class="image">
      <button type="button" @click="$refs.filePicker.click()">
        Pick Image
      </button>
      <input type="file" ref="filePicker" @change="onImagePicked($event)" />
    </div>
    <profile-image v-if="imagePath" :image="imagePath" :alt="fname + lname" />
    <div class="about">
      <textarea
        v-model="about"
        placeholder="What would you like to share about this person?"
      />
    </div>
    <button>Submit</button>
    <slot />
  </form>
</template>

<script>
import { defineComponent } from "vue";
import ProfileImage from "@/components/ProfileImage.vue";

export default defineComponent({
  name: "ProfileForm",
  components: {
    ProfileImage,
  },
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
      imagePath: "",
      image: null,
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
        image: this.image,
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
        image: this.image,
        imagePath: this.imagePath,
      });
      this.$router.push(`/profile/${this.profileId}`);
    },
    onImagePicked(event) {
      const file = event.target.files[0];
      this.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePath = reader.result;
      };
      reader.readAsDataURL(file);
    },
  },
  mounted() {
    if (this.profileId !== "new") {
      const prf = this.$store.getters.profileList.find(
        (e) => e.id === this.profileId
      );
      this.fname = prf.fname;
      this.mname = prf.mname;
      this.lname = prf.lname;
      this.about = prf.about;
      this.birthday = prf.birthday;
      this.imagePath = prf.imagePath;
    }
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

input[type="file"] {
  display: none;
}

textarea {
  margin-top: 1rem;
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

.imagePreview {
  height: 15rem;
  margin: 1rem 0;
}

.imagePreview img {
  border-radius: 50%;
  height: 100%;
}
</style>
