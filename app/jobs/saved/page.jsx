import connectDB from "@/config/database";
import Job from "@/models/Job";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import Link from "next/link";
import { MapPin, Clock } from "lucide-react";

const savedJobs = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }
  const { userId } = sessionUser;
  const { bookmarks } = await User.findById(userId).populate("bookmarks");
  console.log(bookmarks);

  return (
    <>
      <main className="max-w-5xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Jobs</h1>
          <p className="text-gray-600">
            {bookmarks.length === 0
              ? "You haven’t saved any jobs yet."
              : `You have ${bookmarks.length} saved ${
                  bookmarks.length === 1 ? "job" : "jobs"
                }.`}
          </p>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-gray-600 text-lg">No jobs saved...</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {bookmarks.map((job) => (
              <div
                key={job._id}
                className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {job.title}
                  </h2>
                  <span className="text-sm font-medium text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>

                {/* Company & Meta */}
                <div className="mb-4">
                  <p className="text-lg font-semibold text-gray-800">
                    {job.company}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-gray-600 text-sm flex-wrap">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    {job.salary && <span>${job.salary.toLocaleString()}</span>}
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        Posted{" "}
                        {new Date(job.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed line-clamp-3 mb-6">
                  {job.description}
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <Link href={`/jobs/${job._id}`}>
                    <button className="bg-cyan-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-cyan-700 transition">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default savedJobs;
