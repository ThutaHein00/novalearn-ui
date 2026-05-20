import {useEffect, useState} from "react";
import type {CourseLessonsDto} from "../../model/CourseLessonsDto.ts";
import {listAllLessons} from "../../service/NovaLearnService.ts";
import {useParams} from "react-router-dom";


export default function LessonEdit() {
    const [lessons,setLessons] = useState<CourseLessonsDto[]>([]);
    const {id} = useParams();

    useEffect(() => {
        if(id){
            listAllLessons(Number(id))
                .then(res =>{
                    setLessons(res.data);

                })
                .catch(err => {
                    console.error("Error fetching lessons:", err);
                });
        }
    }, [id]);

    // Simple handler placeholder for future edit/delete actions
    const handleAction = (lesson: CourseLessonsDto, action: 'edit' | 'delete') => {
        console.log(`${action} lesson:`, lesson.subTitle);
        // Implement modal open or API call here
    };

    // Handler for the new "Watch Lesson" button
    const handleWatchLesson = (lessonLink: string) => {
        window.open(lessonLink, '_blank');
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">

            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center border-b-4 border-purple-200 pb-4">
                📝 Edit Course Lessons (ID: <span className="text-purple-600">{id}</span>)
            </h1>

            {/* List Group Container */}
            <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(168,85,247,0.1)] overflow-hidden">
                {lessons.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-xl font-medium">
                        <p>😔 No lessons have been added to this course yet.</p>
                        <p className="mt-2 text-sm">Use the "Add Lessons" button on the course list page.</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {lessons.map((lesson, index) => (
                            // List Group Item
                            <li
                                key={index}
                                className="p-4 sm:p-6 flex justify-between items-center transition duration-200 hover:bg-purple-50"
                            >
                                {/* Lesson Content */}
                                <div className="flex-1 min-w-0 mr-4">
                                    <p className="text-lg font-semibold text-gray-900 flex items-center mb-1">
                                        {/* Lesson Number/Icon */}
                                        <span className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-purple-500 text-white text-sm font-bold mr-3 shadow-md">
                                            {index + 1}
                                        </span>
                                        {lesson.subTitle}
                                    </p>

                                    {/* Link converted to a Watch Button */}
                                    <button
                                        onClick={() => handleWatchLesson(lesson.lessonLink)}
                                        className="inline-flex items-center px-3 py-1 ml-9 rounded-full text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200 transition"
                                        aria-label={`Watch lesson: ${lesson.subTitle}`}
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.795v6.41a1 1 0 01-1.447.808L15 14M5 18H3a2 2 0 01-2-2V8a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H5z"></path></svg>
                                        Watch Lesson
                                    </button>
                                </div>

                                {/* Actions */}
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => handleAction(lesson, 'edit')}
                                        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200"
                                        aria-label={`Edit ${lesson.subTitle}`}
                                    >
                                        {/* Edit Icon */}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                    </button>

                                    <button
                                        onClick={() => handleAction(lesson, 'delete')}
                                        className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition shadow-md focus:outline-none focus:ring-4 focus:ring-red-200"
                                        aria-label={`Delete ${lesson.subTitle}`}
                                    >
                                        {/* Delete Icon */}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}