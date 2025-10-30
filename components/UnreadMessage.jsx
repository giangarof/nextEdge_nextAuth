"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import Link from "next/link";

import { HiOutlineMail } from "react-icons/hi";

const UnreadMessage = () => {
  const { unreadCount } = useGlobalContext();
  return (
    <Link href={`/messages`}>
      <div className="relative cursor-pointer w-8 h-8">
        {/* Mail Icon */}
        <HiOutlineMail className="text-gray-700 w-8 h-8" />

        {/* Hardcoded badge */}
        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-600 rounded-full shadow-md">
          {unreadCount}
        </span>
      </div>
    </Link>
  );
};

export default UnreadMessage;
