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
    <button
      type="button"
      class="warn"
      v-if="profileId !== 'new'"
      @click="deletePrf"
    >
      Delete
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProfileImage from "@/components/ProfileImage.vue";
import { Profile } from "@/models/profile.model";

interface ProfileData {
  fname: string;
  mname: string;
  lname: string;
  about: string;
  birthday: string;
  imagePath: string;
  image: File | null;
}
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
  data(): ProfileData {
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
  computed: {
    email(): string {
      return this.$store.getters.email;
    },
  },
  methods: {
    submitForm(): void {
      if (this.profileId === "new") {
        this.createProfile();
      } else {
        this.updateProfile();
      }
    },
    createProfile(): void {
      this.$store
        .dispatch("createProfile", {
          email: this.email,
          fname: this.fname,
          mname: this.mname,
          lname: this.lname,
          about: this.about,
          birthday: this.birthday,
          imagePath: this.image,
        })
        .then((id: string) => {
          if (id) {
            this.$router.push(`/profile/${id}`);
          } else {
            this.$router.push("/");
          }
        });
    },
    updateProfile(): void {
      this.$store.dispatch("editProfile", {
        id: this.profileId,
        email: this.email,
        fname: this.fname,
        mname: this.mname,
        lname: this.lname,
        about: this.about,
        birthday: this.birthday,
        imagePath: this.image ? this.image : this.imagePath,
      });
      this.$router.push(`/profile/${this.profileId}`);
    },
    onImagePicked(event: Event): void {
      const target = event.target as HTMLInputElement;
      const files: FileList | null = target.files;
      if (files) {
        const file = files[0];
        this.image = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePath = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    },
    deletePrf(): void {
      this.$store.dispatch("deleteProfile", this.profileId).then(() => {
        this.$router.push("/");
      });
    },
  },
  mounted(): void {
    if (this.profileId !== "new") {
      const prf = this.$store.getters.profiles.find(
        (e: Profile) => e.id === this.profileId
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
  margin-top: 10px;
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

.warn {
  background-color: red;
}
</style>
