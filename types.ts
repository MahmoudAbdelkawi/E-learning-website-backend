import { Schema } from "mongoose"

interface userType{
    email:string,
    password:string,
    fullName:string,
    role?:string,
    passwordCreationDate?:Date,
    verificationCode?:string,
    canChangePassword?:boolean,
    profileImage?:string,
    courses?:Schema.Types.ObjectId[],
}

interface DecodedToken{
    id: Schema.Types.ObjectId,
    role: string,
    iat: Date,
    exp: Date
}

interface VerificationCode {
    email: string,
    subject: string,
    text: string
}

interface CoursesType{
    courseName:string,
    courseDescription:string,
    sections:any[],
    rate:number,
    teacherId:Schema.Types.ObjectId,
    studentsId:Schema.Types.ObjectId[],
    courseImage:string
}

interface CourseProgress{
    rate : number,
    progress : number, 
    comment : string,
    totalSections : number

}

export {userType,DecodedToken,VerificationCode, CoursesType,CourseProgress}

