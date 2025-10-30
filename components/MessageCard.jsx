"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import MarkMessageAsRead from "@/app/actions/MarkMessageAsRead";
import deleteMessage from "@/app/actions/DeleteMessage";
import { useGlobalContext } from "@/app/context/GlobalContext";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    const read = await MarkMessageAsRead(message._id);
    console.log(message);
    setIsRead(read);
    setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
    toast.success(`Marked as ${read ? "read" : "new"} `);
  };

  const handleDelete = async () => {
    await deleteMessage(message._id);
    setIsDeleted(true);
    setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
    toast.success("Message Deleted");
  };
  return (
    <div className="flex flex-col gap-6">
      <div
        key={message._id}
        className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
      >
        {/* "New" Badge */}
        {!isRead && (
          <span className="absolute top-4 left-4 sm:left-auto sm:right-4 bg-cyan-500 text-white text-[11px] uppercase tracking-wide font-semibold px-2.5 py-1 rounded-full shadow-sm z-10">
            New
          </span>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4 sm:pr-12">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-gray-900 leading-snug">
              {message.name}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              From: <span className="text-gray-700">{message.email}</span>
            </p>
          </div>

          <span className="text-sm text-gray-400 whitespace-nowrap">
            {new Date(message.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Message Body */}
        <div className="bg-gray-50 rounded-lg p-4 mb-5 border border-gray-100">
          <p className="text-gray-700 leading-relaxed">{message.body}</p>
        </div>

        {/* Footer Info */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500 mb-5">
          <div>
            <strong className="text-gray-600">Received:</strong>{" "}
            {new Date(message.createdAt).toLocaleString()}
          </div>

          <a
            href={`mailto:${message.email}`}
            className="inline-flex items-center gap-1 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm"
          >
            Reply
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-4">
          <button
            onClick={handleReadClick}
            className="flex-1 sm:flex-none text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-lg transition-colors duration-200 shadow-sm"
          >
            {isRead ? "Mark as new" : "Mark as read"}
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 sm:flex-none text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-lg transition-colors duration-200 shadow-sm"
          >
            Delete Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
