import { UserState } from "@/store/models/userState.model";

export default {
  isSignedIn(state: UserState): boolean {
    return state.user.signedIn;
  },
  email(state: UserState): string {
    return state.user.email;
  },
  token(state: UserState): string {
    return state.user.token;
  },
};
