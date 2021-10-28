import { Profile } from "@/models/profile.model";
import { ProfileState } from "@/store/models/profileState.model";

export default {
  profiles(state: ProfileState): Profile[] {
    return state.profiles;
  },
};
