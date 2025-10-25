"use client";
import { use, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchBar = ({ placeholder }) => {
  const [queryJob, setQueryJob] = useState("");
  const [queryType, setQueryType] = useState("All");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (queryJob === "" && queryType === "All") {
      router.push("/");
    } else {
      const res = `?job=${queryJob}&jobType=${queryType}`;
      router.push(`/jobs/search-results${res}`);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-stretch w-full max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition"
      >
        {/* 🔍 Search input */}
        <div className="flex items-center flex-grow px-4 py-3">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <input
            type="text"
            value={queryJob}
            onChange={(e) => setQueryJob(e.target.value)}
            placeholder={placeholder || "Search job titles, keywords..."}
            className="w-full bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* 🧩 Divider (mobile hidden) */}
        <div className="hidden md:block w-px bg-gray-200 my-2" />

        {/* 🏷️ Job Type dropdown */}
        <div className="px-4 py-3 border-t md:border-t-0 md:border-l border-gray-200">
          <label htmlFor="job-type" className="sr-only">
            Job Type
          </label>
          <select
            id="job-type"
            className="w-full bg-transparent text-gray-700 focus:outline-none"
            value={queryType}
            onChange={(e) => setQueryType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Temporary">Temporary</option>
          </select>
        </div>

        {/* 🔘 Submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold px-6 py-3 hover:bg-blue-600 transition md:rounded-none md:rounded-r-2xl"
        >
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
