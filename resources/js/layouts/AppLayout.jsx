import { Head, usePage } from '@inertiajs/react';
import Navigation from '@/Components/Navigation/Navigation';
import LeftSidebar from '@/Components/Sidebars/LeftSidebar';
import RightSidebar from '@/Components/Sidebars/RightSidebar';

export default function AppLayout({ 
    children, 
    title,
    showMap = true,
    mapContent = null,
}) {
    const page = usePage().url.split('?')[0];
    
    /* Checks if user is authenticated */
    const user = usePage().props.auth.user;
    const isMember = user && (user.isMember || user.isAdmin);


    return (
        <>
            {/* Display Page Title */}
            <Head title={title} />

            <div className="h-screen flex flex-col">

                {/* Use Map Background or Not */}
                {showMap && (
                    <div className="fixed inset-0 top-16 z-0">
                        {mapContent}
                    </div>
                )}
                {!showMap && (
                    <div className="fixed inset-0 top-16 z-0 bg-white" />
                )}

                {/* Navigation Bar */}
                <Navigation />

                {/* Main Content Area */}
                <div className="relative flex flex-row overflow-hidden justify-between pointer-events-none h-full">
                    
                    {/* Left Sidebar  */}
                    <LeftSidebar />

                    {/* Main Content */}
                    <div className="flex-grow overflow-y-auto pr-12 pointer-events-none">
                        <div className="pointer-events-auto">
                            {children}
                        </div>
                    </div>

                    {/* Right Sidebar (only on specific users) */}
                    {isMember && <RightSidebar />}
                </div>
            </div>
        </>
    );
}