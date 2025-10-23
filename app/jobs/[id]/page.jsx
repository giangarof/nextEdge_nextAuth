
import connectDB from "@/config/database";
import Job from "@/models/Job";
import JobDetail from "@/components/JobDetail";
import { convertToSerializableObject } from "@/utils/convertToObject";



const JobDetails = async({params}) => {
    await connectDB()
    const job = await Job.findById(params.id).lean()
    const plainJob = convertToSerializableObject(job)
    return ( <>
        <JobDetail job={plainJob}/>
    </> );
}
 
export default JobDetails;