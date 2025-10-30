import EditProfileForm from "@/components/EditProfile";
import connectDB from "@/config/database";
import User from "@/models/User";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";

const EditProfile = async ({ params }) => {
  await connectDB();
  const userSession = await getSessionUser();
  const { user } = userSession;
  console.log(user);
  const profileDocs = await User.findById(user.id)
    .select("username email company role")
    .lean();
  const profile = {
    ...profileDocs,
    id: profileDocs._id.toString(),
  };
  delete profile._id;
  return <EditProfileForm profile={profile} />;
};

export default EditProfile;
