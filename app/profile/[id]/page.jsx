'use client'
import { useSession } from "next-auth/react";

const Profile = () => {
  const {data:session} = useSession()
    const user = {
        profileImage: "",
        name: "Gianmarco",
        company: "giga dev",
        role: "ceo",
        booksmark: [
           {
            author: "Jhon doe",
            title:"Fullstack developer",
            location:"remote",
            salary: 50000,
            company: 'oracle',
            description:"description template",
            type: "Full time"
        },
        {
            author: "Jhon doe",
            title:"Java developer",
            location:"remote",
            salary: 70000,
            company: 'oracle',
            description:"description template",
            type:"Internship"
        },
        {
            author: "Jhon doe",
            title:"Accountant",
            location:"MS",
            salary: 55000,
            company: 'oracle',
            description:"description template",
            type: "Temporary"
        },
        ]
    }
    return ( <>
      <div className="min-h-screen bg-gray-50 py-10">
          {/* Profile Section */}
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 text-center mb-10">
            <div className="flex flex-col items-center">
              {/* Profile Image */}
              <img
                src={session?.user?.image}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-cyan-100"
              />

              {/* User Info */}
              <h1 className="text-2xl font-semibold text-gray-800">{session?.user?.name}</h1>
              <p className="text-gray-600 mt-1">
                {user.company} &nbsp;|&nbsp; {user.role}
              </p>
            </div>
          </div>

          {/* Saved Jobs Section */}
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Saved Jobs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.booksmark.map((x, i) => (
                <div
                  key={i}
                  className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{x.title}</h3>
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