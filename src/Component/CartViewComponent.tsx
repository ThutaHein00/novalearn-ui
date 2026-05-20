import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import type {CourseInfoDto} from "../model/CourseInfoDto.ts";
import {Link} from "react-router-dom";

export default function CartViewComponent() {
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-purple-800">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-purple-600 text-lg">Your cart is empty.</p>
            ) : (
                <div className="bg-purple-50 shadow-lg rounded-xl border border-purple-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-purple-100 border-b border-purple-200">
                        <tr>
                            <th className="p-4 text-purple-700 font-semibold">Course</th>
                            <th className="p-4 text-purple-700 font-semibold">Teacher</th>
                            <th className="p-4 text-purple-700 font-semibold">Fees</th>
                            <th className="p-4 text-purple-700 font-semibold">Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {cartItems.map((course: CourseInfoDto) => (
                            <tr
                                key={course.courseId}
                                className="border-b border-purple-200 hover:bg-purple-100 transition"
                            >
                                {/* Course Info */}
                                <td className="p-4 flex items-center gap-4">
                                    <img
                                        src={`data:image/jpeg;base64,${course.imageBase64}`}
                                        alt={course.title}
                                        className="w-20 h-20 object-cover rounded-lg border border-purple-200"
                                    />
                                    <div>
                                        <p className="font-semibold text-purple-800">
                                            {course.title}
                                        </p>
                                        <p className="text-sm text-purple-500">
                                            {course.category}
                                        </p>
                                    </div>
                                </td>

                                {/* Teacher */}
                                <td className="p-4 text-purple-700">
                                    {course.teacherName}
                                </td>

                                {/* Fees */}
                                <td className="p-4 text-purple-700 font-semibold">
                                    ${course.fees}
                                </td>

                                {/* Remove Button */}
                                <td className="p-4">
                                    <button
                                        onClick={() => removeFromCart(course.courseId)}
                                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition font-medium"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* Footer */}
                    <div className="p-4 flex justify-between items-center bg-purple-100 border-t border-purple-200">
                        <p className="text-lg font-semibold text-purple-800">
                            Total: $
                            {cartItems.reduce((sum, c) => sum + c.fees, 0)}
                        </p>
                        <Link
                            to="/login"
                            className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-semibold transition"
                        >
                            Enroll
                        </Link>

                        <button
                            onClick={clearCart}
                            className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-semibold transition me-20"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}