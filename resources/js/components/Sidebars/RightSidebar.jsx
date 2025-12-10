import { useState } from "react";
import { usePage } from "@inertiajs/react";
import AdminPendingPanel from "./AdminPendingPanel";
import FarmerProfilePanel from "./FarmerProfilePanel";

export default function RightSidebar({ title }) {
    // Shared Data
    const { auth, pendingFarmers } = usePage().props;
    // Check if user is Admin or approved Farmer
    const isAdmin = auth.user?.isAdmin;
    const isApprovedFarmer = auth.user && !auth.user.isAdmin && auth.user.isApproved;
    // Shows how many pending farmers are there
    const badge = pendingFarmers?.length || 0;
    // Changes the Sidebar content depending on the user
    const memberContent = isAdmin
        ? (
            <AdminPendingPanel />
        ) : isApprovedFarmer ? (
            <FarmerProfilePanel />
        ) : null;
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            {/* Collapsed Strip - Always Visible */}
            <div
                className={`
                    absolute right-0 top-0 h-full bg-white border-l transition-all duration-300 ease-in-out z-50
                    pointer-events-auto
                    ${isOpen ? 'w-72' : 'w-16'}
                `}
            >
                {/* Toggle Button */}
                <button
                    onClick={toggle}
                    className="absolute left-2 top-4 text-black hover:text-green-950 transition-colors"
                >
                    {!isOpen ? (
                        <>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            {badge > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                                    {badge}
                                </span>
                            )}
                        </>
                    ) : (
                        <div className="flex">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <h2 className="hidden md:block text-xl font-bold text-gray-800 mb-6">{title}</h2>
                        </div>
                    )}
                </button>

                {/* Expanded Content */}
                {isOpen && (
                    <div className="pt-16 px-4 pb-4 overflow-y-auto h-full scrollbar-hide">
                        {memberContent}
                    </div>
                )}
            </div>
        </>
    );
}
