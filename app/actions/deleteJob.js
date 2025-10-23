'use server'

import connectDB from "@/config/database"
import Job from "@/models/Job"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

async function deleteJob(jobId) {
    await connectDB()
    const sessionUser = await getSessionUser()
    const job = await Job.findById(jobId)

    if(!job){
        throw new Error("Job doesn't exist")
    }

    if(!sessionUser || !sessionUser.userId){
        throw new Error('user id is required')
    }
    const {userId} = sessionUser;

    // verify ownership
    if (job.author.toString() != userId){
        throw new Error("Unauthorized")
    }
    await job.deleteOne()

    revalidatePath('/', 'layout')
}

export default deleteJob;