import type {CourseInfoDto} from "../model/CourseInfoDto.ts";
import {createContext} from "react";


export interface CourseContext{
    courses:CourseInfoDto[];
    searchCoursesByKeyWord:(keyword:string) => void;
    getCourseById:(id:number) => CourseInfoDto;
}


export const CourseContext
    = createContext<CourseContext>({
    courses: [],
    searchCoursesByKeyWord: () => {},
    getCourseById: ()  => {
        return {} as CourseInfoDto;
    }
});