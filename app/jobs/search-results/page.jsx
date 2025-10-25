import connectDB from "@/config/database";
import Job from "@/models/Job";
import { convertToSerializableObject } from "@/utils/convertToObject";
import Link from "next/link";
import Header from "@/components/Header";

const SearchResults = async ({ searchParams: { job, jobType } }) => {
  await connectDB();
  const jobPattern = new RegExp(job, "i");
  let query = {
    $or: [
      { title: jobPattern },
      //   { salary: jobPattern },
      { company: jobPattern },
    ],
  };

  if (jobType && jobType !== "All") {
    const typePattern = new RegExp(jobType, "i");
    query.type = typePattern;
  }

  const jobResult = await Job.find(query).lean();
  const jobs = convertToSerializableObject(jobResult);
  console.log(jobs);

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {jobs.length ? (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <Link href={`/jobs/${job._id}`} className="block mb-2">
                <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                  {job.title}
                </h2>
              </Link>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {job.description}
              </p>

              <div className="text-sm text-gray-500 flex flex-wrap gap-2">
                {job.location && (
                  <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded-md">
                    {job.location}
                  </span>
                )}
                {job.company && (
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                    {job.company}
                  </span>
                )}
                <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md">
                  {job.type || "Full-time"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full mt-10">
            No jobs found for your search.
          </p>
        )}
      </div>
    </>
  );
};

export default SearchResults;
