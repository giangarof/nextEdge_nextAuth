import Job from "@/models/Job";
import connectDB from "@/config/database";
import EditJob from "@/components/JobEditForm";
import { getSessionUser } from "@/utils/getSessionUser";
import { convertToSerializableObject } from "@/utils/convertToObject";

const EditJobForm = async ({params}) => {
    await connectDB()
    // const userSession = await getSessionUser()
    // const {user} = userSession
   
    const jobsDocs = await Job.findById(params.id).lean()
    const job = convertToSerializableObject(jobsDocs)
    console.log(job)
    return ( <>
        <EditJob job={job}/>
    
    
    </> );
}
 
export default EditJobForm;