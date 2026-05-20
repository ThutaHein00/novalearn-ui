import { useEffect, useState } from "react";
import type { CategoryDto } from "../../model/CategoryDto";
import { createCourse, getAllCategories } from "../../service/NovaLearnService";
import { getLoggedInUserName } from "../../service/AuthService";
import {useNavigate} from "react-router-dom";

export default function CourseEntry() {
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllCategories()
            .then((res) => setCategories(res.data))
            .catch((err) => console.log(err));
    }, []);

    const courseCreateHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const teacherName = getLoggedInUserName();
        const form= e.currentTarget;
        const formData = new FormData();
        formData.append("title", e.currentTarget.title.value);
        formData.append("description", e.currentTarget.description.value);
        formData.append("fees", e.currentTarget.fees.value);
        formData.append("image", e.currentTarget.image.files[0]);
        formData.append("categoryName", e.currentTarget.categoryName.value);
        formData.append("teacherName", teacherName!);

        createCourse(formData)
            .then((res) => {
                console.log(res.data);
                form.reset();
                navigator(`/admin-dashboard/course-edit`)
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="min-h-screen p-6 bg-purple-50">
            <h1 className="text-2xl font-semibold text-purple-700 mb-6">
                Course Entry
            </h1>

            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 border border-purple-200">
                <form onSubmit={courseCreateHandler} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-purple-700 mb-1">
                            Course Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="w-full border border-purple-300 rounded-md px-3 py-2 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="Enter course title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-purple-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            required
                            rows={4}
                            className="w-full border border-purple-300 rounded-md px-3 py-2 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="Enter course description"
                        ></textarea>
                    </div>

                    {/* Fees */}
                    <div>
                        <label className="block text-sm font-medium text-purple-700 mb-1">
                            Fees (MMK)
                        </label>
                        <input
                            type="number"
                            name="fees"
                            required
                            className="w-full border border-purple-300 rounded-md px-3 py-2 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="Enter course fees"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-purple-700 mb-1">
                            Category
                        </label>
                        <select
                            name="categoryName"
                            required
                            className="w-full border border-purple-300 rounded-md px-3 py-2 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                                <option key={cat.categoryName} value={cat.categoryName}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-purple-700 mb-1">
                            Course Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="w-full border border-purple-300 rounded-md px-3 py-2 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                    >
                        Create Course
                    </button>
                </form>
            </div>
        </div>
    );
}