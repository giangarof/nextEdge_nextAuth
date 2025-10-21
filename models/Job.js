import { Schema,model,models } from "mongoose";


const JobSchema = new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:[true,'Title is required']
    },
    salary:{
        type:Number,
    },
    description:{
        type:String,
    },
    location:{
        type:String,
        required:[true,'Location is required']
    },
    company:{
        type:String,
        required:[true,'Company is required']
    },
    type:{
        type:String,
    }

}, { timestamps:true})

const Job = models.Job || model('Job', JobSchema)
export default Job;