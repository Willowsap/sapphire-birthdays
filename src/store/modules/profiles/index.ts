import mutations from "@/store/modules/profiles/profiles.mutations";
import actions from "@/store/modules/profiles/profiles.actions";
import getters from "@/store/modules/profiles/profiles.getters";
import { ProfileState } from "@/store/models/profileState.model";

export default {
  state(): ProfileState {
    return {
      profiles: [
        {
          id: "",
          email: "",
          fname: "",
          mname: "",
          lname: "",
          birthday: "",
          about: "",
          imagePath: "",
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
