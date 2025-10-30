"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const updateProfile = async (formData) => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }
  const { userId } = sessionUser;

  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new Error("Unable to update.");
  }

  // FormData from the User submission
  const owner = userId;

  const company = formData.get("company");
  const role = formData.get("role");

  // structured in an object
  const userData = {
    // theUser: owner,
    company: company,
    role: role,
  };

  await User.findByIdAndUpdate(userId, userData, {
    new: true,
  });
  revalidatePath("/", "layout");
  // redirect(`/`)
  return { success: true };
};

export default updateProfile;
