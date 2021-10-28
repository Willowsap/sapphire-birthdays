import mutations from "@/store/modules/auth/auth.mutations";
import actions from "@/store/modules/auth/auth.actions";
import getters from "@/store/modules/auth/auth.getters";
import { UserState } from "@/store/models/userState.model";

export default {
  state(): UserState {
    return {
      user: {
        token: "",
        signedIn: false,
        email: "",
      },
    };
  },
  mutations,
  actions,
  getters,
};
