"use server";
import connectDB from "@/config/database";
import Job from "@/models/Job";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const bookmark = async (jobId) => {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }
  const { userId } = sessionUser;
  const user = await User.findById(userId);

  let isBookmarked = user.bookmarks.includes(jobId);
  let message;
  if (isBookmarked) {
    // if is already bookmarked, then remove
    user.bookmarks.pull(jobId);
    message = "Bookmark is removed";
    isBookmarked = false;
  } else {
    // if is not, add it
    user.bookmarks.push(jobId);
    message = "Bookmark Added";
    isBookmarked = true;
  }

  await user.save();
  revalidatePath("/jobs/saved", "page");
  return { message, isBookmarked };
};

export default bookmark;
