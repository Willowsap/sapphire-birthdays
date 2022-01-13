import { Profile } from "@/models/profile.model";
import { ProfileState } from "../../models/profileState.model";

export default {
  setProfiles(state: ProfileState, profiles: Profile[]): void {
    state.profiles = profiles;
  },
  addProfile(state: ProfileState, profile: Profile): void {
    state.profiles.push(profile);
  },
  updateProfile(state: ProfileState, profile: Profile): void {
    const prf = state.profiles.find((e: Profile) => e.id === profile.id);
    if (!prf) {
      console.warn("Tried to update a non-existant profile");
    } else {
      prf["email"] = profile["email"];
      prf["fname"] = profile["fname"];
      prf["mname"] = profile["mname"];
      prf["lname"] = profile["lname"];
      prf["about"] = profile["about"];
      prf["birthday"] = profile["birthday"];
      prf["imagePath"] = profile["imagePath"];
    }
  },
  removeProfile(state: ProfileState, profileId: string): void {
    state.profiles = state.profiles.filter((item: Profile) => {
      return item.id !== profileId;
    });
  },
};
