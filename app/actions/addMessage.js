"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

async function addMessage(previousState, formData) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;
  const recipient = formData.get("recipient");

  if (userId === recipient) {
    return { error: "You cannot send a message to yourself" };
  }
  const newMessage = new Message({
    sender: userId,
    recipient,
    job: formData.get("job"),
    name: formData.get("name"),
    email: formData.get("email"),
    body: formData.get("body"),
  });

  await newMessage.save();
  return { success: true, submitted: true };
}

export default addMessage;
