import { Profile } from "@/models/profile.model";
import { ServerProfile } from "@/models/serverProfile.model";

export default (profileList: Array<ServerProfile>): Array<Profile> => {
  return profileList.map((item: ServerProfile) => {
    return {
      id: item._id,
      email: item.email,
      fname: item.fname,
      mname: item.mname,
      lname: item.lname,
      about: item.about,
      birthday: item.birthday,
      imagePath: item.imagePath,
    };
  });
};
