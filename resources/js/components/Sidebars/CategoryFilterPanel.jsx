import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function CategoryFilterPanel({
    selectedCategory,
    onAddCrop
}) {
    const {auth, categories, filters} = usePage().props;

    const category_id = filters.category_id || null;

    const filtered = (id) => {
        router.get(route('crops.index'), {
            ...filters,
            category_id: id,
        }, { preserveState: true, replace: true });
    }

    return (
        <div className="flex flex-col space-y-6 w-64">

            {/* Categories */}
            <div className="flex flex-col overflow-y-auto">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-1">
                    <button
                        onClick={() => filtered(null)}
                    >
                        <span className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex justify-between items-center ${
                            selectedCategory == null 
                                ? 'bg-black text-white font-semibold' 
                                : 'text-gray-700 hover:bg-gray-100 font-medium'
                        }`}>
                            All Categories
                        </span>
                    </button>
                    {categories?.map(category => (
                        <button
                            key={category.id}
                            onClick={() => filtered(category.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex justify-between items-center ${
                                selectedCategory == category.id 
                                    ? 'bg-black text-white font-semibold' 
                                    : 'text-gray-700 hover:bg-gray-100 font-medium'
                            }`}
                        >
                            <span>{category.name}</span>
                            {auth.user?.isAdmin && selectedCategory == category.id && (
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onAddCrop(category.id);
                                    }}
                                    className="text-white hover:text-gray-200 cursor-pointer"
                                >
                                    Add
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
