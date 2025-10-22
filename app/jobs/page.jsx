// 'use client'
import Jobs from "@/components/Jobs";
import connectDB from "@/config/database";
import Job from "@/models/Job";

const jobs = async() => {
    await connectDB();
    const jobs = await Job.find({})
    console.log(jobs)
    return ( <>
    <main className="min-h-screen bg-gray-50 py-10">

        <Jobs jobs={jobs}/>
    </main>
    </> );
}
 
export default jobs;