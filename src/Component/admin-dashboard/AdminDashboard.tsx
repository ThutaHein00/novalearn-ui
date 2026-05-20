import React from "react";
import {Link, Outlet} from "react-router-dom";

const AdminDashboard: React.FC = () => {
    return (
        <div className="min-h-screen flex bg-purple-50 text-slate-800">
            {/* Sidebar */}
            <aside className="w-64 bg-purple-100 border-r border-purple-200 flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-purple-200">
          <span className="text-xl font-semibold text-purple-700">
            Admin Panel
          </span>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    <Link to="/admin-dashboard/category-entry">
                        <SidebarItem label="Category Entry"/>
                    </Link>
                    <Link to="/admin-dashboard/course-entry">
                        <SidebarItem label="Course Entry"/>
                    </Link>
                    <Link to="course-edit">
                        <SidebarItem label="Course Edit"/>
                    </Link>
                    <SidebarItem label="Analytics"/>
                    <SidebarItem label="Settings"/>
                </nav>

                <div className="px-4 py-4 border-t border-purple-200">
                    <button
                        className="w-full flex items-center justify-center gap-2 rounded-md border border-purple-300 bg-purple-50 text-purple-700 px-3 py-2 text-sm hover:bg-purple-100 transition">
                        <span className="h-2 w-2 rounded-full bg-green-500"/>
                        <span>Kyaw (Admin)</span>
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col">
                {/* Top bar */}
                <header
                    className="h-16 flex items-center justify-between px-6 border-b border-purple-200 bg-white/70 backdrop-blur">
                    <h1 className="text-lg font-semibold text-purple-800">
                        Dashboard Overview
                    </h1>
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="rounded-md border border-purple-200 bg-purple-50 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
                        />
                        <button
                            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-purple-200 bg-purple-50 hover:bg-purple-100 transition">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-400 absolute top-1 right-1"/>
                            <span className="sr-only">Notifications</span>
                            <span
                                className="h-4 w-4 border-2 border-purple-500 rounded-full border-t-transparent animate-spin-slow"/>
                        </button>
                    </div>
                </header>

                <Outlet/>
            </main>
        </div>
    );
};

type SidebarItemProps = {
    label: string;
    active?: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({label, active}) => {
    return (
        <button
            className={`w-full flex items-center rounded-md px-3 py-2 text-sm transition
        ${
                active
                    ? "bg-purple-600 text-purple-50 shadow-sm"
                    : "text-purple-800 hover:bg-purple-200/80"
            }`}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2"/>
            <span>{label}</span>
        </button>
    );
};


export default AdminDashboard;