import { useEffect, useState} from "react";
import type {CourseInfoDto} from "../model/CourseInfoDto.ts";
import {fetAllCourses} from "../service/NovaLearnService.ts";
import {CourseContext} from "./CourseContext.ts";


interface Props{
    children:React.ReactNode
}


export default function CourseContextProvider({children}:Props) {
    const [courses,setCourses]=useState<CourseInfoDto[]>([]);
    const [allCourses,setAllCourses]=useState<CourseInfoDto[]>([]);

    useEffect(() => {
        fetAllCourses()
            .then(res => {
                setCourses(res.data);
                setAllCourses(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    const getCourseById
        =(id:number)=>{
        return courses
            .find(course => course.courseId == id )as CourseInfoDto;
    }

    const searchCoursesByKeyWord
        =(keyword:string)=>{
        if(keyword.length == 0){
            setCourses(allCourses);
            return;
        }
        //title,category,teacherName
        const searchedCourses
            = courses.filter(course => course.title.toLowerCase()
                .includes(keyword.toLowerCase())
            || course.category.toLowerCase().includes(keyword.toLowerCase())
            || course.teacherName.toLowerCase().includes(keyword.toLowerCase()));
        setCourses(searchedCourses);


    }

    const value ={
        courses,
        searchCoursesByKeyWord,
        getCourseById
    }
    return (
        <>
            <CourseContext.Provider value={value}>
                {children}
            </CourseContext.Provider>

        </>
    );
}
