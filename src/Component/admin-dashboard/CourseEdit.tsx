import {useEffect, useState} from "react";
import type {CourseInfoDto} from "../../model/CourseInfoDto.ts";
import {editCourse, listAllCourses} from "../../service/NovaLearnService.ts";
import {getLoggedInUserName} from "../../service/AuthService.ts";
import type {CourseEdit} from "../../model/CourseEdit.ts";
import {Link} from "react-router-dom";

export default function CourseEdit() {
    const [courseInfoDtos, setCourseInfoDtos] = useState<CourseInfoDto[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<CourseInfoDto | null>(null);
    const [title,setTitle] = useState<string>('');
    const [fees,setFees] = useState<number>(0);

    const fetchAllCourses = () =>{
        listAllCourses(getLoggedInUserName()!)
            .then((res) => setCourseInfoDtos(res.data))
            .catch((err) => console.error("Error fetching courses:", err));
    }

    useEffect(() => {
        fetchAllCourses();
    }, []);

    const openEditModal = (course: CourseInfoDto) => {
        // Set state for default values when opening the modal
        setTitle(course.title);
        setFees(course.fees);
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
    };

    const courseEditHandler = () =>{
        // Use current state values (title/fees) which were pre-filled in openEditModal
        const courseEdit:CourseEdit = {
            // Note: fees should not be 0 if the user didn't change it,
            // but the current implementation uses state which is updated via input.
            // A more robust check might be needed if inputs can be empty/invalid.
            title: title as string,
            fees: fees as number
        }

        editCourse(courseEdit,selectedCourse?.courseId as number)
            .then((res) => {
                console.log("Course updated:", res.data);
                fetchAllCourses(); // Refresh the list
                closeModal();
            })
            .catch((err) => console.error("Error updating course:", err));
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                📝 Course Management
            </h1>

            {/* Main Content Card: Enhanced Shadow and Background */}
            <div className="max-w-7xl mx-auto rounded-3xl shadow-[0_10px_40px_rgba(168,85,247,0.2)] bg-white p-8">

                {/* Table Header/Controls (Optional: Add a search bar or "Add Course" button here) */}
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-purple-700">Course List</h2>
                    {/* Placeholder for future buttons */}
                </div>

                {/* Table Container: Clean borders and rounded corners */}
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        {/* Table Head */}
                        <thead>
                        <tr className="bg-purple-100/70 text-left text-xs font-semibold uppercase tracking-wider text-purple-800">
                            <th className="px-6 py-4">#</th>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4 text-right">Fees</th>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-gray-100 bg-white">
                        {courseInfoDtos.map((course, index) => (
                            <tr key={course.courseId} className="hover:bg-purple-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 text-base font-medium text-gray-900">
                                    {course.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                        {course.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700 text-right">
                                    {course.fees.toLocaleString()} MMK
                                </td>
                                <td className="px-6 py-4">
                                    <img
                                        src={`data:image/jpeg;base64,${course.imageBase64}`}
                                        alt={`Image for ${course.title}`}
                                        className="h-14 w-14 rounded-full object-cover ring-2 ring-purple-300/50 shadow-md"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                    <div className="flex space-x-3 justify-center">

                                        {/* Edit Button */}
                                        <button
                                            onClick={() => openEditModal(course)}
                                            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition shadow-sm"
                                            aria-label={`Edit ${course.title}`}
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                            Edit
                                        </button>

                                        {/* Add Lessons Button */}
                                        <Link to={`/admin-dashboard/lessons-entry/${course.courseId}`}
                                              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition shadow-sm">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                            Add Lessons
                                        </Link>

                                        {/* Edit Lessons Button */}
                                        <Link to={`/admin-dashboard/lesson-edit/${course.courseId}`}
                                              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition shadow-sm">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                            Edit Lessons
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 💎 EDIT MODAL (Enhanced) */}
            {isModalOpen && selectedCourse && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
                    // Optional: Add an onClick handler here to close the modal when clicking outside
                >
                    <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl transform scale-100 transition-all duration-300 p-8">

                        <h2 className="text-2xl font-extrabold text-purple-700 border-b pb-3 mb-6">
                            Edit Course: <span className="text-gray-900 font-semibold">{selectedCourse.title}</span>
                        </h2>

                        <div className="space-y-5">
                            {/* Title Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-title">
                                    Course Title
                                </label>
                                <input
                                    id="edit-title"
                                    type="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    // Use the state value for controlled input, initialized with default values
                                    value={title}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                                    placeholder="Enter new course title"
                                />
                            </div>

                            {/* Fees Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-fees">
                                    Fees (MMK)
                                </label>
                                <input
                                    id="edit-fees"
                                    type="number"
                                    onChange={(e) => setFees(Number(e.target.value))}
                                    // Use the state value for controlled input, initialized with default values
                                    value={fees}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                                    placeholder="Enter new course fees"
                                    min="0"
                                />
                            </div>
                        </div>

                        {/* Modal Action Buttons */}
                        <div className="flex justify-end mt-8 pt-4 border-t border-gray-200">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition duration-150 shadow-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={courseEditHandler}
                                className="px-6 py-2 ml-4 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition duration-150 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}