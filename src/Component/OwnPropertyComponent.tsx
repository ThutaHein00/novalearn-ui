import { useEffect, useState } from "react";
import type { CourseInfoDto } from "../model/CourseInfoDto.ts";
import { getEnrolledCourses } from "../service/NovaLearnService.ts";
import { getLoggedInUserName } from "../service/AuthService.ts";
import { useNavigate } from "react-router-dom";

export default function OwnPropertyComponent() {
    const [enrolledCourses, setEnrolledCourses] = useState<CourseInfoDto[]>([]);
    const loggedInUsername = getLoggedInUserName();
    const navigator = useNavigate();

    useEffect(() => {
        if (loggedInUsername) {
            getEnrolledCourses(loggedInUsername)
                .then(res => {
                    setEnrolledCourses(res.data);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [loggedInUsername]);

    const handleViewCourse = (courseId: number) => {
        navigator(`/learn-lessons/course/${courseId}`);
    };

    return (
        <div className="min-h-screen bg-purple-50 p-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-purple-900">My Enrolled Courses</h1>
                    <p className="text-purple-600">Continue where you left off, {loggedInUsername}.</p>
                </header>

                {enrolledCourses.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-purple-100">
                        <p className="text-purple-400">You haven't enrolled in any courses yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {enrolledCourses.map((course) => (
                            <div 
                                key={course.courseId} 
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-purple-100 flex flex-col"
                            >
                                {/* Image Container */}
                                <div className="h-48 overflow-hidden bg-purple-200">
                                    {course.imageBase64 ? (
                                        <img 
                                            src={`data:image/png;base64,${course.imageBase64}`} 
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-purple-400">
                                            No Image Available
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                                            {course.category}
                                        </span>
                                        <span className="text-sm font-medium text-purple-500">
                                            {course.studentCount} Students
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                                        {course.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 grow">
                                        {course.description}
                                    </p>
                                    <div className="flex items-center mb-4">
                                        <div className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center text-white text-xs mr-2">
                                            {course.teacherName.charAt(0)}
                                        </div>
                                        <span className="text-sm text-gray-700 font-medium">
                                            {course.teacherName}
                                        </span>
                                    </div>

                                    <div className="pt-4 border-t border-purple-50 flex justify-between items-center">
                                        <span className="text-lg font-bold text-purple-700">
                                            ${course.fees.toFixed(2)}
                                        </span>
                                        <button onClick={() => handleViewCourse(course.courseId)} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                                        { loggedInUsername? 'learn' : 'ViewCourse'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}