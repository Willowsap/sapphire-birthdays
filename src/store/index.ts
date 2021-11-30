import { createStore } from "vuex";
import profileModule from "@/store/modules/profiles/index";
import authModule from "@/store/modules/auth/index";

export default createStore({
  state(): Record<string, never> {
    return {};
  },
  modules: {
    profileModule,
    authModule,
  },
});
