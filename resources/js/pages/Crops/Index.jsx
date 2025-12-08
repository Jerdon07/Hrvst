import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import CategoryFilterPanel from '@/Components/Sidebars/CategoryFilterPanel';
import FarmerProfilePanel from '@/Components/Sidebars/FarmerProfilePanel';
import AdminPendingPanel from '@/Components/Sidebars/AdminPendingPanel';
import CropGrid from '@/Components/Crops/CropGrid';
import CropFormModal from '@/Components/Modals/Crops/CropFormModal';

export default function Index({ 
    crops, 
    categories, 
    filters,
}) {
    const { auth, pendingFarmers } = usePage().props;

    // Checks if the user is Admin or Approved Farmer
    const isAdmin = auth.user?.isAdmin;
    const isApprovedFarmer = auth.user && !auth.user.isAdmin && auth.user.isApproved;

    // Left Sidebar Contents
    const [selectedCategory, setSelectedCategory] = useState(filters.category_id || '');
    const [searchQuery, setSearchQuery] = useState('');

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCrop, setEditingCrop] = useState(null);

    // Filter crops by category and search
    const displayedCrops = crops.filter(crop => {
        const matchesCategory = selectedCategory ? crop.category_id == selectedCategory : true;
        const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
        router.get(
            route('crops.index'),
            categoryId === selectedCategory ? {} : { category_id: categoryId },
            { preserveState: true, replace: true }
        );
    };

    // FIXED — Create mode must NOT pass a fake crop object
    const openCreateModal = (categoryId) => {
        setEditingCrop({ category_id: categoryId });
        setIsCreateModalOpen(true);
    };

    const openEditModal = (crop) => {
        setEditingCrop(crop);
        setIsEditModalOpen(true);
    };

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        setEditingCrop(null);
    };

    const handleDelete = (crop) => {
        if (confirm(`Delete ${crop.name}? This action cannot be undone.`)) {
            router.delete(route('crops.destroy', crop.id));
        }
    };

    // Left Sidebar with Crop Categories
    const leftSidebar = (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search Vegetables"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <svg 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            {/* Categories */}
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
                <CategoryFilterPanel
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryClick={handleCategoryClick}
                    totalCrops={crops.length}
                    isAdmin={isAdmin}
                    onAddCrop={openCreateModal}
                />
            </div>
        </div>
    );

    // Right sidebar content
    const rightSidebarContent = isAdmin ? (
        <AdminPendingPanel />
    ) : isApprovedFarmer ? (
        <FarmerProfilePanel />
    ) : null;

    return (
        <AppLayout
            title="Crops Page"
            leftSidebar={leftSidebar}
            leftSidebarTitle=""
            rightSidebarContent={rightSidebarContent}
            rightSidebarBadge={pendingFarmers?.length || 0}
            showMap={false}
        >
            <div className="min-h-screen p-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <CropGrid
                        crops={displayedCrops}
                        isAdmin={isAdmin}
                        onEdit={openEditModal}
                        onDelete={handleDelete}
                    />
                </div>
            </div>

            {/* FIXED — Single Modal Only */}
            <CropFormModal
                isOpen={isCreateModalOpen || isEditModalOpen}
                onClose={closeModals}
                crop={(isCreateModalOpen || isEditModalOpen) ? editingCrop : null}
                categories={categories}
            />
        </AppLayout>
    );
}
