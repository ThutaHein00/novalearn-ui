import { useEffect, useState } from "react";
import type { CourseLessonsDto } from "../model/CourseLessonsDto.ts";
import { useParams } from "react-router-dom";
import { listAllLessons } from "../service/NovaLearnService.ts";

export default function LearnLessonsComponent() {
    const [lessons, setLessons] = useState<CourseLessonsDto[]>([]);
    const [activeLesson, setActiveLesson] = useState<CourseLessonsDto | null>(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            listAllLessons(Number(id))
                .then(res => {
                    setLessons(res.data);
                    // Automatically play the first lesson if available
                    if (res.data.length > 0) {
                        setActiveLesson(res.data[0]);
                    }
                })
                .catch(err => {
                    console.error("Error fetching lessons:", err);
                });
        }
    }, [id]);

    return (
        <div className="min-h-screen bg-purple-50 flex flex-col lg:flex-row">
            {/* Main Content Area: Video Player */}
            <main className="grow p-4 lg:p-8">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video mb-6">
                        {activeLesson ? (
                            <iframe
                                className="w-full h-full"
                                src={activeLesson.lessonLink}
                                title={activeLesson.subTitle}
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-purple-200">
                                Select a lesson to start learning
                            </div>
                        )}
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100">
                        <h1 className="text-2xl font-bold text-purple-900 mb-2">
                            {activeLesson?.subTitle || "Welcome to the Course"}
                        </h1>
                        <p className="text-purple-600">
                            Course ID: <span className="font-mono">{id}</span>
                        </p>
                    </div>
                </div>
            </main>

            {/* Sidebar: Lesson List */}
            <aside className="w-full lg:w-96 bg-white border-l border-purple-100 h-screen sticky top-0 overflow-y-auto">
                <div className="p-6 border-b border-purple-50">
                    <h2 className="text-xl font-bold text-purple-900">Course Content</h2>
                    <p className="text-sm text-purple-500">{lessons.length} Lessons</p>
                </div>
                <div className="divide-y divide-purple-50">
                    {lessons.map((lesson, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveLesson(lesson)}
                            className={`w-full flex items-center p-4 transition-colors hover:bg-purple-50 text-left ${
                                activeLesson?.subTitle === lesson.subTitle 
                                ? "bg-purple-100 border-r-4 border-purple-600" 
                                : ""
                            }`}
                        >
                            <div className={`mr-4 shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                activeLesson?.subTitle === lesson.subTitle 
                                ? "bg-purple-600 text-white" 
                                : "bg-purple-200 text-purple-700"
                            }`}>
                                {index + 1}
                            </div>
                            <div className="grow">
                                <p className={`text-sm font-semibold ${
                                    activeLesson?.subTitle === lesson.subTitle 
                                    ? "text-purple-900" 
                                    : "text-gray-700"
                                }`}>
                                    {lesson.subTitle}
                                </p>
                                <span className="text-xs text-purple-400 flex items-center mt-1">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                    </svg>
                                    Video Lesson
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </aside>
        </div>
    );
}