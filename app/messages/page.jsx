import connectDB from "@/config/database";
import Message from "@/models/Message";
import "@/models/Job";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";
import MessageCard from "@/components/MessageCard";

const Messages = async () => {
  connectDB();
  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  const readMessages = await Message.find({
    recipient: userId,
    read: true,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("job", "title")
    .lean();

  const unreadMessages = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("job", "title")
    .lean();

  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializableObject(messageDoc);
    message.sender = convertToSerializableObject(messageDoc.sender);
    message.job = convertToSerializableObject(messageDoc.job);
    return message;
  });

  return (
    <div className="mt-4 mb-4 p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl border border-gray-100 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3 sm:mb-0">
          Your Messages
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
            {messages.length} {messages.length === 1 ? "Message" : "Messages"}
          </span>
          {/* <button className="text-sm bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-200">
            Compose
          </button> */}
        </div>
      </div>

      {/* Message List */}
      <div className="space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-5 animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 4h.01M12 8v4"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg font-medium">
              You have no messages yet.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              All new messages will appear here.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageCard key={message._id} message={message} />
          ))
        )}
      </div>
    </div>
  );
};

export default Messages;
