import InputError from '@/Components/InputError';

export default function CropSection({ selectedCrops, crops, setIsCropModalOpen, errors }) {
    return (
        <div className="mt-4">
            <button
                type="button"
                onClick={() => setIsCropModalOpen(true)}
                className='px-4 py-2 bg-blue-600 text-white rounded-md'
            >
                Add Crops ({selectedCrops.length}/3)
            </button>
            {selectedCrops.length > 0 && (
                <div className='mt-2 flex flex-wrap gap-2'>
                    {selectedCrops.map(cropId => {
                        const crop = crops.find(c => c.id == cropId);
                        return (
                            <span key={cropId} className='px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm'>
                                {crop?.name}
                            </span>
                        );
                    })}
                </div>
            )}
            <InputError message={errors.crops} className='mt-2' />
        </div>
    );
}