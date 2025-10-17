
const Jobs = ({jobs}) => {
    // console.log(jobs)
    
    return ( <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {jobs.map((x, i) => (
                <div
                key={i}
                className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{x.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{x.description}</p>

                <div className="text-sm text-gray-500 flex flex-wrap gap-2">
                    <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded-md">
                    {x.location}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                    {x.company}
                    </span>
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md">
                    {x.type || "Full-time"}
                    </span>
                </div>
                </div>
            ))}
        </div>

    
    </> );
}
 
export default Jobs;