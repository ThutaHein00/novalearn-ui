import { useEffect, useState } from "react";
import type { CategoryDto } from "../../model/CategoryDto";
import { createCategory, getAllCategories } from "../../service/NovaLearnService";

export default function CategoryEntry() {
    const [categoryName, setCategoryName] = useState<string>("");
    const [categoryDtos, setCategoryDtos] = useState<CategoryDto[]>([]);

    const fetAllCategories = () => {
        getAllCategories()
            .then((res) => {
                setCategoryDtos(res.data);
            })
            .catch((err) => console.log(err));
    };

    const createCategoryHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const categoryDto: CategoryDto = {
            categoryName: categoryName,
        };

        createCategory(categoryDto)
            .then(() => {
                setCategoryName("");
                fetAllCategories();
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetAllCategories();
    }, []);

    return (
        <div className="min-h-screen p-6 bg-purple-50">
            <h1 className="text-2xl font-semibold text-purple-700 mb-6">
                Category Entry
            </h1>

            {/* ✅ Two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* ✅ Left Column — Form */}
                <div className="bg-white shadow-md rounded-lg p-6 border border-purple-200">
                    <h2 className="text-lg font-semibold text-purple-700 mb-4">
                        Create New Category
                    </h2>

                    <form onSubmit={createCategoryHandler} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">
                                Category Name
                            </label>
                            <input
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                className="w-full border border-purple-300 rounded-md px-3 py-2 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                placeholder="Enter category name"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                        >
                            Save Category
                        </button>
                    </form>
                </div>

                {/* ✅ Right Column — Table */}
                <div className="bg-white shadow-md rounded-lg p-6 border border-purple-200">
                    <h2 className="text-lg font-semibold text-purple-700 mb-4">
                        Category List
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-purple-200 rounded-lg overflow-hidden">
                            <thead className="bg-purple-100 text-purple-700">
                            <tr>
                                <th className="px-4 py-2 text-left border-b border-purple-200">
                                    #
                                </th>
                                <th className="px-4 py-2 text-left border-b border-purple-200">
                                    Category Name
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            {categoryDtos.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="text-center py-4 text-slate-500"
                                    >
                                        No categories found
                                    </td>
                                </tr>
                            ) : (
                                categoryDtos.map((cat,index) => (
                                    <tr
                                        key={cat.id}
                                        className="hover:bg-purple-50 transition"
                                    >
                                        <td className="px-4 py-2 border-b border-purple-100">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-2 border-b border-purple-100">
                                            {cat.categoryName}
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}