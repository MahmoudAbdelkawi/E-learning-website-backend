
// @desc      Enroll Course
// @route     /course/enrollCourse
// @access    POST/private

import { NextFunction, Request, Response } from "express";
import Courses from "../models/courses";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";
import Users from "../models/user";
import { CourseProgress } from "../types";
import expressAsyncHandler from "express-async-handler";

const enrollCourse = async (req: Request, res: Response , next:NextFunction) => {
    const courseProgress : CourseProgress = {
        progress: 0,
        rate : 0,
        totalSections: 0,
        comment : ""
    } ;
    const { courseId } = req.params;
    const { _id } = req.user;
    const user = await Users.findById(_id);
    const isEnrolled = user?.courses.filter((course:any) => course.courseId === courseId);
    if (isEnrolled.length > 0) {
        next(new ApiError("You Already Enrolled This Course", StatusCodes.BAD_REQUEST));
    }
    else {
        const course = await Courses.findById(courseId);
        if (course) {
            user?.courses.push({courseId : courseId, ...courseProgress,totalSections:course.sections.length});
            course.studentsId.push(_id);
            await user?.save();
            await course.save();
            res.status(StatusCodes.OK).json({ message: "You Enrolled Successfully" });
        }
        else {
            next(new ApiError("Course Not Found", StatusCodes.NOT_FOUND));
        }
    }

}


// @desc      Get Course
// @route     /course/:courseName
// @access    GET/public

const getCourse = async (req: Request, res: Response , next:NextFunction) => {
    

    const { courseName } = req.params;

    console.log(courseName);

    let page = 1 || req.query.page;

    let limit = 5 || req.query.limit;

    let skip = (page - 1) * limit;

    const course = await Courses.find({courseName}).populate("studentsId").populate("teacherId").skip(skip).limit(limit);
    console.log(course);
    if (course) {
        res.status(StatusCodes.OK).json({ course });
    }
    else {
        next(new ApiError("Course Not Found", StatusCodes.NOT_FOUND));
    }
}


// @desc      Get Course
// @route     /course/:courseId
// @access    GET/public

const getCourseById = async (req: Request, res: Response , next:NextFunction) => {
    const { courseId } = req.params;
    const course = await Courses.findById(courseId).populate("studentsId").populate("teacherId");
    if (course) {
        res.status(StatusCodes.OK).json({ course });
    }
    else {
        next(new ApiError("Course Not Found", StatusCodes.NOT_FOUND));
    }
}



// @desc      Get my Courses
// @route     /course/myCourses
// @access    GET/private

const getMyCourses = expressAsyncHandler(async (req: Request, res: Response , next:NextFunction) => {
    const { courses } = req.user;

    if (courses.length > 0) {
        const find = await Courses.findById(courses[0].courseId);
        console.log(find);
        let arr:any = []
        for(let course of courses){
            arr.push(await Courses.findById(course.courseId))
        }

        
            res.status(StatusCodes.OK).json({ courses: arr });
    }
    else {
        // next(new ApiError("You don't enroll in any courses yet", StatusCodes.NOT_FOUND));
        res.send({courses : []})
    }
})


// @desc      Increase Progress
// @route     /course/increaseProgress
// @access    PUT/private

const increaseProgress = expressAsyncHandler(async (req: Request, res: Response , next:NextFunction) => {
    const { courseId } = req.params;
    const { _id } = req.user;
    const user = await Users.findById(_id);
    // check if the course is enrolled (in my courses)
    const course = await Courses.findById(courseId);
    if (user && course) {
        const courseIndex = user.courses.map((course:any ,index:number) => {
            if(course.courseId === courseId)
            {
                return index
            }
        });

        const course = user.courses[courseIndex[0]];
        course.progress += 1;

        user.courses[courseIndex[0]] = course;
        await user.save();
        res.status(StatusCodes.OK).json({ message: "Progress Increased Successfully" });
    }   
    else {
        next(new ApiError("Course Not Found", StatusCodes.NOT_FOUND));
    }
})


// @desc     /course/addReview
// @route     /course/addReview
// @access    PUT/private

const addReview = async (req: Request, res: Response , next:NextFunction) => {
    const { courseId } = req.params;
    const { _id } = req.user;
    const user = await Users.findById(_id)
    // check if the course is enrolled (in my courses)
    
    const course = await Courses.findById(courseId);
    if (user && course) {
        const courseIndex = user.courses.map((course:any,index:number) => {if(course.courseId === courseId) return index});
        const course = user.courses[courseIndex[0]];
        course.comment = req.body.comment;
        course.rate = +req.body.rate;
        user.courses[courseIndex[0]] = course;
        await user.save();
        res.status(StatusCodes.OK).json({ message: "Review Added Successfully" });
    }
    else {
        next(new ApiError("Course Not Found", StatusCodes.NOT_FOUND));
    }
}

// @desc         show courses
// @route        /course/showAllCourses
// @access       GET/public

const showAllCourses = async (req: Request, res: Response , next:NextFunction) => {
    const courses = await Courses.find({}).populate("teacherId");
    
    res.status(StatusCodes.OK).json({ courses });
}



export { enrollCourse , getCourse , getMyCourses ,increaseProgress, addReview , showAllCourses  }