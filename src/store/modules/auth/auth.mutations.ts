import { UserState } from "@/store/models/userState.model";

export default {
  signUserIn(state: UserState, userData: UserState): void {
    state.user.signedIn = userData.user.signedIn;
    state.user.email = userData.user.email;
    state.user.token = userData.user.token;
  },
  logUserOut(state: UserState): void {
    state.user.signedIn = false;
    state.user.email = "";
    state.user.token = "";
  },
};
