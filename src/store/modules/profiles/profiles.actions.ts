import axios from "axios";
import transformId from "@/store/utils/transformProfile";
import { Profile } from "@/models/profile.model";
import { ProfileState } from "@/store/models/profileState.model";
import { ActionContext } from "vuex";
import { ServerProfile } from "@/models/serverProfile.model";

const url = "https://sapphire-birthdays-server.herokuapp.com/api/profiles";

export default {
  async loadProfiles(
    context: ActionContext<ProfileState, Record<string, never>>
  ): Promise<void> {
    const res = await axios.get(url);
    context.commit("setProfiles", transformId(res.data));
  },
  async createProfile(
    context: ActionContext<ProfileState, Record<string, never>>,
    profile: Profile
  ): Promise<string> {
    if (typeof profile.imagePath === "string" || !profile.imagePath) {
      return axios
        .post(url, profile, {
          headers: {
            authorization: context.getters.token,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            context.commit("addProfile", transformId([res.data.profile])[0]);
            return res.data.profile._id;
          } else {
            alert("Failed to create profile");
            return "failed";
          }
        });
    } else {
      const profileData = new FormData();
      profileData.append("email", profile.email);
      profileData.append("fname", profile.fname);
      profileData.append("mname", profile.mname);
      profileData.append("lname", profile.lname);
      profileData.append("about", profile.about);
      profileData.append("birthday", profile.birthday);
      profileData.append(
        "image",
        profile.imagePath,
        profile.fname + profile.lname
      );
      return axios
        .post<{ message: string; profile: ServerProfile }>(url, profileData, {
          headers: {
            "content-type": "multipart/form-data",
            authorization: context.getters.token,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            context.commit("addProfile", transformId([res.data.profile])[0]);
            return res.data.profile._id;
          } else {
            alert("Failed to create profile");
            return "failed";
          }
        });
    }
  },
  editProfile(
    context: ActionContext<ProfileState, Record<string, never>>,
    profile: Profile
  ): void {
    if (typeof profile.imagePath === "string") {
      axios
        .put(url + `/${profile.id}`, profile, {
          headers: {
            Authorization: context.getters.token,
          },
        })
        .then((res) => {
          if (res.status) {
            context.commit("updateProfile", profile);
          }
        });
    } else {
      const profileData = new FormData();
      profileData.append("id", profile.id);
      profileData.append("email", profile.email);
      profileData.append("fname", profile.fname);
      profileData.append("mname", profile.mname);
      profileData.append("lname", profile.lname);
      profileData.append("about", profile.about);
      profileData.append("birthday", profile.birthday);
      profileData.append(
        "image",
        profile.imagePath,
        profile.fname + profile.lname
      );
      axios
        .put(url + `/${profile.id}`, profileData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: context.getters.token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            profile.imagePath = res.data.imagePath;
            context.commit("updateProfile", profile);
          }
        });
    }
  },
  deleteProfile(
    context: ActionContext<ProfileState, Record<string, never>>,
    profileId: string
  ): void {
    axios
      .delete(url + `/${profileId}`, {
        headers: {
          Authorization: context.getters.token,
        },
      })
      .then((res) => {
        if (res.status) {
          context.commit("removeProfile", profileId);
        }
      });
  },
};
