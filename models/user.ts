import { Schema, model } from "mongoose";
import { userType } from "../types";

const record :Record<keyof userType,any> = {
    fullName : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verificationCode:String,
    role:{
        type:String,
        enum:["student", "teacher"],
        required:true
    },
    canChangePassword:{
        type:Boolean,
        default:false
    },
    passwordCreationDate:Date,
    profileImage:String,
    courses:Array,
}


const users = new Schema(record,{timestamps:true})


users.post("save", function (doc:any ,next:any) {
    if (this.profileImage) {
        this.profileImage = `http://localhost:4000/${this.profileImage}`
    }
    next()
})

const Users = model("Users", users) 

export default Users