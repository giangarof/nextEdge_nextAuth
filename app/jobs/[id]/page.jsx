

import connectDB from "@/config/database";
import Job from "@/models/Job";
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";

const JobDetails = async({params}) => {
    await connectDB()
    const job = await Job.findById(params.id).lean()
    console.log(job)
    return ( <>
        <main className="max-w-3xl mx-auto p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                <span className="text-sm font-medium text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full">
                    {job.type}
                </span>
                </div>

                {/* Company & Meta */}
                <div className="mb-6">
                <p className="text-lg font-semibold text-gray-800">{job.company}</p>
                <div className="flex items-center gap-4 mt-2 text-gray-600">
                    <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>${job.salary.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>
                        Posted on{" "}
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
                <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">Job Description</h2>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
                </div>

                {/* Apply Button */}
                <div className="flex mt-8 gap-5">
                <button className="cursor-pointer bg-green-600 text-white px-6 py-3 rounded-xl font-medium">
                    Apply Now
                </button>

                <button className="cursor-pointer bg-cyan-600 text-white px-6 py-3 rounded-xl font-medium">
                    Edit
                </button>

                <button className="cursor-pointer bg-red-600 text-white px-6 py-3 rounded-xl font-medium">
                    Delete
                </button>
                </div>
            </div>
        </main>
    </> );
}
 
export default JobDetails;