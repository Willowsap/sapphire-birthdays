import { Profile } from '@/models/profile.model';
import { createStore } from "vuex";

export default createStore({
  state: {
    profiles: [
      {
        id: "1",
        fname: "Willow",
        mname: "Emmeliine",
        lname: "Sapphire",
        birthday: "10/25/1994",
        about: "meee",
      },
      {
        id: "2",
        fname: "Cei",
        mname: "Claire",
        lname: "Wendland",
        birthday: "02/08/1992",
        about: "ceeeiiiii",
      },
      {
        id: "3",
        fname: "Yuri",
        mname: "Bo",
        lname: "Wendland-Sapphire",
        birthday: "06/3/2020",
        about: "baby1",
      },
      {
        id: "4",
        fname: "Merida",
        mname: "Owl",
        lname: "Wendland-Sapphire",
        birthday: "11/24/2020",
        about: "baby2",
      },
    ],
  },
  mutations: {
    addProfile(state, profile) {
      state.profiles.push(profile);
    },
    updateProfile(state, profile: Profile) {
      const prf: Profile | undefined = state.profiles.find((e: any) => e.id === this.id);
      if (!prf) {
        console.warn("Tried to update a non-existant profile");
      } else {
        prf['fname'] = profile['fname'] 
        prf['mname'] = profile['mname'] 
        prf['lname'] = profile['lname'] 
        prf['about'] = profile['about'] 
        prf['birthday'] = profile['birthday'] 
      }
    }
  },
  modules: {},
});
