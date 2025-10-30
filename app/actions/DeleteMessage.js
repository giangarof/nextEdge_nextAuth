"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessage(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error("Message doesn't exist");
  }

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("user id is required");
  }
  const { userId } = sessionUser;

  // verify ownership
  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized");
  }
  await message.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteMessage;
