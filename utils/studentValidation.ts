import { check } from "express-validator";
import Courses from "../models/courses";

const courseIsFound = check('courseId').custom(async(courseId:string)=>{
    const course = await Courses.findById(courseId)
    if (!course) {
        return Promise.reject("Course Not Found")
    }
    return true
})

const review = check('rate').isFloat({min:0 , max : 5}).withMessage("Review should be between 0 and 5")


export {courseIsFound, review}