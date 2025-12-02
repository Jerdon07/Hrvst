import { router, usePage } from '@inertiajs/react';

export default function AdminPendingPanel() {
    const { pendingFarmers } = usePage().props;

    const handleApprove = (userId) => {
        if (confirm('Approve this farmer account?')) {
            router.post(route('admin.farmers.approve', userId), {}, {
                preserveScroll: true,
            });
        }
    };

    const handleReject = (userId) => {
        if (confirm('Reject and permanently delete this farmer account? This cannot be undone.')) {
            router.post(route('admin.farmers.reject', userId), {}, {
                preserveScroll: true,
            });
        }
    };

    const handleViewLocation = (farmer) => {
        // TODO: Implement view location modal
        alert('View location feature coming soon');
    };

    return (
        <>
            <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Pending Accounts</h2>
            </div>

            {!pendingFarmers || pendingFarmers.length === 0 ? (
                <p className="text-gray-300 text-center py-8">No pending farmers</p>
            ) : (
                <div className="space-y-3">
                    {pendingFarmers.map(farmer => (
                        <div key={farmer.id} className="bg-gray-200 rounded-lg p-4">
                            <div className="font-semibold text-gray-900 mb-1">Farmer Name</div>
                            <div className="text-sm text-gray-600 mb-3">Farmer Address</div>
                            
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleViewLocation(farmer)}
                                    className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors font-medium"
                                >
                                    View Location
                                </button>
                                <button
                                    onClick={() => handleApprove(farmer.user_id)}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleReject(farmer.user_id)}
                                    className="px-4 py-2 bg-gray-400 text-white text-sm rounded-md hover:bg-red-600 transition-colors font-medium"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}