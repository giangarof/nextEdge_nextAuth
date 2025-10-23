'use client'
import { useState } from "react";
import updateJob from "@/app/actions/updateJob";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EditJob = ({job}) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const updateHandler = async (e) => {
        
        e.preventDefault(); // prevent default form submission
        setLoading(true)
        

        const form = e.target;
        const formData = new FormData(form); // collect form inputs
        try {
            
            await updateJob(job._id, formData);
            setLoading(false);
            setShowConfirm(false);
            toast.success('Job updated successfully')
            router.push(`/jobs/${job._id}`)
        } catch (error) {
            console.log(error)
            setLoading(false);
            toast.error('Job could not be updated')
        }
    }
    
    return ( <>
        <form
            id="edit-job-form"
            onSubmit={updateHandler}
            className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-8 mt-10 space-y-6"
            >
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                Edit Form
            </h2>

            <div className="flex flex-col">
                <label htmlFor="title" className="text-gray-700 font-medium mb-2">
                Title
                </label>
                <input
                id="title"
                name="title"
                type="text"
                defaultValue={job.title}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="salary" className="text-gray-700 font-medium mb-2">
                Salary
                </label>
                <input
                id="salary"
                name="salary"
                type="text"
                defaultValue={job.salary}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="location" className="text-gray-700 font-medium mb-2">
                Location
                </label>
                <input
                id="location"
                name="location"
                type="text"
                defaultValue={job.location}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="description" className="text-gray-700 font-medium mb-2">
                Description
                </label>
                <textarea
                name="description"
                id="description"
                defaultValue={job.description}
                className="border border-gray-300 rounded-lg px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="company" className="text-gray-700 font-medium mb-2">
                Company
                </label>
                <input
                id="company"
                name="company"
                type="text"
                defaultValue={job.company}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="type" className="text-gray-700 font-medium mb-2">
                Type
                </label>
                <select
                id="type"
                name="type"
                defaultValue={job.type}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Temporary</option>
                </select>
            </div>

            <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-cyan-600 transition"
            >
                Update Job
            </button>
            <button
                className="w-full bg-cyan-500 text-white font-semibold py-2 rounded-lg hover:bg-cyan-600 transition"
            >
                Go back
            </button>
        </form>

        {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Are you sure you want to update this job?
                    </h3>
                    <div className="flex justify-center gap-4">
                    <button
                        type="button"
                        onClick={() => setShowConfirm(false)}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        form="edit-job-form"
                        type="submit"
                        // onClick={() => updateHandler}
                        disabled={loading}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                        {loading ? "Updating..." : "Yes, Update"}
                    </button>
                    </div>
                </div>
                </div>
            )}
    </> );
}
 
export default EditJob;