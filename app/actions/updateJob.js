'use server'
import connectDB from "@/config/database"
import Job from "@/models/Job"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const updateJob = async (jobId, formData) => {
    await connectDB()
    const sessionUser = await getSessionUser()
    if(!sessionUser || !sessionUser.userId){
        throw new Error('User ID is required')
    }
    const {userId} = sessionUser

    const existingJob = await Job.findById(jobId)
    if(existingJob.author.toString() !== userId){
        throw new Error("Unable to update. User doesn't own the job post")
    }


    // FormData from the Job submission
    const owner = userId
    const title = formData.get('title')
    const description = formData.get('description')
    const salary = formData.get('salary')
    const company = formData.get('company')
    const type = formData.get('type')
    const location = formData.get('location')

    // structured in an object
    const jobData = {
        author: owner,
        title: title, 
        description:description,
        location:location,
        salary: salary,
        company: company, 
        type: type
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, jobData)
    revalidatePath('/', 'layout')
    // redirect(`/`)
}

export default updateJob