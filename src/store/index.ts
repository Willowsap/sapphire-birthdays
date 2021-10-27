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
      axios.post(url, profile).then((res) => {
        if (res.status) {
          context.commit("addProfile", profile);
        }
      });
    },
    editProfile(context, profile) {
      axios.put(url, profile).then((res) => {
        if (res.status) {
          context.commit("updateProfile", profile);
        }
      });
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
