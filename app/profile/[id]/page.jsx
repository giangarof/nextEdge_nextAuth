
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import Job from "@/models/Job";
import Link from "next/link";
import { convertToSerializableObject } from "@/utils/convertToObject";

const Profile = async () => {
  await connectDB()
  const userSession = await getSessionUser()
  const {user} = userSession
  const jobsDocs = await Job.find({author:user.id}).lean()
  const jobs = jobsDocs.map(convertToSerializableObject)

  console.log(jobs)
   
    return ( <>
      <div className="min-h-screen bg-gray-50 py-10">
          {/* Profile Section */}
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 text-center mb-10">
            <div className="flex flex-col items-center">
              {/* Profile Image */}
              <img
                src={user?.image}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-cyan-100"
              />

              {/* User Info */}
              <h1 className="text-2xl font-semibold text-gray-800">{user?.name}</h1>
              <p className="text-gray-600 mt-1">
                {user.company || "no company added"} &nbsp;|&nbsp; {user.role || "no role added"}
              </p>
              <p className="text-gray-600 mt-1">{user.email}</p>
              <button className="cursor-pointer mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg">edit profile</button>
            </div>
          </div>

          {/* Saved Jobs Section */}
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              My Jobs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.reverse().map((x, i) => (
                <div
                  key={i}
                  className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                > 
                  <Link href={`/jobs/${x._id}`}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{x.title}</h3>
                  </Link>
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
          </div>
      </div>

    </> );
}
 
export default Profile;