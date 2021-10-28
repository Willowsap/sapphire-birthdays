import { createStore } from "vuex";
import profileModule from "@/store/modules/profiles/index";
import authModule from "@/store/modules/auth/index";

export default createStore({
  state() {
    return {};
  },
  modules: {
    profileModule,
    authModule,
  },
});
