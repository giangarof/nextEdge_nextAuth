import addJob from "@/app/actions/addJob";

const AddPost = () => {
    return (
        <form
            action={addJob}
            className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-8 mt-10 space-y-6"
            >
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                Add a New Job
            </h2>

            <div className="flex flex-col">
                <label htmlFor="title" className="text-gray-700 font-medium mb-2">
                Title
                </label>
                <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter job title"
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
                placeholder="Enter salary"
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
                placeholder="Enter location"
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
                placeholder="Write a short job description"
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
                placeholder="Enter company name"
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
                type="submit"
                className="w-full bg-cyan-500 text-white font-semibold py-2 rounded-lg hover:bg-cyan-600 transition"
            >
                Add Job
            </button>
        </form>

    
     );
}
 
export default AddPost;