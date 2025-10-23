'use client'
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";
import { useState } from "react";
import deleteJob from "@/app/actions/deleteJob";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const JobDetail = ({job: initial}) => {
    const [job, setJob] = useState(initial)
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const deletehandler = async (id) => {
        setLoading(true);
        try {
            await deleteJob(id); // call server action
            
            setLoading(false);
            setShowConfirm(false);
            toast.success('Job deleted successfully')
            router.push("/")
        } catch (err) {
            setLoading(false);
            alert("Failed to delete job");
  }
    }
    return ( <>
        <main className="max-w-3xl mx-auto p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{job?.title}</h1>
                <span className="text-sm font-medium text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full">
                    {job?.type}
                </span>
                </div>

                {/* Company & Meta */}
                <div className="mb-6">
                <p className="text-lg font-semibold text-gray-800">{job?.company}</p>
                <div className="flex items-center gap-4 mt-2 text-gray-600">
                    <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job?.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                    <span>${job?.salary.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>
                        Posted on{" "}
                        {new Date(job?.createdAt).toLocaleDateString(undefined, {
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
                    <p className="text-gray-700 leading-relaxed">{job?.description}</p>
                </div>
                
                {/* Buttons */}
                <div className="flex mt-8 gap-5">
                    <button className="cursor-pointer bg-green-600 text-white px-6 py-3 rounded-xl font-medium">
                        Apply Now
                    </button>
                    
                    <Link href={`/jobs/edit/${job._id}`}>
                        <button 
                            className="cursor-pointer bg-cyan-600 text-white px-6 py-3 rounded-xl font-medium">
                            Edit
                        </button>
                    </Link>

                    <button 
                        className="cursor-pointer bg-red-600 text-white px-6 py-3 rounded-xl font-medium"
                        onClick={() => setShowConfirm(true)}
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Are you sure you want to delete this job?
                    </h3>
                    <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setShowConfirm(false)}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => deletehandler(job?._id)}
                        disabled={loading}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                        {loading ? "Deleting..." : "Yes, Delete"}
                    </button>
                    </div>
                </div>
                </div>
            )}
        </main>
    </> );
}
 
export default JobDetail;