import {type FormEvent, useState} from "react";
import type {CourseLessonsDto} from "../../model/CourseLessonsDto.ts";
import {useParams} from "react-router-dom";
import {createLesson} from "../../service/NovaLearnService.ts";


export default function LessonsEntry() {

    const [lesson,setLesson] = useState<CourseLessonsDto>({
        subTitle:'',
        lessonLink:''
    });
    const {id} = useParams();
    const addLessonHandler
        = (e :FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(id){
            createLesson(lesson,Number(id))
                .then(res => {
                    console.log(res.data);
                    setLesson({
                        subTitle:'',
                        lessonLink:''
                    })
                })
                .catch(err => console.log(err));
        }

    }
    return (
        // Added a container with padding, max-width, and centering for a better layout
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            {/* Form container: a white card with shadow and rounded corners */}
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl">
                <h2 className="text-3xl font-extrabold text-purple-800 mb-6 text-center">
                    Add New Lesson
                </h2>

                <form onSubmit={addLessonHandler} className="space-y-6">
                    {/* Lesson Title Field Group */}
                    <div>
                        <label
                            className="block text-sm font-semibold text-gray-700 mb-2"
                            htmlFor="lesson-title"
                        >
                            Lesson Title
                        </label>
                        <input
                            id="lesson-title"
                            type="text"
                            value={lesson.subTitle}
                            onChange={(e) => setLesson({...lesson,subTitle:e.target.value})}
                            // Enhanced input styling: border, padding, focus ring, transition
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-150 ease-in-out"
                            placeholder="e.g., Introduction to React Hooks"
                            required
                        />
                    </div>

                    {/* Lesson Link Field Group */}
                    <div>
                        <label
                            className="block text-sm font-semibold text-gray-700 mb-2"
                            htmlFor="lesson-link"
                        >
                            Lesson Link (URL)
                        </label>
                        <input
                            id="lesson-link"
                            type="url" // Changed to 'url' for better mobile keyboard/validation
                            value={lesson.lessonLink}
                            onChange={(e) => setLesson({...lesson,lessonLink:e.target.value})}
                            // Enhanced input styling
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-150 ease-in-out"
                            placeholder="https://youtube.com/watch?v=..."
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        // Enhanced button styling: strong purple, shadow, hover effect, focus ring
                        className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-purple-300"
                    >
                        Save Lesson
                    </button>
                </form>

                {/* Optional: Displaying the course ID for context */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Adding lesson to Course ID: <span className="font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded">{id}</span>
                </p>
            </div>
        </div>
    );
}