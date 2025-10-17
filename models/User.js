import { Schema,model,models } from "mongoose";

const UserSchema = new Schema({
    username:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        unique:[true, 'Email already exists'],
        required:[true,'Email is required']
    },
    profileImage:{
        type:String
    },
    company: {
        type:String
    },
    role:{
        type:String
    },
    bookmarks:[
        {
            type:Schema.Types.ObjectId,
            ref:"Job"
        }
    ]
}, { timestamps:true})

const User = models.User || model('User', UserSchema)
export default User;