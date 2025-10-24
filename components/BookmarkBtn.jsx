"use client";
import { FaBookmark } from "react-icons/fa";
import bookmark from "@/app/actions/bookmark";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import checkBookmark from "@/app/actions/checkBookmark";

const Bookmark = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleClick = async () => {
    // console.log(job);
    if (!userId) {
      toast.error("You need to be signed in to bookmark a job");
      return;
    }
    bookmark(job._id).then((res) => {
      if (res.error) return toast.error(res.error);
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });
  };

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    checkBookmark(job._id).then((res) => {
      if (res.error) toast.error(res.error);
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      setIsLoading(false);
    });
  }, [job._id, userId, checkBookmark]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return isBookmarked ? (
    <div>
      <button
        onClick={handleClick}
        className="flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-2 rounded-lg hover:bg-cyan-100 transition"
      >
        <FaBookmark className="w-5 h-5" />
        <span>Bookmarked</span>
      </button>
    </div>
  ) : (
    <div>
      <button
        onClick={handleClick}
        className="flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-2 rounded-lg hover:bg-cyan-100 transition"
      >
        <FaBookmark className="w-5 h-5" />
        <span>Save Job</span>
      </button>
    </div>
  );
};

export default Bookmark;
