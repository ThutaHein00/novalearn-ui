import {useContext, useState} from "react";
import type {CourseInfoDto} from "../model/CourseInfoDto.ts";
import { Link } from "react-router-dom";
import {CourseContext} from "../context/CourseContext.ts";

// --- Star Rating Component ---
const getRatingStars = (rating: number, reviewCount: number) => {
    // Clamp rating between 0 and 5
    const normalizedRating = Math.max(0, Math.min(5, rating));
    const fullStars = Math.floor(normalizedRating);
    const hasHalfStar = normalizedRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    // Full Stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(<svg key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.425 8.204 1.192-5.952 5.808 1.403 8.163-7.323-3.856-7.323 3.856 1.403-8.163-5.952-5.808 8.204-1.192z"/></svg>);
    }
    // Half Star (using a mask/gradient for pure SVG half star)
    if (hasHalfStar) {
        stars.push(<svg key="half" className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.425 8.204 1.192-5.952 5.808 1.403 8.163-7.323-3.856v-15.011z" fill="url(#half-gradient)"/><defs><linearGradient id="half-gradient"><stop offset="50%" stopColor="#f59e0b"/><stop offset="50%" stopColor="#d1d5db"/></linearGradient></defs></svg>);
    }
    // Empty Stars
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.425 8.204 1.192-5.952 5.808 1.403 8.163-7.323-3.856-7.323 3.856 1.403-8.163-5.952-5.808 8.204-1.192zM12 17.618l4.312 2.274-.82-4.78 3.472-3.39-4.809-.7L12 5.385 9.845 10.94l-4.809.7 3.472 3.39-.82 4.78z"/></svg>);
    }

    return (
        <div className="flex items-center space-x-2 text-sm">
            <span className="font-bold text-yellow-700">{normalizedRating.toFixed(1)}</span>
            <div className="flex">{stars}</div>
            <span className="text-gray-500">({reviewCount.toLocaleString()})</span>
        </div>
    );
};

// --- CourseCard Component ---
function CourseCard({ course }: { course: CourseInfoDto & { rating?: number, reviewCount?: number } }) {
    // Dummy data for rating demonstration
    const dummyRating = course.courseId % 5 + 3.5;
    const dummyReviewCount = (course.courseId % 100) * 100 + 500;

    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden transition duration-300 transform hover:scale-[1.02] hover:shadow-2xl border border-gray-100">
            <div className="relative h-40 overflow-hidden">
                <img
                    src={`data:image/jpeg;base64,${course.imageBase64}`}
                    alt={course.title}
                    className="w-full h-full object-cover transition duration-500 ease-in-out hover:opacity-90"
                />
                {course.fees === 0 && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                        FREE
                    </span>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 min-h-[3rem]">
                    {course.title}
                </h3>
                <div className="mt-1 mb-2">
                    {getRatingStars(dummyRating, dummyReviewCount)}
                </div>
                <p className="text-sm text-gray-600 mb-3">
                    By <span className="font-medium text-purple-700">{course.teacherName}</span>
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mt-2 border-t pt-3">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path></svg>
                        <span className="font-semibold text-gray-700">
                            {course.studentCount.toLocaleString()}
                        </span>
                        <span className="ml-1">Students</span>
                    </div>
                    <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                        {course.category}
                    </span>
                </div>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                <span className="text-xl font-extrabold text-gray-900">
                    {course.fees.toLocaleString()} MMK
                </span>
                <Link
                    to={`/course/${course.courseId}`}
                    className="bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-150 shadow-md"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}


// --- Main Component ---
export default function HomeComponent() {

    const {courses, searchCoursesByKeyWord} = useContext(CourseContext);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = event.target.value;
        // FIX CONFIRMED: Always update the state and call the search function.
        // If keyword is empty, searchCoursesByKeyWord('') resets the filter.
        setSearchTerm(keyword);
        searchCoursesByKeyWord(keyword);
        console.log(`CLLED ===============`,keyword);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        searchCoursesByKeyWord('');
    };

    const isSearchActive = searchTerm.length > 0;

    const categories = ['Development', 'Design', 'Marketing', 'Business', 'Photography', 'Music', 'Health & Fitness'];

    return (
        <div className="min-h-screen bg-gray-50 py-10 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero / Heading Section */}
                <header className="text-center mb-10">
                    <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                        Explore Our Top-Rated Courses
                    </h1>
                    <p className="mt-3 text-xl text-gray-600 max-w-2xl mx-auto">
                        Learn the latest skills in tech, business, and creativity from industry experts.
                    </p>
                </header>

                {/* 🔍 Search Bar Section */}
                <div className="flex justify-center mb-6">
                    <div className="w-full max-w-2xl relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full border-2 border-purple-300 rounded-full py-4 pl-12 pr-6 text-lg placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition duration-150 shadow-lg"
                            placeholder="What do you want to learn today? E.g., React, Python, Marketing..."
                            aria-label="Search courses by keyword"
                        />
                        {/* Search Icon */}
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>

                        {/* Clear Search Button */}
                        {isSearchActive && (
                            <button
                                onClick={handleClearSearch}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition duration-150"
                                aria-label="Clear search"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* 🏷️ Categories/Filter Section */}
                <div className="mb-12">
                    <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-hide justify-center">
                        <button
                            onClick={handleClearSearch} // Use the clear handler for All Courses
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition duration-200 shadow-md ${
                                !isSearchActive
                                    ? 'bg-purple-600 text-white ring-2 ring-purple-300'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }`}
                        >
                            All Courses
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => {setSearchTerm(category); searchCoursesByKeyWord(category);}}
                                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition duration-200 shadow-md ${
                                    searchTerm === category
                                        ? 'bg-purple-600 text-white ring-2 ring-purple-300'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>


                {/* Course Grid Section */}
                <section className="mt-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-purple-500 pl-3">
                        {isSearchActive ? `Results for "${searchTerm}" (${courses.length})` : "Popular Courses"}
                    </h2>

                    {courses.length > 0 ? (
                        /* Responsive Course Grid */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {courses.map(course => (
                                <CourseCard key={course.courseId} course={course} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-gray-100">
                            <p className="text-2xl text-gray-500 font-medium">
                                😔 Sorry, no courses found matching "{searchTerm}".
                            </p>
                            <p className="mt-2 text-md text-gray-400">Try a different keyword or check our categories.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}