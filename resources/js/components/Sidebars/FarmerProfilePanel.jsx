// Content for Right

import { useForm, usePage } from '@inertiajs/react';

export default function FarmerProfilePanel() {
    const { auth, allCrops } = usePage().props;
    const farmer = auth.user?.farmer;

    const { data, setData, patch, processing, errors } = useForm({
        phone_number: farmer?.phone_number || '',
        crops: farmer?.crops?.map(c => c.id) || [],
    });

    const handleCropToggle = (cropId) => {
        const newCrops = data.crops.includes(cropId)
            ? data.crops.filter(id => id !== cropId)
            : [...data.crops, cropId];

        if (newCrops.length <= 3) {
            setData('crops', newCrops);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    if (!farmer) return null;

    return (
        <>
            <h2 className="text-xl font-bold text-white mb-6">My Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name (Read-only) */}
                <div>
                    <label className="block text-sm font-medium text-white mb-2">Name</label>
                    <input
                        type="text"
                        value={auth.user.name}
                        disabled
                        className="w-full px-3 py-2 bg-green-700 text-white rounded-md cursor-not-allowed opacity-75"
                    />
                </div>

                {/* Email (Read-only) */}
                <div>
                    <label className="block text-sm font-medium text-white mb-2">Email</label>
                    <input
                        type="email"
                        value={auth.user.email}
                        disabled
                        className="w-full px-3 py-2 bg-green-700 text-white rounded-md cursor-not-allowed opacity-75"
                    />
                </div>

                {/* Phone Number (Editable) */}
                <div>
                    <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
                    <input
                        type="tel"
                        value={data.phone_number}
                        onChange={(e) => setData('phone_number', e.target.value)}
                        className="w-full px-3 py-2 bg-white text-gray-800 rounded-md focus:ring-2 focus:ring-green-300"
                    />
                    {errors.phone_number && (
                        <p className="text-red-300 text-sm mt-1">{errors.phone_number}</p>
                    )}
                </div>

                {/* Location (Read-only) */}
                <div>
                    <label className="block text-sm font-medium text-white mb-2">Location</label>
                    <input
                        type="text"
                        value={`${farmer.barangay.name}, ${farmer.municipality.name}`}
                        disabled
                        className="w-full px-3 py-2 bg-green-700 text-white rounded-md cursor-not-allowed opacity-75"
                    />
                </div>

                {/* Crops Selection */}
                <div>
                    <label className="block text-sm font-medium text-white mb-2">
                        My Crops (Select 1-3)
                    </label>
                    <p className="text-xs text-green-200 mb-3">Selected: {data.crops.length}/3</p>
                    
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                        {allCrops?.map(crop => (
                            <label key={crop.id} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.crops.includes(crop.id)}
                                    onChange={() => handleCropToggle(crop.id)}
                                    disabled={!data.crops.includes(crop.id) && data.crops.length >= 3}
                                    className="rounded border-white text-green-600 focus:ring-green-300"
                                />
                                <span className="text-sm text-white">{crop.name}</span>
                            </label>
                        ))}
                    </div>
                    {errors.crops && (
                        <p className="text-red-300 text-sm mt-1">{errors.crops}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full px-4 py-2 bg-white text-green-600 rounded-md hover:bg-green-50 transition-colors font-medium disabled:opacity-50"
                >
                    {processing ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </>
    );
}