// course name

// course description

// sections ["artical", "link" , "artical" , "artical" ]

// rate 


import { Schema, model } from "mongoose";
import { CoursesType } from "../types";

const record :Record<keyof CoursesType,any> = {
    courseName:{
        type:String,
        required:[true,"course name is required"],
    },
    courseDescription:{
        type:String,
        required:[true,"course description is required"],
    },
    sections:{
        type:Array,
        required:[true,"sections is required"],
    },
    rate:{
        type:Number,
        required:[true,"rate is required"],
        default:0
    },
    teacherId:{
        type:Schema.Types.ObjectId,
        required:[true,"teacher id is required"],
        ref:"Users"
    },
    studentsId:{
        type:[Schema.Types.ObjectId , "Users"],
    },
    courseImage:{
        type:String,
        required:[true,"course image is required"],
    }
}


const courses = new Schema(record,{timestamps:true})


courses.post("save", function (doc:any ,next:any) {
    if (this.courseImage) {
        this.courseImage = `http://localhost:4000/${this.courseImage}`
    }
    next()
})

const Courses = model("Courses", courses) 

export default Courses