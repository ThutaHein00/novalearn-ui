import { useContext } from "react";
import { CartContext } from "../context/CartContext.ts";
import { getLoggedInUserName } from "../service/AuthService.ts";
import type { EnrolledCourseDto } from "../model/EnrolledCourseDto.ts";
import { enrollCourse } from "../service/NovaLearnService.ts";
import { useNavigate } from "react-router-dom";

export default function EnrolledSuccessComponent() {
    const { getCourseId, cartItems } = useContext(CartContext);
    const courseArray = getCourseId();
    const studentName = getLoggedInUserName()!;
    const navigator = useNavigate();

    const enrolledCourseHandler = () => {
        const enrolledCourseDto: EnrolledCourseDto = {
            courseIdArray: courseArray,
            studentName: studentName
        };

        enrollCourse(enrolledCourseDto)
            .then(res => {
                console.log(res.data);
                navigator("/enrolled-success"); 
            })
            .catch(err => console.log(err));
    };

    const totalCost = cartItems.reduce((total, item) => total + item.fees, 0);

    return (
        <div className="flex justify-center items-center min-h-[70vh] p-6">
            <div className="bg-purple-50 border border-purple-200 shadow-lg rounded-xl p-8 max-w-lg w-full text-center">

                <h2 className="text-2xl font-bold text-purple-800 mb-4">
                    Enrollment Summary
                </h2>

                <p className="text-purple-700 text-lg mb-2">
                    You are about to enroll in <span className="font-semibold">{courseArray.length}</span> course(s)
                </p>

                <p className="text-purple-900 text-xl font-semibold mb-6">
                    Total Cost: <span className="text-purple-700">${totalCost}</span>
                </p>

                <button
                    onClick={enrolledCourseHandler}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
                >
                    Enroll Now
                </button>
            </div>
        </div>
    );
}