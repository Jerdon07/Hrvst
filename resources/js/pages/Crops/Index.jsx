import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import CropGrid from '@/Components/Crops/CropGrid';
import CropFormModal from '@/Components/Modals/Crops/CropFormModal';

export default function Index({ 
    crops, 
    categories,
    category_id = null,
}) {
    const { auth } = usePage().props;
    const isAdmin = auth.user?.isAdmin;

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCrop, setEditingCrop] = useState(null);

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

    return (
        <AppLayout
            title="Crops Page"
            showMap={false}
            onAddCrop={openCreateModal}
        >
            <div className="w-full p-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <CropGrid
                        crops={crops}
                        isAdmin={isAdmin}
                        onEdit={openEditModal}
                        onDelete={handleDelete}
                    />
                </div>
            </div>

            <CropFormModal
                isOpen={isCreateModalOpen || isEditModalOpen}
                onClose={closeModals}
                crop={(isCreateModalOpen || isEditModalOpen) ? editingCrop : null}
                categories={categories}
            />
        </AppLayout>
    );
}