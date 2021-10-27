import { createStore } from "vuex";
import axios from "axios";
import { ServerProfile } from "@/models/serverProfile.model";
import { Profile } from "@/models/profile.model";

// const url = "http://localhost:3000/api/profiles";
const url = "https://sapphire-birthdays-server.herokuapp.com/api/profiles";

const transformId = (profileList: Array<ServerProfile>): Array<Profile> => {
  return profileList.map((item: ServerProfile) => {
    return {
      id: item._id,
      fname: item.fname,
      mname: item.mname,
      lname: item.lname,
      about: item.about,
      birthday: item.birthday,
      imagePath: item.imagePath,
    };
  });
};

export default createStore({
  state: {
    profiles: [
      {
        id: String,
        fname: String,
        mname: String,
        lname: String,
        birthday: String,
        about: String,
        imagePath: String,
      },
    ],
  },
  getters: {
    profileList(state) {
      if (state.profiles.length > 0) {
        return state.profiles;
      } else {
        return [];
      }
    },
  },
  mutations: {
    setProfiles(state, profiles) {
      state.profiles = profiles;
    },
    addProfile(state, profile) {
      state.profiles.push(profile);
    },
    updateProfile(state, profile) {
      const prf = state.profiles.find((e) => e.id === profile.id);
      if (!prf) {
        console.warn("Tried to update a non-existant profile");
      } else {
        prf["fname"] = profile["fname"];
        prf["mname"] = profile["mname"];
        prf["lname"] = profile["lname"];
        prf["about"] = profile["about"];
        prf["birthday"] = profile["birthday"];
        prf["imagePath"] = profile["imagePath"];
      }
    },
    removeProfile(state, profileId) {
      state.profiles = state.profiles.filter((item) => {
        return item.id !== profileId;
      });
    },
  },
  actions: {
    async loadProfiles(context) {
      const res = await axios.get(url);
      context.commit("setProfiles", transformId(res.data));
    },
    createProfile(context, profile) {
      if (!profile.image) {
        axios.post(url, profile).then((res) => {
          if (res.status) {
            context.commit("addProfile", profile);
          }
        });
      } else {
        const profileData = new FormData();
        profileData.append("fname", profile.fname);
        profileData.append("mname", profile.mname);
        profileData.append("lname", profile.lname);
        profileData.append("about", profile.about);
        profileData.append("birthday", profile.birthday);
        profileData.append(
          "image",
          profile.image,
          profile.fname + profile.lname
        );
        axios
          .post(url, profileData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.status) {
              context.commit("addProfile", profile);
            }
          });
      }
    },
    editProfile(context, profile) {
      if (!profile.image) {
        axios.put(url + `/${profile.id}`, profile).then((res) => {
          if (res.status) {
            context.commit("updateProfile", profile);
          }
        });
      } else {
        const profileData = new FormData();
        profileData.append("id", profile.id);
        profileData.append("fname", profile.fname);
        profileData.append("mname", profile.mname);
        profileData.append("lname", profile.lname);
        profileData.append("about", profile.about);
        profileData.append("birthday", profile.birthday);
        profileData.append(
          "image",
          profile.image,
          profile.fname + profile.lname
        );
        axios
          .put(url + `/${profile.id}`, profileData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              console.log(res);
              profile.imagePath = res.data.imagePath;
              context.commit("updateProfile", profile);
            }
          });
      }
    },
    deleteProfile(context, profileId) {
      axios.delete(url, profileId).then((res) => {
        if (res.status) {
          context.commit("removeProfile", profileId);
        }
      });
    },
  },
});
