import { useParams, Link } from "react-router-dom";
import { CourseContext } from "../context/CourseContext.ts";
import { useContext } from "react";
import {CartContext} from "../context/CartContext.ts";

export default function CourseDetailsComponent() {
    const { id } = useParams();
    const { getCourseById } = useContext(CourseContext);
    const course = getCourseById(Number(id));
    const { addToCart } = useContext(CartContext);

    if (!course) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600 text-lg">Course not found.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">

                {/* Image */}
                <div className="w-full h-64 bg-gray-100">
                    <img
                        src={`data:image/jpeg;base64,${course.imageBase64}`}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>

                    <div className="flex items-center justify-between text-gray-600">
                        <p className="text-md">
                            <span className="font-semibold">Teacher:</span> <span className="capitalize">{course.teacherName}</span>
                        </p>
                        <p className="text-md">
                            <span className="font-semibold">Category:</span> {course.category}
                        </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed">{course.description}</p>

                    <div className="flex items-center justify-between mt-4">
                        <p className="text-xl font-semibold text-green-600">
                            Fees: ${course.fees}
                        </p>
                        <p className="text-gray-500">
                            {course.studentCount} students enrolled
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={() => addToCart(course)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition cursor-pointer"
                        >
                            Add to Cart
                        </button>

                        <Link
                            to="/"
                            className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition cursor-pointer"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
